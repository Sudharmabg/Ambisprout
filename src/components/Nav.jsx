import Hoverable from './Hoverable.jsx';

const links = [
  { label: 'Home', href: '#' },
  { label: 'Community', href: '#community-section' },
  { label: 'Challenges', href: '#challenges-section' },
  { label: 'Learn', href: '#' },
  { label: 'ESG Brands', href: '#brands-section' },
  { label: 'About', href: '#' },
];

export default function Nav() {
  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(247,243,233,0.9)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #E8DFC8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 56px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div
          style={{
            width: 30,
            height: 30,
            background: '#2E7D32',
            borderRadius: '0 50% 50% 50%',
            transform: 'rotate(-45deg)',
            animation: 'leafSway 4s ease-in-out infinite',
          }}
        />
        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 22,
            fontWeight: 700,
            color: '#1B4332',
          }}
        >
          AmbiSprout
        </span>
      </div>

      <div className="as-nav-links" style={{ display: 'flex', gap: 32 }}>
        {links.map((l) => (
          <Hoverable
            key={l.label}
            as="a"
            href={l.href}
            style={{
              color: '#1B4332',
              fontWeight: 600,
              fontSize: 15,
              textDecoration: 'none',
            }}
            hoverStyle={{ color: '#2E7D32' }}
          >
            {l.label}
          </Hoverable>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Hoverable
          as="button"
          style={{
            background: 'transparent',
            border: '1.5px solid #2E7D32',
            color: '#2E7D32',
            padding: '9px 22px',
            borderRadius: 999,
            fontWeight: 600,
            fontSize: 14,
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
          hoverStyle={{ background: '#2E7D32', color: '#fff' }}
        >
          Login
        </Hoverable>
        <Hoverable
          as="button"
          style={{
            background: '#2E7D32',
            border: 'none',
            color: '#fff',
            padding: '10px 24px',
            borderRadius: 999,
            fontWeight: 600,
            fontSize: 14,
            cursor: 'pointer',
            fontFamily: 'inherit',
            boxShadow: '0 6px 16px rgba(46,125,50,0.28)',
          }}
          hoverStyle={{ background: '#1B4332' }}
        >
          Start Your Journey
        </Hoverable>
      </div>
    </div>
  );
}
