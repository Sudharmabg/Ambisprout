import { useState, useEffect } from 'react';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Features from './components/Features.jsx';
import GreenJourney from './components/GreenJourney.jsx';
import Challenges from './components/Challenges.jsx';
import Community from './components/Community.jsx';
import AISection from './components/AISection.jsx';
import Trust from './components/Trust.jsx';
import FinalCTA from './components/FinalCTA.jsx';
import Footer from './components/Footer.jsx';
import ChatWidget from './components/ChatWidget.jsx';
import logoImg from './assets/logo.png';

export default function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [logoFullscreen, setLogoFullscreen] = useState(false);

  const openChat = () => setChatOpen(true);
  const closeChat = () => setChatOpen(false);
  const openLogoFullscreen = () => setLogoFullscreen(true);
  const closeLogoFullscreen = () => setLogoFullscreen(false);

  useEffect(() => {
    if (!logoFullscreen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeLogoFullscreen();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [logoFullscreen]);

  return (
    <div
      style={{
        fontFamily: "'Manrope', sans-serif",
        color: '#2F3A3D',
        background: '#F7F3E9',
        overflowX: 'hidden',
        minHeight: '100vh',
      }}
    >
      <Nav onLogoClick={openLogoFullscreen} />
      <main>
        <Hero onOpenChat={openChat} />
        <Features />
        <GreenJourney />
        <Challenges />
        <Community />
        <AISection onOpenChat={openChat} />
        <Trust />
        <FinalCTA />
      </main>
      <Footer onLogoClick={openLogoFullscreen} />
      <ChatWidget open={chatOpen} onOpen={openChat} onClose={closeChat} />

      {logoFullscreen && (
        <div
          onClick={closeLogoFullscreen}
          role="dialog"
          aria-modal="true"
          aria-label="AmbiSprout logo fullscreen view"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(27, 67, 50, 0.9)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            cursor: 'zoom-out',
            animation: 'fadeIn 0.3s ease-out',
          }}
        >
          <button
            onClick={closeLogoFullscreen}
            aria-label="Close fullscreen logo"
            style={{
              position: 'absolute',
              top: 24,
              right: 24,
              background: 'transparent',
              border: 'none',
              color: '#fff',
              fontSize: 32,
              cursor: 'pointer',
            }}
          >
            ✕
          </button>

          <img
            src={logoImg}
            alt="AmbiSprout Logo Fullscreen"
            style={{
              maxWidth: '90%',
              maxHeight: '80%',
              borderRadius: '24px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
              border: '4px solid #fff',
              animation: 'scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
