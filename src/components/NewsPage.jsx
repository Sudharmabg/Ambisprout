import { useState, useEffect } from 'react';
import Hoverable from './Hoverable.jsx';

export default function NewsPage({ article, onClose, onSelectArticle, onTakeAction, onStartJourney, newsList }) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [speechProgress, setSpeechProgress] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll reset when article changes
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsPlayingAudio(false);
    setSpeechProgress(0);
  }, [article]);

  // Audio narration progress simulation
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

  // Scroll progress bar logic for the entire window
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle escape key to go back
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!article) return null;

  return (
    <div
      style={{
        background: '#FAF8F3', // Cream background matching the design
        minHeight: '100vh',
        color: '#2F3A3D',
        fontFamily: "'Manrope', sans-serif",
      }}
    >
      {/* Scroll Progress Bar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: `${scrollProgress}%`,
          height: '4px',
          background: '#4CAF50',
          zIndex: 1200,
          transition: 'width 0.1s ease',
        }}
      />

      {/* Back button header area */}
      <div
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '24px 24px 12px',
        }}
      >
        <button
          onClick={onClose}
          style={{
            background: '#1B4332',
            border: 'none',
            color: '#fff',
            fontSize: '14px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 22px',
            borderRadius: '999px',
            boxShadow: '0 4px 12px rgba(27,67,50,0.15)',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            fontFamily: 'inherit',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#2E7D32';
            e.currentTarget.style.transform = 'translateX(-4px)';
            e.currentTarget.style.boxShadow = '0 6px 18px rgba(46,125,50,0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#1B4332';
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(27,67,50,0.15)';
          }}
        >
          ← Back to News
        </button>
      </div>

      {/* News Article Main Container */}
      <article
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '0 24px 80px',
        }}
      >
        {/* Responsive Hero Image Header */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16/9.5',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 12px 32px rgba(27,67,50,0.12)',
            border: '1px solid #E8DFC8',
            marginBottom: '36px',
            background: '#1B4332',
          }}
        >
          <img
            src={article.imageUrl}
            alt={article.title}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 1,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(180deg, rgba(27,67,50,0.1) 0%, rgba(27,67,50,0.85) 100%)',
              pointerEvents: 'none',
              zIndex: 2,
            }}
          />

          <div
            style={{
              position: 'absolute',
              bottom: 'clamp(20px, 5%, 36px)',
              left: 'clamp(20px, 5%, 36px)',
              right: 'clamp(20px, 5%, 36px)',
              color: '#fff',
              zIndex: 3,
              textShadow: '0 2px 10px rgba(0,0,0,0.5)',
            }}
          >
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', marginBottom: 12 }}>
              <span
                style={{
                  background: '#2E7D32',
                  color: '#fff',
                  padding: '4px 14px',
                  borderRadius: 999,
                  fontSize: '11px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}
              >
                {article.category}
              </span>
              <span style={{ fontSize: '13px', opacity: 0.9, fontWeight: 500 }}>• {article.source}</span>
              <span style={{ fontSize: '13px', opacity: 0.9, fontWeight: 500 }}>• {article.timestamp}</span>
            </div>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(22px, 4vw, 36px)',
                fontWeight: 700,
                margin: 0,
                lineHeight: 1.25,
                color: '#fff',
              }}
            >
              {article.title}
            </h1>
          </div>
        </div>

        {/* Content Wrapper (constrained reading width) */}
        <div
          style={{
            maxWidth: '800px',
            margin: '0 auto',
          }}
        >
          {/* Audio Simulation Player */}
          <div
            style={{
              background: '#F4EFE2',
              borderRadius: '16px',
              padding: '16px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 16,
              marginBottom: 32,
              border: '1px solid #E8DFC8',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <button
                type="button"
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: '#1B4332',
                  color: '#fff',
                  border: 'none',
                  fontSize: 16,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#2E7D32')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#1B4332')}
              >
                {isPlayingAudio ? '⏸' : '🔊'}
              </button>
              <div>
                <b style={{ color: '#1B4332', fontSize: 15, display: 'block', marginBottom: 2 }}>Listen with Sprout AI</b>
                <span style={{ color: '#6B7280', fontSize: 13 }}>
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
              borderRadius: '24px',
              padding: '28px 32px',
              marginBottom: 36,
              boxShadow: '0 8px 24px rgba(27,67,50,0.15)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <span style={{ fontSize: 20 }}>🤖</span>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, margin: 0, color: '#A3E635', fontWeight: 700 }}>
                Sprout AI Executive Breakdown
              </h3>
            </div>
            <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.7, fontSize: 15 }}>
              {article.aiTakeaways.map((item, i) => (
                <li key={i} style={{ marginBottom: 10, color: '#E8F5E9' }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Full Article Content */}
          <h4
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 20,
              color: '#1B4332',
              marginBottom: 14,
              fontWeight: 700,
            }}
          >
            Full News Summary
          </h4>
          <p
            style={{
              color: '#2F3A3D',
              lineHeight: 1.8,
              fontSize: 16,
              margin: '0 0 40px',
              whiteSpace: 'pre-line',
            }}
          >
            {article.summary}
          </p>

          {/* Bottom CTA Banner */}
          <div
            style={{
              background: 'linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)',
              color: '#fff',
              borderRadius: '24px',
              padding: '36px 32px',
              textAlign: 'center',
              boxShadow: '0 12px 32px rgba(27,67,50,0.15)',
            }}
          >
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, margin: '0 0 10px', color: '#fff', fontWeight: 700 }}>
              Ready to Turn Insights into Action?
            </h3>
            <p style={{ color: '#B9CDBE', fontSize: 15, margin: '0 0 24px', maxWidth: 520, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.6 }}>
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
                padding: '13px 32px',
                borderRadius: 999,
                fontSize: 15,
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(76,175,80,0.3)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#43A047';
                e.currentTarget.style.transform = 'scale(1.03)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#4CAF50';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Start Your Green Journey →
            </button>
          </div>

          {/* Related News / More from Eco Pulse */}
          {newsList && newsList.length > 1 && (
            <div
              style={{
                borderTop: '1px solid #E8DFC8',
                paddingTop: '48px',
                marginTop: '64px',
                width: '100%',
              }}
            >
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '24px',
                  color: '#1B4332',
                  marginBottom: '28px',
                  fontWeight: 700,
                }}
              >
                More Eco Stories
              </h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '28px',
                }}
              >
                {newsList
                  .filter((n) => n.id !== article.id)
                  .slice(0, 3)
                  .map((item) => (
                    <Hoverable
                      key={item.id}
                      as="div"
                      onClick={() => onSelectArticle(item)}
                      style={{
                        background: '#FFFDF9',
                        borderRadius: '20px',
                        border: '1px solid #E8DFC8',
                        boxShadow: '0 8px 24px rgba(27,67,50,0.06)',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                      hoverStyle={{ transform: 'translateY(-6px)', boxShadow: '0 16px 36px rgba(27,67,50,0.12)' }}
                    >
                      <div style={{ position: 'relative', height: '170px', width: '100%' }}>
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <span
                          style={{
                            position: 'absolute',
                            top: 14,
                            left: 14,
                            background: 'rgba(27,67,50,0.85)',
                            color: '#4CAF50',
                            padding: '4px 10px',
                            borderRadius: 999,
                            fontSize: '11px',
                            fontWeight: 800,
                            backdropFilter: 'blur(4px)',
                            textTransform: 'uppercase',
                          }}
                        >
                          {item.category}
                        </span>
                      </div>
                      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#6B7280', marginBottom: 8 }}>
                          <span>{item.source}</span>
                          <span>{item.timestamp}</span>
                        </div>
                        <h4
                          style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: '16px',
                            color: '#1B4332',
                            margin: '0 0 8px',
                            lineHeight: 1.35,
                            fontWeight: 700,
                          }}
                        >
                          {item.title}
                        </h4>
                        <p style={{ color: '#4B5563', fontSize: 13, lineHeight: 1.5, margin: 0, flex: 1 }}>
                          {item.subtitle || item.summary.slice(0, 80) + '...'}
                        </p>
                      </div>
                    </Hoverable>
                  ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
