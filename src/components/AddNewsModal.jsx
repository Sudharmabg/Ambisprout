import { useState } from 'react';
import { ecoNewsCategories } from '../data.js';

export default function AddNewsModal({ isOpen, onClose, onAddNews }) {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [summary, setSummary] = useState('');
  const [category, setCategory] = useState('Renewable Energy');
  const [source, setSource] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [coinReward, setCoinReward] = useState(20);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiTakeaways, setAiTakeaways] = useState([]);

  if (!isOpen) return null;

  const handleAutoGenerateAI = () => {
    if (!title && !summary) {
      alert('Please enter a title or summary first so Sprout AI can generate key takeaways!');
      return;
    }
    setIsGeneratingAI(true);
    setTimeout(() => {
      setAiTakeaways([
        `⚡ Key Impact: ${title || 'Positive environmental breakthrough announced.'}`,
        `📊 AI Assessment: ${summary ? summary.slice(0, 80) + '...' : 'Accelerates India\'s 2030 green transition goals.'}`,
        `🌱 Actionable Step: Take on a daily micro-mission based on this article to earn +${coinReward} Sprout Coins.`
      ]);
      setIsGeneratingAI(false);
    }, 600);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !summary.trim()) {
      alert('Please fill out at least the Title and News Summary.');
      return;
    }

    const finalTakeaways = aiTakeaways.length > 0 ? aiTakeaways : [
      `⚡ ${title}`,
      `📊 ${summary.slice(0, 90)}...`,
      `🌱 Earn +${coinReward} Sprout Coins by completing today's mission!`
    ];

    const newArticle = {
      id: `news-${Date.now()}`,
      isHeadline: false,
      title: title.trim(),
      subtitle: subtitle.trim() || summary.slice(0, 100) + '...',
      category: category || 'General Eco',
      source: source.trim() || 'Community Contributor',
      readTime: '3 min read',
      timestamp: 'Just now',
      imageUrl: imageUrl.trim() || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
      sentiment: 'Community News',
      coinReward: Number(coinReward),
      summary: summary.trim(),
      aiTakeaways: finalTakeaways,
      mission: `Act on news: ${title.slice(0, 40)}...`
    };

    onAddNews(newArticle);
    onClose();

    // Reset form
    setTitle('');
    setSubtitle('');
    setSummary('');
    setSource('');
    setImageUrl('');
    setAiTakeaways([]);
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
        backdropFilter: 'blur(8px)',
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
          maxWidth: '620px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 24px 60px rgba(27,67,50,0.3)',
          border: '1px solid #E8DFC8',
          padding: '32px',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close modal"
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            background: 'rgba(232, 223, 200, 0.4)',
            border: 'none',
            borderRadius: '50%',
            width: 36,
            height: 36,
            fontSize: 18,
            cursor: 'pointer',
            color: '#1B4332',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ✕
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <span style={{ fontSize: 24 }}>📰</span>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 24,
              color: '#1B4332',
              margin: 0,
              fontWeight: 700,
            }}
          >
            Put In News of the Day
          </h2>
        </div>
        <p style={{ color: '#6B7280', fontSize: 14, margin: '0 0 24px' }}>
          Publish fresh sustainability news directly to the Eco Pulse live stream.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#1B4332', marginBottom: 6 }}>
              News Title *
            </label>
            <input
              type="text"
              placeholder="e.g., Solar Microgrids Electrify 50 Villages in Odisha"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '12px',
                border: '1.5px solid #E8DFC8',
                background: '#FAF7F0',
                fontSize: 14,
                fontFamily: 'inherit',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#1B4332', marginBottom: 6 }}>
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '1.5px solid #E8DFC8',
                  background: '#FAF7F0',
                  fontSize: 14,
                  fontFamily: 'inherit',
                  boxSizing: 'border-box',
                }}
              >
                {ecoNewsCategories.filter((c) => c !== 'All').map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#1B4332', marginBottom: 6 }}>
                Source / Publisher
              </label>
              <input
                type="text"
                placeholder="e.g., DownToEarth / Energy World"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '1.5px solid #E8DFC8',
                  background: '#FAF7F0',
                  fontSize: 14,
                  fontFamily: 'inherit',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#1B4332', marginBottom: 6 }}>
              News Subtitle / Short Hook
            </label>
            <input
              type="text"
              placeholder="e.g., Community solar project cuts diesel backup use by 90%."
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '12px',
                border: '1.5px solid #E8DFC8',
                background: '#FAF7F0',
                fontSize: 14,
                fontFamily: 'inherit',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#1B4332', marginBottom: 6 }}>
              Full News Summary / Body *
            </label>
            <textarea
              rows={4}
              placeholder="Enter the core story details, impact metrics, and key facts..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '12px',
                border: '1.5px solid #E8DFC8',
                background: '#FAF7F0',
                fontSize: 14,
                fontFamily: 'inherit',
                boxSizing: 'border-box',
                resize: 'vertical',
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 14 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#1B4332', marginBottom: 6 }}>
                Image URL (optional)
              </label>
              <input
                type="url"
                placeholder="https://..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '1.5px solid #E8DFC8',
                  background: '#FAF7F0',
                  fontSize: 14,
                  fontFamily: 'inherit',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#1B4332', marginBottom: 6 }}>
                Coin Reward
              </label>
              <select
                value={coinReward}
                onChange={(e) => setCoinReward(Number(e.target.value))}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '1.5px solid #E8DFC8',
                  background: '#FAF7F0',
                  fontSize: 14,
                  fontFamily: 'inherit',
                  boxSizing: 'border-box',
                }}
              >
                <option value={15}>15 Coins</option>
                <option value={20}>20 Coins</option>
                <option value={25}>25 Coins</option>
                <option value={30}>30 Coins</option>
              </select>
            </div>
          </div>

          {/* AI Takeaway generator panel */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(76,175,80,0.08), rgba(27,67,50,0.04))',
              border: '1px solid #C8E6C9',
              borderRadius: '14px',
              padding: '14px 18px',
              marginTop: 4,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#1B4332', display: 'flex', alignItems: 'center', gap: 6 }}>
                ✨ Sprout AI Takeaways
              </span>
              <button
                type="button"
                onClick={handleAutoGenerateAI}
                disabled={isGeneratingAI}
                style={{
                  background: '#2E7D32',
                  color: '#fff',
                  border: 'none',
                  padding: '6px 14px',
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                {isGeneratingAI ? 'Generating...' : 'Auto-Generate AI Takeaways'}
              </button>
            </div>

            {aiTakeaways.length > 0 ? (
              <ul style={{ margin: 0, paddingLeft: 18, color: '#2F3A3D', fontSize: 13, lineHeight: 1.5 }}>
                {aiTakeaways.map((t, idx) => (
                  <li key={idx} style={{ marginBottom: 4 }}>
                    {t}
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ margin: 0, fontSize: 12, color: '#6B7280', fontStyle: 'italic' }}>
                Click Auto-Generate to create 3 AI-curated key takeaways for readers.
              </p>
            )}
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 12, justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                background: 'transparent',
                border: '1.5px solid #E8DFC8',
                color: '#1B4332',
                padding: '12px 24px',
                borderRadius: '999px',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                background: '#2E7D32',
                color: '#fff',
                border: 'none',
                padding: '12px 28px',
                borderRadius: '999px',
                fontSize: 14,
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 6px 18px rgba(46,125,50,0.25)',
              }}
            >
              Publish News 🚀
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
