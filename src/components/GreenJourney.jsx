import { useEffect, useRef, useState } from 'react';
import logoImg from '../assets/logo_small.png';
import FeatureIcon from './FeatureIcon.jsx';
import { journeySteps } from '../data.js';

/* Kind-specific expanded content rendered inside each glass card. */
function StepDetail({ step }) {
  switch (step.kind) {
    case 'missions':
      return (
        <div className="aj-chips">
          {step.missions.map((m) => (
            <span key={m} className="aj-chip">
              {m}
            </span>
          ))}
        </div>
      );
    case 'verify':
      return (
        <div className="aj-verify">
          <div className="aj-verify-frame">
            <span className="aj-verify-check">✓</span>
            <span className="aj-spark aj-spark-1">✦</span>
            <span className="aj-spark aj-spark-2">✧</span>
            <span className="aj-spark aj-spark-3">✦</span>
          </div>
          <div className="aj-verify-label">AI verified · +20 Sprout Coins</div>
        </div>
      );
    case 'impact':
      return (
        <div className="aj-metrics">
          {step.metrics.map((m) => (
            <div key={m.label} className="aj-metric">
              <div className="aj-metric-top">
                <span>{m.label}</span>
                <b>{m.value}</b>
              </div>
              <div className="aj-bar">
                <span className="aj-bar-fill" style={{ '--v': `${m.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      );
    case 'community':
      return (
        <div className="aj-community">
          <div className="aj-avatars">
            {['#4CAF50', '#8D6E63', '#2b7bd6', '#E8A13A', '#7b61ff'].map((c, i) => (
              <span key={i} style={{ background: c }} />
            ))}
          </div>
          <div className="aj-hearts">
            <span className="aj-heart aj-heart-1" style={{ color: '#e2555a' }}>
              <FeatureIcon name="heart" size={15} />
            </span>
            <span className="aj-heart aj-heart-2" style={{ color: '#2E7D32' }}>
              <FeatureIcon name="heart" size={15} />
            </span>
            <span className="aj-heart aj-heart-3" style={{ color: '#e2555a' }}>
              <FeatureIcon name="heart" size={15} />
            </span>
          </div>
        </div>
      );
    default:
      return (
        <div className="aj-wave" aria-hidden="true" style={{ color: '#2E7D32' }}>
          <FeatureIcon name="bot" size={30} />
        </div>
      );
  }
}

export default function GreenJourney() {
  const timelineRef = useRef(null);
  const [grown, setGrown] = useState(false);
  const [openStep, setOpenStep] = useState(null); // mobile tap-to-expand

  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;
    if (
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setGrown(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setGrown(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="journey-section" data-id="green-journey" className="aj-section as-section-responsive">
      <div id="green-journey" style={{ position: 'relative', top: -80, visibility: 'hidden' }} />
      <div className="aj-head">
        <h2 className="aj-title">
          <span className="aj-title-leaf" aria-hidden="true">
            <FeatureIcon name="leaf" size={30} />
          </span>
          Your Green Journey
        </h2>
        <p className="aj-sub">
          Small actions grow into lifelong sustainable habits. Let Sprout guide every step
          of your journey.
        </p>
      </div>

      <div
        ref={timelineRef}
        className={`aj-timeline${grown ? ' grown' : ''}`}
      >
        <div className="aj-stem" aria-hidden="true">
          <span className="aj-stem-fill" />
        </div>

        {/* Seed / origin marker */}
        <div className="aj-seed" aria-hidden="true">
          <img
            src={logoImg}
            alt=""
            className="aj-seed-img"
            width="54"
            height="54"
            loading="lazy"
            decoding="async"
          />
        </div>

        {journeySteps.map((step, i) => (
          <div
            key={step.n}
            role="button"
            tabIndex={0}
            aria-expanded={openStep === step.n}
            aria-label={`Step ${step.n}: ${step.title}`}
            className={`aj-row ${i % 2 === 0 ? 'aj-left' : 'aj-right'}${
              openStep === step.n ? ' is-open' : ''
            }`}
            style={{ '--i': i }}
            onClick={() => setOpenStep((cur) => (cur === step.n ? null : step.n))}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setOpenStep((cur) => (cur === step.n ? null : step.n));
              }
            }}
          >
            <div className="aj-node" aria-hidden="true">
              <span className="aj-node-badge">
                <FeatureIcon name={step.icon} size={26} />
              </span>
            </div>

            <div className="aj-card-cell">
              <div className="aj-card">
                <div className="aj-card-head">
                  <span className="aj-step-no">Step {step.n}</span>
                  <h3 className="aj-card-title">{step.title}</h3>
                  <span className="aj-card-tag">{step.tagline}</span>
                </div>
                <div className="aj-detail">
                  <p className="aj-desc">{step.desc}</p>
                  <StepDetail step={step} />
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Full bloom marker */}
        <div className="aj-bloom" aria-hidden="true">
          <span className="aj-sun" />
          <span className="aj-bloom-leaf">
            <FeatureIcon name="sprout" size={46} />
          </span>
          <span className="aj-butterfly aj-butterfly-1">
            <FeatureIcon name="leaf" size={18} />
          </span>
          <span className="aj-butterfly aj-butterfly-2">
            <FeatureIcon name="leaf" size={16} />
          </span>
        </div>
      </div>
    </section>
  );
}
