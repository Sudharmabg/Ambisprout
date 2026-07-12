// Static content for the AmbiSprout homepage, ported from the design component.

export const features = [
  {
    id: 'coach',
    icon: 'bot',
    title: 'AI Sustainability Coach',
    desc: 'Your always-on companion that turns your routine into personalized daily missions and nudges you toward greener habits.',
    href: '#ai-section',
    cta: 'Meet Sprout',
  },
  {
    id: 'carbon',
    icon: 'globe',
    title: 'Carbon Footprint Calculator',
    desc: 'See the real CO₂ impact of your travel, food, and shopping — then watch it shrink as you complete missions.',
    href: '#ai-section',
    cta: 'Track impact',
  },
  {
    id: 'image',
    icon: 'camera',
    title: 'AI Image Verification',
    desc: 'Snap a photo to prove a task is done — our AI verifies it instantly and credits your streak.',
    href: '#ai-section',
    cta: 'Learn more',
  },
  {
    id: 'receipt',
    icon: 'receipt',
    title: 'AI Receipt Analysis',
    desc: 'Scan a bill and get an instant read on your shopping footprint with greener swap suggestions.',
    href: '#ai-section',
    cta: 'Learn more',
  },
  {
    id: 'community',
    icon: 'users',
    title: 'Community',
    desc: 'Share wins, swap tips, and take on city challenges together as we build India\'s founding green community.',
    href: '#community-section',
    cta: 'Explore community',
  },
  {
    id: 'coins',
    icon: 'coin',
    title: 'Sprout Coins',
    desc: 'Earn coins for every verified green action and redeem them with ESG-friendly brands.',
    href: '#challenges-section',
    cta: 'Start earning',
    stat: { value: '4,820', label: 'avg. coins per member' },
  },
];

export const howSteps = [
  { n: 1, title: 'Create Profile' },
  { n: 2, title: 'Receive AI Missions' },
  { n: 3, title: 'Complete Eco Tasks' },
  { n: 4, title: 'Earn Coins & Build Habits' },
];

// Interactive "Your Green Journey" timeline steps.
export const journeySteps = [
  {
    n: 1,
    emoji: '🤖',
    icon: 'bot',
    title: 'Meet Sprout',
    tagline: 'Your AI companion',
    kind: 'meet',
    desc: 'Meet Sprout, your AI sustainability companion. In under 90 seconds it learns your lifestyle, travel, and food habits to personalize everything that follows.',
  },
  {
    n: 2,
    emoji: '🎯',
    icon: 'target',
    title: 'Get Personalized Missions',
    tagline: 'Daily & bite-sized',
    kind: 'missions',
    desc: 'Every day Sprout creates simple missions based on how you actually live.',
    missions: ['Carry a reusable bottle', 'Use public transport', 'Save electricity', 'Reduce food waste'],
  },
  {
    n: 3,
    emoji: '📸',
    icon: 'camera',
    title: 'Complete & Verify',
    tagline: 'Proof in a tap',
    kind: 'verify',
    desc: 'Complete eco-friendly actions and let AI verify them instantly using photos, receipts, or activity data.',
  },
  {
    n: 4,
    emoji: '🌍',
    icon: 'globe',
    title: 'Grow Your Impact',
    tagline: 'Watch it add up',
    kind: 'impact',
    desc: 'Every completed mission feeds your real-world impact dashboard.',
    metrics: [
      { label: 'CO₂ Reduced', value: '24 kg', pct: 78 },
      { label: 'Water Conserved', value: '310 L', pct: 64 },
      { label: 'Waste Avoided', value: '5.2 kg', pct: 46 },
      { label: 'Sprout Coins', value: '4,820', pct: 88 },
    ],
  },
  {
    n: 5,
    emoji: '👥',
    icon: 'users',
    title: 'Inspire the Community',
    tagline: 'Grow together',
    kind: 'community',
    desc: 'Share achievements, join challenges, climb leaderboards, and inspire thousands of young people building a greener India.',
  },
];

export const communityPosts = [
  { tag: '🌱 Bengaluru Community', text: 'We planted 50 trees this weekend.', meta: '❤️ 245 · 💬 62' },
  { tag: '♻ Sustainable Living', text: 'Best alternatives to plastic toothbrushes?', meta: '142 Replies' },
  { tag: '🚲 Green Commute', text: 'Completed 30 days without using my bike.', meta: '🏅 Badge Earned' },
];

export const liveActivity = [
  { text: 'Ananya completed Green Commute Challenge', time: '20 seconds ago' },
  { text: 'Rahul planted 3 trees', time: '2 minutes ago' },
  { text: 'Priya joined Plastic-Free Week', time: '5 minutes ago' },
  { text: 'Arjun earned Green Guardian Badge', time: '12 minutes ago' },
];

export const trendingTopics = [
  'Bengaluru Lake Cleanup',
  'Best Eco-Friendly Water Bottle',
  'Plastic-Free Hostel Tips',
];

export const trustPillars = [
  {
    icon: 'shield',
    title: 'Verified, not vague',
    desc: 'No greenwashing. Every mission is verified through photos, receipts, or activity data — and impact estimates follow published emission factors, not made-up math.',
  },
  {
    icon: 'users',
    title: 'Built in the open',
    desc: 'We are a founding community at day one — no inflated member counts, no fake badges. Real actions from real members shape every feature we ship.',
  },
  {
    icon: 'coin',
    title: 'Free for everyone',
    desc: 'AmbiSprout is 100% free for students and young professionals. Rewards are funded by ESG-friendly brand partners — never your wallet.',
  },
  {
    icon: 'pin',
    title: 'Made for India',
    desc: 'Missions built around Indian life — metro commutes, local markets, monsoon seasons — not copy-pasted western advice.',
  },
];

export const trustCommitments = [
  'No greenwashing',
  'AI-verified actions',
  'Community first',
  'Built in India',
];

// Scripted scenarios for the interactive Sprout AI live demo.
export const aiScenarios = [
  {
    key: 'voice',
    icon: 'mic',
    label: 'Voice Assistant',
    hint: 'Ask hands-free',
    user: 'Hey Sprout, how green was my week?',
    reply:
      'Great week! You completed 5 missions and saved 4.2 kg CO₂ — 18% better than last week. Want a bigger challenge for next week?',
    card: 'voice',
  },
  {
    key: 'carbon',
    icon: 'globe',
    label: 'Carbon Calculator',
    hint: 'Know your footprint',
    user: 'Calculate my commute footprint — 12 km by car daily.',
    reply:
      'Driving 12 km daily emits about 2.4 kg CO₂. Swapping in the metro twice a week would save nearly 21 kg every month:',
    card: 'carbon',
  },
  {
    key: 'receipt',
    icon: 'receipt',
    label: 'Receipt Analysis',
    hint: 'Scan your shopping',
    user: '📎 grocery-receipt.jpg',
    reply: 'Scanned! Your basket is 72% eco-friendly. Two quick swaps could push it higher:',
    card: 'receipt',
    receipt: [
      { name: 'Organic vegetables', note: 'Great pick', good: true },
      { name: 'Local dairy', note: 'Low food-miles', good: true },
      { name: 'Packaged water', note: 'Swap: filtered bottle', good: false },
      { name: 'Imported fruit', note: 'Swap: seasonal local', good: false },
    ],
  },
  {
    key: 'verify',
    icon: 'camera',
    label: 'Image Verification',
    hint: 'Prove it in a tap',
    user: '📷 Photo: cycling to work',
    reply: 'Nice ride! Let me verify that…',
    card: 'verify',
  },
];

export const brands = [
  { initial: 'SF', name: 'Sustainable Fashion', category: 'Apparel', rating: '4.8' },
  { initial: 'OF', name: 'Organic Food', category: 'Groceries', rating: '4.7' },
  { initial: 'BP', name: 'Bamboo Products', category: 'Home', rating: '4.6' },
  { initial: 'GM', name: 'Green Mobility', category: 'Transport', rating: '4.9' },
  { initial: 'EH', name: 'Eco Home', category: 'Living', rating: '4.5' },
  { initial: 'PC', name: 'Personal Care', category: 'Wellness', rating: '4.7' },
];

export const challengesData = [
  { id: 'plastic', title: 'Plastic-Free Week — Bengaluru', participants: '14,280', days: 7, difficulty: 'Easy', reward: 250 },
  { id: 'metro', title: 'Delhi Metro Challenge', participants: '9,540', days: 10, difficulty: 'Medium', reward: 300 },
  { id: 'beach', title: 'Mumbai Beach Cleanup', participants: '6,720', days: 3, difficulty: 'Medium', reward: 350 },
  { id: 'cycling', title: 'Pune Cycling Week', participants: '5,180', days: 6, difficulty: 'Easy', reward: 220 },
  { id: 'trees', title: 'Chennai Tree Plantation', participants: '3,960', days: 14, difficulty: 'Hard', reward: 400 },
];

export const chatReplies = [
  'Great question! Try swapping single-use plastics for reusable alternatives — small swaps add up fast. 🌿',
  'Based on your recent activity, biking twice this week could save ~1.2kg CO₂. Want me to add it as a mission?',
  'Composting kitchen waste can cut your household footprint significantly. I can walk you through it!',
  "You're doing great — 8.4kg CO₂ saved this month already. Keep the streak going! 🍃",
];
