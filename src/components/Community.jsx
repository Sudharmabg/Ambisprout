import Section from './Section.jsx';
import { liveActivity, trendingTopics, communityPosts } from '../data.js';

export default function Community() {
  return (
    <Section id="community-section" className="as-section-responsive" outerStyle={{ background: '#F7F3E9', padding: '32px 56px 64px' }}>
      <div style={{ maxWidth: 1300, margin: '0 auto' }}>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 38,
            color: '#1B4332',
            fontWeight: 700,
            margin: '0 0 32px',
            textAlign: 'center',
          }}
        >
          Join India's Fastest Growing Green Community
        </h2>

        <div
          className="as-grid-2"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 1fr',
            gap: 24,
            marginBottom: 32,
          }}
        >
          {/* Live activity */}
          <div
            style={{
              background: '#fff',
              borderRadius: 22,
              padding: 26,
              boxShadow: '0 8px 24px rgba(27,67,50,0.06)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontWeight: 700,
                color: '#1B4332',
                fontSize: 15,
                marginBottom: 16,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#4CAF50',
                  animation: 'pulseDot 2s infinite',
                }}
              />
              Live Community
            </div>
            {liveActivity.map((a, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  padding: '10px 0',
                  borderBottom: '1px solid #F7F3E9',
                  fontSize: 14,
                }}
              >
                <span style={{ color: '#2F3A3D' }}>{a.text}</span>
                <span
                  style={{
                    color: '#8fae9c',
                    fontSize: 12,
                    whiteSpace: 'nowrap',
                    marginLeft: 12,
                  }}
                >
                  {a.time}
                </span>
              </div>
            ))}
          </div>

          {/* Trending */}
          <div
            style={{
              background: '#fff',
              borderRadius: 22,
              padding: 26,
              boxShadow: '0 8px 24px rgba(27,67,50,0.06)',
            }}
          >
            <div style={{ fontWeight: 700, color: '#1B4332', fontSize: 15, marginBottom: 16 }}>
              🔥 Trending Discussions
            </div>
            {trendingTopics.map((t, i) => (
              <div
                key={i}
                style={{
                  padding: '12px 14px',
                  background: '#F7F3E9',
                  borderRadius: 12,
                  marginBottom: 10,
                  fontSize: 14,
                  color: '#1B4332',
                  fontWeight: 600,
                }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>

        {/* Posts */}
        <div
          className="as-grid-3"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}
        >
          {communityPosts.map((p, i) => (
            <div
              key={i}
              style={{
                background: '#fff',
                borderRadius: 20,
                padding: 22,
                boxShadow: '0 8px 24px rgba(27,67,50,0.05)',
              }}
            >
              <div style={{ fontWeight: 700, color: '#1B4332', fontSize: 15, marginBottom: 10 }}>
                {p.tag}
              </div>
              <div
                style={{ color: '#2F3A3D', fontSize: 15, lineHeight: 1.5, marginBottom: 14 }}
              >
                "{p.text}"
              </div>
              <div style={{ color: '#6B7280', fontSize: 13 }}>{p.meta}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
