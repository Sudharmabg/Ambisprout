import Section from './Section.jsx';
import FeatureIcon from './FeatureIcon.jsx';

const sampleCategories = [
  {
    icon: 'pin',
    title: 'Local City Hubs',
    desc: 'Connect with green champions across Bengaluru, Delhi, Mumbai, Pune, and more for local cleanups and eco-swaps.',
    tag: 'City Circles',
  },
  {
    icon: 'sprout',
    title: 'Habit Showcases',
    desc: 'Share verified photos of your daily sustainability wins, inspire peers, and collect exclusive founding badges.',
    tag: 'Green Actions',
  },
  {
    icon: 'bot',
    title: 'Eco-Hacks & Q&A',
    desc: 'Get crowdsourced advice on plastic-free living, home composting, zero-waste shopping, and sustainable Indian brands.',
    tag: 'Knowledge Sharing',
  },
];

const sampleFeed = [
  {
    tag: '♻️ Sustainable Living',
    text: 'Switched to a copper water bottle and bamboo toothbrush this month — small daily swaps start feeling effortless!',
    author: 'Ananya R.',
    location: 'Bengaluru',
    badge: 'Founding Member',
  },
  {
    tag: '🌱 Balcony Gardening',
    text: 'Harvested my first batch of fresh spinach and mint right on the balcony! Who else is trying home kitchen composting?',
    author: 'Rahul M.',
    location: 'Delhi',
    badge: 'Eco Enthusiast',
  },
  {
    tag: '🚲 Green Commute',
    text: 'Opted for metro over solo car rides all week. Saving fuel, avoiding peak traffic, and feeling energized!',
    author: 'Priya S.',
    location: 'Mumbai',
    badge: 'Commute Champion',
  },
];

export default function Community() {
  return (
    <Section
      id="community-section"
      className="as-section-responsive"
      outerStyle={{ background: '#F7F3E9', padding: '64px 56px 80px' }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {/* Eyebrow + Title */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(46,125,50,0.08)',
              color: '#2E7D32',
              padding: '6px 16px',
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: '1.2px',
              textTransform: 'uppercase',
              marginBottom: 16,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#4CAF50',
              }}
            />
            COMMUNITY SNEAK PEEK
          </div>

          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 42,
              color: '#1B4332',
              fontWeight: 700,
              margin: '0 0 16px',
            }}
          >
            Where Climate Champions Connect
          </h2>

          <p
            style={{
              fontSize: 16,
              color: '#4B5563',
              maxWidth: 620,
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            A sneak peek at how the upcoming AmbiSprout community will enable zero-waste discussions, local city meetups, and verified green habit sharing.
          </p>
        </div>

        {/* Feature Pillars Grid */}
        <div
          className="as-grid-3"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 24,
            marginBottom: 48,
          }}
        >
          {sampleCategories.map((c) => (
            <div
              key={c.title}
              style={{
                background: '#fff',
                borderRadius: 22,
                padding: 30,
                boxShadow: '0 10px 30px rgba(27,67,50,0.06)',
                border: '1px solid #E8DFC8',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: 'rgba(76,175,80,0.12)',
                    color: '#2E7D32',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 20,
                  }}
                >
                  <FeatureIcon name={c.icon} size={24} />
                </div>
                <div
                  style={{
                    display: 'inline-block',
                    fontSize: 11,
                    fontWeight: 700,
                    color: '#2E7D32',
                    letterSpacing: '0.8px',
                    textTransform: 'uppercase',
                    marginBottom: 8,
                  }}
                >
                  {c.tag}
                </div>
                <h3
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: 20,
                    fontWeight: 800,
                    color: '#1B4332',
                    margin: '0 0 10px',
                    lineHeight: 1.3,
                  }}
                >
                  {c.title}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: '#6B7280',
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {c.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Sample Feed Header */}
        <div style={{ marginBottom: 20, textAlign: 'center' }}>
          <span
            style={{
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: '1px',
              color: '#2E7D32',
              textTransform: 'uppercase',
            }}
          >
            Sample Member Feed Preview
          </span>
        </div>

        {/* Sample Feed Grid */}
        <div
          className="as-grid-3"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 24,
          }}
        >
          {sampleFeed.map((post) => (
            <div
              key={post.author}
              style={{
                background: '#fff',
                borderRadius: 20,
                padding: 24,
                boxShadow: '0 8px 24px rgba(27,67,50,0.05)',
                border: '1px solid rgba(232,223,200,0.8)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'inline-block',
                    fontSize: 12,
                    fontWeight: 700,
                    color: '#2E7D32',
                    background: 'rgba(46,125,50,0.08)',
                    padding: '4px 10px',
                    borderRadius: 999,
                    marginBottom: 14,
                  }}
                >
                  {post.tag}
                </div>
                <p
                  style={{
                    color: '#2F3A3D',
                    fontSize: 15,
                    lineHeight: 1.55,
                    margin: '0 0 20px',
                    fontStyle: 'italic',
                  }}
                >
                  "{post.text}"
                </p>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderTop: '1px solid #F7F3E9',
                  paddingTop: 14,
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: '#1B4332' }}>
                    {post.author}
                  </div>
                  <div style={{ fontSize: 12, color: '#9CA3AF' }}>{post.location}</div>
                </div>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: '#6B7280',
                    background: '#F7F3E9',
                    padding: '4px 8px',
                    borderRadius: 8,
                  }}
                >
                  {post.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
