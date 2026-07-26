import { useState, useEffect } from 'react';
import { blogsData } from '../data/blogsData.js';
import logoImg from '../assets/logo.png';

export default function BlogPage({ blog, onClose, onStartJourney }) {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll to top when blog changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [blog]);

  // Handle escape key to go back
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Track page-level scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!blog) return null;

  const toggleFaq = (idx) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <div
      style={{
        background: '#FAF8F3', // Warm cream background matching the blog template
        minHeight: '100vh',
        color: '#2F3A3D',
        fontFamily: "'Manrope', sans-serif",
      }}
    >
      {/* Scroll Progress Bar at the very top of the window */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: `${scrollProgress}%`,
          height: '4px',
          background: '#4CAF50',
          zIndex: 1200,
          transition: 'width 0.1s ease',
        }}
      />

      {/* Back button header area */}
      <div
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '24px 24px 12px',
        }}
      >
        <button
          onClick={onClose}
          style={{
            background: '#1B4332',
            border: 'none',
            color: '#fff',
            fontSize: '14px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 22px',
            borderRadius: '999px',
            boxShadow: '0 4px 12px rgba(27,67,50,0.15)',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            fontFamily: 'inherit',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#2E7D32';
            e.currentTarget.style.transform = 'translateX(-4px)';
            e.currentTarget.style.boxShadow = '0 6px 18px rgba(46,125,50,0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#1B4332';
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(27,67,50,0.15)';
          }}
        >
          ← Back to Blogs
        </button>
      </div>

      {/* Blog Article Main Container */}
      <article
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '0 24px 80px',
        }}
      >
        {/* Responsive Hero Image Header */}
        {(() => {
          const isAmbiSproutBlog = blog.slug === 'what-is-ambisprout-building-sustainable-habits-with-ai';
          if (isAmbiSproutBlog) {
            return (
              <div
                className="as-hero-flex"
                style={{
                  position: 'relative',
                  width: '100%',
                  borderRadius: '24px',
                  boxShadow: '0 12px 32px rgba(27,67,50,0.12)',
                  border: '1px solid #E8DFC8',
                  marginBottom: '36px',
                  background: 'linear-gradient(135deg, #1B4332 0%, #123024 100%)',
                  boxSizing: 'border-box',
                  padding: '44px 48px',
                }}
              >
                {/* Left Side: Text Details */}
                <div style={{ flex: 1, color: '#fff', zIndex: 3 }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', marginBottom: 16 }}>
                    <span
                      style={{
                        background: '#2E7D32',
                        color: '#fff',
                        padding: '4px 14px',
                        borderRadius: 999,
                        fontSize: '11px',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                      }}
                    >
                      {blog.category}
                    </span>
                    <span style={{ fontSize: '13px', opacity: 0.9, fontWeight: 500 }}>• By {blog.author}</span>
                    <span style={{ fontSize: '13px', opacity: 0.9, fontWeight: 500 }}>• {blog.readTime}</span>
                  </div>
                  <h1
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 'clamp(24px, 3.8vw, 38px)',
                      fontWeight: 700,
                      margin: 0,
                      lineHeight: 1.25,
                      color: '#fff',
                    }}
                  >
                    {blog.title}
                  </h1>
                </div>

                {/* Right Side: Dummy Brand Image & Tagline */}
                <div
                  className="as-hero-logo-container"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 3,
                    gap: '12px',
                  }}
                >
                  <img
                    src={logoImg}
                    alt="AmbiSprout Logo"
                    style={{
                      width: 'clamp(110px, 14vw, 150px)',
                      height: 'clamp(110px, 14vw, 150px)',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '4px solid #4CAF50',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                    }}
                  />
                  <div style={{ textAlign: 'center' }}>
                    <div
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: '20px',
                        fontWeight: 700,
                        color: '#fff',
                        marginBottom: '4px',
                      }}
                    >
                      AmbiSprout
                    </div>
                    <div
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#4CAF50',
                        letterSpacing: '0.5px',
                      }}
                    >
                      Small Action Big Impact
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          // Default Layout for other articles (photo cover headers)
          return (
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16/9.5',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 12px 32px rgba(27,67,50,0.12)',
                border: '1px solid #E8DFC8',
                marginBottom: '36px',
                background: '#1B4332',
              }}
            >
              <img
                src={blog.imageUrl}
                alt={blog.title}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  zIndex: 1,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(180deg, rgba(27,67,50,0.1) 0%, rgba(27,67,50,0.85) 100%)',
                  pointerEvents: 'none',
                  zIndex: 2,
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  bottom: 'clamp(20px, 5%, 36px)',
                  left: 'clamp(20px, 5%, 36px)',
                  right: 'clamp(20px, 5%, 36px)',
                  color: '#fff',
                  zIndex: 3,
                  textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                }}
              >
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', marginBottom: 12 }}>
                  <span
                    style={{
                      background: '#2E7D32',
                      color: '#fff',
                      padding: '4px 14px',
                      borderRadius: 999,
                      fontSize: '11px',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                    }}
                  >
                    {blog.category}
                  </span>
                  <span style={{ fontSize: '13px', opacity: 0.9, fontWeight: 500 }}>• By {blog.author}</span>
                  <span style={{ fontSize: '13px', opacity: 0.9, fontWeight: 500 }}>• {blog.readTime}</span>
                </div>
                <h1
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(22px, 4vw, 36px)',
                    fontWeight: 700,
                    margin: 0,
                    lineHeight: 1.25,
                    color: '#fff',
                  }}
                >
                  {blog.title}
                </h1>
              </div>
            </div>
          );
        })()}

        {/* Content Wrapper (constrained reading width) */}
        <div
          style={{
            maxWidth: '760px',
            margin: '0 auto',
          }}
        >
          {/* AI Executive Key Takeaways Box */}
          <div
            style={{
              background: 'linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)',
              color: '#fff',
              borderRadius: '20px',
              padding: '24px 28px',
              marginBottom: 36,
              boxShadow: '0 8px 24px rgba(27,67,50,0.15)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <span style={{ fontSize: 20 }}>🤖</span>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '19px', margin: 0, color: '#A3E635', fontWeight: 700 }}>
                Sprout AI Key Takeaways
              </h3>
            </div>
            <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.6, fontSize: '15px' }}>
              {blog.aiTakeaways.map((item, idx) => (
                <li key={idx} style={{ marginBottom: 8, color: '#E8F5E9' }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Intro Paragraph */}
          <p
            style={{
              color: '#2F3A3D',
              lineHeight: 1.8,
              fontSize: '16.5px',
              margin: '0 0 32px',
              whiteSpace: 'pre-line',
            }}
          >
            {blog.content.intro}
          </p>

          {/* Render Sections */}
          {blog.content.sections.map((sec, idx) => (
            <div key={idx} style={{ marginBottom: 36 }}>
              {sec.heading && (
                <h2
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(20px, 3.5vw, 24px)',
                    color: '#1B4332',
                    margin: '0 0 16px',
                    fontWeight: 700,
                  }}
                >
                  {sec.heading}
                </h2>
              )}

              {sec.body && (
                <p
                  style={{
                    color: '#2F3A3D',
                    lineHeight: 1.75,
                    fontSize: '15.5px',
                    margin: '0 0 20px',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {sec.body}
                </p>
              )}

              {sec.imageUrl && (
                <div
                  style={{
                    margin: '28px auto',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: '1px solid #E8DFC8',
                    boxShadow: '0 8px 24px rgba(27,67,50,0.06)',
                    maxWidth: '100%',
                    width: '560px',
                  }}
                >
                  <img
                    src={sec.imageUrl}
                    alt={sec.heading || 'Section illustration'}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                </div>
              )}

              {/* Bullet points style */}
              {sec.bullets && (
                <ul
                  style={{
                    background: '#FAF7F0',
                    border: '1px solid #E8DFC8',
                    borderRadius: '16px',
                    padding: '20px 24px 20px 40px',
                    margin: '20px 0',
                    color: '#2F3A3D',
                    lineHeight: 1.75,
                    fontSize: '15px',
                  }}
                >
                  {sec.bullets.map((b, i) => (
                    <li key={i} style={{ marginBottom: 8 }}>
                      {b}
                    </li>
                  ))}
                </ul>
              )}

              {/* Numbered list items */}
              {sec.list && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, margin: '20px 0' }}>
                  {sec.list.map((item, i) => (
                    <div
                      key={i}
                      style={{
                        background: '#FAF7F0',
                        border: '1px solid #E8DFC8',
                        borderRadius: '14px',
                        padding: '16px 20px',
                      }}
                    >
                      <b style={{ color: '#1B4332', fontSize: '15.5px', display: 'block', marginBottom: 4 }}>
                        {item.title}
                      </b>
                      <span style={{ color: '#4B5563', fontSize: '14.5px', lineHeight: 1.6 }}>{item.desc}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Myths vs Reality cards */}
              {sec.myths && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, margin: '20px 0' }}>
                  {sec.myths.map((m, i) => (
                    <div
                      key={i}
                      style={{
                        background: '#FFF8EC',
                        border: '1.5px dashed #E8DFC8',
                        borderRadius: '16px',
                        padding: '16px 20px',
                      }}
                    >
                      <div style={{ color: '#C62828', fontWeight: 700, fontSize: '14.5px', marginBottom: 6 }}>
                        ❌ Myth: {m.myth}
                      </div>
                      <div style={{ color: '#2E7D32', fontWeight: 600, fontSize: '14.5px', lineHeight: 1.5 }}>
                        ✓ Reality: {m.reality}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Grouped 30 Habits categories */}
              {sec.groupedHabits && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20, margin: '20px 0' }}>
                  {sec.groupedHabits.map((group, gIdx) => (
                    <div
                      key={gIdx}
                      style={{
                        background: '#FAF7F0',
                        border: '1px solid #E8DFC8',
                        borderRadius: '18px',
                        padding: '20px 24px',
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: '18px',
                          color: '#1B4332',
                          margin: '0 0 12px',
                          fontWeight: 700,
                        }}
                      >
                        {group.categoryName}
                      </h3>
                      <ul style={{ margin: 0, paddingLeft: 20, color: '#2F3A3D', lineHeight: 1.7, fontSize: '14.5px' }}>
                        {group.items.map((hItem, hIdx) => (
                          <li key={hIdx} style={{ marginBottom: 6 }}>
                            {hItem}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* FAQ Accordion Section */}
          {blog.content.faqs && (
            <div style={{ marginTop: 44, borderTop: '1px solid #E8DFC8', paddingTop: 32 }}>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '22px',
                  color: '#1B4332',
                  margin: '0 0 18px',
                  fontWeight: 700,
                }}
              >
                Frequently Asked Questions
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {blog.content.faqs.map((faq, fIdx) => {
                  const isOpen = openFaqIndex === fIdx;
                  return (
                    <div
                      key={fIdx}
                      style={{
                        border: '1px solid #E8DFC8',
                        borderRadius: '14px',
                        overflow: 'hidden',
                        background: '#FAF7F0',
                      }}
                    >
                      <button
                        onClick={() => toggleFaq(fIdx)}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          background: 'transparent',
                          border: 'none',
                          padding: '16px 20px',
                          fontSize: '15px',
                          fontWeight: 700,
                          color: '#1B4332',
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          fontFamily: 'inherit',
                        }}
                      >
                        <span>{faq.q}</span>
                        <span style={{ fontSize: '18px', color: '#2E7D32' }}>{isOpen ? '−' : '+'}</span>
                      </button>
                      {isOpen && (
                        <div
                          style={{
                            padding: '0 20px 16px',
                            color: '#4B5563',
                            fontSize: '14.5px',
                            lineHeight: 1.6,
                            borderTop: '1px solid rgba(232, 223, 200, 0.5)',
                            paddingTop: 12,
                          }}
                        >
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Bottom CTA Banner */}
          <div
            style={{
              marginTop: 48,
              background: 'linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)',
              color: '#fff',
              borderRadius: '20px',
              padding: '32px 28px',
              textAlign: 'center',
            }}
          >
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', margin: '0 0 8px', color: '#fff', fontWeight: 700 }}>
              Ready to Turn Insights into Action?
            </h3>
            <p style={{ color: '#B9CDBE', fontSize: '14.5px', margin: '0 0 24px', maxWidth: '480px', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.6 }}>
              Join AmbiSprout to track your daily green habits, complete AI missions, and see your environmental impact grow.
            </p>
            <button
              onClick={() => {
                onClose();
                if (onStartJourney) onStartJourney();
              }}
              style={{
                background: '#4CAF50',
                color: '#fff',
                border: 'none',
                padding: '12px 28px',
                borderRadius: 999,
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(76,175,80,0.3)',
                fontFamily: 'inherit',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#43A047';
                e.currentTarget.style.transform = 'scale(1.03)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#4CAF50';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Start Your Green Journey →
            </button>
          </div>
        </div>

        {/* Related Blogs / More from the Journal */}
        <div
          style={{
            borderTop: '1px solid #E8DFC8',
            paddingTop: '48px',
            marginTop: '64px',
            width: '100%',
          }}
        >
          <h3
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '24px',
              color: '#1B4332',
              marginBottom: '28px',
              fontWeight: 700,
            }}
          >
            More from the Journal
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '28px',
            }}
          >
            {blogsData
              .filter((b) => b.slug !== blog.slug)
              .map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                     window.location.hash = `#blog/${item.slug}`;
                  }}
                  style={{
                    background: '#FFFDF9',
                    borderRadius: '20px',
                    border: '1px solid #E8DFC8',
                    boxShadow: '0 8px 24px rgba(27,67,50,0.06)',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.boxShadow = '0 16px 36px rgba(27,67,50,0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(27,67,50,0.06)';
                  }}
                >
                  {item.slug === 'what-is-ambisprout-building-sustainable-habits-with-ai' ? (
                    <div
                      style={{
                        position: 'relative',
                        height: '180px',
                        width: '100%',
                        background: '#1B4332',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        boxSizing: 'border-box',
                        padding: '10px',
                      }}
                    >
                      <img
                        src={logoImg}
                        alt="AmbiSprout Logo"
                        style={{
                          width: '70px',
                          height: '70px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                          border: '3px solid #4CAF50',
                          boxShadow: '0 6px 16px rgba(0,0,0,0.25)',
                        }}
                      />
                      <div style={{ textAlign: 'center' }}>
                        <div
                          style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: '15px',
                            fontWeight: 700,
                            color: '#fff',
                            marginBottom: '1px',
                          }}
                        >
                          AmbiSprout
                        </div>
                        <div
                          style={{
                            fontFamily: "'Manrope', sans-serif",
                            fontSize: '9.5px',
                            fontWeight: 600,
                            color: '#4CAF50',
                          }}
                        >
                          Small Action Big Impact
                        </div>
                      </div>
                      <span
                        style={{
                          position: 'absolute',
                          top: 14,
                          left: 14,
                          background: 'rgba(27,67,50,0.85)',
                          color: '#4CAF50',
                          padding: '4px 10px',
                          borderRadius: 999,
                          fontSize: '11px',
                          fontWeight: 800,
                          backdropFilter: 'blur(4px)',
                          textTransform: 'uppercase',
                        }}
                      >
                        {item.category}
                      </span>
                    </div>
                  ) : (
                    <div style={{ position: 'relative', height: '180px', width: '100%' }}>
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <span
                        style={{
                          position: 'absolute',
                          top: 14,
                          left: 14,
                          background: 'rgba(27,67,50,0.85)',
                          color: '#4CAF50',
                          padding: '4px 10px',
                          borderRadius: 999,
                          fontSize: '11px',
                          fontWeight: 800,
                          backdropFilter: 'blur(4px)',
                          textTransform: 'uppercase',
                        }}
                      >
                        {item.category}
                      </span>
                    </div>
                  )}
                  <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#6B7280', marginBottom: 8 }}>
                      <span>{item.author}</span>
                      <span>{item.readTime}</span>
                    </div>
                    <h4
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: '18px',
                        color: '#1B4332',
                        margin: '0 0 10px',
                        lineHeight: 1.35,
                        fontWeight: 700,
                      }}
                    >
                      {item.title}
                    </h4>
                    <p style={{ color: '#4B5563', fontSize: '13.5px', lineHeight: 1.55, margin: '0 0 16px', flex: 1 }}>
                      {item.subtitle}
                    </p>
                    <div style={{ borderTop: '1px solid #FAF7F0', paddingTop: '14px', marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#2E7D32' }}>Read Article →</span>
                      <span style={{ fontSize: '12px', color: '#8D6E63', fontWeight: 600 }}>{item.date}</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </article>
    </div>
  );
}
