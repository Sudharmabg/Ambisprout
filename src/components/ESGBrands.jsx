import { useRef } from 'react';
import Section from './Section.jsx';
import Hoverable from './Hoverable.jsx';
import { brands } from '../data.js';

export default function ESGBrands() {
  const scrollRef = useRef(null);

  const scrollBy = (delta) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: delta, behavior: 'smooth' });
    }
  };

  const arrowStyle = {
    width: 42,
    height: 42,
    borderRadius: '50%',
    border: '1.5px solid #1B4332',
    background: '#fff',
    color: '#1B4332',
    fontSize: 16,
    cursor: 'pointer',
  };

  return (
    <Section id="brands-section" className="as-section-responsive" outerStyle={{ padding: '64px 56px', maxWidth: 1400, margin: '0 auto' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 28,
        }}
      >
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 38,
            color: '#1B4332',
            fontWeight: 700,
            margin: 0,
          }}
        >
          ESG-Friendly Brands
        </h2>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => scrollBy(-260)} style={arrowStyle}>
            ←
          </button>
          <button onClick={() => scrollBy(260)} style={arrowStyle}>
            →
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        style={{
          display: 'flex',
          gap: 20,
          overflowX: 'auto',
          scrollBehavior: 'smooth',
          paddingBottom: 8,
        }}
      >
        {brands.map((b) => (
          <div
            key={b.name}
            style={{
              minWidth: 220,
              background: '#fff',
              borderRadius: 20,
              padding: 22,
              boxShadow: '0 8px 24px rgba(27,67,50,0.06)',
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: '#E8DFC8',
                marginBottom: 14,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#8D6E63',
                fontWeight: 700,
              }}
            >
              {b.initial}
            </div>
            <div style={{ fontWeight: 700, color: '#1B4332', fontSize: 15, marginBottom: 4 }}>
              {b.name}
            </div>
            <div style={{ color: '#6B7280', fontSize: 13, marginBottom: 10 }}>{b.category}</div>
            <div style={{ color: '#4CAF50', fontSize: 13, fontWeight: 700, marginBottom: 14 }}>
              ★ {b.rating}
            </div>
            <Hoverable
              as="button"
              style={{
                width: '100%',
                background: 'transparent',
                border: '1.5px solid #2E7D32',
                color: '#2E7D32',
                padding: 8,
                borderRadius: 10,
                fontWeight: 600,
                fontSize: 13,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
              hoverStyle={{ background: '#2E7D32', color: '#fff' }}
            >
              Explore
            </Hoverable>
          </div>
        ))}
      </div>
    </Section>
  );
}
