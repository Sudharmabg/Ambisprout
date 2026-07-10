import { useState, useRef, useEffect } from 'react';
import { chatReplies } from '../data.js';

const initialMessages = [
  {
    role: 'ai',
    text: "Hi! I'm your AI sustainability coach. Ask me anything about eco-friendly habits 🌱",
  },
];

export default function ChatWidget({ open, onOpen, onClose }) {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, open]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { role: 'user', text }]);
    setInput('');
    setTimeout(() => {
      const reply = chatReplies[Math.floor(Math.random() * chatReplies.length)];
      setMessages((prev) => [...prev, { role: 'ai', text: reply }]);
    }, 700);
  };

  const bubbleStyle = (role) =>
    role === 'ai'
      ? {
          background: '#fff',
          color: '#2F3A3D',
          borderRadius: 14,
          padding: '10px 14px',
          fontSize: 13,
          lineHeight: 1.45,
          maxWidth: '85%',
          alignSelf: 'flex-start',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        }
      : {
          background: '#2E7D32',
          color: '#fff',
          borderRadius: 14,
          padding: '10px 14px',
          fontSize: 13,
          lineHeight: 1.45,
          maxWidth: '85%',
          alignSelf: 'flex-end',
        };

  if (!open) {
    return (
      <button
        onClick={onOpen}
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          width: 58,
          height: 58,
          borderRadius: '50%',
          background: '#2E7D32',
          color: '#fff',
          border: 'none',
          fontSize: 22,
          cursor: 'pointer',
          boxShadow: '0 12px 28px rgba(46,125,50,0.4)',
          zIndex: 100,
          animation: 'pulseDot 2.5s infinite',
        }}
      >
        💬
      </button>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        width: 340,
        maxWidth: 'calc(100vw - 48px)',
        background: '#fff',
        borderRadius: 20,
        boxShadow: '0 20px 50px rgba(27,67,50,0.28)',
        zIndex: 100,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: 460,
      }}
    >
      <div
        style={{
          background: '#1B4332',
          color: '#fff',
          padding: '16px 18px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ fontWeight: 700, fontSize: 14 }}>🌱 AI Sustainability Coach</div>
        <button
          onClick={onClose}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#fff',
            fontSize: 16,
            cursor: 'pointer',
          }}
        >
          ✕
        </button>
      </div>

      <div
        ref={bodyRef}
        style={{
          padding: 14,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          overflowY: 'auto',
          flex: 1,
          background: '#F7F3E9',
        }}
      >
        {messages.map((m, i) => (
          <div key={i} style={bubbleStyle(m.role)}>
            {m.text}
          </div>
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          gap: 8,
          padding: 12,
          borderTop: '1px solid #E8DFC8',
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="Ask about sustainability..."
          style={{
            flex: 1,
            minWidth: 0,
            border: '1px solid #E8DFC8',
            borderRadius: 10,
            padding: '9px 12px',
            fontSize: 13,
            fontFamily: 'inherit',
            outline: 'none',
          }}
        />
        <button
          onClick={send}
          style={{
            background: '#2E7D32',
            color: '#fff',
            border: 'none',
            borderRadius: 10,
            padding: '9px 14px',
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
