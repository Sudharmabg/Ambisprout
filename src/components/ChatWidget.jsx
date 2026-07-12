import { useCallback, useEffect, useRef, useState } from 'react';
import sproutImg from '../assets/sprout_ai.jpeg';
import { chatReplies, chatSuggestions } from '../data.js';
import { sendChat } from '../lib/chatClient.js';
import {
  getUser,
  isAuthConfigured,
  onAuthChange,
  renderSignInButton,
  signOut,
} from '../lib/googleAuth.js';

const GUEST_GREETING =
  "Hi! I'm Sprout, your AI sustainability coach 🌱 Ask me anything about eco-friendly living or AmbiSprout — your first 5 answers today are free.";

const memberGreeting = (name) =>
  `Welcome back${name ? `, ${name}` : ''}! 🌱 What shall we make greener today?`;

function historyKey(user) {
  return user ? `as_chat_hist_${user.sub}` : 'as_chat_hist_guest';
}

function loadHistory(user) {
  try {
    const stored = JSON.parse(localStorage.getItem(historyKey(user)));
    if (Array.isArray(stored) && stored.length > 0) return stored;
  } catch {
    /* fall through to greeting */
  }
  return [
    { role: 'assistant', content: user ? memberGreeting(user.firstName) : GUEST_GREETING },
  ];
}

export default function ChatWidget({ open, onClose }) {
  const [user, setUser] = useState(() => getUser());
  const [messages, setMessages] = useState(() => loadHistory(getUser()));
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('idle'); // idle | thinking | streaming
  const [authPrompt, setAuthPrompt] = useState(null); // null | 'guest_limit' | 'member_limit' | 'manual'
  const [remaining, setRemaining] = useState(null);

  const bodyRef = useRef(null);
  const signInRef = useRef(null);
  const pendingRetryRef = useRef(null);
  const busy = status !== 'idle';

  /* Auth subscription: on sign-in, swap history + retry a limit-blocked message. */
  useEffect(
    () =>
      onAuthChange((nextUser) => {
        setUser(nextUser);
        setAuthPrompt(null);
        if (nextUser) {
          const retry = pendingRetryRef.current;
          pendingRetryRef.current = null;
          if (retry) {
            setMessages(retry);
            void runSend(retry, nextUser);
          } else {
            setMessages(loadHistory(nextUser));
          }
        }
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  /* Persist history per user. */
  useEffect(() => {
    try {
      localStorage.setItem(historyKey(user), JSON.stringify(messages.slice(-40)));
    } catch {
      /* best-effort */
    }
  }, [messages, user]);

  /* Auto-scroll. */
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, status, authPrompt, open]);

  /* Render the Google button whenever the auth prompt is visible. */
  useEffect(() => {
    if (authPrompt && signInRef.current && isAuthConfigured()) {
      renderSignInButton(signInRef.current).catch(() => {});
    }
  }, [authPrompt]);

  const runSend = useCallback(async (history, activeUser) => {
    setStatus('thinking');
    let streamed = false;

    const result = await sendChat(history, activeUser, {
      onDelta: (chunk) => {
        setStatus('streaming');
        setMessages((prev) => {
          if (!streamed) {
            streamed = true;
            return [...prev, { role: 'assistant', content: chunk }];
          }
          const next = [...prev];
          next[next.length - 1] = {
            role: 'assistant',
            content: next[next.length - 1].content + chunk,
          };
          return next;
        });
      },
    });

    if (typeof result.remaining === 'number' && result.remaining >= 0) {
      setRemaining(result.remaining);
    }

    switch (result.type) {
      case 'faq':
      case 'cache':
        // Brief pause so instant answers still feel conversational.
        await new Promise((r) => setTimeout(r, 450));
        setMessages((prev) => [...prev, { role: 'assistant', content: result.text }]);
        break;
      case 'stream':
        if (!streamed) {
          setMessages((prev) => [...prev, { role: 'assistant', content: result.text }]);
        }
        break;
      case 'limit':
        if (result.code === 'guest_limit') {
          pendingRetryRef.current = history;
          setAuthPrompt('guest_limit');
        } else {
          setAuthPrompt('member_limit');
        }
        break;
      case 'error':
      default:
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: `${chatReplies[Math.floor(Math.random() * chatReplies.length)]}\n\n(I'm having trouble reaching my AI brain right now — try again in a moment.)`,
          },
        ]);
        break;
    }
    setStatus('idle');
  }, []);

  const send = useCallback(
    (rawText) => {
      const text = (rawText ?? input).trim();
      if (!text || busy) return;
      setInput('');
      setAuthPrompt(null);
      const history = [...messages, { role: 'user', content: text }];
      setMessages(history);
      void runSend(history, user);
    },
    [input, busy, messages, user, runSend]
  );

  if (!open) return null;

  const showChips = messages.length <= 1 && !busy;

  return (
    <div className="cw-panel" role="dialog" aria-label="Sprout AI sustainability coach chat">
      {/* Header */}
      <div className="cw-head">
        <span className="cw-avatar-wrap">
          <img src={sproutImg} alt="" width="38" height="38" className="cw-avatar" />
          <span className="cw-online" />
        </span>
        <span className="cw-title">
          <b>Sprout AI</b>
          <small>{busy ? 'typing…' : 'Online'}</small>
        </span>
        <span className="cw-head-actions">
          {user ? (
            <button
              type="button"
              className="cw-signout"
              onClick={signOut}
              title={`Signed in as ${user.email}. Click to sign out.`}
            >
              {user.picture ? (
                <img src={user.picture} alt="" width="24" height="24" referrerPolicy="no-referrer" />
              ) : (
                user.firstName || 'Account'
              )}
            </button>
          ) : (
            <button type="button" className="cw-signin-link" onClick={() => setAuthPrompt('manual')}>
              Sign in
            </button>
          )}
          <button type="button" className="cw-close" onClick={onClose} aria-label="Close chat">
            ✕
          </button>
        </span>
      </div>

      {/* Messages */}
      <div ref={bodyRef} className="cw-body" aria-live="polite">
        {messages.map((m, i) => (
          <div key={i} className={m.role === 'user' ? 'cw-msg-user' : 'cw-msg-ai'}>
            {m.content}
          </div>
        ))}

        {status === 'thinking' && (
          <div className="cw-typing" aria-label="Sprout is typing">
            <span />
            <span />
            <span />
          </div>
        )}

        {authPrompt && (
          <div className="cw-auth">
            {authPrompt === 'member_limit' ? (
              <p>
                You've used all 25 answers for today — impressive dedication! 🌿 Come back
                tomorrow for more.
              </p>
            ) : (
              <p>
                {authPrompt === 'guest_limit'
                  ? "You've used your 5 free answers for today 🌱 Sign in with Google to keep chatting — members get 25 answers a day, free."
                  : 'Sign in with Google to get 25 answers a day and pick up your chats where you left off.'}
              </p>
            )}
            {authPrompt !== 'member_limit' &&
              (isAuthConfigured() ? (
                <div ref={signInRef} className="cw-google-btn" />
              ) : (
                <p className="cw-auth-note">
                  (Sign-in isn't configured yet — set VITE_GOOGLE_CLIENT_ID.)
                </p>
              ))}
          </div>
        )}

        {showChips && (
          <div className="cw-chips">
            {chatSuggestions.map((q) => (
              <button key={q} type="button" className="cw-chip" onClick={() => send(q)}>
                {q}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Composer */}
      <div className="cw-compose">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="Ask about sustainability..."
          aria-label="Ask Sprout a question"
          maxLength={600}
          disabled={busy}
        />
        <button type="button" className="cw-send" onClick={() => send()} disabled={busy} aria-label="Send message">
          ➤
        </button>
      </div>
      {!user && remaining !== null && remaining >= 0 && (
        <div className="cw-quota">{remaining} free answer{remaining === 1 ? '' : 's'} left today</div>
      )}
    </div>
  );
}
