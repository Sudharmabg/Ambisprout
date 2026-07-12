import { matchFaq, normalize } from './faq.js';

/**
 * Chat pipeline client — resolves a user message through three layers:
 *   1. local FAQ bank            (instant, free)
 *   2. localStorage answer cache (repeat questions, free)
 *   3. /api/chat Pages Function  (OpenAI, streamed)
 *
 * Returns { type: 'faq' | 'cache' | 'stream' | 'limit' | 'error', ... }.
 * For 'stream', text is delivered incrementally via onDelta and the full
 * reply is in `text` when the promise resolves.
 */

const CACHE_KEY = 'as_chat_cache_v1';
const CACHE_MAX_ENTRIES = 50;
const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000;

function readCache() {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY)) || {};
  } catch {
    return {};
  }
}

function cacheGet(question) {
  const key = normalize(question);
  const entry = readCache()[key];
  if (!entry) return null;
  if (Date.now() - entry.ts > CACHE_TTL_MS) return null;
  return entry.text;
}

function cachePut(question, text) {
  const key = normalize(question);
  if (key.length < 8 || key.length > 200 || !text) return;
  try {
    const cache = readCache();
    cache[key] = { text, ts: Date.now() };
    const keys = Object.keys(cache);
    if (keys.length > CACHE_MAX_ENTRIES) {
      keys
        .sort((a, b) => cache[a].ts - cache[b].ts)
        .slice(0, keys.length - CACHE_MAX_ENTRIES)
        .forEach((k) => delete cache[k]);
    }
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {
    /* storage full or unavailable — caching is best-effort */
  }
}

/**
 * @param {Array<{role: string, content: string}>} history full conversation
 * @param {{token: string}|null} user signed-in user (adds Authorization)
 * @param {{onDelta?: (chunk: string) => void}} handlers
 */
export async function sendChat(history, user, { onDelta } = {}) {
  const lastUser = [...history].reverse().find((m) => m.role === 'user');
  const question = lastUser?.content || '';
  const isSingleTurn = history.filter((m) => m.role === 'user').length <= 1;

  // Layer 1 — curated FAQ bank
  const faq = matchFaq(question);
  if (faq) {
    return { type: 'faq', text: faq.answer };
  }

  // Layer 2 — per-visitor answer cache (single-turn questions only)
  if (isSingleTurn) {
    const cached = cacheGet(question);
    if (cached) {
      return { type: 'cache', text: cached };
    }
  }

  // Layer 3 — serverless function → OpenAI
  let res;
  try {
    res = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        ...(user?.token ? { Authorization: `Bearer ${user.token}` } : {}),
      },
      body: JSON.stringify({ messages: history }),
    });
  } catch {
    return { type: 'error', reason: 'network' };
  }

  if (res.status === 429) {
    const body = await res.json().catch(() => ({}));
    return { type: 'limit', code: body.code || 'guest_limit' };
  }
  if (!res.ok) {
    return { type: 'error', reason: `http_${res.status}` };
  }

  const remaining = parseInt(res.headers.get('X-Remaining') ?? '-1', 10);
  const contentType = res.headers.get('content-type') || '';

  // KV cache hit — full answer as JSON
  if (contentType.includes('application/json')) {
    const body = await res.json().catch(() => null);
    if (!body?.text) return { type: 'error', reason: 'bad_response' };
    if (isSingleTurn) cachePut(question, body.text);
    return { type: 'cache', text: body.text, remaining };
  }

  // Streamed plain-text reply
  let text = '';
  try {
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      if (chunk) {
        text += chunk;
        onDelta?.(chunk);
      }
    }
  } catch {
    if (!text) return { type: 'error', reason: 'stream' };
  }

  if (!text.trim()) return { type: 'error', reason: 'empty' };
  if (isSingleTurn) cachePut(question, text);
  return { type: 'stream', text, remaining };
}
