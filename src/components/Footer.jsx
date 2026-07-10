import Hoverable from './Hoverable.jsx';

const quickLinks = [
  { label: 'Community', href: '#community-section' },
  { label: 'Challenges', href: '#challenges-section' },
];

const resources = [
  { label: 'Contact', href: '#' },
  { label: 'Privacy', href: '#' },
  { label: 'Terms', href: '#' },
];

function LinkColumn({ title, links }) {
  return (
    <div>
      <div style={{ fontWeight: 700, color: '#fff', marginBottom: 14, fontSize: 14 }}>{title}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
        {links.map((l) => (
          <Hoverable
            key={l.label}
            as="a"
            href={l.href}
            style={{ color: '#B9CDBE', textDecoration: 'none' }}
            hoverStyle={{ color: '#4CAF50' }}
          >
            {l.label}
          </Hoverable>
        ))}
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <div style={{ background: '#1B4332', color: '#E8DFC8', padding: '64px 56px 32px' }}>
      <div
        className="as-grid-4"
        style={{
          maxWidth: 1300,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr 1fr 1.2fr',
          gap: 40,
          paddingBottom: 40,
          borderBottom: '1px solid rgba(232,223,200,0.2)',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div
              style={{
                width: 26,
                height: 26,
                background: '#4CAF50',
                borderRadius: '0 50% 50% 50%',
                transform: 'rotate(-45deg)',
              }}
            />
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 19,
                fontWeight: 700,
                color: '#fff',
              }}
            >
              AmbiSprout
            </span>
          </div>
          <div style={{ fontSize: 14, color: '#B9CDBE', lineHeight: 1.6 }}>
            India's AI-powered sustainability lifestyle platform.
          </div>
        </div>

        <LinkColumn title="Quick Links" links={quickLinks} />
        <LinkColumn title="Resources" links={resources} />

        <div>
          <div style={{ fontWeight: 700, color: '#fff', marginBottom: 14, fontSize: 14 }}>
            Stay in the loop
          </div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            <input
              placeholder="Your email"
              style={{
                flex: 1,
                minWidth: 0,
                padding: '10px 14px',
                borderRadius: 10,
                border: 'none',
                fontSize: 13,
                fontFamily: 'inherit',
              }}
            />
            <button
              style={{
                background: '#4CAF50',
                border: 'none',
                color: '#fff',
                padding: '10px 16px',
                borderRadius: 10,
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Join
            </button>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            {['In', 'X', 'Ig'].map((s) => (
              <div
                key={s}
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 13,
                }}
              >
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ textAlign: 'center', fontSize: 13, color: '#8fb8a4', paddingTop: 24 }}>
        © 2026 AmbiSprout. All rights reserved.
      </div>
    </div>
  );
}
