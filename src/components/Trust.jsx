import Section from './Section.jsx';
import { trustPoints } from '../data.js';

export default function Trust() {
  return (
    <Section outerStyle={{ background: '#fff', padding: '56px 56px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h2
          style={{
            textAlign: 'center',
            fontFamily: "'Playfair Display', serif",
            fontSize: 34,
            color: '#1B4332',
            fontWeight: 700,
            margin: '0 0 32px',
          }}
        >
          Why Trust AmbiSprout
        </h2>
        <div
          className="as-grid-2"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 20 }}
        >
          {trustPoints.map((tp, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
                background: '#F7F3E9',
                borderRadius: 16,
                padding: 20,
              }}
            >
              <span style={{ color: '#2E7D32', fontSize: 18, fontWeight: 800 }}>✓</span>
              <span
                style={{ color: '#1B4332', fontSize: 15, fontWeight: 600, lineHeight: 1.5 }}
              >
                {tp}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
