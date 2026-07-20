import { useState } from 'react';
import { ecoNewsCategories, initialEcoNewsData } from '../data.js';
import AddNewsModal from './AddNewsModal.jsx';
import NewsModal from './NewsModal.jsx';
import Hoverable from './Hoverable.jsx';

export default function EcoPulsePage({ onBackToHome, onOpenChat }) {
  const [newsList, setNewsList] = useState(initialEcoNewsData);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNewsModal, setActiveNewsModal] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [userCoins, setUserCoins] = useState(4820);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleAddNewStory = (newArticle) => {
    setNewsList((prev) => [newArticle, ...prev]);
    showToast('✨ News of the day successfully published to Eco Pulse!');
  };

  const handleTakeAction = (article) => {
    setUserCoins((prev) => prev + article.coinReward);
    showToast(`🎉 +${article.coinReward} Sprout Coins earned! Mission added to your daily tracker.`);
  };

  const filteredNews = newsList.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.source.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const headlineStory = newsList.find((n) => n.isHeadline) || newsList[0];
  const regularStories = filteredNews.filter((n) => n.id !== headlineStory?.id);

  return (
    <div
      style={{
        background: '#F7F3E9',
        minHeight: '100vh',
        color: '#2F3A3D',
        paddingBottom: 80,
      }}
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            top: 84,
            right: 24,
            background: '#1B4332',
            color: '#fff',
            padding: '14px 24px',
            borderRadius: '16px',
            boxShadow: '0 12px 36px rgba(27,67,50,0.3)',
            zIndex: 1200,
            fontSize: 14,
            fontWeight: 700,
            animation: 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Navigation Bar for Eco Pulse */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1B4332 0%, #16382a 100%)',
          color: '#fff',
          padding: '28px 40px',
          boxShadow: '0 8px 30px rgba(27,67,50,0.2)',
        }}
      >
        <div
          style={{
            maxWidth: 1300,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <div>
            <button
              onClick={onBackToHome}
              style={{
                background: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.25)',
                color: '#8FD694',
                padding: '8px 18px',
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
                marginBottom: 12,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              ← Back to Home
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: '#4CAF50',
                  boxShadow: '0 0 12px #4CAF50',
                }}
              />
              <h1
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 36,
                  margin: 0,
                  color: '#fff',
                  fontWeight: 700,
                }}
              >
                Eco Pulse News
              </h1>
            </div>
            <p style={{ color: '#B9CDBE', margin: '6px 0 0', fontSize: 15 }}>
              India's live sustainability news digest, climate breakthroughs & AI-verified missions.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* Coin counter hidden */}

            {/* Put In News Button (hidden for now)
            <button
              onClick={() => setIsAddModalOpen(true)}
              style={{
                background: '#4CAF50',
                color: '#fff',
                border: 'none',
                padding: '13px 26px',
                borderRadius: 999,
                fontWeight: 700,
                fontSize: 14,
                cursor: 'pointer',
                boxShadow: '0 8px 20px rgba(76,175,80,0.3)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              ➕ Put In News of the Day
            </button>
            */}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ maxWidth: 1300, margin: '36px auto 0', padding: '0 24px' }}>
        {/* Spotlight Story of the Day Hero Banner */}
        {headlineStory && (
          <div
            style={{
              background: '#FFFDF9',
              borderRadius: '24px',
              border: '1px solid #E8DFC8',
              boxShadow: '0 16px 40px rgba(27,67,50,0.08)',
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: '1.2fr 1fr',
              marginBottom: 44,
            }}
            className="as-headline-grid"
          >
            <div style={{ position: 'relative', minHeight: 320 }}>
              <img
                src={headlineStory.imageUrl}
                alt={headlineStory.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <span
                style={{
                  position: 'absolute',
                  top: 20,
                  left: 20,
                  background: '#1B4332',
                  color: '#4CAF50',
                  padding: '6px 14px',
                  borderRadius: 999,
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                }}
              >
                🔥 News of the Day
              </span>
            </div>

            <div style={{ padding: '36px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12 }}>
                <span
                  style={{
                    background: 'rgba(46,125,50,0.12)',
                    color: '#2E7D32',
                    padding: '4px 12px',
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  {headlineStory.category}
                </span>
                <span style={{ fontSize: 13, color: '#6B7280' }}>{headlineStory.source}</span>
                <span style={{ fontSize: 13, color: '#6B7280' }}>• {headlineStory.timestamp}</span>
              </div>

              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 28,
                  margin: '0 0 12px',
                  color: '#1B4332',
                  lineHeight: 1.25,
                }}
              >
                {headlineStory.title}
              </h2>

              <p style={{ color: '#4B5563', fontSize: 15, margin: '0 0 20px', lineHeight: 1.6 }}>
                {headlineStory.subtitle}
              </p>

              {/* Quick AI Bullet Takeaway */}
              <div
                style={{
                  background: '#F4EFE2',
                  borderRadius: '16px',
                  padding: '14px 18px',
                  marginBottom: 24,
                  borderLeft: '4px solid #2E7D32',
                }}
              >
                <b style={{ color: '#1B4332', fontSize: 13, display: 'block', marginBottom: 4 }}>
                  ⚡ Sprout AI Quick Takeaway:
                </b>
                <span style={{ fontSize: 13, color: '#2F3A3D', lineHeight: 1.5 }}>
                  {headlineStory.aiTakeaways?.[0] || headlineStory.summary.slice(0, 140) + '...'}
                </span>
              </div>

              <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setActiveNewsModal(headlineStory)}
                  style={{
                    background: '#2E7D32',
                    color: '#fff',
                    border: 'none',
                    padding: '12px 26px',
                    borderRadius: 999,
                    fontWeight: 700,
                    fontSize: 14,
                    cursor: 'pointer',
                    boxShadow: '0 6px 18px rgba(46,125,50,0.25)',
                  }}
                >
                  Read Full Story →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Category Filters & Search Controls Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
            marginBottom: 28,
          }}
        >
          {/* Category Chips */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            {ecoNewsCategories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    background: isActive ? '#1B4332' : '#FFFDF9',
                    color: isActive ? '#fff' : '#1B4332',
                    border: isActive ? '1px solid #1B4332' : '1px solid #E8DFC8',
                    padding: '8px 18px',
                    borderRadius: 999,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div style={{ position: 'relative', width: 280 }}>
            <input
              type="text"
              placeholder="Search green news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 16px 10px 38px',
                borderRadius: 999,
                border: '1.5px solid #E8DFC8',
                background: '#FFFDF9',
                fontSize: 13,
                fontFamily: 'inherit',
                boxSizing: 'border-box',
              }}
            />
            <span style={{ position: 'absolute', left: 14, top: 10, fontSize: 14, color: '#6B7280' }}>🔍</span>
          </div>
        </div>

        {/* News Card Grid */}
        {regularStories.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: 28,
            }}
          >
            {regularStories.map((item) => (
              <Hoverable
                key={item.id}
                as="div"
                onClick={() => setActiveNewsModal(item)}
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
                hoverStyle={{ transform: 'translateY(-6px)', boxShadow: '0 16px 36px rgba(27,67,50,0.12)' }}
              >
                <div style={{ position: 'relative', height: 190, width: '100%' }}>
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
                      fontSize: 11,
                      fontWeight: 800,
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    {item.category}
                  </span>
                </div>

                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#6B7280', marginBottom: 8 }}>
                    <span>{item.source}</span>
                    <span>{item.timestamp}</span>
                  </div>

                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 19,
                      color: '#1B4332',
                      margin: '0 0 10px',
                      lineHeight: 1.35,
                      fontWeight: 700,
                    }}
                  >
                    {item.title}
                  </h3>

                  <p style={{ color: '#4B5563', fontSize: 13.5, lineHeight: 1.5, margin: '0 0 16px', flex: 1 }}>
                    {item.subtitle || item.summary.slice(0, 110) + '...'}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderTop: '1px solid #FAF7F0',
                      paddingTop: 14,
                      marginTop: 'auto',
                    }}
                  >
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#2E7D32', display: 'flex', alignItems: 'center', gap: 4 }}>
                      Read Full Story →
                    </span>
                    <span style={{ fontSize: 12, color: '#8D6E63', fontWeight: 600 }}>{item.readTime}</span>
                  </div>
                </div>
              </Hoverable>
            ))}
          </div>
        )}
      </div>

      {/* Put In News Modal */}
      <AddNewsModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddNews={handleAddNewStory}
      />

      {/* Story Reader Modal */}
      <NewsModal
        article={activeNewsModal}
        onClose={() => setActiveNewsModal(null)}
        onTakeAction={handleTakeAction}
      />
    </div>
  );
}
