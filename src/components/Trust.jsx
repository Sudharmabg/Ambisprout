import Section from './Section.jsx';
import Reveal from './Reveal.jsx';
import Hoverable from './Hoverable.jsx';
import FeatureIcon from './FeatureIcon.jsx';
import { trustPillars, trustCommitments } from '../data.js';

const ACCENT = '#2E7D32';

export default function Trust() {
  return (
    <Section
      animate={false}
      className="as-section-responsive"
      outerStyle={{ background: '#fff', padding: '64px 56px 72px' }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Reveal style={{ textAlign: 'center', marginBottom: 44 }}>
          <div className="as-trust-eyebrow">TRUST &amp; TRANSPARENCY</div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 36,
              color: '#1B4332',
              fontWeight: 700,
              margin: '0 0 12px',
            }}
          >
            Why Trust AmbiSprout
          </h2>
          <p style={{ color: '#6B7280', fontSize: 16, maxWidth: 540, margin: '0 auto', lineHeight: 1.6 }}>
            Green claims are easy to make. We'd rather show our work — here's what we
            stand behind.
          </p>
        </Reveal>

        <div
          className="as-grid-2"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 22 }}
        >
          {trustPillars.map((tp, i) => (
            <Reveal key={tp.title} delay={i * 0.08}>
              <Hoverable
                className="as-trust-card"
                hoverStyle={{
                  transform: 'translateY(-5px)',
                  boxShadow: `0 20px 40px ${ACCENT}1f`,
                  borderColor: `${ACCENT}55`,
                }}
              >
                <div className="as-trust-chip">
                  <FeatureIcon name={tp.icon} size={23} />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 800,
                      color: '#1B4332',
                      marginBottom: 7,
                    }}
                  >
                    {tp.title}
                  </div>
                  <div style={{ color: '#6B7280', fontSize: 14.5, lineHeight: 1.6 }}>
                    {tp.desc}
                  </div>
                </div>
              </Hoverable>
            </Reveal>
          ))}
        </div>

        {/* Commitment strip */}
        <Reveal delay={0.15}>
          <div className="as-trust-strip">
            {trustCommitments.map((c) => (
              <span key={c} className="as-trust-strip-item">
                <span className="as-trust-strip-check">
                  <FeatureIcon name="shield" size={15} />
                </span>
                {c}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
