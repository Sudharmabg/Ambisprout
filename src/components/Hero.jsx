import { useState } from 'react';
import Hoverable from './Hoverable.jsx';

const MISSION_REWARD = 30;

const floatingLeaves = [
  { top: '12%', left: '5%', size: 22, opacity: 0.3, dur: '8s', delay: '0s' },
  { top: '62%', left: '13%', size: 16, opacity: 0.25, dur: '10s', delay: '1.5s' },
  { top: '20%', left: '90%', size: 18, opacity: 0.25, dur: '9s', delay: '0.8s' },
  { top: '78%', left: '86%', size: 20, opacity: 0.22, dur: '11s', delay: '2s' },
];

export default function Hero({ onOpenChat }) {
  const [missionCompleted, setMissionCompleted] = useState(false);

  return (
    <div
      className="as-hero"
      style={{
        position: 'relative',
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 40,
        alignItems: 'center',
        padding: '64px 56px 72px',
        maxWidth: 1400,
        margin: '0 auto',
        background: 'radial-gradient(ellipse at 80% 10%, rgba(76,175,80,0.10), transparent 60%)',
      }}
    >
      {floatingLeaves.map((leaf, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            top: leaf.top,
            left: leaf.left,
            fontSize: leaf.size,
            opacity: leaf.opacity,
            animation: `leafFloat ${leaf.dur} ease-in-out infinite ${leaf.delay}`,
            zIndex: 0,
          }}
        >
          🍃
        </span>
      ))}

      {/* Copy */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: '#fff',
            padding: '9px 18px',
            borderRadius: 999,
            boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
            fontSize: 14,
            color: '#1B4332',
            fontWeight: 600,
            marginBottom: 24,
          }}
        >
          <span>🌱</span>
          <span>India's AI-Powered Sustainability Companion</span>
        </div>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 54,
            lineHeight: 1.1,
            color: '#1B4332',
            fontWeight: 700,
            margin: '0 0 10px',
          }}
        >
          Every Small Action Builds a Greener Tomorrow.
        </h1>
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 20,
            color: '#2E7D32',
            fontWeight: 600,
            fontStyle: 'italic',
            marginBottom: 20,
          }}
        >
          Powered by AI. Inspired by You.
        </div>
        <p
          style={{
            color: '#6B7280',
            fontSize: 18,
            lineHeight: 1.65,
            maxWidth: 480,
            margin: '0 0 32px',
          }}
        >
          Complete personalized sustainability missions, reduce your environmental impact, earn
          Sprout Coins, and become part of India's growing green community.
        </p>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <Hoverable
            as="button"
            style={{
              background: '#2E7D32',
              color: '#fff',
              border: 'none',
              padding: '16px 30px',
              borderRadius: 14,
              fontSize: 16,
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'inherit',
              boxShadow: '0 10px 24px rgba(46,125,50,0.3)',
            }}
            hoverStyle={{ transform: 'translateY(-2px)', background: '#1B4332' }}
          >
            Start Your Journey →
          </Hoverable>
          <Hoverable
            as="button"
            style={{
              background: 'transparent',
              color: '#1B4332',
              border: '1.5px solid #1B4332',
              padding: '16px 30px',
              borderRadius: 14,
              fontSize: 16,
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
            hoverStyle={{ background: '#1B4332', color: '#fff' }}
          >
            Explore Community
          </Hoverable>
        </div>
      </div>

      {/* Mission card */}
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
        <div
          style={{
            width: 460,
            maxWidth: '100%',
            background: '#fff',
            borderRadius: 24,
            boxShadow: '0 30px 60px rgba(27,67,50,0.16)',
            padding: 26,
            animation: 'floatY 5s ease-in-out infinite',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 18,
            }}
          >
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 20,
                fontWeight: 700,
                color: '#1B4332',
              }}
            >
              🌱 Good Morning, Sudharma
            </span>
            <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#E8DFC8' }} />
          </div>

          <div
            style={{
              background: 'linear-gradient(135deg,#F0F7F0,#F7F3E9)',
              borderRadius: 18,
              padding: 20,
              marginBottom: 16,
            }}
          >
            <div
              style={{
                fontSize: 11,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: '#4CAF50',
                fontWeight: 700,
                marginBottom: 8,
              }}
            >
              Today's AI Mission
            </div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: '#1B4332',
                marginBottom: 14,
                lineHeight: 1.4,
              }}
            >
              Use public transport instead of driving today.
            </div>
            <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
              <div style={{ flex: 1, background: '#fff', borderRadius: 12, padding: '10px 12px' }}>
                <div style={{ fontSize: 11, color: '#6B7280', fontWeight: 600, marginBottom: 2 }}>
                  Reward
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#2E7D32' }}>
                  +{MISSION_REWARD} Sprout Coins
                </div>
              </div>
              <div style={{ flex: 1, background: '#fff', borderRadius: 12, padding: '10px 12px' }}>
                <div style={{ fontSize: 11, color: '#6B7280', fontWeight: 600, marginBottom: 2 }}>
                  Estimated Impact
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#2E7D32' }}>Save ~2.1 kg CO₂</div>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 8,
              }}
            >
              <span style={{ fontSize: 12, color: '#6B7280', fontWeight: 600 }}>
                {missionCompleted ? '1/1 Completed' : '0/1 Completed'}
              </span>
              {missionCompleted && (
                <span
                  style={{
                    fontSize: 12,
                    color: '#4CAF50',
                    fontWeight: 700,
                    animation: 'coinPop 0.6s ease',
                  }}
                >
                  +{MISSION_REWARD} 🪙
                </span>
              )}
            </div>
            <div
              style={{
                height: 8,
                background: '#E8DFC8',
                borderRadius: 999,
                overflow: 'hidden',
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  height: '100%',
                  background: '#4CAF50',
                  borderRadius: 999,
                  width: missionCompleted ? '100%' : '0%',
                  transition: 'width 0.5s ease',
                }}
              />
            </div>
            <button
              onClick={() => setMissionCompleted(true)}
              disabled={missionCompleted}
              style={{
                width: '100%',
                background: missionCompleted ? '#8fb8a4' : '#2E7D32',
                color: '#fff',
                border: 'none',
                padding: 13,
                borderRadius: 12,
                fontWeight: 700,
                fontSize: 14,
                cursor: missionCompleted ? 'default' : 'pointer',
                fontFamily: 'inherit',
              }}
            >
              {missionCompleted ? 'Mission Completed ✓' : 'Complete Mission'}
            </button>
          </div>

          <div
            style={{
              border: '1px solid #E8DFC8',
              borderRadius: 14,
              padding: 12,
              display: 'flex',
              gap: 10,
              alignItems: 'flex-start',
            }}
          >
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: '50%',
                background: '#8D6E63',
                flexShrink: 0,
              }}
            />
            <div style={{ fontSize: 13, lineHeight: 1.4 }}>
              <b>🌱 Bengaluru Community</b>
              <div style={{ color: '#6B7280' }}>"We planted 50 trees this weekend."</div>
              <div style={{ color: '#6B7280', fontSize: 12, marginTop: 2 }}>❤️ 245 · 💬 62</div>
            </div>
          </div>
        </div>

        <Hoverable
          as="button"
          onClick={onOpenChat}
          style={{
            position: 'absolute',
            bottom: -16,
            right: 6,
            background: '#1B4332',
            color: '#fff',
            border: 'none',
            borderRadius: 999,
            padding: '12px 20px',
            fontWeight: 700,
            fontSize: 13,
            cursor: 'pointer',
            fontFamily: 'inherit',
            boxShadow: '0 10px 24px rgba(27,67,50,0.35)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
          hoverStyle={{ background: '#2E7D32' }}
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
          Ask AI Coach
        </Hoverable>
      </div>
    </div>
  );
}
