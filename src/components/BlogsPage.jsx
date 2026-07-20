import { useState } from 'react';
import { blogCategories, blogsData } from '../data/blogsData.js';
import BlogModal from './BlogModal.jsx';
import Hoverable from './Hoverable.jsx';

export default function BlogsPage({ onBackToHome, onStartJourney }) {
  const [blogs] = useState(blogsData);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeBlogModal, setActiveBlogModal] = useState(null);

  const filteredBlogs = blogs.filter((blog) => {
    const matchesCat = selectedCategory === 'All' || blog.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.metaDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const featuredBlog = blogs.find((b) => b.isFeatured) || blogs[0];
  const regularBlogs = filteredBlogs.filter((b) => b.id !== featuredBlog?.id);

  return (
    <div
      style={{
        background: '#F7F3E9',
        minHeight: '100vh',
        color: '#2F3A3D',
        paddingBottom: 80,
      }}
    >
      {/* Top Header Navigation Bar for Blogs */}
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
              <span style={{ fontSize: 24 }}>📚</span>
              <h1
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 36,
                  margin: 0,
                  color: '#fff',
                  fontWeight: 700,
                }}
              >
                Eco Blogs & Guides
              </h1>
            </div>
            <p style={{ color: '#B9CDBE', margin: '6px 0 0', fontSize: 15 }}>
              In-depth guides, habit blueprints, and AI insights to make sustainable living simple.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div style={{ maxWidth: 1300, margin: '36px auto 0', padding: '0 24px' }}>
        {/* Featured Read Hero Spotlight */}
        {featuredBlog && (
          <div
            style={{
              background: '#FFFDF9',
              borderRadius: '24px',
              border: '1px solid #E8DFC8',
              boxShadow: '0 16px 40px rgba(27,67,50,0.08)',
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: '1.2fr 1fr',
              alignItems: 'stretch',
              marginBottom: 44,
            }}
            className="as-headline-grid"
          >
            <div style={{ position: 'relative', height: '100%', width: '100%' }}>
              <img
                src={featuredBlog.imageUrl}
                alt={featuredBlog.title}
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
                🔥 Featured Read of the Day
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
                  {featuredBlog.category}
                </span>
                <span style={{ fontSize: 13, color: '#6B7280' }}>{featuredBlog.author}</span>
                <span style={{ fontSize: 13, color: '#6B7280' }}>• {featuredBlog.readTime}</span>
              </div>

              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 26,
                  margin: '0 0 12px',
                  color: '#1B4332',
                  lineHeight: 1.3,
                }}
              >
                {featuredBlog.title}
              </h2>

              <p style={{ color: '#4B5563', fontSize: 15, margin: '0 0 20px', lineHeight: 1.6 }}>
                {featuredBlog.subtitle}
              </p>

              {/* Sprout AI Key Takeaway preview */}
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
                  ⚡ Sprout AI Key Takeaway:
                </b>
                <span style={{ fontSize: 13, color: '#2F3A3D', lineHeight: 1.5 }}>
                  {featuredBlog.aiTakeaways?.[0]}
                </span>
              </div>

              <div>
                <button
                  onClick={() => setActiveBlogModal(featuredBlog)}
                  style={{
                    background: '#2E7D32',
                    color: '#fff',
                    border: 'none',
                    padding: '12px 28px',
                    borderRadius: 999,
                    fontWeight: 700,
                    fontSize: 14,
                    cursor: 'pointer',
                    boxShadow: '0 6px 18px rgba(46,125,50,0.25)',
                  }}
                >
                  Read Full Article →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Category Filters & Search Bar */}
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
          {/* Filter Chips */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            {blogCategories.map((cat) => {
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
              placeholder="Search eco guides & blogs..."
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

        {/* Blog Cards Grid */}
        {regularBlogs.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: 28,
            }}
          >
            {regularBlogs.map((blog) => (
              <Hoverable
                key={blog.id}
                as="div"
                onClick={() => setActiveBlogModal(blog)}
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
                <div style={{ position: 'relative', height: 200, width: '100%' }}>
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
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
                    {blog.category}
                  </span>
                </div>

                <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#6B7280', marginBottom: 8 }}>
                    <span>{blog.author}</span>
                    <span>{blog.readTime}</span>
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
                    {blog.title}
                  </h3>

                  <p style={{ color: '#4B5563', fontSize: 13.5, lineHeight: 1.55, margin: '0 0 16px', flex: 1 }}>
                    {blog.subtitle}
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
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#2E7D32', display: 'flex', alignItems: 'center', gap: 4 }}>
                      Read Article →
                    </span>
                    <span style={{ fontSize: 12, color: '#8D6E63', fontWeight: 600 }}>{blog.date}</span>
                  </div>
                </div>
              </Hoverable>
            ))}
          </div>
        )}
      </div>

      {/* Full Reader Modal */}
      <BlogModal
        blog={activeBlogModal}
        onClose={() => setActiveBlogModal(null)}
        onStartJourney={onStartJourney}
      />
    </div>
  );
}
