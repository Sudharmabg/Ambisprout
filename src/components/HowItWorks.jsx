import Section from './Section.jsx';
import { howSteps } from '../data.js';

export default function HowItWorks() {
  return (
    <Section outerStyle={{ background: '#E8DFC8', padding: '56px 56px' }}>
      <div style={{ maxWidth: 1300, margin: '0 auto' }}>
        <h2
          style={{
            textAlign: 'center',
            fontFamily: "'Playfair Display', serif",
            fontSize: 38,
            color: '#1B4332',
            fontWeight: 700,
            margin: '0 0 40px',
          }}
        >
          How AmbiSprout Works
        </h2>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            position: 'relative',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 26,
              left: '8%',
              right: '8%',
              height: 2,
              background: '#8D6E63',
              opacity: 0.35,
            }}
          />
          {howSteps.map((s) => (
            <div
              key={s.n}
              style={{
                flex: 1,
                minWidth: 140,
                textAlign: 'center',
                position: 'relative',
                padding: '0 12px',
              }}
            >
              <div
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: '50%',
                  background: '#2E7D32',
                  color: '#fff',
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 22,
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  position: 'relative',
                  zIndex: 2,
                  boxShadow: '0 8px 18px rgba(46,125,50,0.3)',
                }}
              >
                {s.n}
              </div>
              <div style={{ fontWeight: 700, color: '#1B4332', fontSize: 16 }}>{s.title}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
