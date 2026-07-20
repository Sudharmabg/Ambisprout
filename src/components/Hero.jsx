import { useState } from 'react';
import Hoverable from './Hoverable.jsx';

/* Served from public/ so index.html can preload it (LCP optimization). */
const HERO_IMAGE = '/hero-illustration.jpg';

// Faint decorative dots that drift in the gap between the copy and the visual.
const dots = [
  { top: '34%', left: '52%', size: 10, color: '#4CAF50', opacity: 0.5, dur: '9s', delay: '0s' },
  { top: '52%', left: '48%', size: 7, color: '#5b8def', opacity: 0.45, dur: '11s', delay: '1.2s' },
  { top: '66%', left: '54%', size: 9, color: '#e8a13a', opacity: 0.4, dur: '10s', delay: '0.6s' },
];
/** Absolutely-positioned floating stat card: fades in on load, then drifts. */
function FloatCard({ className = '', pos, delay = 0, dur = '6s', style, children }) {
  return (
    <div
      className={`as-hero-float hero-anim hero-fade ${className}`}
      style={{ ...pos, animationDelay: `${delay}s` }}
    >
      <div
        style={{
          animation: `floatY ${dur} ease-in-out infinite`,
          background: '#fff',
          borderRadius: 18,
          boxShadow: '0 16px 40px rgba(27,67,50,0.14)',
          padding: '14px 16px',
          ...style,
        }}
      >
        {children}
      </div>
    </div>
  );
}

const labelStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 7,
  fontSize: 12,
  fontWeight: 700,
  color: '#6B7280',
};

export default function Hero({ onOpenChat }) {
  const [imgOk, setImgOk] = useState(true);

  return (
    <div
      id="hero"
      className="as-hero as-section-responsive"
      style={{
        position: 'relative',
        overflow: 'visible',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 40,
        alignItems: 'center',
        paddingTop: 56,
        paddingBottom: 64,
        paddingLeft: 56,
        paddingRight: 56,
        maxWidth: 1400,
        margin: '0 auto',
        background:
          'radial-gradient(ellipse at 78% 18%, rgba(76,175,80,0.12), transparent 55%)',
      }}
    >
      {dots.map((d, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: d.top,
            left: d.left,
            width: d.size,
            height: d.size,
            borderRadius: '50%',
            background: d.color,
            opacity: d.opacity,
            animation: `leafFloat ${d.dur} ease-in-out infinite ${d.delay}`,
            zIndex: 0,
          }}
        />
      ))}

      {/* Left — copy */}
      <div className="as-hero-copy" style={{ position: 'relative', zIndex: 2 }}>
        <div
          className="hero-anim hero-reveal"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(46,125,50,0.08)',
            color: '#2E7D32',
            padding: '6px 14px',
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '1.2px',
            textTransform: 'uppercase',
            marginBottom: 20,
            animationDelay: '0.05s',
          }}
        >
          <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: '#4CAF50' }} />
          The Future of Climate Action
        </div>
        <h1
          className="as-hero-title hero-anim hero-reveal"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 58,
            lineHeight: 1.08,
            color: '#1B4332',
            fontWeight: 700,
            margin: '0 0 20px',
            animationDelay: '0.15s',
          }}
        >
          India's AI-Powered <span style={{ color: '#2E7D32', fontStyle: 'italic', fontFamily: "'Playfair Display', serif" }}>Sustainability Companion</span>
        </h1>
        <p
          className="as-hero-desc hero-anim hero-fade"
          style={{
            animationDelay: '0.35s',
          }}
        >
          Empowering India's next generation to build verified green habits, track real carbon impact, and turn daily actions into meaningful rewards.
        </p>

        <div
          className="as-hero-buttons hero-anim hero-fade"
          style={{
            display: 'flex',
            gap: 16,
            flexWrap: 'wrap',
            marginBottom: 26,
            animationDelay: '0.5s',
          }}
        >
          <Hoverable
            as="a"
            href="#journey-section"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg,#2E7D32,#1f6a29)',
              color: '#fff',
              border: 'none',
              padding: '12px 24px',
              borderRadius: 12,
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'inherit',
              boxShadow: '0 8px 20px rgba(46,125,50,0.24)',
              textDecoration: 'none',
              transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
            }}
            hoverStyle={{ transform: 'translateY(-4px)', boxShadow: '0 12px 24px rgba(46,125,50,0.3)' }}
          >
            Start Your Green Journey
          </Hoverable>
        </div>

      </div>

      {/* Right — circular illustration ringed by floating stat cards */}
      <div className="as-hero-visual-wrapper hero-anim hero-fade" style={{ animationDelay: '0.1s', zIndex: 1 }}>
        <div className="as-hero-visual">
        <div className="as-hero-circle">
          {imgOk ? (
            <img
              src={HERO_IMAGE}
              alt="A person high-fiving the AmbiSprout mascot"
              width="400"
              height="400"
              fetchpriority="high"
              decoding="async"
              onError={() => setImgOk(false)}
            />
          ) : (
            <div
              className="as-hero-fallback"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                background: 'radial-gradient(circle at 50% 35%, #eef3e2, #dfe8cf)',
                color: '#2E7D32',
              }}
            >
              <span style={{ fontSize: 64 }}>🌱🤝</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#6B7280', maxWidth: 180, textAlign: 'center' }}>
                Save your illustration to public/hero-illustration.png
              </span>
            </div>
          )}
        </div>

        {/* Today's Mission */}
        <FloatCard className="as-hero-float-mission" pos={{ top: '2%', left: '0%' }} delay={0.55} dur="6.5s" style={{ width: 210 }}>
          <div style={labelStyle}>
            <span>🌱</span> Today's Mission
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#1B4332', margin: '8px 0 10px' }}>
            Carry a reusable bottle
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
            <span style={{ color: '#6B7280', fontWeight: 600 }}>
              Reward <b style={{ color: '#2E7D32' }}>+20</b>
            </span>
            <span style={{ color: '#8D6E63', fontWeight: 600 }}>0.3 kg CO₂</span>
          </div>
        </FloatCard>

        {/* 16 Day Streak */}
        <FloatCard pos={{ top: '4%', right: '-2%' }} delay={0.7} dur="7.5s">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 22 }}>🔥</span>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#1B4332' }}>16 Day Streak</div>
              <div style={{ fontSize: 12, color: '#6B7280', fontWeight: 600 }}>Keep going!</div>
            </div>
          </div>
        </FloatCard>


        {/* Your Impact */}
        <FloatCard pos={{ top: '45%', right: '-4%' }} delay={0.95} dur="6.8s">
          <div style={labelStyle}>
            <span>🌍</span> Your Impact
          </div>
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 26,
              fontWeight: 700,
              color: '#1B4332',
              margin: '4px 0 2px',
            }}
          >
            24 kg
          </div>
          <div style={{ fontSize: 12, color: '#6B7280', fontWeight: 600 }}>CO₂ Reduced</div>
        </FloatCard>

        {/* Sprout Coins */}
        <FloatCard pos={{ bottom: '11%', left: '-2%' }} delay={1.05} dur="7.2s">
          <div style={labelStyle}>
            <span>🪙</span> Sprout Coins
          </div>
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 26,
              fontWeight: 700,
              color: '#1B4332',
              marginTop: 4,
            }}
          >
            4,820
          </div>
        </FloatCard>

        {/* Community */}
        <FloatCard pos={{ bottom: '2%', right: '6%' }} delay={1.15} dur="6.4s" style={{ maxWidth: 230 }}>
          <div style={labelStyle}>
            <span>👥</span> Community
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#2F3A3D', marginTop: 6, lineHeight: 1.4 }}>
            18 people completed today's mission
          </div>
        </FloatCard>
      </div>
      </div>
    </div>
  );
}
