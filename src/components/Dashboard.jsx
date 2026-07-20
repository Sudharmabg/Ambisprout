import React, { useState, useEffect, useRef } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [coins, setCoins] = useState(4820);
  const [ecoScore, setEcoScore] = useState(92);
  const [ecoRingPct, setEcoRingPct] = useState(92);
  const [streak, setStreak] = useState(16);
  const [missionsToday, setMissionsToday] = useState(3);
  const [ringPct, setRingPct] = useState(60);
  const [missionsTotal, setMissionsTotal] = useState(47);
  const [todayMissionDone, setTodayMissionDone] = useState(false);
  const [toast, setToast] = useState(null);
  const [islandNight, setIslandNight] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [aiThinking, setAiThinking] = useState(false);
  const [aiInputText, setAiInputText] = useState('');
  const [notifOpen, setNotifOpen] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [islandTilt, setIslandTilt] = useState({ rx: 0, ry: 0 });
  const [plantedExtras, setPlantedExtras] = useState([]);
  const [treeShake, setTreeShake] = useState({ 1: false, 2: false });
  const [treeHover, setTreeHover] = useState({ 1: false, 2: false });
  const aiScrollRef = useRef(null);
  const toastTimeoutRef = useRef(null);

  const [aiMessages, setAiMessages] = useState([
    { from: 'ai', text: "Hi Sudharma! I'm Sprout 🌱 Ask me anything about your habits or today's mission." }
  ]);

  const [notifications, setNotifications] = useState([
    { icon: '🎉', text: 'Mission Completed — Reusable Bottle', time: '10 min ago', unread: true },
    { icon: '🔥', text: 'Streak increased to 16 days', time: '1h ago', unread: true },
    { icon: '🌍', text: 'Community Challenge Started: Plastic-Free Week', time: '3h ago', unread: true },
    { icon: '🪙', text: '+20 Sprout Coins earned', time: 'Today', unread: false }
  ]);

  const [community, setCommunity] = useState([
    { name: 'Ananya R.', action: 'completed Plastic-Free Week', emoji: '🎉', time: '2h ago', initial: 'A', color: '#2E7D32', likes: 24, liked: false, commentsOpen: false, draft: '', comments: [{ name: 'Rahul', text: 'Amazing streak! 🙌' }] },
    { name: 'Rahul K.', action: 'planted his first tree', emoji: '🌳', time: '4h ago', initial: 'R', color: '#5C9A3F', liked: false, likes: 41, commentsOpen: false, draft: '', comments: [] },
    { name: 'Diya M.', action: 'recycled 8 kg of plastic', emoji: '♻️', time: '6h ago', initial: 'D', color: '#C8A96A', liked: false, likes: 18, commentsOpen: false, draft: '', comments: [] },
    { name: 'Aarav S.', action: 'reached a 30-day streak', emoji: '🔥', time: 'Yesterday', initial: 'A', color: '#67B346', liked: false, likes: 52, commentsOpen: false, draft: '', comments: [{ name: 'Meera', text: 'Incredible consistency!' }] },
    { name: 'Meera P.', action: 'joined the Water Warrior challenge', emoji: '💧', time: 'Yesterday', initial: 'M', color: '#1B4332', liked: false, likes: 15, commentsOpen: false, draft: '', comments: [] }
  ]);

  const stages = [
    { icon: '🌍', name: 'Seed' },
    { icon: '🌱', name: 'Sprout' },
    { icon: '🌿', name: 'Plant' },
    { icon: '🌳', name: 'Tree' },
    { icon: '🌲', name: 'Forest' },
    { icon: '🌎', name: 'Planet Guardian' }
  ];

  const missionPool = [
    { name: "🌱 Carry a reusable bottle", time: '5 Minutes', difficulty: 'Easy', reward: 20, impact: '0.3 kg CO₂ Reduction' },
    { name: '🚴 Cycle to work today', time: '20 Minutes', difficulty: 'Medium', reward: 35, impact: '0.8 kg CO₂ Reduction' },
    { name: '🥗 Eat a plant-based lunch', time: 'Lunchtime', difficulty: 'Easy', reward: 25, impact: '1.1 kg CO₂ Reduction' },
    { name: '💡 Unplug idle chargers tonight', time: '2 Minutes', difficulty: 'Easy', reward: 15, impact: '0.2 kg CO₂ Reduction' },
    { name: '🛍 Shop with a cloth bag', time: 'All day', difficulty: 'Easy', reward: 20, impact: '0.2 kg CO₂ Reduction' }
  ];

  const blogsData = [
    { icon: '🌧️', tag: 'Guide', title: '5 Ways to Cut Your Carbon Footprint This Monsoon', read: '4 min read' },
    { icon: '♻️', tag: 'Community', title: 'Meet the Bengaluru Group Composting 2 Tonnes a Month', read: '6 min read' },
    { icon: '🌱', tag: 'Motivation', title: 'Why Small Daily Missions Beat Big Resolutions', read: '3 min read' }
  ];

  const achievementsData = [
    { icon: '🌱', name: 'Water Warrior', desc: 'Completed 10 water-saving missions', unlocked: true, status: 'Earned 2 days ago' },
    { icon: '♻️', name: 'Recycling Champion', desc: 'Recycled 25kg+ of plastic', unlocked: true, status: 'Earned 1 week ago' },
    { icon: '🚲', name: 'Green Commuter', desc: 'Take 10 eco-friendly rides', unlocked: false, status: '7 / 10 rides' },
    { icon: '🌳', name: 'Tree Guardian', desc: 'Plant 5 trees with AmbiSprout', unlocked: false, status: '2 / 5 trees' },
    { icon: '🏆', name: 'Earth Protector', desc: 'Keep Eco Score 95+ for 30 days', unlocked: false, status: '12 / 30 days' }
  ];

  const recommendedMissions = [
    { icon: '🚲', name: 'Walk 3 km instead of driving', time: '15 min', difficulty: 'Easy', reward: 30, impact: '0.6 kg CO₂', done: false },
    { icon: '💡', name: 'Switch off unused lights today', time: '2 min', difficulty: 'Easy', reward: 10, impact: '0.1 kg CO₂', done: false },
    { icon: '🥗', name: 'Try a plant-based meal', time: '20 min', difficulty: 'Medium', reward: 25, impact: '1.2 kg CO₂', done: false },
    { icon: '🛍', name: 'Skip single-use plastic bags', time: 'All day', difficulty: 'Easy', reward: 15, impact: '0.2 kg CO₂', done: false }
  ];

  const [recommended, setRecommended] = useState(recommendedMissions);

  const aiReplies = {
    'How can I reduce my carbon footprint?': "Try walking or cycling for trips under 3km, and switch off devices when idle — small swaps like these can cut your footprint by 15% this month.",
    "Recommend today's mission": "Based on your streak, I'd suggest 'Skip single-use plastic bags' — it's quick and pairs well with your recycling habits.",
    'Analyze my receipt': "Upload a photo of your receipt and I'll flag high-impact items and suggest greener swaps next time.",
    'Suggest eco-friendly products': "Look for FSC-certified paper goods and refillable containers — I can recommend a few India-based brands if you'd like."
  };

  const showToast = (text) => {
    setToast(text);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => setToast(null), 2600);
  };

  const worldStage = () => {
    const idx = Math.min(5, Math.max(0, Math.floor(missionsTotal / 15)));
    return idx;
  };

  const currentMission = missionPool[Math.floor(Date.now() / 86400000) % missionPool.length];
  const stageIdx = worldStage();
  const stage = stages[stageIdx];
  const nextThreshold = (stageIdx + 1) * 15;

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good Morning ☀️';
    if (h < 17) return 'Good Afternoon 🌤';
    return 'Good Evening 🌙';
  })();

  const theme = darkMode
    ? {
        pageBg: '#0F2A1C',
        cardBg: '#153826',
        border: '#28503C',
        text: '#EAF3EC',
        subtext: '#9FC2AE',
        navBg: 'rgba(15,42,28,0.94)',
        brand: '#B7E6A6',
        welcomeGrad: 'linear-gradient(120deg,#16391f,#123024)',
        impactCardBg: '#123024',
        hoverBg: '#1D4530'
      }
    : {
        pageBg: '#F7F3E9',
        cardBg: '#fff',
        border: '#E8DFC8',
        text: '#2F3A3D',
        subtext: '#9AA5A0',
        navBg: 'rgba(247,243,233,0.92)',
        brand: '#1B4332',
        welcomeGrad: 'linear-gradient(120deg,#FFFDF7,#F1ECDA)',
        impactCardBg: '#FFFDF7',
        hoverBg: '#F7F3E9'
      };

  const handleStartTodayMission = () => {
    if (todayMissionDone) return;
    setMissionsToday(prev => Math.min(5, prev + 1));
    setCoins(prev => prev + currentMission.reward);
    setEcoScore(prev => Math.min(100, prev + 1));
    setMissionsTotal(prev => prev + 1);
    setTodayMissionDone(true);
    showToast(`🎉 Mission complete! +${currentMission.reward} Sprout Coins`);
  };

  const handleSkipMission = () => {
    showToast('Mission skipped — see you tomorrow!');
  };

  const handleStartRecMission = (i) => {
    if (recommended[i].done) return;
    const m = recommended[i];
    const updated = recommended.map((r, idx) => (idx === i ? { ...r, done: true } : r));
    setRecommended(updated);
    setCoins(prev => prev + m.reward);
    setMissionsTotal(prev => prev + 1);
    showToast(`+${m.reward} Sprout Coins earned!`);
  };

  const handleToggleLike = (i) => {
    setCommunity(prev =>
      prev.map((c, idx) =>
        idx === i ? { ...c, liked: !c.liked, likes: c.likes + (c.liked ? -1 : 1) } : c
      )
    );
  };

  const handleToggleComment = (i) => {
    setCommunity(prev =>
      prev.map((c, idx) => (idx === i ? { ...c, commentsOpen: !c.commentsOpen } : c))
    );
  };

  const handleDraftChange = (i, val) => {
    setCommunity(prev =>
      prev.map((c, idx) => (idx === i ? { ...c, draft: val } : c))
    );
  };

  const handlePostComment = (i) => {
    setCommunity(prev =>
      prev.map((c, idx) =>
        idx === i && c.draft.trim()
          ? { ...c, comments: [...c.comments, { name: 'You', text: c.draft.trim() }], draft: '' }
          : c
      )
    );
  };

  const handleShakeTree = (id) => {
    if (treeShake[id]) return;
    setTreeShake(prev => ({ ...prev, [id]: true }));
    showToast('🌳 Your forest thrives!');
    setTimeout(() => setTreeShake(prev => ({ ...prev, [id]: false })), 1000);
  };

  const handlePlantExtra = () => {
    if (coins < 100) {
      showToast('Not enough coins — earn more from missions!');
      return;
    }
    const icons = ['🌸', '🌾', '🌻', '🍀'];
    const icon = icons[plantedExtras.length % icons.length];
    const left = 12 + Math.random() * 76;
    const bottom = 90 + Math.random() * 40;
    setPlantedExtras(prev => [...prev, { icon, style: `position:absolute;bottom:${bottom}px;left:${left}%;font-size:22px;animation:popIn 0.4s ease;` }]);
    setCoins(prev => prev - 100);
    showToast('🌸 New growth added to your world!');
  };

  const handleIslandMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setIslandTilt({ rx: y * -6, ry: x * 8 });
  };

  const handleIslandMouseLeave = () => {
    setIslandTilt({ rx: 0, ry: 0 });
  };

  const handleSendPrompt = (label) => {
    const reply = aiReplies[label] || "That's a great question — I'm learning more about that every day!";
    setAiMessages(prev => [...prev, { from: 'user', text: label }]);
    setAiThinking(true);
    setTimeout(() => {
      setAiMessages(prev => [...prev, { from: 'ai', text: reply }]);
      setAiThinking(false);
      if (aiScrollRef.current) {
        setTimeout(() => {
          aiScrollRef.current.scrollTop = aiScrollRef.current.scrollHeight;
        }, 50);
      }
    }, 900);
  };

  const handleSendAiInput = () => {
    const text = aiInputText.trim();
    if (!text) return;
    setAiInputText('');
    handleSendPrompt(text);
  };

  const handleAiInputKeyDown = (e) => {
    if (e.key === 'Enter') handleSendAiInput();
  };

  const markNotifRead = (i) => {
    setNotifications(prev =>
      prev.map((n, idx) => (idx === i ? { ...n, unread: false } : n))
    );
  };

  const clearAllNotifs = () => {
    setNotifications([]);
  };

  const hasUnread = notifications.some(n => n.unread);

  return (
    <div style={{ fontFamily: "'Manrope',sans-serif", color: theme.text, background: theme.pageBg, minHeight: '100vh', overflowX: 'hidden', position: 'relative', transition: 'background 0.4s ease,color 0.4s ease' }}>
      {/* NAV */}
      <div style={{ position: 'sticky', top: 0, zIndex: 60, background: theme.navBg, backdropFilter: 'blur(10px)', borderBottom: `1px solid ${theme.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 48px', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '26px', height: '26px', background: '#2E7D32', borderRadius: '0 50% 50% 50%', transform: 'rotate(-45deg)' }}></div>
          <span style={{ fontFamily: "'Playfair Display',serif", fontSize: '20px', fontWeight: 700, color: theme.brand }}>AmbiSprout</span>
        </div>
        <div style={{ display: 'flex', gap: '26px', flexWrap: 'wrap' }}>
          <a href="#" style={{ color: theme.brand, fontWeight: 700, fontSize: '14px', textDecoration: 'none', borderBottom: '2px solid #2E7D32', paddingBottom: '4px' }}>Home</a>
          <a href="#missions" style={{ color: theme.subtext, fontWeight: 600, fontSize: '14px', textDecoration: 'none' }}>Missions</a>
          <a href="#blogs" style={{ color: theme.subtext, fontWeight: 600, fontSize: '14px', textDecoration: 'none' }}>Blogs</a>
          <a href="#community" style={{ color: theme.subtext, fontWeight: 600, fontSize: '14px', textDecoration: 'none' }}>Community</a>
          <a href="#" style={{ color: theme.subtext, fontWeight: 600, fontSize: '14px', textDecoration: 'none' }}>Challenges</a>
          <a href="#" style={{ color: theme.subtext, fontWeight: 600, fontSize: '14px', textDecoration: 'none' }}>Profile</a>
        </div>
        <div style={{ display: 'flex', gap: '14px', alignItems: 'center', position: 'relative' }}>
          <button onClick={() => setDarkMode(!darkMode)} style={{ background: theme.cardBg, border: `1px solid ${theme.border}`, width: '38px', height: '38px', borderRadius: '50%', cursor: 'pointer', fontSize: '15px', fontFamily: 'inherit' }}>
            {darkMode ? '☀️' : '🌙'}
          </button>
          <div style={{ position: 'relative' }}>
            <button onClick={() => setNotifOpen(!notifOpen)} style={{ background: theme.cardBg, border: `1px solid ${theme.border}`, width: '38px', height: '38px', borderRadius: '50%', cursor: 'pointer', fontSize: '16px', position: 'relative', fontFamily: 'inherit', fontWeight: 'bold' }}>
              🔔
              {hasUnread && (
                <span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '9px', height: '9px', background: '#E85D4C', borderRadius: '50%', border: `2px solid ${theme.pageBg}` }}></span>
              )}
            </button>
            {notifOpen && (
              <div style={{ position: 'absolute', top: '48px', right: 0, width: '300px', background: theme.cardBg, borderRadius: '16px', boxShadow: '0 16px 40px rgba(15,93,62,0.18)', border: `1px solid ${theme.border}`, padding: '10px', zIndex: 70 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 10px 8px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: theme.brand }}>Notifications</div>
                  <button onClick={clearAllNotifs} style={{ background: 'transparent', border: 'none', color: theme.subtext, fontSize: '11px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                    Clear all
                  </button>
                </div>
                {notifications.length > 0 ? (
                  notifications.map((n, i) => (
                    <div key={i} onClick={() => markNotifRead(i)} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '8px 10px', borderRadius: '10px', cursor: 'pointer', background: 'transparent' }}>
                      <span style={{ fontSize: '16px' }}>{n.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '12.5px', fontWeight: n.unread ? 800 : 600, color: theme.text }}>{n.text}</div>
                        <div style={{ fontSize: '11px', color: theme.subtext, marginTop: '2px' }}>{n.time}</div>
                      </div>
                      {n.unread && (
                        <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#2E7D32', marginTop: '5px', flexShrink: 0 }}></span>
                      )}
                    </div>
                  ))
                ) : (
                  <div style={{ padding: '20px 10px', textAlign: 'center', fontSize: '12.5px', color: theme.subtext }}>You're all caught up 🌿</div>
                )}
              </div>
            )}
          </div>
          <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#2E7D32', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '14px', fontFamily: "'Playfair Display',serif", cursor: 'pointer' }}>
            S
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '28px 48px 100px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
        {/* WELCOME CARD */}
        <div style={{ background: theme.welcomeGrad, border: `1px solid ${theme.border}`, borderRadius: '26px', padding: '32px 36px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', minHeight: '190px', position: 'relative', overflow: 'hidden', flexWrap: 'wrap' }}>
          <span style={{ position: 'absolute', top: '16%', right: '22%', fontSize: '20px', opacity: 0.5, animation: 'leafFloat 5s ease-in-out infinite' }}>🍃</span>
          <span style={{ position: 'absolute', bottom: '12%', right: '38%', fontSize: '14px', opacity: 0.4, animation: 'leafFloat 6.5s ease-in-out infinite 0.8s' }}>🍃</span>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#2E7D32', marginBottom: '6px' }}>{greeting}</div>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: '32px', fontWeight: 700, color: theme.brand, margin: '0 0 8px' }}>Welcome back, Sudharma 👋</h1>
            <p style={{ color: theme.subtext, fontSize: '15px', margin: '0 0 12px' }}>Ready to make today a little greener?</p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(46,125,50,0.12)', padding: '7px 14px', borderRadius: '999px' }}>
              <span style={{ fontSize: '14px' }}>{stage.icon}</span>
              <span style={{ fontSize: '12.5px', fontWeight: 700, color: theme.brand }}>{stage.name} stage</span>
            </div>
          </div>
          <div style={{ position: 'relative', zIndex: 1, width: '110px', height: '110px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '96px', height: '96px', borderRadius: '50%', background: theme.cardBg, border: `4px solid ${theme.border}`, overflow: 'hidden', animation: 'breathe 4s ease-in-out infinite', boxShadow: '0 10px 24px rgba(15,93,62,0.14)' }}>
              <img src="images/sprout-companion.jpeg" alt="Sprout mascot" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{ position: 'absolute', bottom: '2px', right: '0px', width: '28px', height: '28px', background: '#2E7D32', borderRadius: '50%', border: `3px solid ${theme.cardBg}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', transformOrigin: 'bottom center', animation: 'waveArm 2.4s ease-in-out infinite' }}>
              👋
            </div>
          </div>
        </div>

        {!isNewUser && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            {/* TODAY'S MISSION */}
            <div id="missions" style={{ background: '#1B4332', borderRadius: '26px', padding: '30px 36px', color: '#fff', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-40%', right: '-6%', width: '280px', height: '280px', background: 'radial-gradient(circle,rgba(76,175,80,0.35),transparent 70%)' }}></div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', position: 'relative', zIndex: 1, flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.06em', color: '#8FCB7A', textTransform: 'uppercase', marginBottom: '10px' }}>Today's Mission</div>
                  {todayMissionDone ? (
                    <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '26px', fontWeight: 700, margin: '0 0 14px' }}>✅ Mission complete — nice work!</h2>
                  ) : (
                    <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '26px', fontWeight: 700, margin: '0 0 14px' }}>{currentMission.name}</h2>
                  )}
                  <div style={{ display: 'flex', gap: '22px', flexWrap: 'wrap' }}>
                    <div style={{ fontSize: '13px', color: '#D7E8D2' }}>⏱ {currentMission.time}</div>
                    <div style={{ fontSize: '13px', color: '#D7E8D2' }}>📊 {currentMission.difficulty}</div>
                    <div style={{ fontSize: '13px', color: '#D7E8D2' }}>🪙 +{currentMission.reward} Sprout Coins</div>
                    <div style={{ fontSize: '13px', color: '#D7E8D2' }}>🌍 {currentMission.impact}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  {!todayMissionDone ? (
                    <>
                      <button onClick={handleSkipMission} style={{ background: 'transparent', border: '1.5px solid rgba(255,255,255,0.4)', color: '#fff', padding: '14px 22px', borderRadius: '14px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', fontFamily: 'inherit' }}>
                        Skip
                      </button>
                      <button onClick={handleStartTodayMission} style={{ background: '#67B346', border: 'none', color: '#0F2A1C', padding: '14px 26px', borderRadius: '14px', fontWeight: 800, fontSize: '14px', cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 10px 22px rgba(103,179,70,0.35)' }}>
                        Start Mission
                      </button>
                    </>
                  ) : (
                    <div style={{ background: 'rgba(103,179,70,0.2)', border: '1.5px solid #67B346', color: '#B7E6A6', padding: '14px 24px', borderRadius: '14px', fontWeight: 700, fontSize: '14px' }}>
                      🎉 +{currentMission.reward} Coins earned
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* DAILY PROGRESS */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(230px,1fr))', gap: '18px' }}>
              <div style={{ background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: '22px', padding: '22px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '66px', height: '66px', borderRadius: '50%', background: `conic-gradient(#2E7D32 ${ringPct * 3.6}deg, ${theme.border} 0deg)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.15s linear' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: theme.cardBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 800, color: theme.brand }}>{Math.round(ringPct)}%</div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: theme.subtext, fontWeight: 700 }}>Daily Progress</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: theme.text }}>{missionsToday} of 5 missions</div>
                </div>
              </div>
              <div style={{ background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: '22px', padding: '22px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ fontSize: '34px', animation: 'flicker 1.8s ease-in-out infinite' }}>🔥</div>
                <div>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: theme.brand, fontFamily: "'Playfair Display',serif" }}>{streak} Day Streak</div>
                  <div style={{ fontSize: '12px', color: theme.subtext, fontWeight: 600 }}>Don't break the chain</div>
                </div>
              </div>
              <div style={{ background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: '22px', padding: '22px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ fontSize: '30px', animation: 'sparkle 2.2s ease-in-out infinite' }}>🪙</div>
                <div>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: theme.brand, fontFamily: "'Playfair Display',serif", animation: 'countPop 0.4s ease' }}>{coins.toLocaleString('en-IN')}</div>
                  <div style={{ fontSize: '12px', color: theme.subtext, fontWeight: 600 }}>Sprout Coins</div>
                </div>
              </div>
              <div style={{ background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: '22px', padding: '22px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: `conic-gradient(#2E7D32 ${ecoRingPct * 3.6}deg, ${theme.border} 0deg)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.15s linear' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: theme.cardBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800, color: theme.brand }}>{ecoScore}</div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: theme.subtext, fontWeight: 700 }}>Eco Score</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#2E7D32' }}>
                    {ecoScore >= 90 ? 'Excellent 🌱' : ecoScore >= 70 ? 'Good 🌿' : 'Getting there 🌾'}
                  </div>
                </div>
              </div>
            </div>

            {/* MY LIVING WORLD */}
            <div onMouseMove={handleIslandMouseMove} onMouseLeave={handleIslandMouseLeave} style={{ background: islandNight ? 'linear-gradient(180deg,#0B2038,#123024 70%)' : 'linear-gradient(180deg,#DCEEF5,#F7F3E9 70%)', border: `1px solid ${theme.border}`, borderRadius: '26px', padding: '26px 30px 0', position: 'relative', overflow: 'hidden', height: '440px', transition: 'background 0.5s ease' }}>
              <div style={{ position: 'relative', zIndex: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.05em', color: '#2E7D32', textTransform: 'uppercase', marginBottom: '6px' }}>My Living World</div>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '20px', fontWeight: 700, color: islandNight ? '#EAF3EC' : '#1B4332' }}>{stage.icon} {stage.name} Stage</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '12px', color: islandNight ? '#9FC2AE' : '#6B7280' }}>{missionsTotal} missions completed</div>
                    <div style={{ fontSize: '11px', color: islandNight ? '#9FC2AE' : '#6B7280', opacity: 0.8 }}>
                      {stageIdx < 5 ? `${nextThreshold - missionsTotal} missions to ${stages[stageIdx + 1].name}` : 'Max stage reached 🌎'}
                    </div>
                  </div>
                  <button onClick={() => setIslandNight(!islandNight)} style={{ background: 'rgba(255,255,255,0.6)', border: 'none', width: '34px', height: '34px', borderRadius: '50%', cursor: 'pointer', fontSize: '14px', flexShrink: 0, fontFamily: 'inherit' }}>
                    {islandNight ? '☀️' : '🌙'}
                  </button>
                  <button onClick={handlePlantExtra} style={{ background: '#2E7D32', color: '#fff', border: 'none', padding: '9px 14px', borderRadius: '12px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>
                    🌱 Plant (100🪙)
                  </button>
                </div>
              </div>

              {!islandNight && (
                <>
                  <div style={{ position: 'absolute', top: '8%', right: '10%', width: '70px', height: '70px', borderRadius: '50%', background: 'radial-gradient(circle,#FFE9A8,#F3C969)', boxShadow: '0 0 50px 18px rgba(243,201,105,0.45)' }}></div>
                  <div style={{ position: 'absolute', top: '14%', left: '12%', width: '70px', height: '22px', borderRadius: '40px', background: 'rgba(255,255,255,0.85)', filter: 'blur(1px)', animation: 'cloudDrift 8s ease-in-out infinite alternate' }}></div>
                  <div style={{ position: 'absolute', top: '22%', left: '34%', width: '46px', height: '16px', borderRadius: '40px', background: 'rgba(255,255,255,0.7)', filter: 'blur(1px)', animation: 'cloudDrift2 10s ease-in-out infinite alternate' }}></div>
                </>
              )}

              {islandNight && (
                <>
                  <div style={{ position: 'absolute', top: '8%', right: '10%', width: '56px', height: '56px', borderRadius: '50%', background: 'radial-gradient(circle,#F4F1E0,#D9D6C4)', boxShadow: '0 0 40px 14px rgba(217,214,196,0.35)' }}></div>
                  {Array.from({ length: 14 }).map((_, i) => (
                    <div key={`star-${i}`} style={{ position: 'absolute', top: `${Math.random() * 40}%`, left: `${Math.random() * 100}%`, width: `${1.5 + Math.random() * 1.8}px`, height: `${1.5 + Math.random() * 1.8}px`, borderRadius: '50%', background: '#fff', opacity: 0.55, animation: `twinkle ${2 + Math.random() * 2.5}s ease-in-out infinite ${Math.random() * 3}s` }}></div>
                  ))}
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={`firefly-${i}`} style={{ position: 'absolute', top: `${55 + Math.random() * 35}%`, left: `${10 + Math.random() * 80}%`, width: '4px', height: '4px', borderRadius: '50%', background: '#F3E9A8', boxShadow: '0 0 6px 2px rgba(243,233,168,0.8)', animation: `fireflyDrift ${3 + Math.random() * 2.5}s ease-in-out infinite ${Math.random() * 3}s` }}></div>
                  ))}
                </>
              )}

              <div style={{ transform: `perspective(900px) rotateX(${islandTilt.rx}deg) rotateY(${islandTilt.ry}deg)`, transition: 'transform 0.3s ease', position: 'absolute', left: '50%', bottom: '10px', width: '520px', height: '260px', marginLeft: '-260px' }}>
                <div style={{ position: 'absolute', bottom: 0, left: '6%', width: '88%', height: '120px', borderRadius: '50%', background: islandNight ? 'radial-gradient(ellipse at 50% 40%,#2C5A72,#1B3A4A)' : 'radial-gradient(ellipse at 50% 40%,#8FCBE0,#5FA9C7)', opacity: 0.9 }}></div>
                <div style={{ position: 'absolute', bottom: '36px', left: '16%', width: '20%', height: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.55)', animation: 'ripple 3s ease-in-out infinite' }}></div>
                <div style={{ position: 'absolute', bottom: '24px', left: '56%', width: '16%', height: '6px', borderRadius: '50%', background: 'rgba(255,255,255,0.5)', animation: 'ripple 3.6s ease-in-out infinite 0.6s' }}></div>
                <div style={{ position: 'absolute', bottom: '34px', left: '14%', width: '72%', height: '160px', borderRadius: '50%', background: islandNight ? 'radial-gradient(ellipse at 50% 0%,#3E5B32,#2C4322 60%,#4A3626 100%)' : 'radial-gradient(ellipse at 50% 0%,#8FC15C,#5C9A3F 60%,#7A5C3E 100%)', boxShadow: '0 24px 40px rgba(15,93,62,0.25)' }}></div>

                {stageIdx >= 1 && <div style={{ position: 'absolute', bottom: '120px', left: '47%', fontSize: '30px' }}>🌱</div>}
                {stageIdx >= 2 && (
                  <>
                    <div style={{ position: 'absolute', bottom: '100px', left: '30%', fontSize: '22px' }}>🌿</div>
                    <div style={{ position: 'absolute', bottom: '96px', left: '64%', fontSize: '22px' }}>🌸</div>
                  </>
                )}
                {stageIdx >= 3 && (
                  <>
                    <div onClick={() => handleShakeTree(1)} onMouseEnter={() => setTreeHover(prev => ({ ...prev, 1: true }))} onMouseLeave={() => setTreeHover(prev => ({ ...prev, 1: false }))} style={{ position: 'absolute', bottom: '88px', left: '20%', width: '70px', height: '90px', cursor: 'pointer' }}>
                      <div style={{ position: 'absolute', bottom: 0, left: 0, fontSize: '46px', transformOrigin: 'bottom center', animation: treeShake[1] ? 'treeShake 1s ease-in-out' : 'treeSway 4s ease-in-out infinite' }}>🌳</div>
                      {treeShake[1] && (
                        <>
                          <span style={{ position: 'absolute', top: 0, left: '10%', fontSize: '13px', animation: 'leafFall 1.1s ease-in forwards' }}>🍃</span>
                          <span style={{ position: 'absolute', top: '6px', left: '55%', fontSize: '11px', animation: 'leafFall 1.3s ease-in forwards 0.1s' }}>🍃</span>
                          <span style={{ position: 'absolute', top: '2px', left: '35%', fontSize: '12px', animation: 'leafFall 1s ease-in forwards 0.2s' }}>🍃</span>
                        </>
                      )}
                      {treeHover[1] && (
                        <div style={{ position: 'absolute', top: '-30px', left: '50%', transform: 'translateX(-50%)', background: '#1B4332', color: '#fff', fontSize: '10.5px', fontWeight: 700, padding: '4px 9px', borderRadius: '8px', whiteSpace: 'nowrap' }}>
                          Tap to shake 🌳
                        </div>
                      )}
                    </div>
                    <div style={{ position: 'absolute', bottom: '106px', left: '32%', fontSize: '15px', animation: 'birdPeck 3.2s ease-in-out infinite' }}>🐦</div>
                    <div onClick={() => handleShakeTree(2)} onMouseEnter={() => setTreeHover(prev => ({ ...prev, 2: true }))} onMouseLeave={() => setTreeHover(prev => ({ ...prev, 2: false }))} style={{ position: 'absolute', bottom: '96px', left: '66%', width: '60px', height: '80px', cursor: 'pointer' }}>
                      <div style={{ position: 'absolute', bottom: 0, left: 0, fontSize: '40px', transformOrigin: 'bottom center', animation: treeShake[2] ? 'treeShake 1s ease-in-out' : 'treeSway 4.6s ease-in-out infinite 0.4s' }}>🌳</div>
                      {treeShake[2] && (
                        <>
                          <span style={{ position: 'absolute', top: 0, left: '10%', fontSize: '12px', animation: 'leafFall 1.2s ease-in forwards' }}>🍃</span>
                          <span style={{ position: 'absolute', top: '4px', left: '50%', fontSize: '11px', animation: 'leafFall 1s ease-in forwards 0.15s' }}>🍃</span>
                        </>
                      )}
                      {treeHover[2] && (
                        <div style={{ position: 'absolute', top: '-30px', left: '50%', transform: 'translateX(-50%)', background: '#1B4332', color: '#fff', fontSize: '10.5px', fontWeight: 700, padding: '4px 9px', borderRadius: '8px', whiteSpace: 'nowrap' }}>
                          Tap to shake 🌳
                        </div>
                      )}
                    </div>
                    <div style={{ position: 'absolute', bottom: '100px', left: '44%', fontSize: '26px', transformOrigin: 'bottom center', animation: 'treeSway 5.2s ease-in-out infinite 0.8s' }}>🌲</div>
                  </>
                )}
                {stageIdx >= 4 && (
                  <>
                    <div style={{ position: 'absolute', bottom: '150px', left: '38%', fontSize: '18px', animation: 'butterflyFlit 3s ease-in-out infinite' }}>🦋</div>
                    <div style={{ position: 'absolute', bottom: '60px', left: '26%', fontSize: '16px', animation: 'birdFly 7s linear infinite' }}>🐦</div>
                  </>
                )}
                {stageIdx >= 5 && (
                  <>
                    <div style={{ position: 'absolute', top: 0, left: '36%', fontSize: '26px', opacity: 0.85 }}>🌈</div>
                    <div style={{ position: 'absolute', bottom: '150px', left: '56%', fontSize: '20px', animation: 'butterflyFlit 3.6s ease-in-out infinite 0.5s' }}>🦋</div>
                  </>
                )}
                {plantedExtras.map((p, i) => (
                  <div key={i} style={p.style}>
                    {p.icon}
                  </div>
                ))}
              </div>
            </div>

            {/* RECOMMENDED MISSIONS */}
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '14px' }}>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '20px', color: theme.brand, margin: 0 }}>Recommended Missions</h3>
                <span style={{ fontSize: '12px', color: theme.subtext }}>✨ AI-curated for you</span>
              </div>
              <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '6px' }}>
                {recommended.map((m, i) => (
                  <div key={i} style={{ background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: '20px', padding: '20px', minWidth: '230px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ fontSize: '26px' }}>{m.icon}</div>
                    <div style={{ fontSize: '14.5px', fontWeight: 700, color: theme.text }}>{m.name}</div>
                    <div style={{ display: 'flex', gap: '10px', fontSize: '11.5px', color: theme.subtext }}>
                      <span>⏱ {m.time}</span>
                      <span>📊 {m.difficulty}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: theme.subtext }}>
                      <span>🪙 +{m.reward}</span>
                      <span>{m.impact}</span>
                    </div>
                    {m.done ? (
                      <div style={{ textAlign: 'center', background: '#EDF6E8', color: '#2E7D32', borderRadius: '10px', padding: '9px', fontSize: '12.5px', fontWeight: 700 }}>
                        ✅ Started
                      </div>
                    ) : (
                      <button onClick={() => handleStartRecMission(i)} style={{ background: '#2E7D32', color: '#fff', border: 'none', padding: '10px', borderRadius: '10px', fontWeight: 700, fontSize: '12.5px', cursor: 'pointer', fontFamily: 'inherit' }}>
                        Start
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* BLOGS */}
            <div id="blogs">
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '14px' }}>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '20px', color: theme.brand, margin: 0 }}>From the Blog</h3>
                <span style={{ fontSize: '12px', color: theme.subtext }}>Stories, guides & tips</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '16px' }}>
                {blogsData.map((b, i) => (
                  <div key={i} style={{ background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: '20px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px', cursor: 'pointer', transition: 'transform 0.3s, box-shadow 0.3s' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(46,125,50,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>
                      {b.icon}
                    </div>
                    <div style={{ fontSize: '11px', fontWeight: 800, color: '#2E7D32', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {b.tag}
                    </div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: theme.text, lineHeight: 1.35 }}>
                      {b.title}
                    </div>
                    <div style={{ fontSize: '12px', color: theme.subtext }}>{b.read}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* COMMUNITY FEED */}
            <div id="community" style={{ background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: '24px', padding: '26px 30px' }}>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '20px', color: theme.brand, margin: '0 0 16px' }}>Community Feed</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {community.map((c, i) => (
                  <div key={i}>
                    <div style={{ padding: '13px 4px', borderBottom: `1px solid ${theme.border}` }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: c.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '14px', flexShrink: 0 }}>
                          {c.initial}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '13.5px', color: theme.text }}>
                            <b>{c.name}</b> {c.action} {c.emoji}
                          </div>
                          <div style={{ fontSize: '11px', color: theme.subtext }}>{c.time}</div>
                        </div>
                        <button onClick={() => handleToggleLike(i)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '13px', color: c.liked ? '#E85D4C' : theme.subtext, fontWeight: 700, display: 'flex', gap: '5px', alignItems: 'center', fontFamily: 'inherit' }}>
                          {c.liked ? '❤️' : '🤍'} {c.likes}
                        </button>
                        <button onClick={() => handleToggleComment(i)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '15px', fontFamily: 'inherit' }}>
                          🎉
                        </button>
                        <button onClick={() => handleToggleComment(i)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '12.5px', color: theme.subtext, fontWeight: 700, fontFamily: 'inherit' }}>
                          💬 {c.commentCount}
                        </button>
                      </div>
                    </div>
                    {c.commentsOpen && (
                      <div style={{ margin: '10px 0 4px 52px', display: 'flex', flexDirection: 'column', gap: '8px', paddingBottom: '10px' }}>
                        {c.comments.map((cm, cmIdx) => (
                          <div key={cmIdx} style={{ fontSize: '12.5px', color: theme.text, background: theme.hoverBg, borderRadius: '10px', padding: '8px 12px' }}>
                            <b>{cm.name}</b> {cm.text}
                          </div>
                        ))}
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <input
                            value={c.draft}
                            onChange={(e) => handleDraftChange(i, e.target.value)}
                            placeholder="Add a comment…"
                            style={{ flex: 1, border: `1px solid ${theme.border}`, borderRadius: '10px', padding: '8px 12px', fontSize: '12.5px', fontFamily: 'inherit', background: theme.cardBg, color: theme.text }}
                          />
                          <button onClick={() => handlePostComment(i)} style={{ background: '#2E7D32', color: '#fff', border: 'none', padding: '0 14px', borderRadius: '10px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                            Post
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* ENVIRONMENTAL IMPACT */}
            <div>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '20px', color: theme.brand, margin: '0 0 14px' }}>Your Environmental Impact</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '16px' }}>
                {[
                  { icon: '🌍', value: '24 kg', label: 'CO₂ Saved', equivalent: 'Driving 120 fewer km' },
                  { icon: '💧', value: '680 L', label: 'Water Conserved', equivalent: '13 buckets saved' },
                  { icon: '♻️', value: '18 kg', label: 'Waste Avoided', equivalent: '360 plastic bottles' },
                  { icon: '🌳', value: '2.4', label: 'Trees Equivalent', equivalent: '1 mature tree/year' }
                ].map((s, i) => (
                  <div key={i} style={{ background: theme.impactCardBg, border: `1px solid ${theme.border}`, borderRadius: '20px', padding: '22px', textAlign: 'center' }}>
                    <div style={{ fontSize: '30px', marginBottom: '8px' }}>{s.icon}</div>
                    <div style={{ fontSize: '24px', fontWeight: 800, color: theme.brand, fontFamily: "'Playfair Display',serif" }}>
                      {s.value}
                    </div>
                    <div style={{ fontSize: '12px', color: theme.subtext, fontWeight: 600, margin: '4px 0 8px' }}>
                      {s.label}
                    </div>
                    <div style={{ fontSize: '11.5px', color: '#2E7D32', background: 'rgba(46,125,50,0.1)', borderRadius: '10px', padding: '6px 8px' }}>
                      ≈ {s.equivalent}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ACHIEVEMENTS */}
            <div>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '20px', color: theme.brand, margin: '0 0 14px' }}>Achievements</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: '16px' }}>
                {achievementsData.map((a, i) => (
                  <div
                    key={i}
                    onMouseEnter={() => {}}
                    onMouseLeave={() => {}}
                    onClick={() => {}}
                    style={{
                      position: 'relative',
                      background: a.unlocked ? theme.cardBg : theme.hoverBg,
                      border: `1px solid ${theme.border}`,
                      borderRadius: '20px',
                      padding: '20px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      opacity: a.unlocked ? 1 : 0.55
                    }}
                  >
                    <div style={{ fontSize: '32px', marginBottom: '8px', filter: a.unlocked ? 'none' : 'grayscale(1)' }}>
                      {a.icon}
                    </div>
                    <div style={{ fontSize: '12.5px', fontWeight: 700, color: theme.text }}>
                      {a.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* TOAST */}
      {toast && (
        <div style={{ position: 'fixed', bottom: '32px', left: '50%', transform: 'translateX(-50%)', background: '#1B4332', color: '#fff', padding: '14px 26px', borderRadius: '14px', fontSize: '13.5px', fontWeight: 700, boxShadow: '0 16px 34px rgba(15,93,62,0.3)', zIndex: 90, animation: 'toastIn 0.3s ease' }}>
          {toast}
        </div>
      )}

      {/* SPROUT AI FLOATING ASSISTANT */}
      <div style={{ position: 'fixed', bottom: '26px', right: '28px', zIndex: 95, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
        {aiOpen && (
          <div style={{ width: '320px', height: '440px', background: theme.cardBg, borderRadius: '22px', boxShadow: '0 24px 60px rgba(15,93,62,0.28)', border: `1px solid ${theme.border}`, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ background: '#1B4332', color: '#fff', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '30px', height: '30px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #67B346' }}>
                <img src="images/sprout-companion.jpeg" alt="Sprout AI" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', fontWeight: 800 }}>Sprout AI</div>
                <div style={{ fontSize: '10.5px', color: '#B7E6A6' }}>
                  {aiThinking ? 'Thinking…' : 'Online'}
                </div>
              </div>
              <button onClick={() => setAiOpen(false)} style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '16px', cursor: 'pointer', fontFamily: 'inherit' }}>
                ✕
              </button>
            </div>
            <div ref={aiScrollRef} style={{ flex: 1, overflowY: 'auto', padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {aiMessages.map((msg, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start' }}>
                  <div
                    style={{
                      background: msg.from === 'user' ? '#2E7D32' : theme.hoverBg,
                      color: msg.from === 'user' ? '#fff' : theme.text,
                      padding: '9px 14px',
                      borderRadius: msg.from === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                      fontSize: '12.5px',
                      maxWidth: msg.from === 'user' ? '220px' : '230px'
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {aiThinking && (
                <div style={{ alignSelf: 'flex-start', background: theme.hoverBg, color: theme.subtext, padding: '9px 14px', borderRadius: '14px', fontSize: '12.5px' }}>
                  Sprout is thinking…
                </div>
              )}
            </div>
            <div style={{ padding: '10px 14px 14px', display: 'flex', flexDirection: 'column', gap: '8px', borderTop: `1px solid ${theme.border}` }}>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {Object.keys(aiReplies).map((label, i) => (
                  <button key={i} onClick={() => handleSendPrompt(label)} style={{ background: theme.hoverBg, border: `1px solid ${theme.border}`, color: theme.brand, padding: '7px 11px', borderRadius: '999px', fontSize: '11px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                    {label}
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  value={aiInputText}
                  onChange={(e) => setAiInputText(e.target.value)}
                  onKeyDown={handleAiInputKeyDown}
                  placeholder="Ask Sprout anything…"
                  style={{ flex: 1, border: `1px solid ${theme.border}`, borderRadius: '10px', padding: '9px 12px', fontSize: '12.5px', fontFamily: 'inherit', background: theme.cardBg, color: theme.text }}
                />
                <button onClick={handleSendAiInput} style={{ background: '#2E7D32', color: '#fff', border: 'none', padding: '0 14px', borderRadius: '10px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                  ➤
                </button>
              </div>
            </div>
          </div>
        )}
        <button
          onClick={() => setAiOpen(!aiOpen)}
          style={{
            width: '62px',
            height: '62px',
            borderRadius: '50%',
            background: '#2E7D32',
            border: '3px solid #fff',
            boxShadow: '0 14px 30px rgba(46,125,50,0.4)',
            cursor: 'pointer',
            overflow: 'hidden',
            padding: 0,
            animation: 'ringPulse 2.6s ease-in-out infinite',
            fontFamily: 'inherit'
          }}
        >
          <img src="images/sprout-companion.jpeg" alt="Sprout AI" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
