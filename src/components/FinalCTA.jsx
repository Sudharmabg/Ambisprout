import { useState, useEffect } from 'react';
import Section from './Section.jsx';
import Reveal from './Reveal.jsx';
import Hoverable from './Hoverable.jsx';
import FeatureIcon from './FeatureIcon.jsx';
import { getUser, onAuthChange } from '../lib/googleAuth.js';

const microPoints = ['100% free', 'AI-verified impact', 'Made for India'];

export default function FinalCTA({ onOpenSignIn, onOpenChat }) {
  const [user, setUser] = useState(() => getUser());

  useEffect(() => {
    return onAuthChange((nextUser) => {
      setUser(nextUser);
    });
  }, []);

  return (
    <Section
      animate={false}
      className="as-section-responsive"
      outerStyle={{ background: '#F7F3E9', padding: '48px 56px 80px' }}
    >
      <Reveal style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="as-cta-panel">
          {/* Ambient decoration */}
          <span className="as-cta-glow as-cta-glow-1" aria-hidden="true" />
          <span className="as-cta-glow as-cta-glow-2" aria-hidden="true" />
          <span className="as-cta-leaf as-cta-leaf-1" aria-hidden="true">
            <FeatureIcon name="sprout" size={34} />
          </span>
          <span className="as-cta-leaf as-cta-leaf-2" aria-hidden="true">
            <FeatureIcon name="leaf" size={26} />
          </span>
          <span className="as-cta-leaf as-cta-leaf-3" aria-hidden="true">
            <FeatureIcon name="leaf" size={20} />
          </span>

          <div className="as-cta-inner">
            <div className="as-cta-eyebrow">
              <span className="as-cta-eyebrow-icon">
                <FeatureIcon name="sprout" size={14} />
              </span>
              THE JOURNEY STARTS HERE
            </div>

            <h2 className="as-cta-title as-cta-heading">
              Every Big Change Starts
              <br />
              With a <em>Small Sprout.</em>
            </h2>

            <p className="as-cta-sub">
              Join the founding community, meet your AI companion, and turn everyday
              habits into verified impact — your first mission is waiting.
            </p>

            <div className="as-cta-buttons as-cta-actions">
              {user ? (
                <Hoverable
                  as="button"
                  onClick={onOpenChat}
                  style={{
                    background: '#4CAF50',
                    color: '#fff',
                    border: 'none',
                    padding: '17px 38px',
                    borderRadius: 999,
                    fontSize: 16,
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    boxShadow: '0 14px 32px rgba(76,175,80,0.35)',
                    transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                  }}
                  hoverStyle={{ background: '#3d9c41', transform: 'translateY(-3px)' }}
                >
                  Open Sprout Chat 🌱
                </Hoverable>
              ) : (
                <Hoverable
                  as="button"
                  onClick={onOpenSignIn}
                  style={{
                    background: '#4CAF50',
                    color: '#fff',
                    border: 'none',
                    padding: '17px 38px',
                    borderRadius: 999,
                    fontSize: 16,
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    boxShadow: '0 14px 32px rgba(76,175,80,0.35)',
                    transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                  }}
                  hoverStyle={{ background: '#3d9c41', transform: 'translateY(-3px)' }}
                >
                  Start Your Green Journey →
                </Hoverable>
              )}
              <Hoverable
                as="a"
                href="#community-section"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'transparent',
                  color: '#fff',
                  border: '1.5px solid rgba(255,255,255,0.4)',
                  padding: '17px 38px',
                  borderRadius: 999,
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  textDecoration: 'none',
                  transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                }}
                hoverStyle={{
                  background: 'rgba(255,255,255,0.1)',
                  borderColor: '#fff',
                  transform: 'translateY(-3px)',
                }}
              >
                Explore the Community
              </Hoverable>
            </div>

            <div className="as-cta-micro">
              {microPoints.map((m, i) => (
                <span key={m} className="as-cta-micro-item">
                  {i > 0 && <span className="as-cta-micro-dot" aria-hidden="true" />}
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
