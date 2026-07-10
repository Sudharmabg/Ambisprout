import Section from './Section.jsx';
import Hoverable from './Hoverable.jsx';
import { features } from '../data.js';

export default function Features() {
  return (
    <Section outerStyle={{ maxWidth: 1300, margin: '0 auto', padding: '32px 56px 64px' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 38,
            color: '#1B4332',
            fontWeight: 700,
            margin: '0 0 12px',
          }}
        >
          Everything You Need To Go Green
        </h2>
        <p style={{ color: '#6B7280', fontSize: 16 }}>
          AI-powered tools that make sustainability simple, social, and rewarding.
        </p>
      </div>
      <div
        className="as-grid-3"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}
      >
        {features.map((f) => (
          <Hoverable
            key={f.title}
            style={{
              background: '#fff',
              borderRadius: 22,
              padding: 28,
              boxShadow: '0 8px 24px rgba(27,67,50,0.06)',
              transition: 'transform 0.3s, box-shadow 0.3s',
            }}
            hoverStyle={{
              transform: 'translateY(-6px)',
              boxShadow: '0 18px 36px rgba(27,67,50,0.12)',
            }}
          >
            <div style={{ fontSize: 32, marginBottom: 14, textAlign: 'center' }}>{f.emoji}</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#1B4332', marginBottom: 8, textAlign: 'center' }}>
              {f.title}
            </div>
            <div style={{ color: '#6B7280', fontSize: 14, lineHeight: 1.5, textAlign: 'center' }}>{f.desc}</div>
          </Hoverable>
        ))}
      </div>
    </Section>
  );
}
