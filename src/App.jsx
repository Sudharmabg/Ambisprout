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
import SignInModal from './components/SignInModal.jsx';
import logoImg from './assets/logo.png';
import sproutImg from './assets/sprout_ai.jpeg';
import logoSmall from './assets/logo_small.png';

export default function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [logoFullscreen, setLogoFullscreen] = useState(false);
  const [showFloatingChat, setShowFloatingChat] = useState(false);

  const openChat = () => setChatOpen(true);
  const closeChat = () => setChatOpen(false);
  const openSignIn = () => setSignInOpen(true);
  const closeSignIn = () => setSignInOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowFloatingChat(true);
      } else {
        setShowFloatingChat(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
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
      <Nav onLogoClick={openLogoFullscreen} onOpenChat={openChat} onOpenSignIn={openSignIn} />
      <main>
        <Hero onOpenChat={openChat} onOpenSignIn={openSignIn} />
        <Features />
        <GreenJourney />
        <Challenges />
        <Community />
        <AISection onOpenChat={openChat} />
        <Trust />
        <FinalCTA onOpenChat={openChat} onOpenSignIn={openSignIn} />
      </main>
      <Footer onLogoClick={openLogoFullscreen} />
      <ChatWidget open={chatOpen} onClose={closeChat} />
      <SignInModal open={signInOpen} onClose={closeSignIn} />

      {!chatOpen && showFloatingChat && (
        <>
          <style>{`
            @keyframes pulseGreen {
              0% {
                box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.7);
              }
              70% {
                box-shadow: 0 0 0 8px rgba(76, 175, 80, 0);
              }
              100% {
                box-shadow: 0 0 0 0 rgba(76, 175, 80, 0);
              }
            }
            .pulse-online-badge {
              animation: pulseGreen 2s infinite;
            }
          `}</style>
          <button
            onClick={openChat}
            aria-label="Open Sprout AI Chat"
            style={{
              position: 'fixed',
              bottom: 32,
              right: 32,
              width: 60,
              height: 60,
              borderRadius: '50%',
              background: '#fff',
              border: '3px solid #E8DFC8',
              boxShadow: '0 12px 36px rgba(27,67,50,0.22)',
              cursor: 'pointer',
              zIndex: 90,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
              overflow: 'visible',
              transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1) translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 16px 44px rgba(27,67,50,0.3)';
              e.currentTarget.style.borderColor = '#2E7D32';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '0 12px 36px rgba(27,67,50,0.22)';
              e.currentTarget.style.borderColor = '#E8DFC8';
            }}
          >
            <img
              src={sproutImg}
              alt="Sprout AI"
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                objectFit: 'contain',
              }}
            />
            <span
              className="pulse-online-badge"
              style={{
                position: 'absolute',
                top: 2,
                right: 2,
                width: 14,
                height: 14,
                borderRadius: '50%',
                background: '#4CAF50',
                border: '2.5px solid #fff',
              }}
            />
          </button>
        </>
      )}

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
