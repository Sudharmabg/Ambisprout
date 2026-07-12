import Section from './Section.jsx';
import Reveal from './Reveal.jsx';
import Hoverable from './Hoverable.jsx';
import FeatureIcon from './FeatureIcon.jsx';
import sproutAiImg from '../assets/sprout_ai.jpeg';
import { features } from '../data.js';

/* Single brand accent shared by every tile's icon and highlights. */
const ACCENT = '#2E7D32';

/* Chat transcript shown inside the flagship AI Coach tile. */
const coachMessages = [
  { from: 'user', text: 'How do I cut my commute emissions?' },
  {
    from: 'ai',
    text: (
      <>
        Take the metro today — I'll verify it and credit <b>+20 Sprout Coins</b>.
      </>
    ),
  },
  { from: 'user', text: 'Any ideas for the weekend?' },
  {
    from: 'ai',
    text: (
      <>
        A short cycle ride 🚲 saves ~<b>2 kg CO₂</b>. Want me to add it as a mission?
      </>
    ),
  },
];

function CoachVisual() {
  return (
    <div
      style={{
        marginTop: 16,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      {coachMessages.map((m, i) =>
        m.from === 'user' ? (
          <div
            key={i}
            style={{
              alignSelf: 'flex-end',
              background: '#1B4332',
              color: '#fff',
              fontSize: 12.5,
              fontWeight: 600,
              padding: '9px 13px',
              borderRadius: '14px 14px 4px 14px',
              maxWidth: '82%',
              textAlign: 'left',
            }}
          >
            {m.text}
          </div>
        ) : (
          <div
            key={i}
            style={{
              alignSelf: 'flex-start',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 8,
              maxWidth: '90%',
            }}
          >
            <img
              src={sproutAiImg}
              alt=""
              aria-hidden="true"
              width="22"
              height="22"
              loading="lazy"
              decoding="async"
              style={{
                width: 22,
                height: 22,
                borderRadius: '50%',
                objectFit: 'cover',
                border: '1px solid #4CAF50',
                flexShrink: 0,
              }}
            />
            <div
              style={{
                background: '#F0F7F0',
                color: '#1B4332',
                fontSize: 12.5,
                fontWeight: 600,
                padding: '9px 13px',
                borderRadius: '14px 14px 14px 4px',
                textAlign: 'left',
              }}
            >
              {m.text}
            </div>
          </div>
        )
      )}
    </div>
  );
}

/* Descending bars for the Carbon tile. */
function CarbonVisual() {
  const bars = [70, 58, 48, 40, 30, 22];
  return (
    <div style={{ marginTop: 'auto', paddingTop: 18, width: '100%', maxWidth: 300 }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 46 }}>
        {bars.map((h, i) => (
          <span
            key={i}
            style={{
              flex: 1,
              height: `${h}%`,
              background: ACCENT,
              opacity: 0.35 + (i / bars.length) * 0.65,
              borderRadius: 4,
            }}
          />
        ))}
      </div>
      <div style={{ marginTop: 10, fontSize: 12.5, fontWeight: 700, color: ACCENT }}>
        −24 kg CO₂ tracked this month
      </div>
    </div>
  );
}

/* Headline number for the Sprout Coins tile. */
function CoinsVisual({ stat }) {
  return (
    <div
      style={{
        marginTop: 'auto',
        paddingTop: 18,
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'center',
        gap: 10,
      }}
    >
      <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 700, color: ACCENT }}>
        {stat.value}
      </span>
      <span style={{ fontSize: 12.5, color: '#6B7280', fontWeight: 600 }}>{stat.label}</span>
    </div>
  );
}

function visualFor(f) {
  switch (f.id) {
    case 'coach':
      return <CoachVisual />;
    case 'carbon':
      return <CarbonVisual />;
    case 'coins':
      return f.stat ? <CoinsVisual stat={f.stat} /> : <div style={{ flex: 1 }} />;
    default:
      return <div style={{ flex: 1 }} />;
  }
}

function Tile({ f, delay }) {
  const isFlagship = f.id === 'coach';
  return (
    <Reveal delay={delay} style={{ gridArea: f.id }}>
      <Hoverable
        as="a"
        href={f.href}
        className="as-bento-tile"
        hoverStyle={{
          transform: 'translateY(-6px)',
          boxShadow: `0 22px 44px ${ACCENT}22`,
          borderColor: `${ACCENT}66`,
        }}
      >
        <div className="as-bento-chip" style={{ background: isFlagship ? 'transparent' : `${ACCENT}18`, color: ACCENT }}>
          {isFlagship ? (
            <img
              src={sproutAiImg}
              alt="Sprout AI logo"
              width="48"
              height="48"
              loading="lazy"
              decoding="async"
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                objectFit: 'cover',
                border: `2.5px solid ${ACCENT}`,
                flexShrink: 0,
              }}
            />
          ) : (
            <FeatureIcon name={f.icon} size={24} />
          )}
        </div>
        <div
          style={{
            fontSize: isFlagship ? 22 : 17,
            fontWeight: 800,
            color: '#1B4332',
            marginBottom: 8,
            lineHeight: 1.25,
          }}
        >
          {f.title}
        </div>
        <div style={{ color: '#6B7280', fontSize: 14, lineHeight: 1.55, maxWidth: 340 }}>
          {f.desc}
        </div>
        {visualFor(f)}
        {isFlagship ? (
          <span className="as-bento-sproutcta">
            <FeatureIcon name="bot" size={16} /> Sprout AI
          </span>
        ) : (
          <div className="as-bento-cta" style={{ color: ACCENT }}>
            {f.cta} <span>→</span>
          </div>
        )}
      </Hoverable>
    </Reveal>
  );
}

export default function Features() {
  return (
    <Section
      animate={false}
      className="as-section-responsive"
      outerStyle={{ maxWidth: 1300, margin: '0 auto', padding: '32px 56px 64px' }}
    >
      <Reveal style={{ textAlign: 'center', marginBottom: 44 }}>
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
        <p style={{ color: '#6B7280', fontSize: 16, maxWidth: 560, margin: '0 auto' }}>
          One AI-powered toolkit that makes sustainability simple to act on, easy to
          measure, and genuinely rewarding.
        </p>
      </Reveal>

      <div className="as-bento">
        {features.map((f, i) => (
          <Tile key={f.id} f={f} delay={i * 0.08} />
        ))}
      </div>
    </Section>
  );
}
