import { useState } from 'react';

export default function BlogModal({ blog, onClose, onStartJourney }) {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  if (!blog) return null;

  const toggleFaq = (idx) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
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
        background: 'rgba(27, 67, 50, 0.85)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1100,
        padding: 20,
        boxSizing: 'border-box',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#FFFDF9',
          borderRadius: '24px',
          maxWidth: '820px',
          width: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          boxShadow: '0 24px 60px rgba(27,67,50,0.35)',
          border: '1px solid #E8DFC8',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Hero Image Header */}
        <div style={{ position: 'relative', width: '100%', height: 280, flexShrink: 0 }}>
          <img
            src={blog.imageUrl}
            alt={blog.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(27,67,50,0.9) 100%)',
            }}
          />
          <button
            onClick={onClose}
            aria-label="Close blog story"
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              background: 'rgba(255, 255, 255, 0.25)',
              border: 'none',
              borderRadius: '50%',
              width: 38,
              height: 38,
              fontSize: 18,
              cursor: 'pointer',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(4px)',
            }}
          >
            ✕
          </button>

          <div style={{ position: 'absolute', bottom: 24, left: 28, right: 28, color: '#fff' }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
              <span
                style={{
                  background: '#2E7D32',
                  color: '#fff',
                  padding: '4px 12px',
                  borderRadius: 999,
                  fontSize: 11,
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                {blog.category}
              </span>
              <span style={{ fontSize: 12.5, opacity: 0.9 }}>• By {blog.author}</span>
              <span style={{ fontSize: 12.5, opacity: 0.9 }}>• {blog.readTime}</span>
            </div>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 26,
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

        {/* Modal Main Content Body */}
        <div style={{ padding: '32px 36px 44px' }}>
          {/* AI Executive Key Takeaways Box */}
          <div
            style={{
              background: 'linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)',
              color: '#fff',
              borderRadius: '20px',
              padding: '24px 28px',
              marginBottom: 32,
              boxShadow: '0 8px 24px rgba(27,67,50,0.15)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 20 }}>🤖</span>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 19, margin: 0, color: '#A3E635' }}>
                Sprout AI Key Takeaways
              </h3>
            </div>
            <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.6, fontSize: 14.5 }}>
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
              lineHeight: 1.75,
              fontSize: 16,
              margin: '0 0 28px',
              whiteSpace: 'pre-line',
            }}
          >
            {blog.content.intro}
          </p>

          {/* Render Sections */}
          {blog.content.sections.map((sec, idx) => (
            <div key={idx} style={{ marginBottom: 32 }}>
              {sec.heading && (
                <h2
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 22,
                    color: '#1B4332',
                    margin: '0 0 14px',
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
                    lineHeight: 1.7,
                    fontSize: 15,
                    margin: '0 0 16px',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {sec.body}
                </p>
              )}

              {/* Bullet points style */}
              {sec.bullets && (
                <ul
                  style={{
                    background: '#FAF7F0',
                    border: '1px solid #E8DFC8',
                    borderRadius: '16px',
                    padding: '20px 24px 20px 40px',
                    margin: '16px 0',
                    color: '#2F3A3D',
                    lineHeight: 1.7,
                    fontSize: 14.5,
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
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, margin: '16px 0' }}>
                  {sec.list.map((item, i) => (
                    <div
                      key={i}
                      style={{
                        background: '#FAF7F0',
                        border: '1px solid #E8DFC8',
                        borderRadius: '14px',
                        padding: '14px 18px',
                      }}
                    >
                      <b style={{ color: '#1B4332', fontSize: 15, display: 'block', marginBottom: 4 }}>
                        {item.title}
                      </b>
                      <span style={{ color: '#4B5563', fontSize: 14 }}>{item.desc}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Myths vs Reality cards */}
              {sec.myths && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, margin: '16px 0' }}>
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
                      <div style={{ color: '#C62828', fontWeight: 700, fontSize: 14, marginBottom: 4 }}>
                        ❌ Myth: {m.myth}
                      </div>
                      <div style={{ color: '#2E7D32', fontWeight: 600, fontSize: 14 }}>
                        ✓ Reality: {m.reality}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Grouped 30 Habits categories */}
              {sec.groupedHabits && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20, margin: '16px 0' }}>
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
                          fontSize: 18,
                          color: '#1B4332',
                          margin: '0 0 12px',
                          fontWeight: 700,
                        }}
                      >
                        {group.categoryName}
                      </h3>
                      <ul style={{ margin: 0, paddingLeft: 20, color: '#2F3A3D', lineHeight: 1.65, fontSize: 14 }}>
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
            <div style={{ marginTop: 40, borderTop: '1px solid #E8DFC8', paddingTop: 28 }}>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 22,
                  color: '#1B4332',
                  margin: '0 0 16px',
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
                          fontSize: 15,
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
                        <span style={{ fontSize: 18, color: '#2E7D32' }}>{isOpen ? '−' : '+'}</span>
                      </button>
                      {isOpen && (
                        <div
                          style={{
                            padding: '0 20px 16px',
                            color: '#4B5563',
                            fontSize: 14,
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
              marginTop: 40,
              background: 'linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)',
              color: '#fff',
              borderRadius: '20px',
              padding: '28px',
              textAlign: 'center',
            }}
          >
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, margin: '0 0 8px', color: '#fff' }}>
              Ready to Turn Insights into Action?
            </h3>
            <p style={{ color: '#B9CDBE', fontSize: 14, margin: '0 0 20px', maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>
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
                fontSize: 14,
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(76,175,80,0.3)',
              }}
            >
              Start Your Green Journey →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
