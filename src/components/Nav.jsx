import { useState } from 'react';
import logoImg from '../assets/logo_small.png';
import Hoverable from './Hoverable.jsx';

const links = [
  { label: 'Home', href: '#', view: 'home' },
  { label: 'Community', href: '#community-section', view: 'home' },
  { label: 'Challenges', href: '#challenges-section', view: 'home' },
  { label: 'Green Pulse', href: '#eco-pulse', view: 'eco-pulse' },
  { label: 'Blogs', href: '#blogs-section', view: 'home' },
];

export default function Nav({ onLogoClick, onOpenChat, currentView, onNavigate }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLinkClick = (e, link) => {
    if (link.view === 'eco-pulse') {
      e.preventDefault();
      window.location.hash = '#eco-pulse';
      if (onNavigate) onNavigate('eco-pulse');
    } else if (currentView === 'eco-pulse' && link.view === 'home') {
      if (onNavigate) onNavigate('home');
    }
  };

  return (
    <>
      <div
        className="as-navbar"
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
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img
            src={logoImg}
            alt="AmbiSprout Logo"
            onClick={onLogoClick}
            style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid #2E7D32',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 22,
              fontWeight: 700,
              color: '#1B4332',
              flexShrink: 0,
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
              onClick={(e) => handleLinkClick(e, l)}
              style={{
                color: l.view === currentView ? '#2E7D32' : '#1B4332',
                fontWeight: l.view === currentView ? 700 : 600,
                fontSize: 15,
                textDecoration: 'none',
              }}
              hoverStyle={{ color: '#2E7D32' }}
            >
              {l.label}
            </Hoverable>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <div className="as-nav-desktop-button">
            <Hoverable
              as="a"
              href="#journey-section"
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
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              hoverStyle={{ background: '#1B4332' }}
            >
              Start Your Green Journey
            </Hoverable>
          </div>

          <button
            className="as-hamburger"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: 28,
              color: '#1B4332',
              cursor: 'pointer',
              display: 'none',
              padding: '4px 8px',
              fontFamily: 'inherit',
            }}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <div
        className={`as-mobile-drawer-overlay ${drawerOpen ? 'open' : ''}`}
        onClick={() => setDrawerOpen(false)}
      />

      {/* Mobile Drawer */}
      <div className={`as-mobile-drawer ${drawerOpen ? 'open' : ''}`}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <img
              src={logoImg}
              alt="AmbiSprout Logo"
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid #2E7D32',
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 18,
                fontWeight: 700,
                color: '#1B4332',
                flexShrink: 0,
              }}
            >
              AmbiSprout
            </span>
          </div>
          <button
            onClick={() => setDrawerOpen(false)}
            aria-label="Close menu"
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: 22,
              color: '#1B4332',
              cursor: 'pointer',
              padding: 4,
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, flex: 1 }}>
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={(e) => {
                setDrawerOpen(false);
                handleLinkClick(e, l);
              }}
              style={{
                color: l.view === currentView ? '#2E7D32' : '#1B4332',
                fontWeight: l.view === currentView ? 700 : 600,
                fontSize: 16,
                textDecoration: 'none',
                padding: '8px 0',
                borderBottom: '1px solid rgba(232,223,200,0.4)',
                display: 'block',
              }}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div style={{ marginTop: 'auto', paddingTop: 20 }}>
          <a
            href="#journey-section"
            style={{
              width: '100%',
              background: '#2E7D32',
              border: 'none',
              color: '#fff',
              padding: '14px 24px',
              borderRadius: 14,
              fontWeight: 700,
              fontSize: 15,
              cursor: 'pointer',
              fontFamily: 'inherit',
              boxShadow: '0 6px 16px rgba(46,125,50,0.28)',
              textDecoration: 'none',
              display: 'block',
              textAlign: 'center',
              boxSizing: 'border-box',
            }}
            onClick={() => setDrawerOpen(false)}
          >
            Start Your Green Journey
          </a>
        </div>
      </div>
    </>
  );
}

