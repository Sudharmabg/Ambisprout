import { useCallback, useEffect, useRef, useState } from 'react';
import Section from './Section.jsx';
import Hoverable from './Hoverable.jsx';
import FeatureIcon from './FeatureIcon.jsx';
import sproutImg from '../assets/sprout_ai.jpeg';
import { aiScenarios } from '../data.js';

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/* Eased count-up number for the carbon card. */
function CountUp({ to, duration = 900 }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (prefersReducedMotion()) {
      setN(to);
      return;
    }
    let raf;
    const start = performance.now();
    const step = (t) => {
      const p = Math.min(1, (t - start) / duration);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);
  return <>{n}</>;
}

/* ---- Per-scenario result cards ---- */

function VoiceCard() {
  return (
    <div className="ai-card">
      <div className="ai-wave" aria-hidden="true">
        {Array.from({ length: 14 }).map((_, i) => (
          <span key={i} style={{ '--d': `${i * 0.08}s` }} />
        ))}
      </div>
      <div className="ai-card-note">Sprout is speaking…</div>
    </div>
  );
}

function CarbonCard() {
  return (
    <div className="ai-card">
      <div className="ai-carbon-headline">
        <span className="ai-carbon-num">
          <CountUp to={21} /> kg
        </span>
        <span className="ai-card-note">CO₂ saved / month</span>
      </div>
      <div className="ai-carbon-bars">
        <div className="ai-carbon-row">
          <span>Car</span>
          <div className="ai-carbon-track">
            <span className="ai-carbon-fill car" style={{ '--v': '92%' }} />
          </div>
          <b>62 kg</b>
        </div>
        <div className="ai-carbon-row">
          <span>Metro mix</span>
          <div className="ai-carbon-track">
            <span className="ai-carbon-fill metro" style={{ '--v': '58%' }} />
          </div>
          <b>41 kg</b>
        </div>
      </div>
    </div>
  );
}

function ReceiptCard({ items }) {
  return (
    <div className="ai-card">
      {items.map((it, i) => (
        <div key={it.name} className="ai-receipt-row" style={{ '--d': `${0.1 + i * 0.12}s` }}>
          <span className={`ai-receipt-dot ${it.good ? 'good' : 'warn'}`}>
            {it.good ? '✓' : '!'}
          </span>
          <span className="ai-receipt-name">{it.name}</span>
          <span className={`ai-receipt-note ${it.good ? 'good' : 'warn'}`}>{it.note}</span>
        </div>
      ))}
      <div className="ai-receipt-score">
        Eco score <b>72%</b>
      </div>
    </div>
  );
}

function VerifyCard() {
  return (
    <div className="ai-card">
      <div className="ai-verify-box">
        <div className="ai-verify-scan" aria-hidden="true" />
        <span className="ai-verify-mark">✓</span>
      </div>
      <div className="ai-verify-meta">
        <b>Mission verified!</b>
        <span>+20 Sprout Coins · 17-day streak</span>
      </div>
    </div>
  );
}

function ResultCard({ scenario }) {
  switch (scenario.card) {
    case 'voice':
      return <VoiceCard />;
    case 'carbon':
      return <CarbonCard />;
    case 'receipt':
      return <ReceiptCard items={scenario.receipt} />;
    case 'verify':
      return <VerifyCard />;
    default:
      return null;
  }
}

/* ---- Section ---- */

export default function AISection({ onOpenChat }) {
  const [active, setActive] = useState(0);
  const [started, setStarted] = useState(false);
  const [view, setView] = useState({ user: false, typing: false, aiText: '', card: false });
  const runIdRef = useRef(0);
  const panelRef = useRef(null);

  const scenario = aiScenarios[active];
  const streaming =
    view.aiText.length > 0 && view.aiText.length < scenario.reply.length;

  /* Scripted playback with cancellation (tab switches invalidate old runs). */
  const play = useCallback((idx) => {
    const id = ++runIdRef.current;
    const sc = aiScenarios[idx];
    const alive = () => runIdRef.current === id;
    setView({ user: false, typing: false, aiText: '', card: false });

    if (prefersReducedMotion()) {
      setView({ user: true, typing: false, aiText: sc.reply, card: true });
      return;
    }
    setTimeout(() => {
      if (!alive()) return;
      setView((v) => ({ ...v, user: true }));
      setTimeout(() => {
        if (!alive()) return;
        setView((v) => ({ ...v, typing: true }));
        setTimeout(() => {
          if (!alive()) return;
          setView((v) => ({ ...v, typing: false }));
          let i = 0;
          const timer = setInterval(() => {
            if (!alive()) {
              clearInterval(timer);
              return;
            }
            i += 2;
            setView((v) => ({ ...v, aiText: sc.reply.slice(0, i) }));
            if (i >= sc.reply.length) {
              clearInterval(timer);
              setTimeout(() => {
                if (alive()) setView((v) => ({ ...v, card: true }));
              }, 280);
            }
          }, 16);
        }, 950);
      }, 380);
    }, 200);
  }, []);

  /* Auto-start the first scenario when the panel scrolls into view. */
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStarted(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (started) play(active);
  }, [started, active, play]);

  /* Invalidate pending timers on unmount. */
  useEffect(() => () => { runIdRef.current += 1; }, []);

  return (
    <Section
      id="ai-section"
      className="as-section-responsive"
      outerStyle={{
        background:
          'radial-gradient(ellipse at 78% 12%, rgba(76,175,80,0.16), transparent 55%), linear-gradient(165deg, #16382a 0%, #1B4332 60%, #17332a 100%)',
        padding: '72px 56px 80px',
        color: '#fff',
      }}
    >
      <div
        className="as-grid-2 ai-grid"
        style={{
          maxWidth: 1300,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1.1fr',
          gap: 56,
          alignItems: 'center',
        }}
      >
        {/* Left — copy + scenario tabs */}
        <div>
          <div className="ai-eyebrow">
            <span className="ai-eyebrow-dot" /> LIVE DEMO
          </div>
          <h2
            className="ai-title"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 38,
              fontWeight: 700,
              margin: '0 0 14px',
            }}
          >
            Meet Sprout AI
          </h2>
          <p
            style={{
              color: '#B9CDBE',
              fontSize: 15,
              margin: '0 0 26px',
              lineHeight: 1.6,
              maxWidth: 420,
            }}
          >
            Your personal sustainability companion — pick a skill and watch Sprout work in
            real time.
          </p>

          <div className="ai-tabs" role="group" aria-label="Sprout AI demo scenarios">
            {aiScenarios.map((sc, i) => (
              <button
                key={sc.key}
                type="button"
                aria-pressed={i === active}
                className={`ai-tab${i === active ? ' active' : ''}`}
                onClick={() => {
                  setStarted(true);
                  setActive(i);
                }}
              >
                <span className="ai-tab-chip">
                  <FeatureIcon name={sc.icon} size={19} />
                </span>
                <span className="ai-tab-text">
                  <b>{sc.label}</b>
                  <small>{sc.hint}</small>
                </span>
              </button>
            ))}
          </div>

          <Hoverable
            as="button"
            onClick={onOpenChat}
            className="ai-cta"
            style={{
              marginTop: 28,
              background: '#4CAF50',
              color: '#fff',
              border: 'none',
              padding: '15px 30px',
              borderRadius: 999,
              fontSize: 15,
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'inherit',
              boxShadow: '0 12px 28px rgba(76,175,80,0.3)',
              transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
            }}
            hoverStyle={{ background: '#3d9c41', transform: 'translateY(-2px)' }}
          >
            Talk to Sprout →
          </Hoverable>
        </div>

        {/* Right — glass chat panel */}
        <div ref={panelRef} className="ai-panel" aria-label="Sprout AI demo conversation">
          <div className="ai-panel-head">
            <span className="ai-avatar-wrap">
              <img
                src={sproutImg}
                alt="Sprout AI mascot"
                className="ai-avatar"
                width="46"
                height="46"
                loading="lazy"
                decoding="async"
              />
              <span className="ai-online" />
            </span>
            <span className="ai-panel-name">
              <b>Sprout AI</b>
              <small>{view.typing || streaming ? 'typing…' : 'Online'}</small>
            </span>
          </div>

          <div className="ai-chat">
            {view.user && <div className="ai-bubble-user">{scenario.user}</div>}

            {view.typing && (
              <div className="ai-typing" aria-label="Sprout is typing">
                <span />
                <span />
                <span />
              </div>
            )}

            {view.aiText && (
              <div className="ai-bubble-ai">
                {view.aiText}
                {streaming && <span className="ai-caret" />}
              </div>
            )}

            {view.card && <ResultCard scenario={scenario} />}
          </div>
        </div>
      </div>
    </Section>
  );
}
