import { faqBank } from '../data.js';

/**
 * Lightweight local FAQ matcher — layer 1 of the chatbot pipeline.
 * Scores each FAQ entry by keyword overlap with the user's question and
 * returns the answer when confidence is high enough. Free and instant,
 * so common questions never reach the API.
 */

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'is', 'are', 'was', 'be', 'do', 'does', 'did', 'can',
  'could', 'will', 'would', 'should', 'i', 'you', 'we', 'it', 'me', 'my',
  'your', 'to', 'of', 'in', 'on', 'for', 'and', 'or', 'with', 'about',
  'what', 'whats', 'how', 'why', 'when', 'where', 'who', 'tell', 'please',
]);

export function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenize(text) {
  return normalize(text)
    .split(' ')
    .filter((w) => w.length > 1 && !STOP_WORDS.has(w));
}

/**
 * Returns { answer, id } when a FAQ entry matches confidently, else null.
 */
export function matchFaq(question) {
  const qTokens = tokenize(question);
  if (qTokens.length === 0) return null;
  const qSet = new Set(qTokens);

  let best = null;
  let bestScore = 0;

  for (const entry of faqBank) {
    let hits = 0;
    let required = false;
    for (const kw of entry.keywords) {
      if (kw.includes(' ')) {
        if (normalize(question).includes(kw)) {
          hits += 2;
          required = true;
        }
      } else if (qSet.has(kw)) {
        hits += 1;
        if (entry.anchors?.includes(kw)) required = true;
      }
    }
    if (hits === 0) continue;
    // Score favors entries whose keywords cover more of the question.
    const score = hits / Math.max(3, qTokens.length * 0.6);
    if ((required || hits >= 2) && score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  return best && bestScore >= 0.5 ? { answer: best.answer, id: best.id } : null;
}
