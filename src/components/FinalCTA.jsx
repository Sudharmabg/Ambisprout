import Section from './Section.jsx';
import Hoverable from './Hoverable.jsx';

export default function FinalCTA() {
  return (
    <Section outerStyle={{ background: '#F7F3E9', padding: '72px 56px', textAlign: 'center' }}>
      <h2
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 42,
          color: '#1B4332',
          fontWeight: 700,
          margin: '0 0 16px',
        }}
      >
        Ready to Build a Greener Tomorrow?
      </h2>
      <p style={{ color: '#6B7280', fontSize: 17, maxWidth: 520, margin: '0 auto 32px' }}>
        Join AmbiSprout and let AI guide your sustainability journey—one meaningful action at a time.
      </p>
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Hoverable
          as="button"
          style={{
            background: '#2E7D32',
            color: '#fff',
            border: 'none',
            padding: '18px 40px',
            borderRadius: 14,
            fontSize: 17,
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: 'inherit',
            boxShadow: '0 12px 28px rgba(46,125,50,0.32)',
          }}
          hoverStyle={{ background: '#1B4332', transform: 'translateY(-2px)' }}
        >
          Start Your Green Journey
        </Hoverable>
        <Hoverable
          as="button"
          style={{
            background: 'transparent',
            color: '#1B4332',
            border: '1.5px solid #1B4332',
            padding: '18px 40px',
            borderRadius: 14,
            fontSize: 17,
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
          hoverStyle={{ background: '#1B4332', color: '#fff' }}
        >
          Explore the Community
        </Hoverable>
      </div>
    </Section>
  );
}
