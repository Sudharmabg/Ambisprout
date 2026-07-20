import { useState, useEffect } from 'react';

export default function NewsModal({ article, onClose, onTakeAction, onStartJourney }) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [speechProgress, setSpeechProgress] = useState(0);
  const [actionClaimed, setActionClaimed] = useState(false);

  useEffect(() => {
    let interval;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setSpeechProgress((prev) => {
          if (prev >= 100) {
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 5;
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

  if (!article) return null;

  const handleClaim = () => {
    setActionClaimed(true);
    if (onTakeAction) {
      onTakeAction(article);
    }
  };

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(27, 67, 50, 0.8)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1100,
        padding: 20,
        boxSizing: 'border-box',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#FFFDF9',
          borderRadius: '24px',
          maxWidth: '720px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 24px 60px rgba(27,67,50,0.35)',
          border: '1px solid #E8DFC8',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Banner Image */}
        <div style={{ position: 'relative', width: '100%', height: 200, flexShrink: 0 }}>
          <img
            src={article.imageUrl}
            alt={article.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(27,67,50,0.85) 100%)',
            }}
          />
          <button
            onClick={onClose}
            aria-label="Close story"
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              background: 'rgba(255, 255, 255, 0.25)',
              border: 'none',
              borderRadius: '50%',
              width: 36,
              height: 36,
              fontSize: 18,
              cursor: 'pointer',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(4px)',
            }}
          >
            ✕
          </button>

          <div style={{ position: 'absolute', bottom: 20, left: 24, right: 24, color: '#fff' }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
              <span
                style={{
                  background: '#2E7D32',
                  color: '#fff',
                  padding: '4px 12px',
                  borderRadius: 999,
                  fontSize: 11,
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                {article.category}
              </span>
              <span style={{ fontSize: 12, opacity: 0.9 }}>• {article.source}</span>
              <span style={{ fontSize: 12, opacity: 0.9 }}>• {article.timestamp}</span>
            </div>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 26,
                fontWeight: 700,
                margin: 0,
                lineHeight: 1.25,
              }}
            >
              {article.title}
            </h1>
          </div>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '28px 32px 36px' }}>
          {/* Audio Simulation Player */}
          <div
            style={{
              background: '#F4EFE2',
              borderRadius: '16px',
              padding: '14px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 16,
              marginBottom: 24,
              border: '1px solid #E8DFC8',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button
                type="button"
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: '50%',
                  background: '#1B4332',
                  color: '#fff',
                  border: 'none',
                  fontSize: 16,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {isPlayingAudio ? '⏸' : '🔊'}
              </button>
              <div>
                <b style={{ color: '#1B4332', fontSize: 14, display: 'block' }}>Listen with Sprout AI</b>
                <span style={{ color: '#6B7280', fontSize: 12 }}>
                  {isPlayingAudio ? `Narration in progress (${speechProgress}%)` : `Audio digest • ${article.readTime}`}
                </span>
              </div>
            </div>
          </div>

          {/* AI Executive Summary Box */}
          <div
            style={{
              background: 'linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)',
              color: '#fff',
              borderRadius: '20px',
              padding: '22px 24px',
              marginBottom: 24,
              boxShadow: '0 8px 24px rgba(27,67,50,0.15)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 18 }}>🤖</span>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, margin: 0, color: '#A3E635' }}>
                Sprout AI Executive Breakdown
              </h3>
            </div>
            <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.6, fontSize: 14 }}>
              {article.aiTakeaways.map((item, i) => (
                <li key={i} style={{ marginBottom: 8, color: '#E8F5E9' }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Full Article Content */}
          <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: '#1B4332', marginBottom: 10 }}>
            Full News Summary
          </h4>
          <p style={{ color: '#2F3A3D', lineHeight: 1.7, fontSize: 15, margin: '0 0 24px', whiteSpace: 'pre-line' }}>
            {article.summary}
          </p>

          {/* Bottom CTA Banner */}
          <div
            style={{
              marginTop: 28,
              background: 'linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)',
              color: '#fff',
              borderRadius: '20px',
              padding: '24px 20px',
              textAlign: 'center',
            }}
          >
            <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, margin: '0 0 8px', color: '#fff' }}>
              Ready to Turn Insights into Action?
            </h4>
            <p style={{ color: '#B9CDBE', fontSize: 13.5, margin: '0 0 16px', maxWidth: 440, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.5 }}>
              Join AmbiSprout to track your daily green habits, complete AI missions, and see your environmental impact grow.
            </p>
            <button
              onClick={() => {
                onClose();
                if (onStartJourney) onStartJourney();
              }}
              style={{
                background: '#4CAF50',
                color: '#fff',
                border: 'none',
                padding: '10px 24px',
                borderRadius: 999,
                fontSize: 13.5,
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 6px 16px rgba(76,175,80,0.3)',
              }}
            >
              Start Your Green Journey →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
