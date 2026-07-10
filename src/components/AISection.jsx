import Section from './Section.jsx';
import Hoverable from './Hoverable.jsx';
import { aiFeatures } from '../data.js';

export default function AISection({ onOpenChat }) {
  return (
    <Section outerStyle={{ background: '#1B4332', padding: '64px 56px', color: '#fff' }}>
      <div
        className="as-grid-2"
        style={{
          maxWidth: 1300,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 56,
          alignItems: 'center',
        }}
      >
        <div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 38,
              fontWeight: 700,
              margin: '0 0 14px',
            }}
          >
            Meet Sprout AI
          </h2>
          <p
            style={{
              color: '#B9CDBE',
              fontSize: 15,
              margin: '0 0 24px',
              lineHeight: 1.6,
              maxWidth: 400,
            }}
          >
            Your personal sustainability companion — always ready with a smarter, greener suggestion.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 28 }}>
            {aiFeatures.map((af) => (
              <div
                key={af}
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  borderRadius: 999,
                  padding: '9px 18px',
                  fontSize: 13,
                  color: '#E8DFC8',
                  fontWeight: 600,
                }}
              >
                {af}
              </div>
            ))}
          </div>
          <Hoverable
            as="button"
            onClick={onOpenChat}
            style={{
              background: '#4CAF50',
              color: '#fff',
              border: 'none',
              padding: '16px 32px',
              borderRadius: 14,
              fontSize: 16,
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
            hoverStyle={{ background: '#2E7D32' }}
          >
            Talk to AI
          </Hoverable>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 22, padding: 24 }}>
          <svg
            viewBox="0 0 260 90"
            style={{ width: '100%', height: 80, display: 'block', marginBottom: 16 }}
          >
            <circle cx="35" cy="45" r="30" fill="rgba(76,175,80,0.18)" />
            <path
              d="M35,20 C25,20 18,28 18,38 C18,46 24,50 24,56 L46,56 C46,50 52,46 52,38 C52,28 45,20 35,20 Z"
              fill="#4CAF50"
            />
            <rect x="27" y="58" width="16" height="8" rx="3" fill="#E8DFC8" />
            <circle cx="115" cy="45" r="26" fill="rgba(232,223,200,0.15)" />
            <path d="M100,55 L100,30 L118,30 L130,20 L130,55 Z" fill="#E8DFC8" />
            <circle cx="200" cy="45" r="30" fill="rgba(76,175,80,0.14)" />
            <rect x="182" y="30" width="36" height="26" rx="4" fill="#8D6E63" />
            <rect x="188" y="36" width="10" height="6" fill="#F7F3E9" />
            <rect x="202" y="36" width="10" height="6" fill="#F7F3E9" />
          </svg>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div
              style={{
                alignSelf: 'flex-end',
                background: '#4CAF50',
                color: '#fff',
                borderRadius: 14,
                padding: '12px 16px',
                fontSize: 14,
                maxWidth: '82%',
                lineHeight: 1.4,
              }}
            >
              How can I reduce my electricity bill?
            </div>
            <div
              style={{
                alignSelf: 'flex-start',
                background: '#fff',
                color: '#2F3A3D',
                borderRadius: 14,
                padding: '16px 18px',
                fontSize: 14,
                maxWidth: '92%',
                lineHeight: 1.6,
              }}
            >
              <div style={{ fontWeight: 700, color: '#1B4332', marginBottom: 6 }}>Sprout AI</div>
              Here are three personalized suggestions based on your lifestyle:
              <br />
              1. Replace unused chargers.
              <br />
              2. Turn off standby devices.
              <br />
              3. Shift heavy appliance usage to daylight hours.
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
