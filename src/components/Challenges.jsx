import { useState, useEffect } from 'react';
import Section from './Section.jsx';
import Reveal from './Reveal.jsx';
import { challengesData } from '../data.js';

const illustrations = [
  // Plastic-Free — reusable bag & bottle
  <svg viewBox="0 0 300 150" style={{ width: '100%', height: 140, display: 'block' }}>
    <rect width="300" height="150" fill="#F7F3E9" />
    <circle cx="235" cy="35" r="26" fill="#E8DFC8" />
    <rect x="95" y="45" width="70" height="80" rx="10" fill="#4CAF50" />
    <rect x="118" y="30" width="24" height="24" rx="8" fill="none" stroke="#2E7D32" strokeWidth="6" />
    <rect x="108" y="60" width="50" height="8" rx="4" fill="#F7F3E9" />
    <rect x="180" y="70" width="26" height="55" rx="13" fill="#2E7D32" />
    <rect x="188" y="55" width="10" height="18" rx="4" fill="#2E7D32" />
    <rect x="60" y="95" width="55" height="30" rx="8" fill="#8D6E63" />
    <rect x="60" y="90" width="55" height="10" rx="4" fill="#6B5248" />
  </svg>,
  // Delhi Metro — train
  <svg viewBox="0 0 300 150" style={{ width: '100%', height: 140, display: 'block' }}>
    <rect width="300" height="150" fill="#F7F3E9" />
    <rect x="40" y="45" width="220" height="70" rx="14" fill="#2E7D32" />
    <rect x="55" y="58" width="34" height="30" rx="4" fill="#F7F3E9" />
    <rect x="98" y="58" width="34" height="30" rx="4" fill="#F7F3E9" />
    <rect x="141" y="58" width="34" height="30" rx="4" fill="#F7F3E9" />
    <rect x="184" y="58" width="34" height="30" rx="4" fill="#F7F3E9" />
    <circle cx="72" cy="73" r="8" fill="#8D6E63" />
    <circle cx="158" cy="73" r="8" fill="#4CAF50" />
    <rect x="80" y="115" width="18" height="14" rx="4" fill="#1B4332" />
    <rect x="200" y="115" width="18" height="14" rx="4" fill="#1B4332" />
  </svg>,
  // Mumbai Beach — waves & bin
  <svg viewBox="0 0 300 150" style={{ width: '100%', height: 140, display: 'block' }}>
    <rect width="300" height="150" fill="#F7F3E9" />
    <circle cx="245" cy="30" r="20" fill="#E8DFC8" />
    <path d="M0,95 Q75,70 150,95 T300,95 V150 H0 Z" fill="#4CAF50" />
    <path d="M0,110 Q75,88 150,110 T300,110 V150 H0 Z" fill="#2E7D32" />
    <rect x="60" y="70" width="40" height="34" rx="8" fill="#8D6E63" />
    <rect x="68" y="60" width="24" height="14" rx="4" fill="#6B5248" />
  </svg>,
  // Pune Cycling — bicycle
  <svg viewBox="0 0 300 150" style={{ width: '100%', height: 140, display: 'block' }}>
    <rect width="300" height="150" fill="#F7F3E9" />
    <circle cx="100" cy="110" r="26" fill="none" stroke="#1B4332" strokeWidth="7" />
    <circle cx="200" cy="110" r="26" fill="none" stroke="#1B4332" strokeWidth="7" />
    <path d="M100,110 L140,60 L180,60" fill="none" stroke="#2E7D32" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M140,60 L120,110" fill="none" stroke="#2E7D32" strokeWidth="7" strokeLinecap="round" />
    <path d="M180,60 L200,110" fill="none" stroke="#2E7D32" strokeWidth="7" strokeLinecap="round" />
    <circle cx="140" cy="55" r="10" fill="#8D6E63" />
  </svg>,
  // Chennai Trees — sapling in pot
  <svg viewBox="0 0 300 150" style={{ width: '100%', height: 140, display: 'block' }}>
    <rect width="300" height="150" fill="#F7F3E9" />
    <circle cx="70" cy="30" r="18" fill="#E8DFC8" />
    <path d="M150,130 C150,90 130,70 150,45 C170,70 150,90 150,130 Z" fill="#4CAF50" />
    <path d="M150,90 C150,80 130,75 125,65" fill="none" stroke="#2E7D32" strokeWidth="6" strokeLinecap="round" />
    <path d="M150,100 C150,90 170,85 178,75" fill="none" stroke="#2E7D32" strokeWidth="6" strokeLinecap="round" />
    <rect x="110" y="125" width="80" height="14" rx="7" fill="#8D6E63" />
    <path d="M95,125 C95,110 120,100 130,110" fill="none" stroke="#8D6E63" strokeWidth="10" strokeLinecap="round" />
    <path d="M205,125 C205,110 180,100 170,110" fill="none" stroke="#8D6E63" strokeWidth="10" strokeLinecap="round" />
  </svg>,
];

function ChallengeCard({ challenge, illustration }) {
  const [joined, setJoined] = useState(false);
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 22,
        overflow: 'hidden',
        boxShadow: '0 8px 24px rgba(27,67,50,0.06)',
      }}
    >
      {illustration}
      <div style={{ padding: 22 }}>
        <div style={{ fontWeight: 700, color: '#1B4332', fontSize: 18, marginBottom: 10 }}>
          {challenge.title}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 13,
            color: '#6B7280',
            marginBottom: 10,
          }}
        >
          <span>👥 {challenge.participants}</span>
          <span>⏳ {challenge.days} days left</span>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 13,
            marginBottom: 16,
          }}
        >
          <span style={{ color: '#8D6E63', fontWeight: 600 }}>
            Difficulty: {challenge.difficulty}
          </span>
          <span style={{ color: '#2E7D32', fontWeight: 700 }}>🪙 {challenge.reward} Coins</span>
        </div>
        <button
          onClick={() => setJoined((v) => !v)}
          style={{
            width: '100%',
            background: joined ? '#4CAF50' : '#2E7D32',
            color: '#fff',
            border: 'none',
            padding: 11,
            borderRadius: 12,
            fontWeight: 700,
            fontSize: 14,
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          {joined ? '✓ Joined' : 'Join Challenge'}
        </button>
      </div>
    </div>
  );
}

export default function Challenges() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth <= 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Correct index if out of bounds on resize
  useEffect(() => {
    const maxIndex = challengesData.length - itemsPerPage;
    if (currentIndex > maxIndex) {
      setCurrentIndex(Math.max(0, maxIndex));
    }
  }, [itemsPerPage, currentIndex]);

  const maxIndex = challengesData.length - itemsPerPage;

  const nextSlide = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Touch handlers for swipe
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  // Generate pagination dots (only if we have more items than can fit on one page)
  const showDots = maxIndex > 0;
  const dotsCount = maxIndex + 1;

  return (
    <Section
      id="challenges-section"
      animate={false}
      className="as-section-responsive"
      outerStyle={{ maxWidth: 1300, margin: '0 auto', padding: '56px 56px 32px' }}
    >
      <Reveal
        as="h2"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 38,
          color: '#1B4332',
          fontWeight: 700,
          margin: '0 0 32px',
          textAlign: 'center',
        }}
      >
        Active Challenges
      </Reveal>

      <div className="as-carousel-wrapper">
        <div 
          className="as-carousel-viewport"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="as-carousel-track"
            style={{
              transform: `translateX(calc(-${currentIndex} * (100% + 24px) / ${itemsPerPage}))`,
            }}
          >
            {challengesData.map((c, i) => (
              <div
                key={c.id}
                className="as-carousel-card-wrapper"
                style={{
                  width: `calc((100% - ${itemsPerPage - 1} * 24px) / ${itemsPerPage})`,
                }}
              >
                <Reveal delay={i * 0.08}>
                  <ChallengeCard challenge={c} illustration={illustrations[i]} />
                </Reveal>
              </div>
            ))}
          </div>
        </div>

        {/* Prev Button */}
        <button
          className="as-carousel-btn prev-btn"
          onClick={prevSlide}
          disabled={currentIndex === 0}
          aria-label="Previous challenge"
        >
          <svg viewBox="0 0 24 24">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Next Button */}
        <button
          className="as-carousel-btn next-btn"
          onClick={nextSlide}
          disabled={currentIndex === maxIndex}
          aria-label="Next challenge"
        >
          <svg viewBox="0 0 24 24">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Pagination Dots */}
      {showDots && (
        <div className="as-carousel-dots">
          {Array.from({ length: dotsCount }).map((_, i) => (
            <button
              key={i}
              className={`as-carousel-dot ${currentIndex === i ? 'active' : ''}`}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </Section>
  );
}
