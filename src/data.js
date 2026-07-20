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

// Suggested prompts shown as chips in the chat widget.
export const chatSuggestions = [
  'What is sustainability?',
  'What is climate change?',
  'What is a carbon footprint?',
  'Why is biodiversity important?',
  'What are the 3Rs of waste management?',
  'Why is plastic pollution a problem?',
  'How can individuals contribute?',
  'What is the circular economy?',
  'Why are trees important?',
  'What are the UN SDGs?',
  'What is AmbiSprout?',
  'How does AmbiSprout help users?',
  'What makes AmbiSprout different?',
  'Who is AmbiSprout designed for?',
  'What is the vision of AmbiSprout?',
];

/**
 * Local FAQ bank — layer 1 of the chatbot. Curated answers served instantly
 * with zero API cost.
 */
export const faqBank = [
  {
    id: 'sustainability-definition',
    keywords: ['sustainability', 'what is sustainability', 'sustainable', 'definition of sustainability', 'three pillars'],
    anchors: ['sustainability', 'sustainable'],
    answer: `Sustainability is the practice of meeting today's needs without compromising the ability of future generations to meet theirs. It involves making responsible choices that protect natural resources, reduce pollution, conserve biodiversity, and promote social and economic well-being.\n\nSustainability is built on three interconnected pillars:\n• Environmental Sustainability: Protecting ecosystems, reducing carbon emissions, conserving water, reducing waste, and preserving biodiversity.\n• Social Sustainability: Ensuring equality, health, education, fair wages, community development, and human rights.\n• Economic Sustainability: Supporting long-term economic growth while using resources responsibly and avoiding environmental degradation.\n\nSustainability is not about making perfect choices — it is about making better choices consistently 🌱`,
  },
  {
    id: 'climate-change',
    keywords: ['climate change', 'global warming', 'greenhouse gases', 'emissions', 'what is climate change'],
    anchors: ['climate', 'warming'],
    answer: `Climate change refers to long-term changes in Earth's average temperature and weather patterns. Today's rapid warming is primarily caused by human activities such as burning fossil fuels, deforestation, industrial production, and unsustainable agriculture.\n\nThese activities release greenhouse gases — including carbon dioxide (CO₂), methane (CH₄), and nitrous oxide (N₂O) — which trap heat in the atmosphere.\n\nKey effects include rising temperatures, frequent heatwaves, floods, droughts, melting glaciers, and loss of biodiversity. Addressing climate change requires both reducing emissions and adapting to changing conditions 🌍`,
  },
  {
    id: 'carbon-footprint',
    keywords: ['carbon footprint', 'footprint', 'co2e', 'emissions', 'what is a carbon footprint', 'calculate footprint'],
    anchors: ['footprint', 'carbon'],
    answer: `A carbon footprint measures the total amount of greenhouse gases produced directly and indirectly by an individual, product, organization, or activity. It is usually expressed in kilograms or tonnes of carbon dioxide equivalent (CO₂e).\n\nEveryday activities contribute to your footprint:\n• Driving petrol or diesel vehicles\n• Air travel & electricity consumption\n• Food choices & shopping habits\n• Waste generation\n\nReducing your carbon footprint can be achieved by using public transport, switching to renewable energy, reducing food waste, and choosing reusable items. Tracking your footprint helps identify where lifestyle changes have the greatest impact 👣`,
  },
  {
    id: 'biodiversity',
    keywords: ['biodiversity', 'why is biodiversity important', 'ecosystem', 'species', 'wildlife'],
    anchors: ['biodiversity'],
    answer: `Biodiversity refers to the variety of life on Earth, including plants, animals, fungi, microorganisms, and their ecosystems.\n\nHealthy biodiversity provides essential services:\n• Crop pollination & clean air and water\n• Fertile soil & climate regulation\n• Natural pest control & food security\n• Medical discoveries\n\nWhen biodiversity declines due to pollution or habitat loss, ecosystems become less resilient. Protecting biodiversity helps maintain the natural balance necessary for all life 🌿`,
  },
  {
    id: '3rs-waste-management',
    keywords: ['3rs', 'three rs', 'reduce reuse recycle', 'waste management', 'recycling', 'reuse'],
    anchors: ['3rs', 'reduce', 'reuse', 'recycle'],
    answer: `The 3Rs provide a practical framework for minimizing waste:\n\n1. Reduce: Avoid unnecessary purchases, choose minimal packaging, and consume efficiently.\n2. Reuse: Repair items, refill containers, donate usable goods, and use reusable bags/bottles.\n3. Recycle: Convert waste materials into new products and segregate recyclable waste properly.\n\nAmong these, REDUCING consumption has the greatest environmental benefit because it prevents waste from being created in the first place ♻️`,
  },
  {
    id: 'plastic-pollution',
    keywords: ['plastic pollution', 'single use plastic', 'microplastics', 'plastic problem', 'why is plastic pollution a problem'],
    anchors: ['plastic', 'microplastics'],
    answer: `Plastic pollution is a critical environmental challenge because most plastics do not naturally decompose. Instead, they break down into tiny microplastics that persist in soil, rivers, oceans, and even human bodies.\n\nPlastic pollution:\n• Harms marine life & enters food chains\n• Blocks urban waterways\n• Damages soil ecosystems\n• Releases greenhouse gases during production & disposal\n\nReducing single-use plastics and adopting reusable alternatives are essential steps forward 🥤`,
  },
  {
    id: 'individual-contribution',
    keywords: ['individuals', 'how to contribute', 'what can i do', 'how can individuals contribute', 'small actions'],
    anchors: ['contribute', 'individual', 'actions'],
    answer: `Individual actions drive meaningful collective change! Here is how you can contribute:\n\n• Conserve electricity & water\n• Walk, cycle, or use public transport\n• Reduce food waste & recycle correctly\n• Carry reusable bottles & bags\n• Support sustainable brands & plant native trees\n• Educate friends and make mindful purchasing decisions\n\nSustainable living is about building consistent habits rather than achieving perfection 🍃`,
  },
  {
    id: 'circular-economy',
    keywords: ['circular economy', 'what is the circular economy', 'linear economy', 'reuse materials'],
    anchors: ['circular'],
    answer: `A circular economy is an economic model designed to minimize waste by keeping products and materials in use for as long as possible.\n\nUnlike the traditional "take-make-dispose" model, a circular economy focuses on:\n• Designing durable, long-lasting products\n• Repairing instead of replacing\n• Reusing & refurbishing materials\n• Recycling valuable resources\n\nThis approach conserves resources, reduces landfill waste, and lowers overall carbon emissions 🔄`,
  },
  {
    id: 'trees-importance',
    keywords: ['trees', 'why are trees important', 'deforestation', 'forests', 'oxygen'],
    anchors: ['trees', 'forests'],
    answer: `Trees are fundamental to healthy ecosystems. They absorb carbon dioxide, release oxygen, regulate local temperatures, prevent soil erosion, improve water retention, and provide habitats for countless species.\n\nUrban trees also improve air quality, lower city temperatures through shade, and enhance physical and mental well-being 🌳`,
  },
  {
    id: 'sdgs-un',
    keywords: ['sdgs', 'sustainable development goals', 'united nations', 'un goals', '17 goals'],
    anchors: ['sdgs', 'un'],
    answer: `The Sustainable Development Goals (SDGs) are 17 global goals adopted by the United Nations in 2015 to create a more sustainable, equitable, and prosperous world by 2030.\n\nThey address key global issues including:\n• No Poverty & Zero Hunger\n• Quality Education & Gender Equality\n• Clean Water & Affordable Clean Energy\n• Sustainable Cities & Responsible Consumption\n• Climate Action & Life Below Water/Land 🇺🇳`,
  },
  {
    id: 'ambisprout-what-is',
    keywords: ['ambisprout', 'what is ambisprout', 'about ambisprout', 'platform'],
    anchors: ['ambisprout'],
    answer: `AmbiSprout is an AI-powered sustainability platform designed to help individuals build environmentally responsible habits through education, personalized guidance, and community participation.\n\nRather than simply providing information, AmbiSprout encourages users to take meaningful action by combining sustainability knowledge with engaging challenges, AI-driven recommendations, habit tracking, and gamification 🌱`,
  },
  {
    id: 'ambisprout-how-it-helps',
    keywords: ['how ambisprout helps', 'help users', 'features of ambisprout', 'how does ambisprout help'],
    anchors: ['helps', 'features'],
    answer: `AmbiSprout supports users throughout their sustainability journey by combining awareness with action:\n\n• Learn sustainability concepts through an AI assistant\n• Discover practical ways to reduce environmental impact\n• Participate in sustainability challenges\n• Build long-term eco-friendly habits & track progress\n• Stay motivated through gamification, badges & Sprout Coins\n• Connect with eco-conscious communities & organizations 🎯`,
  },
  {
    id: 'ambisprout-differentiator',
    keywords: ['different', 'what makes ambisprout different', 'unique', 'differentiator', 'other apps'],
    anchors: ['different', 'unique'],
    answer: `While many apps focus on a single feature like carbon tracking or recycling tips, AmbiSprout brings multiple capabilities together in one platform:\n\n• AI-powered sustainability guidance & RAG knowledge\n• Personalized habit-building through gamification\n• Community-driven environmental initiatives\n• Clear focus on measurable behavioral change\n\nAmbiSprout aims to create lasting impact by making green choices simple and rewarding every day ✨`,
  },
  {
    id: 'ambisprout-audience',
    keywords: ['who is ambisprout for', 'target audience', 'gen z', 'millennials', 'institutions', 'designed for'],
    anchors: ['audience', 'target', 'designed'],
    answer: `AmbiSprout is designed for individuals who want to live more sustainably — particularly digital-first Gen Z and young millennials eager to make a positive impact.\n\nThe platform also serves educational institutions, businesses, CSR programs, NGOs, and community organizations seeking to engage people in measurable sustainability campaigns 👥`,
  },
  {
    id: 'ambisprout-vision',
    keywords: ['vision', 'mission', 'ambisprout vision', 'future', 'goal'],
    anchors: ['vision', 'mission'],
    answer: `AmbiSprout's vision is to create a future where sustainable living becomes a natural part of everyday life rather than an occasional effort.\n\nThrough AI guidance, education, and behavioral engagement, AmbiSprout aims to inspire millions of people to make informed choices that contribute to a healthier planet for present and future generations 🌟`,
  },
];
