import hydrogenTrainImg from './assets/news/hydrogen_train.png';

// Static content for the AmbiSprout homepage, ported from the design component.

export const features = [
  {
    id: 'coach',
    icon: 'bot',
    title: 'AI Sustainability Coach',
    desc: 'Your always-on companion that turns your routine into personalized daily missions and nudges you toward greener habits.',
    href: '#sprout-ai',
    cta: 'Meet Sprout',
  },
  {
    id: 'carbon',
    icon: 'globe',
    title: 'Carbon Footprint Calculator',
    desc: 'See the real CO₂ impact of your travel, food, and shopping — then watch it shrink as you complete missions.',
    href: '#sprout-ai',
    cta: 'Track impact',
  },
  {
    id: 'image',
    icon: 'camera',
    title: 'AI Image Verification',
    desc: 'Snap a photo to prove a task is done — our AI verifies it instantly and credits your streak.',
    href: '#sprout-ai',
    cta: 'Learn more',
  },
  {
    id: 'receipt',
    icon: 'receipt',
    title: 'AI Receipt Analysis',
    desc: 'Scan a bill and get an instant read on your shopping footprint with greener swap suggestions.',
    href: '#sprout-ai',
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

export const defaultFallbackReply = `I'm currently operating in offline guide mode 🌱 

Here are a few quick ways to get started with sustainable living today:
• **Green Commute**: Swap 1 motor trip for walking, cycling, or public transit to save ~1.5 kg CO₂.
• **Zero Single-Use**: Carry a reusable water bottle and cloth tote bag on daily errands.
• **Energy Smart**: Unplug idle electronics to reduce phantom power draw.

Feel free to pick one of the quick question chips below or ask me about AmbiSprout's vision and features!`;

export const chatReplies = [
  'Swapping single-use plastics for reusable alternatives is one of the easiest ways to make a daily difference. Small habits add up fast! 🌿',
  'Did you know? Walking or biking twice a week can save up to 1.2 kg of CO₂ every week. Would you like to set a green commute goal?',
  'Composting kitchen waste reduces landfill methane and enriches garden soil naturally. I can help guide you through easy home composting tips! 🍃',
  'You are doing great! Every verified green action brings India closer to a zero-carbon future. Keep the green streak going! ✨',
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
    answer: `To build India's largest and most trusted AI-Powered Green Commerce ecosystem that transforms Sustainable intent into everyday action through intelligent guidance, community engagement, verified environmental impact and Rewarding Economic Opportunities. 🌟`,
  },
];

// Eco Pulse News Categories
export const ecoNewsCategories = [
  'All',
  'Renewable Energy',
  'Green Mobility',
  'India Eco Tech',
  'Climate Policy',
  'Circular Economy',
];

// Initial Eco Pulse News Stories
export const initialEcoNewsData = [
  {
    id: 'news-1',
    isHeadline: true,
    title: 'India’s First Indigenously Designed Hydrogen-Powered Train Flagged Off on Jind-Sonipat Route',
    subtitle: 'The 10-coach "Namo Green Rail" runs on a 1,200 kW hydrogen fuel cell propulsion system, emitting only water vapor.',
    category: 'Green Mobility',
    source: 'Indian Railways / PIB',
    readTime: '3 min read',
    timestamp: 'Just now',
    imageUrl: hydrogenTrainImg,
    sentiment: 'Positive Breakthrough',
    summary: 'India’s first indigenously designed hydrogen-powered train was flagged off to operate on the 89-km Jind-Sonipat route in Haryana. The 10-coach "Namo Green Rail" runs on a 1,200 kW hydrogen fuel cell propulsion system, emitting only water vapor and carrying up to 2,600 passengers.\n\nUnlike traditional diesel-powered locomotives or electric trains relying on overhead cables, hydrogen trains generate their own electricity onboard. A Proton Exchange Membrane (PEM) fuel cell mixes hydrogen and oxygen, with electricity as the byproduct and harmless water vapor as the only emission.\n\nThe pilot rollout between Jind and Sonipat is a key milestone for Indian Railways’ "Hydrogen for Heritage" mission. Not only does this reduce the carbon footprint, but the train is also equipped with regenerative braking, which recovers kinetic energy during stops and stores it in onboard batteries to improve efficiency. The launch places India among an elite group of nations—including Germany, Japan, China, and the US—that are pioneering hydrogen rail mobility.',
    aiTakeaways: [
      '🚆 10-coach "Namo Green Rail" operates on 89-km Jind-Sonipat route carrying 2,600 passengers.',
      '⚡ 1,200 kW PEM fuel cell mixes hydrogen & oxygen, generating electricity with zero carbon emissions.',
      '🌏 Regenerative braking recovers kinetic energy into onboard batteries for maximum energy efficiency.'
    ],
    mission: 'Choose public transit or e-mobility for your next city commute'
  },
  /*
  {
    id: 'news-2',
    isHeadline: false,
    title: 'Bengaluru Lake Restoration Project Revives 12 Urban Wetlands',
    subtitle: 'Community-led desilting and native tree planting restore groundwater levels across East Bengaluru.',
    category: 'Local India',
    source: 'Deccan Herald',
    readTime: '4 min read',
    timestamp: '5 hours ago',
    imageUrl: 'https://images.unsplash.com/photo-1544860707-c13c32d24d45?auto=format&fit=crop&w=800&q=80',
    sentiment: 'Community Win',
    coinReward: 20,
    summary: 'A joint initiative between citizen volunteer networks and civic authorities has successfully rejuvenated 12 interconnected urban lakes in Bengaluru using bio-remediation floating islands.',
    aiTakeaways: [
      '🌊 Lake recharge improved local groundwater tables by 1.8 meters.',
      '🦆 Over 40 species of migratory birds returned to urban wetland zones.',
      '🌿 What you can do: Join local wetland cleanup drives this weekend.'
    ],
    mission: 'Participate in a local neighborhood tree or lake cleanup'
  },
  {
    id: 'news-3',
    isHeadline: false,
    title: 'PM-Surya Ghar Scheme Drives 1 Million Rooftop Solar Installations',
    subtitle: 'Subsidies up to ₹78,000 empower urban households to generate zero-emission electricity.',
    category: 'Climate Policy',
    source: 'Economic Times',
    readTime: '2 min read',
    timestamp: '8 hours ago',
    imageUrl: 'https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=800&q=80',
    sentiment: 'Positive Breakthrough',
    coinReward: 15,
    summary: 'The national rooftop solar initiative has crossed 1 million residential applications. Households report up to 80% reductions in monthly power bills while feeding excess clean energy back to the grid.',
    aiTakeaways: [
      '☀️ Direct financial subsidy provided for up to 3kW home solar setups.',
      '💡 Average residential savings: ₹2,500/month on electricity bills.',
      '🌱 What you can do: Check rooftop solar eligibility for your pincode.'
    ],
    mission: 'Check your rooftop solar eligibility or turn off unused appliances'
  },
  {
    id: 'news-4',
    isHeadline: false,
    title: 'Delhi Adds 500 Low-Floor Electric Buses to Public Transport Network',
    subtitle: 'Capital city moves closer to goal of 80% electric public transit fleet by end of 2026.',
    category: 'Green Mobility',
    source: 'NDTV Green',
    readTime: '3 min read',
    timestamp: '12 hours ago',
    imageUrl: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80',
    sentiment: 'Positive Breakthrough',
    coinReward: 20,
    summary: 'Delhi Transport Corporation inducted 500 air-conditioned electric buses equipped with real-time GPS tracking and zero tailpipe emissions, replacing aging diesel transit routes.',
    aiTakeaways: [
      '🚌 Cuts city diesel consumption by 14,000 liters every single day.',
      '📱 Integrated seamlessly with unified public transit pass apps.',
      '🌱 What you can do: Take public transit for your next 3 city trips.'
    ],
    mission: 'Swap 1 personal vehicle trip for metro or e-bus ride'
  },
  {
    id: 'news-5',
    isHeadline: false,
    title: 'IIT Madras Researchers Create Seaweed-Based Biodegradable Packaging',
    subtitle: 'New eco-material degrades in 30 days and offers waterproof protection for food delivery.',
    category: 'India Eco Tech',
    source: 'The Hindu Tech',
    readTime: '4 min read',
    timestamp: '1 day ago',
    imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80',
    sentiment: 'Innovation Spotlight',
    coinReward: 25,
    summary: 'Biotechnology researchers at IIT Madras have patented a 100% home-compostable film made from red marine algae. Leading e-commerce and food apps are trialing the material for packaging.',
    aiTakeaways: [
      '🧪 Completely dissolves in soil within 30 days without microplastics.',
      '📦 Costs only 10% more than traditional plastic with mass production.',
      '🌱 What you can do: Request plastic-free packaging on online orders.'
    ],
    mission: 'Choose plastic-free packaging options on your next delivery'
  }
  */
];

