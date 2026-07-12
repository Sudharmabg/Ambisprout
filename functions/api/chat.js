/**
 * AmbiSprout chatbot backend — Cloudflare Pages Function.
 *
 * POST /api/chat
 *   body:    { messages: [{ role: "user"|"assistant", content: string }, ...] }
 *   headers: Authorization: Bearer <google id token>   (optional — members)
 *
 * Responses:
 *   200 text/plain stream        — AI reply streamed as plain text chunks
 *   200 application/json         — { text, cached: true } for KV cache hits
 *   429 application/json         — { code: "guest_limit" | "member_limit" }
 *   4xx/5xx application/json     — { error }
 *
 * Env: OPENAI_API_KEY (secret), GOOGLE_CLIENT_ID (var), CHAT_KV (KV binding).
 */

const MODEL = 'gpt-5-mini';
const GUEST_DAILY_LIMIT = 5;
const MEMBER_DAILY_LIMIT = 25;
const MAX_HISTORY_MESSAGES = 12;
const MAX_MESSAGE_CHARS = 1200;
const MAX_REPLY_TOKENS = 450;
const CACHE_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

const SYSTEM_PROMPT = `You are Sprout, the friendly AI sustainability coach for AmbiSprout — India's AI-powered sustainability companion for students and young professionals.

About AmbiSprout (be accurate, never invent features):
- Users complete personalized eco missions (e.g. carry a reusable bottle, take the metro), verify them with photos/receipts/activity data, and earn Sprout Coins.
- Impact estimates follow published emission factors. City challenges run across Indian cities like Bengaluru, Delhi, Mumbai, Pune, and Chennai.
- AmbiSprout is free for individual users and is an early-stage product with a founding community — no inflated numbers, no greenwashing.
- Rewards are funded by ESG-friendly brand partners.

Your style:
- Warm, encouraging, and practical. Ground advice in everyday Indian life (metro/bus commutes, local markets, monsoon seasons, hostel/PG living).
- Keep replies under ~120 words. Use short paragraphs or compact bullet lists. At most one emoji per reply.
- Give concrete, doable suggestions with rough impact when useful (e.g. "saves ~2 kg CO2").

Boundaries:
- Only discuss sustainability, eco-friendly living, climate topics, and AmbiSprout itself.
- If asked about anything else (homework, code, politics, medical/legal/financial advice), politely decline in one sentence and steer back to sustainability.
- If you don't know an AmbiSprout product detail, say the team is still building and suggest joining the founding community — never make features up.`;

/* ---------------- Google ID token verification ---------------- */

let jwksCache = { keys: null, fetchedAt: 0 };

async function getGoogleKeys() {
  const ONE_HOUR = 60 * 60 * 1000;
  if (jwksCache.keys && Date.now() - jwksCache.fetchedAt < ONE_HOUR) {
    return jwksCache.keys;
  }
  const res = await fetch('https://www.googleapis.com/oauth2/v3/certs');
  if (!res.ok) throw new Error('jwks fetch failed');
  const { keys } = await res.json();
  jwksCache = { keys, fetchedAt: Date.now() };
  return keys;
}

function b64urlToBytes(s) {
  const pad = '='.repeat((4 - (s.length % 4)) % 4);
  const raw = atob(s.replace(/-/g, '+').replace(/_/g, '/') + pad);
  const bytes = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i);
  return bytes;
}

/** Returns { sub, email, name, picture } or null when invalid/absent. */
async function verifyGoogleToken(token, clientId) {
  if (!token || !clientId) return null;
  try {
    const [h, p, sig] = token.split('.');
    if (!h || !p || !sig) return null;
    const header = JSON.parse(new TextDecoder().decode(b64urlToBytes(h)));
    const payload = JSON.parse(new TextDecoder().decode(b64urlToBytes(p)));

    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) return null;
    if (payload.aud !== clientId) return null;
    if (!['accounts.google.com', 'https://accounts.google.com'].includes(payload.iss)) return null;

    const keys = await getGoogleKeys();
    const jwk = keys.find((k) => k.kid === header.kid);
    if (!jwk) return null;

    const key = await crypto.subtle.importKey(
      'jwk',
      jwk,
      { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
      false,
      ['verify']
    );
    const valid = await crypto.subtle.verify(
      'RSASSA-PKCS1-v1_5',
      key,
      b64urlToBytes(sig),
      new TextEncoder().encode(`${h}.${p}`)
    );
    if (!valid) return null;

    return {
      sub: payload.sub,
      email: payload.email,
      name: payload.name || '',
      picture: payload.picture || '',
    };
  } catch {
    return null;
  }
}

/* ---------------- Helpers ---------------- */

function json(body, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', ...extraHeaders },
  });
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function normalizeQuestion(text) {
  return text.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, '').replace(/\s+/g, ' ').trim();
}

async function sha256Hex(text) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

/** Trim + sanitize incoming history into OpenAI message format. */
function buildMessages(raw) {
  const cleaned = [];
  for (const m of raw.slice(-MAX_HISTORY_MESSAGES)) {
    if (!m || typeof m.content !== 'string') continue;
    if (m.role !== 'user' && m.role !== 'assistant') continue;
    const content = m.content.slice(0, MAX_MESSAGE_CHARS).trim();
    if (content) cleaned.push({ role: m.role, content });
  }
  return [{ role: 'system', content: SYSTEM_PROMPT }, ...cleaned];
}

/* ---------------- Handler ---------------- */

export async function onRequestPost(context) {
  const { request, env } = context;

  if (!env.OPENAI_API_KEY) {
    return json({ error: 'Chat backend is not configured yet.' }, 503);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON body.' }, 400);
  }
  const rawMessages = Array.isArray(body?.messages) ? body.messages : [];
  const lastUser = [...rawMessages].reverse().find((m) => m?.role === 'user');
  if (!lastUser || typeof lastUser.content !== 'string' || !lastUser.content.trim()) {
    return json({ error: 'No user message provided.' }, 400);
  }

  // --- Identify the caller (member via Google token, else guest by IP) ---
  const authHeader = request.headers.get('Authorization') || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  const user = await verifyGoogleToken(token, env.GOOGLE_CLIENT_ID);
  const tier = user ? 'member' : 'guest';
  const limit = user ? MEMBER_DAILY_LIMIT : GUEST_DAILY_LIMIT;
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const rlKey = user ? `rl:m:${user.sub}:${todayKey()}` : `rl:g:${ip}:${todayKey()}`;

  const userTurns = rawMessages.filter((m) => m?.role === 'user').length;
  const isSingleTurn = userTurns <= 1;
  const normalized = normalizeQuestion(lastUser.content);

  const used = env.CHAT_KV ? parseInt((await env.CHAT_KV.get(rlKey)) || '0', 10) : 0;

  // --- KV answer cache (generic single-turn questions only) ---
  // Checked before the rate limit: cached answers cost nothing, so they
  // don't consume the user's daily quota.
  let cacheKey = null;
  if (env.CHAT_KV && isSingleTurn && normalized.length >= 8 && normalized.length <= 200) {
    cacheKey = `cache:v1:${await sha256Hex(normalized)}`;
    const cached = await env.CHAT_KV.get(cacheKey);
    if (cached) {
      return json(
        { text: cached, cached: true },
        200,
        { 'X-Tier': tier, 'X-Remaining': String(Math.max(0, limit - used)), 'X-Cache': 'hit' }
      );
    }
  }

  // --- Rate limit (KV) ---
  let remaining = limit;
  if (env.CHAT_KV) {
    if (used >= limit) {
      return json(
        { code: user ? 'member_limit' : 'guest_limit', limit },
        429,
        { 'X-Tier': tier, 'X-Remaining': '0' }
      );
    }
    remaining = limit - used - 1;
    await env.CHAT_KV.put(rlKey, String(used + 1), { expirationTtl: 60 * 60 * 48 });
  }

  // --- Call OpenAI (streaming) ---
  const upstream = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.OPENAI_API_KEY}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      stream: true,
      max_completion_tokens: MAX_REPLY_TOKENS,
      messages: buildMessages(rawMessages),
    }),
  });

  if (!upstream.ok || !upstream.body) {
    return json({ error: 'AI service unavailable.' }, 502, {
      'X-Tier': tier,
      'X-Remaining': String(remaining),
    });
  }

  // Parse upstream SSE, forward plain-text chunks, accumulate for the cache.
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const pump = (async () => {
    const reader = upstream.body.getReader();
    let buffer = '';
    let fullText = '';
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith('data:')) continue;
          const data = trimmed.slice(5).trim();
          if (data === '[DONE]') continue;
          try {
            const delta = JSON.parse(data)?.choices?.[0]?.delta?.content;
            if (delta) {
              fullText += delta;
              await writer.write(encoder.encode(delta));
            }
          } catch {
            /* ignore malformed SSE lines */
          }
        }
      }
      if (cacheKey && fullText.length > 0 && fullText.length < 4000 && env.CHAT_KV) {
        await env.CHAT_KV.put(cacheKey, fullText, { expirationTtl: CACHE_TTL_SECONDS });
      }
    } catch {
      /* client disconnected or upstream error — nothing more to do */
    } finally {
      try {
        await writer.close();
      } catch {
        /* already closed */
      }
    }
  })();
  context.waitUntil(pump);

  return new Response(readable, {
    status: 200,
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'no-store',
      'X-Tier': tier,
      'X-Remaining': String(remaining),
      'X-Cache': 'miss',
    },
  });
}
