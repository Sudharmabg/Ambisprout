import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase.js';

export default function SubscribeModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Reset modal state when opened/closed
  useEffect(() => {
    if (isOpen) {
      setEmail('');
      setIsSubmitted(false);
      setError('');
    }
  }, [isOpen]);

  // Handle escape key to close
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const { error: insertError } = await supabase
        .from('waitlist')
        .insert([{ email }]);

      if (insertError) {
        if (insertError.code === '23505') {
          setError('This email is already registered on our waitlist!');
        } else if (insertError.message && insertError.message.includes('relation "waitlist" does not exist')) {
          setError('Database Setup Needed: The "waitlist" table does not exist in your Supabase database yet. Please run the SQL migration script.');
        } else {
          setError(`Submission error: ${insertError.message}`);
        }
      } else {
        setIsSubmitted(true);
      }
    } catch (err) {
      setError('Connection failed. Please check your network and try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(27, 67, 50, 0.75)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
        padding: '20px',
        boxSizing: 'border-box',
        animation: 'fadeIn 0.25s ease-out',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#FFFDF9',
          borderRadius: '24px',
          maxWidth: '500px',
          width: '100%',
          boxShadow: '0 24px 64px rgba(27,67,50,0.3)',
          border: '1px solid #E8DFC8',
          position: 'relative',
          padding: '40px 36px',
          boxSizing: 'border-box',
          textAlign: 'center',
          animation: 'scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
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
            background: 'none',
            border: 'none',
            fontSize: '18px',
            color: '#6B7280',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#1B4332')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#6B7280')}
        >
          ✕
        </button>

        {!isSubmitted ? (
          <>
            {/* Mascot / Icon Sprout */}
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: 'rgba(46,125,50,0.08)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px',
              }}
            >
              <span style={{ fontSize: '32px' }}>🌱</span>
            </div>

            {/* Content Details */}
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '26px',
                fontWeight: 700,
                color: '#1B4332',
                margin: '0 0 12px',
                lineHeight: 1.3,
              }}
            >
              We're Building Something Big!
            </h2>
            <p
              style={{
                color: '#4B5563',
                fontSize: '14.5px',
                lineHeight: 1.6,
                margin: '0 0 28px',
              }}
            >
              AmbiSprout is actively developing personalized carbon analytics, custom daily trackers, and gamified AI sustainability plans. Subscribe to our newsletter to receive monthly eco-hacks and get early beta access!
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <div style={{ position: 'relative', marginBottom: '16px' }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  placeholder="Enter your eco email..."
                  required
                  style={{
                    width: '100%',
                    padding: '14px 20px 14px 44px',
                    borderRadius: '12px',
                    border: error ? '1.5px solid #DC2626' : '1.5px solid #E8DFC8',
                    background: '#FFFDF9',
                    fontFamily: 'inherit',
                    fontSize: '14.5px',
                    color: '#2F3A3D',
                    boxSizing: 'border-box',
                    outline: 'none',
                    transition: 'border-color 0.2s ease',
                  }}
                  onFocus={(e) => {
                    if (!error) e.currentTarget.style.borderColor = '#2E7D32';
                  }}
                  onBlur={(e) => {
                    if (!error) e.currentTarget.style.borderColor = '#E8DFC8';
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    left: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: '16px',
                    color: '#9CA3AF',
                  }}
                >
                  ✉️
                </span>
              </div>

              {error && (
                <div
                  style={{
                    color: '#DC2626',
                    fontSize: '13px',
                    textAlign: 'left',
                    marginBottom: '16px',
                    fontWeight: 600,
                  }}
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                style={{
                  width: '100%',
                  background: isLoading ? '#6B7280' : '#2E7D32',
                  color: '#fff',
                  border: 'none',
                  padding: '14px 24px',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '15px',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  boxShadow: '0 6px 16px rgba(46,125,50,0.2)',
                  fontFamily: 'inherit',
                  transition: 'all 0.2s ease',
                  opacity: isLoading ? 0.75 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!isLoading) e.currentTarget.style.background = '#1B4332';
                }}
                onMouseLeave={(e) => {
                  if (!isLoading) e.currentTarget.style.background = '#2E7D32';
                }}
              >
                {isLoading ? 'Joining Waitlist...' : 'Join the Waitlist →'}
              </button>
            </form>
          </>
        ) : (
          <div
            style={{
              padding: '12px 0',
              animation: 'fadeIn 0.3s ease-out',
            }}
          >
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: '#E8F5E9',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px',
              }}
            >
              <span style={{ fontSize: '32px', color: '#2E7D32' }}>✨</span>
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '26px',
                fontWeight: 700,
                color: '#1B4332',
                margin: '0 0 12px',
              }}
            >
              You're on the List!
            </h2>
            <p
              style={{
                color: '#4B5563',
                fontSize: '15px',
                lineHeight: 1.6,
                margin: '0 0 28px',
              }}
            >
              Thank you for subscribing! We've saved <b>{email}</b> to our waitlist database and will notify you the moment early access slots open up.
            </p>
            <button
              onClick={onClose}
              style={{
                background: '#1B4332',
                color: '#fff',
                border: 'none',
                padding: '12px 32px',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '14.5px',
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#2E7D32')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#1B4332')}
            >
              Back to AmbiSprout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
