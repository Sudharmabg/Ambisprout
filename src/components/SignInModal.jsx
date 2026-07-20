import { useEffect, useRef } from 'react';
import { isAuthConfigured, renderSignInButton, onAuthChange } from '../lib/googleAuth.js';
import logoImg from '../assets/logo_small.png';

export default function SignInModal({ open, onClose }) {
  const signInRef = useRef(null);

  useEffect(() => {
    if (open && signInRef.current && isAuthConfigured()) {
      renderSignInButton(signInRef.current).catch(() => {});
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    return onAuthChange((user) => {
      if (user) {
        onClose();
        window.location.hash = '#/dashboard';
      }
    });
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(27, 67, 50, 0.65)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        animation: 'fadeIn 0.25s ease-out',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Google Sign In"
        style={{
          background: '#F7F3E9',
          border: '1px solid #E8DFC8',
          borderRadius: 24,
          padding: '40px 32px',
          width: '90%',
          maxWidth: 420,
          boxShadow: '0 24px 64px rgba(27, 67, 50, 0.2)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          animation: 'scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            background: 'transparent',
            border: 'none',
            color: '#1B4332',
            fontSize: 20,
            cursor: 'pointer',
            padding: 4,
            opacity: 0.7,
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => (e.target.style.opacity = '1')}
          onMouseLeave={(e) => (e.target.style.opacity = '0.7')}
        >
          ✕
        </button>

        {/* Logo */}
        <img
          src={logoImg}
          alt="AmbiSprout Logo"
          style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            border: '3px solid #2E7D32',
            marginBottom: 24,
          }}
        />

        {/* Header */}
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 28,
            color: '#1B4332',
            fontWeight: 700,
            margin: '0 0 12px 0',
          }}
        >
          Start Your Green Journey
        </h2>
        <p
          style={{
            fontSize: 14,
            color: '#6B7280',
            lineHeight: 1.6,
            margin: '0 0 28px 0',
            maxWidth: 320,
          }}
        >
          Sign in with Google to get 25 daily AI answers, earn Sprout Coins, track your eco-streak, and join India's founding green community.
        </p>

        {/* Google button */}
        {isAuthConfigured() ? (
          <div ref={signInRef} style={{ minHeight: 40, display: 'flex', justifyContent: 'center' }} />
        ) : (
          <div style={{ color: '#D32F2F', fontSize: 13, background: 'rgba(211, 47, 47, 0.08)', padding: '10px 16px', borderRadius: 12 }}>
            Google Sign-In is not configured yet.<br />Please set VITE_GOOGLE_CLIENT_ID in .env.
          </div>
        )}
      </div>
    </div>
  );
}
