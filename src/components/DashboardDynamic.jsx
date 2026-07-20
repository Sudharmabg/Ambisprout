import React, { useState, useEffect, useRef } from 'react';
import { getCurrentUser, supabase } from '../lib/supabase';
import { useDashboard, useMissions, useCommunityFeed, useAchievements, useImpactStats, useBlogs } from '../hooks/useDashboard';
import { missionsAPI, communityAPI, dashboardAPI } from '../lib/api';
import './Dashboard.css';
import companionMaleImg from '../assets/companion_male.jpeg';

const DashboardDynamic = () => {
  const [userId, setUserId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [aiOpen, setAiOpen] = useState(false);
  const [aiThinking, setAiThinking] = useState(false);
  const [aiInputText, setAiInputText] = useState('');
  const [notifOpen, setNotifOpen] = useState(false);
  const [islandNight, setIslandNight] = useState(false);
  const [islandTilt, setIslandTilt] = useState({ rx: 0, ry: 0 });
  const [plantedExtras, setPlantedExtras] = useState([]);
  const [treeShake, setTreeShake] = useState({ 1: false, 2: false });
  const [treeHover, setTreeHover] = useState({ 1: false, 2: false });
  const [toast, setToast] = useState(null);
  const aiScrollRef = useRef(null);
  const toastTimeoutRef = useRef(null);

  // 13 core functionalities state variables:
  const [coins, setCoins] = useState(4820);
  const [streak, setStreak] = useState(16);
  const [ecoScore, setEcoScore] = useState(92);
  const [missionsCompleted, setMissionsCompleted] = useState(47);
  const [profileName, setProfileName] = useState('User');
  const [profileAvatar, setProfileAvatar] = useState('U');
  const [todayMission, setTodayMission] = useState(null);
  const [todayMissionDone, setTodayMissionDone] = useState(false);
  const [recommended, setRecommended] = useState([]);
  const [community, setCommunity] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [impactStats, setImpactStats] = useState([]);
  const [blogs, setBlogs] = useState([]);

  // Onboarding Profile Checklist
  const [onboarding, setOnboarding] = useState({
    createdAccount: true,
    setDiet: false,
    setCommute: false,
    firstJournal: false
  });
  const [showDietPicker, setShowDietPicker] = useState(false);
  const [showCommutePicker, setShowCommutePicker] = useState(false);

  // Daily Eco-Quiz
  const [quizDone, setQuizDone] = useState(false);
  const [selectedQuizAns, setSelectedQuizAns] = useState(null);
  const [quizFeedback, setQuizFeedback] = useState('');

  // Logged Activities (Journal)
  const [loggedActivities, setLoggedActivities] = useState([
    { id: 1, text: 'Cycled 5 km to work instead of taking a car', time: '2 hours ago', coins: 25, co2: '1.2 kg' },
    { id: 2, text: 'Carried a cloth bag for grocery shopping', time: 'Yesterday', coins: 15, co2: '0.2 kg' }
  ]);
  const [journalInput, setJournalInput] = useState('');
  const [journalProcessing, setJournalProcessing] = useState(false);
  const [journalStep, setJournalStep] = useState('');

  // Floating AI Chat messages
  const [aiMessages, setAiMessages] = useState([
    { from: 'ai', text: "Hi there! I'm Sprout 🌱 Ask me anything about your habits or today's mission." }
  ]);

  // Notifications bell array
  const [notifications, setNotifications] = useState([
    { id: 1, icon: '🎉', title: 'Mission Completed', message: 'Reusable Bottle', read: false },
    { id: 2, icon: '🔥', title: 'Streak Master', message: 'Streak increased to 16 days', read: false },
    { id: 3, icon: '🌍', title: 'New Challenge', message: 'Plastic-Free Week Bengaluru started', read: true }
  ]);

  // Active Tool Dialog modal state
  const [activeTool, setActiveTool] = useState(null); // 'carbon' | 'receipt' | 'image' | 'voice'

  // Carbon Footprint inputs
  const [calcDistance, setCalcDistance] = useState('10');
  const [calcCommuteType, setCalcCommuteType] = useState('petrol_car');
  const [calcDietType, setCalcDietType] = useState('omnivore');
  const [calcElectricityBill, setCalcElectricityBill] = useState('1500');
  const [calcResult, setCalcResult] = useState(null);

  // Receipt Scanner states
  const [scanningReceipt, setScanningReceipt] = useState(false);
  const [receiptResult, setReceiptResult] = useState(null);
  const [receiptName, setReceiptName] = useState('');

  // Image Verification states
  const [verifyingImage, setVerifyingImage] = useState(false);
  const [imageResult, setImageResult] = useState(null);
  const [imageTaskType, setImageTaskType] = useState('cycling');
  const [imageFileName, setImageFileName] = useState('');

  // Voice Assistant states
  const [voiceListening, setVoiceListening] = useState(false);
  const [voiceMessages, setVoiceMessages] = useState([
    { from: 'sprout', text: 'Hey there! Tap a voice command below or speak sustainability. 🎙️' }
  ]);

  // Joined Challenges state (avoid calling hooks in loops!)
  const [joinedChallenges, setJoinedChallenges] = useState({
    c1: false,
    c2: false,
    c3: false
  });

  // Fetch current user session
  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log('DashboardDynamic: Fetching current user...');
        const { user, error } = await getCurrentUser();
        if (user) {
          setUserId(user.id);
        } else {
          console.warn('DashboardDynamic: No active session. Fallback to Demo Mode.');
          setUserId('demo-user');
        }
      } catch (err) {
        console.error('DashboardDynamic: Error fetching user:', err);
        setUserId('demo-user');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const isDemo = userId === 'demo-user';

  // Dynamic Data Hooks
  const { data: dbData } = useDashboard(isDemo ? null : userId);
  const { todayMission: dbTodayMission, recommended: dbRecommended } = useMissions(isDemo ? null : userId);
  const { feed: dbFeed } = useCommunityFeed();
  const { achievements: dbAchievements } = useAchievements(isDemo ? null : userId);
  const { stats: dbImpactStats } = useImpactStats(isDemo ? null : userId);
  const { blogs: dbBlogs } = useBlogs();

  // Sync state variables with hooks data if signed in
  useEffect(() => {
    if (!isDemo && dbData) {
      if (dbData.stats) {
        setCoins(dbData.stats.coins || 0);
        setStreak(dbData.stats.streak || 0);
        setEcoScore(dbData.stats.eco_score || 0);
        setMissionsCompleted(dbData.stats.missions_completed || 0);
      }
      if (dbData.profile) {
        setProfileName(dbData.profile.name || 'User');
        setProfileAvatar(dbData.profile.name?.[0] || 'U');
        setOnboarding(prev => ({
          ...prev,
          setDiet: !!dbData.profile.diet_type,
          setCommute: !!dbData.profile.commute_type
        }));
      }
      if (dbData.notifications) {
        setNotifications(dbData.notifications.map((n, i) => ({
          id: n.id || i,
          icon: n.icon || '🔔',
          title: n.title,
          message: n.message,
          read: n.read || false
        })));
      }
    }
  }, [dbData, isDemo]);

  // Sync today's mission
  useEffect(() => {
    if (!isDemo && dbTodayMission) {
      setTodayMission(dbTodayMission);
      setTodayMissionDone(dbData?.todayMissionDone || false);
    } else if (isDemo) {
      setTodayMission({
        id: 'mock-today-mission',
        name: '🌱 Carry a reusable bottle',
        duration: '5 minutes',
        difficulty: 'Easy',
        reward_coins: 20,
        co2_impact: 0.3
      });
    }
  }, [dbTodayMission, isDemo, dbData]);

  // Sync recommended missions
  useEffect(() => {
    if (!isDemo && dbRecommended && dbRecommended.length > 0) {
      setRecommended(dbRecommended.map(m => ({ ...m, done: false })));
    } else if (isDemo) {
      setRecommended([
        { id: 'rec-1', emoji: '🚲', name: 'Walk 3 km instead of driving', duration: '15 min', difficulty: 'Easy', reward_coins: 30, co2_impact: 0.6, done: false },
        { id: 'rec-2', emoji: '💡', name: 'Switch off unused lights today', duration: '2 min', difficulty: 'Easy', reward_coins: 10, co2_impact: 0.1, done: false },
        { id: 'rec-3', emoji: '🥗', name: 'Try a plant-based meal', duration: '20 min', difficulty: 'Medium', reward_coins: 25, co2_impact: 1.2, done: false },
        { id: 'rec-4', emoji: '🛍', name: 'Skip single-use plastic bags', duration: 'All day', difficulty: 'Easy', reward_coins: 15, co2_impact: 0.2, done: false }
      ]);
    }
  }, [dbRecommended, isDemo]);

  // Sync community feed
  useEffect(() => {
    const defaultCommunity = [
      { id: '1', user: { name: 'Ananya R.' }, action: 'completed Plastic-Free Week', emoji: '🎉', time: '2h ago', initial: 'A', color: '#2E7D32', likes: 24, liked: false, commentsOpen: false, draft: '', comments: [{ name: 'Rahul', text: 'Amazing streak! 🙌' }] },
      { id: '2', user: { name: 'Rahul K.' }, action: 'planted his first tree', emoji: '🌳', time: '4h ago', initial: 'R', color: '#5C9A3F', liked: false, likes: 41, commentsOpen: false, draft: '', comments: [] },
      { id: '3', user: { name: 'Diya M.' }, action: 'recycled 8 kg of plastic', emoji: '♻️', time: '6h ago', initial: 'D', color: '#C8A96A', liked: false, likes: 18, commentsOpen: false, draft: '', comments: [] },
      { id: '4', user: { name: 'Aarav S.' }, action: 'reached a 30-day streak', emoji: '🔥', time: 'Yesterday', initial: 'A', color: '#67B346', liked: false, likes: 52, commentsOpen: false, draft: '', comments: [{ name: 'Meera', text: 'Incredible consistency!' }] }
    ];
    if (!isDemo && dbFeed && dbFeed.length > 0) {
      setCommunity(
        dbFeed.map(post => ({
          ...post,
          initial: post.user?.name?.[0] || 'U',
          color: ['#2E7D32', '#5C9A3F', '#C8A96A', '#67B346', '#1B4332'][Math.floor(Math.random() * 5)],
          commentsOpen: false,
          draft: '',
          likes: post.likes || 0,
          liked: post.liked || false,
          comments: post.comments || [],
          commentCount: post.commentCount || 0
        }))
      );
    } else if (isDemo) {
      setCommunity(defaultCommunity);
    }
  }, [dbFeed, isDemo]);

  // Sync achievements
  useEffect(() => {
    const defaultAchievements = [
      { icon: '🌱', name: 'Water Warrior', desc: 'Completed 10 water-saving missions', unlocked: true, status: 'Earned 2 days ago' },
      { icon: '♻️', name: 'Recycling Champion', desc: 'Recycled 25kg+ of plastic', unlocked: true, status: 'Earned 1 week ago' },
      { icon: '🚲', name: 'Green Commuter', desc: 'Take 10 eco-friendly rides', unlocked: false, status: '7 / 10 rides' },
      { icon: '🌳', name: 'Tree Guardian', desc: 'Plant 5 trees with AmbiSprout', unlocked: false, status: '2 / 5 trees' },
      { icon: '🏆', name: 'Earth Protector', desc: 'Keep Eco Score 95+ for 30 days', unlocked: false, status: '12 / 30 days' }
    ];
    if (!isDemo && dbAchievements && dbAchievements.length > 0) {
      setAchievements(dbAchievements);
    } else {
      setAchievements(defaultAchievements);
    }
  }, [dbAchievements, isDemo]);

  // Sync environmental impact stats
  useEffect(() => {
    const defaultImpact = [
      { icon: '🌍', value: '24 kg', label: 'CO₂ Saved', equivalent: 'Driving 120 fewer km' },
      { icon: '💧', value: '680 L', label: 'Water Conserved', equivalent: '13 buckets saved' },
      { icon: '♻️', value: '18 kg', label: 'Waste Avoided', equivalent: '360 plastic bottles' },
      { icon: '🌳', value: '2.4', label: 'Trees Equivalent', equivalent: '1 mature tree/year' }
    ];
    if (!isDemo && dbImpactStats && dbImpactStats.length > 0) {
      setImpactStats(dbImpactStats);
    } else {
      setImpactStats(defaultImpact);
    }
  }, [dbImpactStats, isDemo]);

  // Sync blogs
  useEffect(() => {
    const defaultBlogs = [
      { icon: '🌧️', tag: 'Guide', title: '5 Ways to Cut Your Carbon Footprint This Monsoon', read: '4 min read', excerpt: 'Simple shifts in travel, local composting, and energy use to maintain an eco-friendly lifestyle during the Indian monsoon season.' },
      { icon: '♻️', tag: 'Community', title: 'Meet the Bengaluru Group Composting 2 Tonnes a Month', read: '6 min read', excerpt: 'How a local society of volunteer composting champions turned organic waste collection into a zero-landfill success story.' },
      { icon: '🌱', tag: 'Motivation', title: 'Why Small Daily Missions Beat Big Resolutions', read: '3 min read', excerpt: 'Why small, repeatable sustainability milestones create more lasting habits than massive single-day lifestyle overhauls.' }
    ];
    if (dbBlogs && dbBlogs.length > 0) {
      setBlogs(dbBlogs);
    } else {
      setBlogs(defaultBlogs);
    }
  }, [dbBlogs]);

  const showToast = (text) => {
    setToast(text);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => setToast(null), 2800);
  };

  // Complete Today's Mission
  const handleStartTodayMission = async () => {
    if (!todayMission || todayMissionDone) return;
    try {
      if (!isDemo) {
        await missionsAPI.completeMission(userId, todayMission.id);
      }
      setTodayMissionDone(true);
      setCoins(prev => prev + todayMission.reward_coins);
      setMissionsCompleted(prev => prev + 1);
      setEcoScore(prev => Math.min(100, prev + 1));
      
      // Update local onboarding check
      setOnboarding(prev => {
        const next = { ...prev, firstJournal: true };
        checkOnboardingCompletion(next);
        return next;
      });

      showToast(`🎉 Mission complete! +${todayMission.reward_coins} Sprout Coins`);
    } catch (error) {
      showToast('Failed to complete mission');
      console.error(error);
    }
  };

  // Complete recommended missions
  const handleStartRecMission = async (index) => {
    if (recommended[index].done) return;
    const m = recommended[index];
    try {
      if (!isDemo) {
        await missionsAPI.completeMission(userId, m.id);
      }
      setRecommended(prev => prev.map((r, idx) => idx === index ? { ...r, done: true } : r));
      setCoins(prev => prev + m.reward_coins);
      setMissionsCompleted(prev => prev + 1);
      setEcoScore(prev => Math.min(100, prev + 1));
      showToast(`🎉 Mission complete! +${m.reward_coins} Sprout Coins`);
    } catch (error) {
      showToast('Failed to start mission');
      console.error(error);
    }
  };

  const handleSkipMission = () => {
    showToast('Mission skipped — checking other goals!');
  };

  // Shake trees to sway and drop leaves
  const handleShakeTree = (id) => {
    if (treeShake[id]) return;
    setTreeShake(prev => ({ ...prev, [id]: true }));
    showToast('🌳 Your forest thrives!');
    setTimeout(() => setTreeShake(prev => ({ ...prev, [id]: false })), 1000);
  };

  // Plant a flower on the island mound (cost: 100 coins)
  const handlePlantExtra = async () => {
    if (coins < 100) {
      showToast('Not enough coins — complete more daily missions!');
      return;
    }
    if (!isDemo) {
      try {
        const { data: stats } = await supabase.from('user_stats').select('coins').eq('user_id', userId).single();
        const nextCoins = Math.max(0, (stats?.coins || coins) - 100);
        await supabase.from('user_stats').update({ coins: nextCoins }).eq('user_id', userId);
      } catch (err) {
        console.error('Error updating stats for plant:', err);
      }
    }
    const icons = ['🌸', '🌾', '🌻', '🍀'];
    const icon = icons[plantedExtras.length % icons.length];
    const left = 15 + Math.random() * 70;
    const bottom = 90 + Math.random() * 40;
    setPlantedExtras(prev => [
      ...prev,
      { icon, style: { position: 'absolute', bottom: `${bottom}px`, left: `${left}%`, fontSize: '22px', animation: 'popIn 0.4s ease' } }
    ]);
    setCoins(prev => prev - 100);
    showToast('🌸 New flower planted on your world!');
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

  // AI Sustainability Assistant
  const aiReplies = {
    'How can I reduce my carbon footprint?': "Try walking or cycling for trips under 3km, and switch off devices when idle — small swaps like these can cut your footprint by 15% this month.",
    "Recommend today's mission": "Based on your streak, I'd suggest 'Skip single-use plastic bags' — it's quick and pairs well with your recycling habits.",
    'Analyze my receipt': "Click the Quick AI Tools receipt scanner to parse your grocery list and identify low impact food-mile swaps.",
    'Suggest eco-friendly products': "Look for FSC-certified paper goods and refillable containers — I can recommend a few India-based brands if you'd like."
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
    }, 800);
  };

  const handleSendAiInput = () => {
    const text = aiInputText.trim();
    if (!text) return;
    setAiInputText('');
    setAiMessages(prev => [...prev, { from: 'user', text: text }]);
    setAiThinking(true);
    setTimeout(() => {
      setAiMessages(prev => [...prev, { from: 'ai', text: `You asked: "${text}". That is an eco-friendly question! I recommend logging daily commute habits in your Activity Journal to track progress.` }]);
      setAiThinking(false);
      if (aiScrollRef.current) {
        setTimeout(() => {
          aiScrollRef.current.scrollTop = aiScrollRef.current.scrollHeight;
        }, 50);
      }
    }, 800);
  };

  const handleAiInputKeyDown = (e) => {
    if (e.key === 'Enter') handleSendAiInput();
  };

  // Notifications Panel
  const markNotifRead = async (id) => {
    if (!isDemo) {
      try {
        await supabase.from('notifications').update({ read: true }).eq('id', id);
      } catch (err) {
        console.error('Error marking notification read:', err);
      }
    }
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const clearAllNotifs = async () => {
    if (!isDemo) {
      try {
        await supabase.from('notifications').delete().eq('user_id', userId);
      } catch (err) {
        console.error('Error clearing notifications:', err);
      }
    }
    setNotifications([]);
  };

  const hasUnread = notifications.some(n => !n.read);

  // Onboarding Complete check
  const checkOnboardingCompletion = async (next) => {
    if (next.createdAccount && next.setDiet && next.setCommute && next.firstJournal) {
      if (!isDemo) {
        try {
          const { data: stats } = await supabase.from('user_stats').select('coins').eq('user_id', userId).single();
          const nextCoins = (stats?.coins || coins) + 100;
          await supabase.from('user_stats').update({ coins: nextCoins }).eq('user_id', userId);
          await supabase.from('notifications').insert({
            user_id: userId,
            type: 'challenge',
            title: '🏆 Onboarding Checklist Complete!',
            message: 'You earned 100 Sprout Coins!',
            icon: '🏆'
          });
        } catch (err) {
          console.error('Error updating onboarding bonus:', err);
        }
      }
      setCoins(prev => prev + 100);
      showToast('🏆 Onboarding Checklist Complete! +100 Sprout Coins awarded.');
      setAchievements(prev => [
        { icon: '🏆', name: 'Onboarding Champion', desc: 'Successfully customized diet & travel preferences', unlocked: true, status: 'Earned just now' },
        ...prev
      ]);
    }
  };

  // Diet preference onboarding picker
  const handleSelectDiet = async (diet) => {
    if (!isDemo) {
      try {
        await supabase.from('users').update({ diet_type: diet.toLowerCase() }).eq('id', userId);
      } catch (err) {
        console.error('Error updating diet preferences:', err);
        showToast('Failed to save diet preferences to database');
        return;
      }
    }
    setOnboarding(prev => {
      const next = { ...prev, setDiet: true };
      checkOnboardingCompletion(next);
      return next;
    });
    setShowDietPicker(false);
    showToast(`🍽️ Diet preference saved: ${diet}!`);
  };

  // Commute preference onboarding picker
  const handleSelectCommute = async (commute) => {
    if (!isDemo) {
      try {
        await supabase.from('users').update({ commute_type: commute.toLowerCase() }).eq('id', userId);
      } catch (err) {
        console.error('Error updating commute preferences:', err);
        showToast('Failed to save commute preferences to database');
        return;
      }
    }
    setOnboarding(prev => {
      const next = { ...prev, setCommute: true };
      checkOnboardingCompletion(next);
      return next;
    });
    setShowCommutePicker(false);
    showToast(`🚲 Commute preference saved: ${commute}!`);
  };

  // Activity Journal logging
  const handleLogActivity = () => {
    const text = journalInput.trim();
    if (!text) return;
    setJournalInput('');
    setJournalProcessing(true);
    setJournalStep('Analyzing activity patterns...');

    setTimeout(() => {
      setJournalStep('Calculating carbon footprint savings...');
      setTimeout(() => {
        setJournalStep('Verifying sustainable impacts...');
        setTimeout(async () => {
          const coinReward = 25;
          const co2Saved = 0.8;

          if (!isDemo) {
            try {
              // 1. Get first mission to bypass foreign key constraints in completions
              const { data: missions } = await supabase.from('missions').select('id').limit(1);
              const targetMissionId = missions?.[0]?.id || todayMission?.id;
              
              if (targetMissionId) {
                await supabase.from('mission_completions').insert({
                  user_id: userId,
                  mission_id: targetMissionId,
                  completed_at: new Date().toISOString(),
                  coins_earned: coinReward,
                  impact_value: co2Saved
                });
              }

              // 2. Update user stats
              const { data: stats } = await supabase.from('user_stats').select('coins, missions_completed').eq('user_id', userId).single();
              const nextCoins = (stats?.coins || coins) + coinReward;
              const nextCompletions = (stats?.missions_completed || missionsCompleted) + 1;
              const nextStage = Math.min(5, Math.floor(nextCompletions / 15));
              
              await supabase.from('user_stats').update({
                coins: nextCoins,
                missions_completed: nextCompletions,
                world_stage: nextStage
              }).eq('user_id', userId);

              // 3. Post to community feed
              await supabase.from('community_posts').insert({
                user_id: userId,
                action: `logged: "${text}"`,
                emoji: '📝',
                content: text
              });

              // 4. Create notification
              await supabase.from('notifications').insert({
                user_id: userId,
                type: 'community',
                title: 'Activity Logged',
                message: `Logged: "${text}"`,
                icon: '📝'
              });
            } catch (err) {
              console.error('Error logging journal activity to database:', err);
            }
          }

          setCoins(prev => prev + coinReward);
          setJournalProcessing(false);
          setJournalStep('');

          const newAct = {
            id: Date.now(),
            text: text,
            time: 'Just now',
            coins: coinReward,
            co2: `${co2Saved} kg`
          };
          setLoggedActivities(prev => [newAct, ...prev]);

          // Insert into community feed local state
          const newPost = {
            id: `p-${Date.now()}`,
            user: { name: profileName },
            action: `logged: "${text}"`,
            emoji: '📝',
            time: 'Just now',
            initial: profileAvatar,
            color: '#1B4332',
            likes: 0,
            liked: false,
            commentsOpen: false,
            draft: '',
            comments: [],
            commentCount: 0
          };
          setCommunity(prev => [newPost, ...prev]);

          // Update environmental impact stats
          setImpactStats(prev => prev.map(s => {
            if (s.label === 'CO₂ Saved') {
              const currentVal = parseFloat(s.value);
              return { ...s, value: `${(currentVal + co2Saved).toFixed(1)} kg` };
            }
            return s;
          }));

          setOnboarding(prev => {
            const next = { ...prev, firstJournal: true };
            checkOnboardingCompletion(next);
            return next;
          });

          showToast(`📝 Activity logged! +25 Sprout Coins & +0.8kg CO₂ saved.`);
        }, 600);
      }, 600);
    }, 600);
  };

  // Daily Eco-Quiz
  const handleQuizAnswer = async (ans) => {
    if (quizDone) return;
    setSelectedQuizAns(ans);
    setQuizDone(true);
    if (ans === 'A') {
      if (!isDemo) {
        try {
          const { data: stats } = await supabase.from('user_stats').select('coins').eq('user_id', userId).single();
          const nextCoins = (stats?.coins || coins) + 15;
          await supabase.from('user_stats').update({ coins: nextCoins }).eq('user_id', userId);
          await supabase.from('notifications').insert({
            user_id: userId,
            type: 'mission_completed',
            title: 'Daily Eco-Quiz Complete',
            message: 'You earned 15 Sprout Coins!',
            icon: '🎉',
            created_at: new Date().toISOString()
          });
        } catch (err) {
          console.error('Error updating quiz stats:', err);
        }
      }
      setCoins(prev => prev + 15);
      setQuizFeedback('🎉 Correct! Swapping a 10km daily car commute for the metro saves about 2.4kg of CO₂. Excellent choice! +15 Sprout Coins added.');
    } else {
      setQuizFeedback('❌ Incorrect. Commuting choices have the largest impact. Swapping a 10km drive for the metro saves 2.4kg CO₂ daily. Try again tomorrow!');
    }
  };

  // Quick Tool execution calculations
  const calculateFootprint = () => {
    const km = parseFloat(calcDistance) || 0;
    const elect = parseFloat(calcElectricityBill) || 0;
    
    let transportEmissions = 0;
    if (calcCommuteType === 'petrol_car') transportEmissions = km * 0.22 * 365;
    else if (calcCommuteType === 'diesel_car') transportEmissions = km * 0.20 * 365;
    else if (calcCommuteType === 'ev_car') transportEmissions = km * 0.06 * 365;
    else if (calcCommuteType === 'metro') transportEmissions = km * 0.04 * 365;

    let foodEmissions = 1500; // vegetarian default
    if (calcDietType === 'omnivore') foodEmissions = 3000;
    else if (calcDietType === 'vegan') foodEmissions = 1100;

    const electricityEmissions = elect * 0.85 * 12; // monthly bill approximation
    const totalCO2Kg = transportEmissions + foodEmissions + electricityEmissions;
    const totalCO2Tons = (totalCO2Kg / 1000).toFixed(2);

    setCalcResult({
      total: totalCO2Tons,
      nationalAvg: '1.9',
      diff: (((totalCO2Tons - 1.9) / 1.9) * 100).toFixed(0),
      tip: calcCommuteType === 'petrol_car' || calcCommuteType === 'diesel_car' 
        ? '💡 Recommendation: Swap 2 car commutes weekly for public transport to save 480 kg CO₂ yearly.'
        : '💡 Recommendation: Excellent transport choices! Cut your food emissions further by trying 2 vegan days a week.'
    });
  };

  const handleSaveCarbonCalc = async () => {
    if (!isDemo) {
      try {
        const { data: stats } = await supabase.from('user_stats').select('coins').eq('user_id', userId).single();
        const nextCoins = (stats?.coins || coins) + 15;
        await supabase.from('user_stats').update({ coins: nextCoins }).eq('user_id', userId);
        await supabase.from('notifications').insert({
          user_id: userId,
          type: 'mission_completed',
          title: 'Carbon footprint saved',
          message: 'You earned 15 Sprout coins!',
          icon: '🌍',
          created_at: new Date().toISOString()
        });
      } catch (err) {
        console.error('Error saving carbon stats:', err);
      }
    }
    setCoins(prev => prev + 15);
    setActiveTool(null);
    setCalcResult(null);
    showToast('⚡ Carbon footprint logged! +15 Sprout Coins');
  };

  // Simulated Receipt scanner execution
  const runReceiptScan = () => {
    if (!receiptName) {
      showToast('Please enter a mock receipt file name.');
      return;
    }
    setScanningReceipt(true);
    setTimeout(async () => {
      if (!isDemo) {
        try {
          const { data: stats } = await supabase.from('user_stats').select('coins').eq('user_id', userId).single();
          const nextCoins = (stats?.coins || coins) + 20;
          await supabase.from('user_stats').update({ coins: nextCoins }).eq('user_id', userId);
          await supabase.from('notifications').insert({
            user_id: userId,
            type: 'mission_completed',
            title: 'Receipt items swapped',
            message: 'You earned 20 Sprout coins!',
            icon: '🧾',
            created_at: new Date().toISOString()
          });
        } catch (err) {
          console.error('Error saving receipt scan stats:', err);
        }
      }
      setScanningReceipt(false);
      setReceiptResult({
        organic: 'Organic Salad Greens (Local) - Great pick! 🌱',
        dairy: 'Amul Milk (Local Dairy) - Low food-miles 🥛',
        water: 'Kinley Packaged Water - Swap for filtered bottle 🥤 (Plastic hazard)',
        chocolate: 'Imported Chocolate Bar - Swap for local craft 🍫 (High transport footprint)'
      });
      setCoins(prev => prev + 20);
      showToast('⚡ Receipt scan verified! +20 Sprout Coins.');
    }, 1800);
  };

  // Simulated Image Verification execution
  const runImageVerify = () => {
    if (!imageFileName) {
      showToast('Please enter a mock image file name.');
      return;
    }
    setVerifyingImage(true);
    setTimeout(async () => {
      if (!isDemo) {
        try {
          const { data: stats } = await supabase.from('user_stats').select('coins').eq('user_id', userId).single();
          const nextCoins = (stats?.coins || coins) + 30;
          await supabase.from('user_stats').update({ coins: nextCoins }).eq('user_id', userId);
          await supabase.from('notifications').insert({
            user_id: userId,
            type: 'mission_completed',
            title: 'Eco action verified by AI',
            message: 'You earned 30 Sprout coins!',
            icon: '📸',
            created_at: new Date().toISOString()
          });
        } catch (err) {
          console.error('Error updating image verification stats:', err);
        }
      }
      setVerifyingImage(false);
      setImageResult({
        status: 'Approved',
        confidence: '97%',
        details: `Eco Action: verified "${imageTaskType}" task structure. Photo successfully processed.`,
        reward: 30
      });
      setCoins(prev => prev + 30);
      showToast('⚡ Image verification successful! +30 Sprout Coins.');
    }, 1800);
  };

  // Voice Assistant commands click helper
  const handleVoiceCommand = (cmd, response) => {
    setVoiceMessages(prev => [...prev, { from: 'user', text: cmd }]);
    setVoiceListening(true);
    setTimeout(async () => {
      if (!isDemo) {
        try {
          const { data: stats } = await supabase.from('user_stats').select('coins').eq('user_id', userId).single();
          const nextCoins = (stats?.coins || coins) + 10;
          await supabase.from('user_stats').update({ coins: nextCoins }).eq('user_id', userId);
        } catch (err) {
          console.error('Error updating voice command stats:', err);
        }
      }
      setVoiceMessages(prev => [...prev, { from: 'sprout', text: response }]);
      setVoiceListening(false);
      setCoins(prev => prev + 10);
      showToast('🎙️ Voice prompt parsed! +10 Sprout Coins');
    }, 900);
  };

  // Toggle challenge joining status
  const handleToggleChallenge = (cid, title) => {
    const isJoined = !joinedChallenges[cid];
    setJoinedChallenges(prev => ({ ...prev, [cid]: isJoined }));
    showToast(isJoined ? `🎯 Joined ${title}! Completed goals will sync.` : `Left challenge ${title}.`);
  };

  // Dynamic levels and stage
  const currentLevel = Math.floor(missionsCompleted / 10) + 1;
  const currentXP = (missionsCompleted % 10) * 100;

  const worldStage = Math.min(5, Math.floor(missionsCompleted / 15));
  const stages = [
    { icon: '🌍', name: 'Seed' },
    { icon: '🌱', name: 'Sprout' },
    { icon: '🌿', name: 'Plant' },
    { icon: '🌳', name: 'Tree' },
    { icon: '🌲', name: 'Forest' },
    { icon: '🌎', name: 'Planet Guardian' }
  ];
  const stage = stages[worldStage];
  const nextThreshold = (worldStage + 1) * 15;

  if (loading || !userId) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', fontFamily: "'Manrope',sans-serif" }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>🌱</div>
          <p style={{ fontSize: '18px', color: '#1B4332' }}>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

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

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good Morning ☀️';
    if (h < 17) return 'Good Afternoon 🌤';
    return 'Good Evening 🌙';
  })();

  const ringPercent = ((missionsCompleted % 5) / 5) * 100 || 20;

  return (
    <div style={{ fontFamily: "'Manrope',sans-serif", color: theme.text, background: theme.pageBg, minHeight: '100vh', overflowX: 'hidden', position: 'relative', transition: 'background 0.4s ease,color 0.4s ease' }}>
      
      {/* DEMO MODE TOP BANNER */}
      {isDemo && (
        <div style={{ background: 'linear-gradient(90deg, #1b4332, #2d6a4f)', color: '#fff', padding: '10px 48px', fontSize: '13px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', zIndex: 100, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>📢</span>
            <strong>Demo Mode:</strong> You are viewing a simulated dashboard. Sign in using Google Auth to sync your database metrics.
          </div>
          <button onClick={() => window.location.hash = '#/'} style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: 'none', padding: '5px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', transition: 'background 0.2s' }}>
            Sign In Now
          </button>
        </div>
      )}

      {/* NAV */}
      <div style={{ position: 'sticky', top: 0, zIndex: 60, background: theme.navBg, backdropFilter: 'blur(10px)', borderBottom: `1px solid ${theme.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 48px', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '26px', height: '26px', background: '#2E7D32', borderRadius: '0 50% 50% 50%', transform: 'rotate(-45deg)' }}></div>
          <span style={{ fontFamily: "'Playfair Display',serif", fontSize: '20px', fontWeight: 700, color: theme.brand }}>AmbiSprout</span>
        </div>
        
        {/* Navigation center links */}
        <div style={{ display: 'flex', gap: '22px', flexWrap: 'wrap' }}>
          <a href="#" style={{ color: theme.brand, fontWeight: 700, fontSize: '14px', textDecoration: 'none', borderBottom: '2px solid #2E7D32', paddingBottom: '2px' }}>Home</a>
          <a href="#missions-sec" style={{ color: theme.subtext, fontWeight: 600, fontSize: '14px', textDecoration: 'none' }}>Missions</a>
          <a href="#quick-tools-sec" style={{ color: theme.subtext, fontWeight: 600, fontSize: '14px', textDecoration: 'none' }}>AI Tools</a>
          <a href="#community" style={{ color: theme.subtext, fontWeight: 600, fontSize: '14px', textDecoration: 'none' }}>Community</a>
          <a href="#learning-hub-sec" style={{ color: theme.subtext, fontWeight: 600, fontSize: '14px', textDecoration: 'none' }}>Blogs</a>
        </div>

        <div style={{ display: 'flex', gap: '14px', alignItems: 'center', position: 'relative' }}>
          <button onClick={() => setDarkMode(!darkMode)} style={{ background: theme.cardBg, border: `1px solid ${theme.border}`, width: '38px', height: '38px', borderRadius: '50%', cursor: 'pointer', fontSize: '15px', fontFamily: 'inherit' }}>
            {darkMode ? '☀️' : '🌙'}
          </button>
          
          {/* Notification bell and panel */}
          <div style={{ position: 'relative' }}>
            <button onClick={() => setNotifOpen(!notifOpen)} style={{ background: theme.cardBg, border: `1px solid ${theme.border}`, width: '38px', height: '38px', borderRadius: '50%', cursor: 'pointer', fontSize: '16px', position: 'relative', fontFamily: 'inherit', fontWeight: 'bold' }}>
              🔔
              {hasUnread && (
                <span className="notification-badge"></span>
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
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  {notifications.length > 0 ? (
                    notifications.map((n, i) => (
                      <div key={i} onClick={() => markNotifRead(n.id)} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '8px 10px', borderRadius: '10px', cursor: 'pointer', background: n.read ? 'transparent' : 'rgba(46,125,50,0.06)' }}>
                        <span style={{ fontSize: '16px' }}>{n.icon}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '12.5px', fontWeight: n.read ? 600 : 800, color: theme.text }}>{n.title}</div>
                          <div style={{ fontSize: '11px', color: theme.subtext, marginTop: '2px' }}>{n.message}</div>
                        </div>
                        {!n.read && (
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2E7D32', marginTop: '5px' }} />
                        )}
                      </div>
                    ))
                  ) : (
                    <div style={{ padding: '20px 10px', textAlign: 'center', fontSize: '12.5px', color: theme.subtext }}>You're all caught up 🌿</div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#2E7D32', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '14px', fontFamily: "'Playfair Display',serif", cursor: 'pointer' }}>
            {profileAvatar}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '28px 48px 100px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
        
        {/* WELCOME CARD & PROFILE XP BAR */}
        <div style={{ background: theme.welcomeGrad, border: `1px solid ${theme.border}`, borderRadius: '26px', padding: '32px 36px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', minHeight: '190px', position: 'relative', overflow: 'hidden', flexWrap: 'wrap' }}>
          <span style={{ position: 'absolute', top: '16%', right: '22%', fontSize: '20px', opacity: 0.5, animation: 'leafFloat 5s ease-in-out infinite' }}>🍃</span>
          <span style={{ position: 'absolute', bottom: '12%', right: '38%', fontSize: '14px', opacity: 0.4, animation: 'leafFloat 6.5s ease-in-out infinite 0.8s' }}>🍃</span>
          
          <div style={{ position: 'relative', zIndex: 1, flex: 1, minWidth: '250px' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#2E7D32', marginBottom: '6px' }}>{greeting}</div>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: '32px', fontWeight: 700, color: theme.brand, margin: '0 0 8px' }}>Welcome back, {profileName} 👋</h1>
            <p style={{ color: theme.subtext, fontSize: '15px', margin: '0 0 12px' }}>Ready to make today a little greener?</p>
            
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(46,125,50,0.12)', padding: '7px 14px', borderRadius: '999px' }}>
                <span style={{ fontSize: '14px' }}>{stage.icon}</span>
                <span style={{ fontSize: '12.5px', fontWeight: 700, color: theme.brand }}>{stage.name} Stage</span>
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: theme.subtext, fontSize: '12.5px' }}>
                <span>Level {currentLevel} Guardian</span>
                <span>•</span>
                <span>{currentXP}/1000 XP</span>
              </div>
            </div>
            
            {/* Level XP Progress Bar */}
            <div style={{ width: '100%', maxWidth: '360px', height: '6px', background: 'rgba(46,125,50,0.1)', borderRadius: '10px', marginTop: '12px', overflow: 'hidden' }}>
              <div style={{ width: `${(currentXP / 1000) * 100}%`, height: '100%', background: '#2E7D32', borderRadius: '10px', transition: 'width 0.4s ease' }} />
            </div>
          </div>
          
          <div style={{ position: 'relative', zIndex: 1, width: '110px', height: '110px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '96px', height: '96px', borderRadius: '50%', background: theme.cardBg, border: `4px solid ${theme.border}`, overflow: 'hidden', animation: 'breathe 4s ease-in-out infinite', boxShadow: '0 10px 24px rgba(15,93,62,0.14)' }}>
              <img src={companionMaleImg} alt="Sprout mascot" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{ position: 'absolute', bottom: '2px', right: '0px', width: '28px', height: '28px', background: '#2E7D32', borderRadius: '50%', border: `3px solid ${theme.cardBg}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', transformOrigin: 'bottom center', animation: 'waveArm 2.4s ease-in-out infinite' }}>
              👋
            </div>
          </div>
        </div>

        {/* PROFILE COMPLETION CHECKLIST */}
        <div style={{ background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: '26px', padding: '24px 30px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '8px' }}>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '18px', color: theme.brand, margin: 0 }}>👤 Profile Personalization Checklist</h3>
            <span style={{ fontSize: '12px', color: theme.subtext, fontWeight: 700 }}>
              {Math.round(((Object.values(onboarding).filter(Boolean).length) / 4) * 100)}% Complete
            </span>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginTop: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', background: onboarding.createdAccount ? 'rgba(46,125,50,0.06)' : theme.hoverBg, borderRadius: '12px', border: `1px solid ${onboarding.createdAccount ? 'rgba(46,125,50,0.15)' : theme.border}` }}>
              <span style={{ fontSize: '16px' }}>{onboarding.createdAccount ? '✅' : '⬜'}</span>
              <span style={{ fontSize: '13px', fontWeight: onboarding.createdAccount ? 700 : 500 }}>Create Account</span>
            </div>
            
            <div style={{ position: 'relative' }}>
              <div onClick={() => !onboarding.setDiet && setShowDietPicker(!showDietPicker)} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', background: onboarding.setDiet ? 'rgba(46,125,50,0.06)' : theme.hoverBg, borderRadius: '12px', border: `1px solid ${onboarding.setDiet ? 'rgba(46,125,50,0.15)' : theme.border}`, cursor: onboarding.setDiet ? 'default' : 'pointer' }}>
                <span style={{ fontSize: '16px' }}>{onboarding.setDiet ? '✅' : '🍽️'}</span>
                <span style={{ fontSize: '13px', fontWeight: onboarding.setDiet ? 700 : 500 }}>Set Diet Preference</span>
              </div>
              {showDietPicker && (
                <div style={{ position: 'absolute', top: '48px', left: 0, width: '100%', background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: '12px', padding: '6px', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '4px', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}>
                  {['Vegan', 'Vegetarian', 'Omnivore'].map((diet) => (
                    <button key={diet} onClick={() => handleSelectDiet(diet)} style={{ background: 'transparent', padding: '8px 12px', textAlign: 'left', fontSize: '12px', color: theme.text, border: 'none', width: '100%', cursor: 'pointer', borderRadius: '8px' }} onMouseEnter={(e) => e.target.style.background = theme.hoverBg} onMouseLeave={(e) => e.target.style.background = 'transparent'}>
                      {diet}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div style={{ position: 'relative' }}>
              <div onClick={() => !onboarding.setCommute && setShowCommutePicker(!showCommutePicker)} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', background: onboarding.setCommute ? 'rgba(46,125,50,0.06)' : theme.hoverBg, borderRadius: '12px', border: `1px solid ${onboarding.setCommute ? 'rgba(46,125,50,0.15)' : theme.border}`, cursor: onboarding.setCommute ? 'default' : 'pointer' }}>
                <span style={{ fontSize: '16px' }}>{onboarding.setCommute ? '✅' : '🚲'}</span>
                <span style={{ fontSize: '13px', fontWeight: onboarding.setCommute ? 700 : 500 }}>Set Travel Commute</span>
              </div>
              {showCommutePicker && (
                <div style={{ position: 'absolute', top: '48px', left: 0, width: '100%', background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: '12px', padding: '6px', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '4px', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}>
                  {['Metro', 'Bicycle', 'Walk', 'Personal Car'].map((commute) => (
                    <button key={commute} onClick={() => handleSelectCommute(commute)} style={{ background: 'transparent', padding: '8px 12px', textAlign: 'left', fontSize: '12px', color: theme.text, border: 'none', width: '100%', cursor: 'pointer', borderRadius: '8px' }} onMouseEnter={(e) => e.target.style.background = theme.hoverBg} onMouseLeave={(e) => e.target.style.background = 'transparent'}>
                      {commute}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', background: onboarding.firstJournal ? 'rgba(46,125,50,0.06)' : theme.hoverBg, borderRadius: '12px', border: `1px solid ${onboarding.firstJournal ? 'rgba(46,125,50,0.15)' : theme.border}` }}>
              <span style={{ fontSize: '16px' }}>{onboarding.firstJournal ? '✅' : '⬜'}</span>
              <span style={{ fontSize: '13px', fontWeight: onboarding.firstJournal ? 700 : 500 }}>Log First Activity</span>
            </div>
          </div>
        </div>

        {/* TODAY'S MISSION */}
        {todayMission && (
          <div id="missions-sec" style={{ background: '#1B4332', borderRadius: '26px', padding: '30px 36px', color: '#fff', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-40%', right: '-6%', width: '280px', height: '280px', background: 'radial-gradient(circle,rgba(76,175,80,0.35),transparent 70%)' }}></div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', position: 'relative', zIndex: 1, flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.06em', color: '#8FCB7A', textTransform: 'uppercase', marginBottom: '10px' }}>Today's Mission</div>
                {todayMissionDone ? (
                  <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '26px', fontWeight: 700, margin: '0 0 14px' }}>✅ Today's mission completed — fantastic job!</h2>
                ) : (
                  <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '26px', fontWeight: 700, margin: '0 0 14px' }}>{todayMission.name}</h2>
                )}
                <div style={{ display: 'flex', gap: '22px', flexWrap: 'wrap' }}>
                  <div style={{ fontSize: '13px', color: '#D7E8D2' }}>⏱ {todayMission.duration}</div>
                  <div style={{ fontSize: '13px', color: '#D7E8D2' }}>📊 {todayMission.difficulty}</div>
                  <div style={{ fontSize: '13px', color: '#D7E8D2' }}>🪙 +{todayMission.reward_coins} Sprout Coins</div>
                  <div style={{ fontSize: '13px', color: '#D7E8D2' }}>🌍 +{todayMission.co2_impact} kg CO₂ saved</div>
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
                    🎉 Completed
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* DAILY PROGRESS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(230px,1fr))', gap: '18px' }}>
          
          {/* Daily Missions Progress Ring */}
          <div style={{ background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: '22px', padding: '22px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '66px', height: '66px', borderRadius: '50%', background: `conic-gradient(#2E7D32 ${ringPercent * 3.6}deg, ${theme.border} 0deg)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.15s linear' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: theme.cardBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 800, color: theme.brand }}>{Math.round(ringPercent)}%</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: theme.subtext, fontWeight: 700 }}>Daily Progress</div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: theme.text }}>{todayMissionDone ? 1 : 0} of 5 missions</div>
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
              <div style={{ fontSize: '20px', fontWeight: 800, color: theme.brand, fontFamily: "'Playfair Display',serif" }}>
                {coins.toLocaleString('en-IN')}
              </div>
              <div style={{ fontSize: '12px', color: theme.subtext, fontWeight: 700 }}>Sprout Coins</div>
            </div>
          </div>

          {/* Eco Score Conic Ring */}
          <div style={{ background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: '22px', padding: '22px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: `conic-gradient(#2E7D32 ${ecoScore * 3.6}deg, ${theme.border} 0deg)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.15s linear' }}>
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

        {/* 🌍 MY LIVING WORLD (INTERACTIVE ISLAND) */}
        <div onMouseMove={handleIslandMouseMove} onMouseLeave={handleIslandMouseLeave} style={{ background: islandNight ? 'linear-gradient(180deg,#0B2038,#123024 70%)' : 'linear-gradient(180deg,#DCEEF5,#F7F3E9 70%)', border: `1px solid ${theme.border}`, borderRadius: '26px', padding: '26px 30px 0', position: 'relative', overflow: 'hidden', height: '440px', transition: 'background 0.5s ease' }}>
          <div style={{ position: 'relative', zIndex: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.05em', color: '#2E7D32', textTransform: 'uppercase', marginBottom: '6px' }}>My Living World</div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '20px', fontWeight: 700, color: islandNight ? '#EAF3EC' : '#1B4332' }}>{stage.icon} {stage.name} Stage</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '12px', color: islandNight ? '#9FC2AE' : '#6B7280' }}>{missionsCompleted} missions completed</div>
                <div style={{ fontSize: '11px', color: islandNight ? '#9FC2AE' : '#6B7280', opacity: 0.8 }}>
                  {worldStage < 5 ? `${nextThreshold - missionsCompleted} missions to ${stages[worldStage + 1].name}` : 'Max stage reached 🌎'}
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

            {/* Stages visualization elements */}
            {worldStage >= 1 && <div style={{ position: 'absolute', bottom: '120px', left: '47%', fontSize: '30px' }}>🌱</div>}
            {worldStage >= 2 && (
              <>
                <div style={{ position: 'absolute', bottom: '100px', left: '30%', fontSize: '22px' }}>🌿</div>
                <div style={{ position: 'absolute', bottom: '96px', left: '64%', fontSize: '22px' }}>🌸</div>
              </>
            )}
            {worldStage >= 3 && (
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
            {worldStage >= 4 && (
              <>
                <div style={{ position: 'absolute', bottom: '150px', left: '38%', fontSize: '18px', animation: 'butterflyFlit 3s ease-in-out infinite' }}>🦋</div>
                <div style={{ position: 'absolute', bottom: '60px', left: '26%', fontSize: '16px', animation: 'birdFly 7s linear infinite' }}>🐦</div>
              </>
            )}
            {worldStage >= 5 && (
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

        {/* ⚡ QUICK AI TOOLS */}
        <div id="quick-tools-sec">
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '20px', color: theme.brand, marginBottom: '14px' }}>⚡ Quick AI Tools</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            
            <div onClick={() => setActiveTool('carbon')} style={{ background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: '20px', padding: '20px', cursor: 'pointer', transition: 'all 0.3s ease' }} className="card">
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>🌍</div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: theme.text, marginBottom: '4px' }}>Carbon Calculator</div>
              <div style={{ fontSize: '12px', color: theme.subtext }}>Estimate your daily travel, electricity, and diet footprints.</div>
            </div>

            <div onClick={() => setActiveTool('receipt')} style={{ background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: '20px', padding: '20px', cursor: 'pointer', transition: 'all 0.3s ease' }} className="card">
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>🧾</div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: theme.text, marginBottom: '4px' }}>Receipt Scanner</div>
              <div style={{ fontSize: '12px', color: theme.subtext }}>Upload mock shopping bills and get instant green swap tags.</div>
            </div>

            <div onClick={() => setActiveTool('image')} style={{ background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: '20px', padding: '20px', cursor: 'pointer', transition: 'all 0.3s ease' }} className="card">
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>📸</div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: theme.text, marginBottom: '4px' }}>Image Verification</div>
              <div style={{ fontSize: '12px', color: theme.subtext }}>Verify sustainable goals using snapshot photo scans.</div>
            </div>

            <div onClick={() => setActiveTool('voice')} style={{ background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: '20px', padding: '20px', cursor: 'pointer', transition: 'all 0.3s ease' }} className="card">
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>🎙️</div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: theme.text, marginBottom: '4px' }}>AI Voice Coach</div>
              <div style={{ fontSize: '12px', color: theme.subtext }}>Simulate hands-free voice coach query responses.</div>
            </div>

          </div>
        </div>

        {/* 📝 ACTIVITY JOURNAL (AI POWERED) */}
        <div style={{ background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: '24px', padding: '26px 30px' }}>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '20px', color: theme.brand, margin: '0 0 6px' }}>📝 Activity Journal (AI Powered)</h3>
          <p style={{ fontSize: '13px', color: theme.subtext, margin: '0 0 16px' }}>Log manual eco-activities. Sprout AI will verify details and add carbon savings directly to your stats.</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <textarea value={journalInput} onChange={(e) => setJournalInput(e.target.value)} placeholder="Describe your eco-friendly action... e.g. I rode Delhi Metro instead of driving today, or I composted 2kg of organic food waste." style={{ minHeight: '80px', width: '100%', background: theme.pageBg, color: theme.text, border: `1px solid ${theme.border}`, borderRadius: '14px', padding: '12px 14px', fontSize: '13.5px', fontFamily: 'inherit', resize: 'vertical' }} disabled={journalProcessing} />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ fontSize: '12px', color: '#2E7D32', fontWeight: 700 }}>
                {journalStep && `🛡️ AI Coach: ${journalStep}`}
              </div>
              <button onClick={handleLogActivity} style={{ background: '#2E7D32', color: '#fff', padding: '10px 20px', borderRadius: '12px', fontSize: '13.5px', cursor: 'pointer', fontFamily: 'inherit' }} disabled={journalProcessing || !journalInput.trim()}>
                {journalProcessing ? 'Analyzing...' : 'Log Activity (25🪙)'}
              </button>
            </div>

            {/* List of logged activities */}
            {loggedActivities.length > 0 && (
              <div style={{ marginTop: '14px', borderTop: `1px solid ${theme.border}`, paddingTop: '14px' }}>
                <div style={{ fontSize: '12px', color: theme.subtext, fontWeight: 700, marginBottom: '10px' }}>Recent Logged Activities</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {loggedActivities.map((act) => (
                    <div key={act.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: theme.hoverBg, padding: '10px 14px', borderRadius: '12px', border: `1px solid ${theme.border}` }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '13px', color: theme.text }}>{act.text}</div>
                        <div style={{ fontSize: '11px', color: theme.subtext, marginTop: '2px' }}>{act.time}</div>
                      </div>
                      <div style={{ display: 'flex', gap: '10px', fontSize: '12px', fontWeight: 700, color: '#2E7D32', flexShrink: 0 }}>
                        <span>🪙 +{act.coins}</span>
                        <span>🌍 -{act.co2}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RECOMMENDED MISSIONS */}
        {recommended.length > 0 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '14px' }}>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '20px', color: theme.brand, margin: 0 }}>Recommended Missions</h3>
              <span style={{ fontSize: '12px', color: theme.subtext }}>✨ AI-curated for you</span>
            </div>
            <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '6px' }}>
              {recommended.map((m, i) => (
                <div key={i} style={{ background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: '20px', padding: '20px', minWidth: '240px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ fontSize: '26px' }}>{m.emoji || '🎯'}</div>
                  <div style={{ fontSize: '14.5px', fontWeight: 700, color: theme.text }}>{m.name}</div>
                  <div style={{ display: 'flex', gap: '10px', fontSize: '11.5px', color: theme.subtext }}>
                    <span>⏱ {m.duration}</span>
                    <span>📊 {m.difficulty}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: theme.subtext }}>
                    <span>🪙 +{m.reward_coins}</span>
                    <span>🌍 {m.co2_impact} kg CO₂</span>
                  </div>
                  {m.done ? (
                    <div style={{ textAlign: 'center', background: 'rgba(46,125,50,0.1)', color: '#2E7D32', borderRadius: '10px', padding: '9px', fontSize: '12.5px', fontWeight: 700 }}>
                      ✅ Completed
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
        )}

        {/* 🎯 ACTIVE CHALLENGES */}
        <div>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '20px', color: theme.brand, marginBottom: '14px' }}>🎯 Active Challenges</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
            {[
              { id: 'c1', title: 'Plastic-Free Week — Bengaluru', desc: 'Avoid all single-use plastic containers and bags.', users: '14,280', reward: 250, days: 5 },
              { id: 'c2', title: 'Delhi Metro Transit Challenge', desc: 'Commute entirely using Delhi Metro route options.', users: '9,540', reward: 300, days: 8 },
              { id: 'c3', title: 'Composting Champion Week', desc: 'Compost 5 kg of food waste at local drops.', users: '3,120', reward: 200, days: 6 }
            ].map((c) => {
              const joined = joinedChallenges[c.id];
              return (
                <div key={c.id} style={{ background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: '22px', padding: '22px', display: 'flex', flexDirection: 'column', justify: 'between', gap: '12px' }} className="card">
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: theme.text }}>{c.title}</div>
                    <div style={{ fontSize: '12px', color: theme.subtext, marginTop: '4px', lineHeight: 1.35 }}>{c.desc}</div>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: theme.subtext }}>
                    <span>👥 {c.users} active</span>
                    <span>⏳ {c.days} days left</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                    <span style={{ fontSize: '12px', color: '#2E7D32', fontWeight: 800 }}>🪙 {c.reward} Sprout Coins</span>
                    <button onClick={() => handleToggleChallenge(c.id, c.title)} style={{ padding: '8px 14px', borderRadius: '10px', background: joined ? 'rgba(46,125,50,0.1)' : '#2E7D32', color: joined ? '#2E7D32' : '#fff', border: 'none', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
                      {joined ? '✓ Joined' : 'Join'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 📚 LEARNING HUB & QUIZ */}
        <div id="learning-hub-sec" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '22px' }}>
          
          {/* Daily Quiz Widget */}
          <div style={{ background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: '24px', padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#2E7D32', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Daily Eco-Quiz</div>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '18px', color: theme.brand, marginTop: '2px' }}>Test Your Green IQ</h3>
            </div>
            
            <p style={{ fontSize: '13px', color: theme.text, margin: 0, lineHeight: 1.4 }}>
              Which of these daily actions has the highest carbon-saving impact on average?
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '6px' }}>
              {[
                { key: 'A', text: 'Swapping a 10km car drive for cycling/metro' },
                { key: 'B', text: 'Recycling one single-use plastic bottle' },
                { key: 'C', text: 'Unplugging your laptop charger for 1 hour' }
              ].map((choice) => (
                <button key={choice.key} onClick={() => handleQuizAnswer(choice.key)} style={{ background: selectedQuizAns === choice.key ? (choice.key === 'A' ? 'rgba(46,125,50,0.12)' : 'rgba(211,47,47,0.08)') : theme.hoverBg, border: `1px solid ${selectedQuizAns === choice.key ? (choice.key === 'A' ? '#2E7D32' : '#D32F2F') : theme.border}`, borderRadius: '12px', padding: '10px 14px', fontSize: '12.5px', color: theme.text, textAlign: 'left', cursor: quizDone ? 'default' : 'pointer', transition: 'all 0.2s' }} disabled={quizDone}>
                  <strong>{choice.key})</strong> {choice.text}
                </button>
              ))}
            </div>

            {quizFeedback && (
              <div style={{ fontSize: '12.5px', background: selectedQuizAns === 'A' ? 'rgba(46,125,50,0.06)' : 'rgba(211,47,47,0.04)', border: `1px solid ${selectedQuizAns === 'A' ? 'rgba(46,125,50,0.15)' : 'rgba(211,47,47,0.1)'}`, padding: '10px 14px', borderRadius: '12px', color: selectedQuizAns === 'A' ? '#1B4332' : '#721C24', lineHeight: 1.4 }}>
                {quizFeedback}
              </div>
            )}
          </div>

          {/* Featured Read of the Day */}
          {(() => {
            const featuredBlog = blogs.length > 0 ? blogs[0] : {
              icon: '🌧️',
              tag: 'Guide',
              title: '5 Ways to Cut Your Carbon Footprint This Monsoon',
              read: '4 min read',
              excerpt: 'Simple shifts in travel, local composting, and energy use to maintain an eco-friendly lifestyle during the Indian monsoon season.'
            };
            return (
              <div style={{ background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: '24px', padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '12px', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#2E7D32', textTransform: 'uppercase', letterSpacing: '0.05em' }}>📖 Featured Read of the Day</span>
                    <span style={{ fontSize: '11.5px', color: theme.subtext }}>{featuredBlog.read || featuredBlog.read_time || '5 min read'}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '18px', color: theme.brand, marginTop: '10px', marginBottom: 0, lineHeight: 1.35 }}>
                    {featuredBlog.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: theme.subtext, marginTop: '8px', marginBottom: 0, lineHeight: 1.45 }}>
                    {featuredBlog.excerpt || 'Discover easy shifts in lifestyle, travel, and composting to maintain your sustainability journey and earn Sprout Coins.'}
                  </p>
                </div>
                
                <button onClick={() => showToast('Redirecting to full blog article...')} style={{ background: '#2E7D32', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '10px', fontSize: '12.5px', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px', alignSelf: 'flex-start', marginTop: '4px', fontFamily: 'inherit' }}>
                  Read Full Article →
                </button>
              </div>
            );
          })()}
        </div>

        {/* COMMUNITY FEED */}
        {community.length > 0 && (
          <div id="community" style={{ background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: '24px', padding: '26px 30px' }}>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '20px', color: theme.brand, margin: '0 0 16px' }}>Community Feed</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {community.map((c, i) => (
                <div key={c.id || i}>
                  <div style={{ padding: '13px 4px', borderBottom: `1px solid ${theme.border}` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: c.color || '#2E7D32', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '14px', flexShrink: 0 }}>
                        {c.initial || 'U'}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '13.5px', color: theme.text }}>
                          <b>{c.user?.name}</b> {c.action} {c.emoji}
                        </div>
                        <div style={{ fontSize: '11px', color: theme.subtext }}>{c.time || 'Just now'}</div>
                      </div>
                      
                      {/* Likes trigger */}
                      <button onClick={async () => {
                        try {
                          if (!isDemo) {
                            if (c.liked) {
                              await supabase.from('post_likes').delete().eq('post_id', c.id).eq('user_id', userId);
                            } else {
                              await supabase.from('post_likes').insert({ post_id: c.id, user_id: userId });
                            }
                          }
                          setCommunity(prev =>
                            prev.map((post, idx) =>
                              idx === i ? { ...post, liked: !post.liked, likes: post.likes + (post.liked ? -1 : 1) } : post
                            )
                          );
                        } catch (err) {
                          console.error('Error updating post like:', err);
                        }
                      }} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '13px', color: c.liked ? '#E85D4C' : theme.subtext, fontWeight: 700, display: 'flex', gap: '5px', alignItems: 'center', fontFamily: 'inherit' }}>
                        {c.liked ? '❤️' : '🤍'} {c.likes}
                      </button>

                      {/* Comment toggle trigger */}
                      <button onClick={() => {
                        setCommunity(prev =>
                          prev.map((post, idx) => (idx === i ? { ...post, commentsOpen: !post.commentsOpen } : post))
                        );
                      }} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '12.5px', color: theme.subtext, fontWeight: 700, fontFamily: 'inherit' }}>
                        💬 {c.commentCount || c.comments?.length || 0}
                      </button>
                    </div>
                  </div>

                  {c.commentsOpen && (
                    <div style={{ margin: '10px 0 4px 52px', display: 'flex', flexDirection: 'column', gap: '8px', paddingBottom: '10px' }}>
                      {c.comments && c.comments.map((cm, cmIdx) => (
                        <div key={cmIdx} style={{ fontSize: '12.5px', color: theme.text, background: theme.hoverBg, borderRadius: '10px', padding: '8px 12px' }}>
                          <b>{cm.name}</b> {cm.text}
                        </div>
                      ))}
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <input
                          value={c.draft}
                          onChange={(e) => {
                            const val = e.target.value;
                            setCommunity(prev =>
                              prev.map((post, idx) => (idx === i ? { ...post, draft: val } : post))
                            );
                          }}
                          placeholder="Add a comment…"
                          style={{ flex: 1, border: `1px solid ${theme.border}`, borderRadius: '10px', padding: '8px 12px', fontSize: '12.5px', fontFamily: 'inherit', background: theme.cardBg, color: theme.text }}
                        />
                        <button onClick={async () => {
                          const text = c.draft;
                          if (!text.trim()) return;
                          try {
                            if (!isDemo) {
                              await supabase.from('post_comments').insert({
                                post_id: c.id,
                                user_id: userId,
                                text: text
                              });
                            }
                            setCommunity(prev =>
                              prev.map((post, idx) =>
                                idx === i ? { ...post, comments: [...(post.comments || []), { name: 'You', text }], draft: '', commentCount: (post.commentCount || 0) + 1 } : post
                              )
                            );
                          } catch (err) {
                            console.error('Error adding comment:', err);
                          }
                        }} style={{ background: '#2E7D32', color: '#fff', border: 'none', padding: '0 14px', borderRadius: '10px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                          Post
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* IMPACT SUMMARY */}
        {impactStats.length > 0 && (
          <div>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '20px', color: theme.brand, margin: '0 0 14px' }}>Your Environmental Impact</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '16px' }}>
              {impactStats.map((s, i) => (
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
        )}

        {/*🏆 ACHIEVEMENTS SECTION */}
        {achievements.length > 0 && (
          <div>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '20px', color: theme.brand, margin: '0 0 14px' }}>🏆 Achievements & Badges</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '16px' }}>
              {achievements.map((a, i) => (
                <div key={i} style={{ position: 'relative', background: a.unlocked ? theme.cardBg : theme.hoverBg, border: `1px solid ${theme.border}`, borderRadius: '20px', padding: '20px', textAlign: 'center', opacity: a.unlocked ? 1 : 0.55 }} className="card">
                  <div style={{ fontSize: '32px', marginBottom: '8px', filter: a.unlocked ? 'none' : 'grayscale(1)' }}>
                    {a.icon}
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: theme.text }}>{a.name}</div>
                  <div style={{ fontSize: '11px', color: theme.subtext, marginTop: '4px' }}>{a.desc}</div>
                  {a.unlocked ? (
                    <div style={{ fontSize: '10px', color: '#2E7D32', fontWeight: 800, marginTop: '6px', background: 'rgba(46,125,50,0.08)', display: 'inline-block', padding: '2px 8px', borderRadius: '6px' }}>
                      {a.status || 'Unlocked'}
                    </div>
                  ) : (
                    <div style={{ fontSize: '10px', color: theme.subtext, marginTop: '6px' }}>Locked</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* TOAST PANEL */}
      {toast && (
        <div style={{ position: 'fixed', bottom: '32px', left: '50%', transform: 'translateX(-50%)', background: '#1B4332', color: '#fff', padding: '14px 26px', borderRadius: '14px', fontSize: '13.5px', fontWeight: 700, boxShadow: '0 16px 34px rgba(15,93,62,0.3)', zIndex: 1100, animation: 'toastIn 0.3s ease' }}>
          {toast}
        </div>
      )}

      {/* 🤖 SPROUT AI FLOATING CHAT ASSISTANT */}
      <div style={{ position: 'fixed', bottom: '26px', right: '28px', zIndex: 95, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
        {aiOpen && (
          <div style={{ width: '320px', height: '440px', background: theme.cardBg, borderRadius: '22px', boxShadow: '0 24px 60px rgba(15,93,62,0.28)', border: `1px solid ${theme.border}`, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ background: '#1B4332', color: '#fff', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '30px', height: '30px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #67B346' }}>
                <img src={companionMaleImg} alt="Sprout AI" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
                <div key={i} style={{ display: 'flex', justify: msg.from === 'user' ? 'flex-end' : 'flex-start' }}>
                  <div
                    style={{
                      background: msg.from === 'user' ? '#2E7D32' : theme.hoverBg,
                      color: msg.from === 'user' ? '#fff' : theme.text,
                      padding: '9px 14px',
                      borderRadius: msg.from === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                      fontSize: '12.5px',
                      maxWidth: msg.from === 'user' ? '220px' : '230px',
                      lineHeight: 1.4
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
          <img src={companionMaleImg} alt="Sprout AI mascot" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </button>
      </div>

      {/* QUICK TOOLS POPUP MODAL DIALOGS */}
      {activeTool && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(27,67,50,0.65)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, animation: 'fadeIn 0.2s ease-out' }} onClick={() => setActiveTool(null)}>
          <div style={{ background: '#F7F3E9', border: '1px solid #E8DFC8', borderRadius: 24, padding: '30px 28px', width: '90%', maxWidth: 460, boxShadow: '0 24px 64px rgba(27, 67, 50, 0.2)', position: 'relative', display: 'flex', flexDirection: 'column', gap: '16px' }} onClick={(e) => e.stopPropagation()}>
            
            {/* Close */}
            <button onClick={() => { setActiveTool(null); setCalcResult(null); setReceiptResult(null); setImageResult(null); }} style={{ position: 'absolute', top: 20, right: 20, background: 'transparent', border: 'none', color: '#1B4332', fontSize: 18, cursor: 'pointer', opacity: 0.7 }}>
              ✕
            </button>

            {/* Tool 1: Carbon Calculator */}
            {activeTool === 'carbon' && (
              <div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', color: '#1B4332', fontWeight: 700, margin: '0 0 4px' }}>🌍 Carbon Footprint Calculator</h3>
                <p style={{ fontSize: '13px', color: '#6B7280', margin: '0 0 16px' }}>Measure your annual CO₂ output based on commute and diets.</p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#1B4332' }}>Daily Commute Distance (km)</label>
                    <input type="number" value={calcDistance} onChange={(e) => setCalcDistance(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #E8DFC8', borderRadius: '10px', fontSize: '13px' }} />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#1B4332' }}>Commute Transport Type</label>
                    <select value={calcCommuteType} onChange={(e) => setCalcCommuteType(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #E8DFC8', borderRadius: '10px', fontSize: '13px', fontFamily: 'inherit', background: '#fff' }}>
                      <option value="petrol_car">🚘 Petrol Passenger Car</option>
                      <option value="diesel_car">🚘 Diesel Passenger Car</option>
                      <option value="ev_car">🔌 Electric Vehicle (EV)</option>
                      <option value="metro">🚇 Local Metro Transit</option>
                      <option value="bicycle">🚲 Bicycle / Walk</option>
                    </select>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#1B4332' }}>Diet Consumption preference</label>
                    <select value={calcDietType} onChange={(e) => setCalcDietType(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #E8DFC8', borderRadius: '10px', fontSize: '13px', fontFamily: 'inherit', background: '#fff' }}>
                      <option value="omnivore">🥩 Omnivore Diet (Daily Meat)</option>
                      <option value="vegetarian">🥗 Vegetarian Diet</option>
                      <option value="vegan">🌱 Vegan Diet</option>
                    </select>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#1B4332' }}>Estimated Monthly Power Bill (INR)</label>
                    <input type="number" value={calcElectricityBill} onChange={(e) => setCalcElectricityBill(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #E8DFC8', borderRadius: '10px', fontSize: '13px' }} />
                  </div>

                  <button onClick={calculateFootprint} style={{ background: '#2E7D32', color: '#fff', border: 'none', padding: '12px', borderRadius: '12px', fontWeight: 700, cursor: 'pointer', marginTop: '6px' }}>
                    Calculate Footprint
                  </button>

                  {calcResult && (
                    <div style={{ background: 'rgba(46,125,50,0.06)', border: '1px solid rgba(46,125,50,0.15)', borderRadius: '14px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
                      <div style={{ display: 'flex', justify: 'between', alignItems: 'baseline' }}>
                        <span style={{ fontSize: '13px', color: '#1B4332' }}>Your Estimated Footprint:</span>
                        <strong style={{ fontSize: '18px', color: '#2E7D32' }}>{calcResult.total} Tons CO₂/yr</strong>
                      </div>
                      <div style={{ fontSize: '11.5px', color: '#6B7280', borderBottom: '1px solid #E8DFC8', paddingBottom: '6px' }}>
                        Compared to national average ({calcResult.nationalAvg} Tons/yr): <strong>{calcResult.diff}% {parseFloat(calcResult.diff) > 0 ? 'above' : 'below'}</strong>
                      </div>
                      <div style={{ fontSize: '11px', color: '#1B4332', lineHeight: 1.4 }}>
                        {calcResult.tip}
                      </div>
                      <button onClick={handleSaveCarbonCalc} style={{ background: '#2E7D32', color: '#fff', border: 'none', padding: '8px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', marginTop: '4px' }}>
                        Save Calculation (+15🪙)
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tool 2: Receipt Scanner */}
            {activeTool === 'receipt' && (
              <div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', color: '#1B4332', fontWeight: 700, margin: '0 0 4px' }}>🧾 AI Receipt Scanner</h3>
                <p style={{ fontSize: '13px', color: '#6B7280', margin: '0 0 16px' }}>Analyze grocery shopping slips and find local product alternatives.</p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#1B4332' }}>Enter Receipt Name (simulate upload)</label>
                    <input type="text" placeholder="e.g. grocery_receipt.jpg" value={receiptName} onChange={(e) => setReceiptName(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #E8DFC8', borderRadius: '10px', fontSize: '13px' }} />
                  </div>

                  <button onClick={runReceiptScan} style={{ background: '#2E7D32', color: '#fff', border: 'none', padding: '12px', borderRadius: '12px', fontWeight: 700, cursor: 'pointer' }} disabled={scanningReceipt}>
                    {scanningReceipt ? 'Scanning OCR Data...' : 'Upload & Scan'}
                  </button>

                  {scanningReceipt && (
                    <div style={{ textAlign: 'center', padding: '10px' }}>
                      <span style={{ fontSize: '24px', display: 'inline-block', animation: 'spin 2s linear infinite' }}>♻️</span>
                      <p style={{ fontSize: '12px', color: '#6B7280', margin: '4px 0 0' }}>Analyzing packaging carbon factors...</p>
                    </div>
                  )}

                  {receiptResult && (
                    <div style={{ background: 'rgba(46,125,50,0.06)', border: '1px solid rgba(46,125,50,0.15)', borderRadius: '14px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: '#1B4332', borderBottom: '1px solid #E8DFC8', paddingBottom: '4px' }}>Scanner Output Analysis:</div>
                      <div style={{ fontSize: '12px', color: '#2E7D32' }}>✓ {receiptResult.organic}</div>
                      <div style={{ fontSize: '12px', color: '#2E7D32' }}>✓ {receiptResult.dairy}</div>
                      <div style={{ fontSize: '12px', color: '#B23B3B' }}>❌ {receiptResult.water}</div>
                      <div style={{ fontSize: '12px', color: '#B23B3B' }}>❌ {receiptResult.chocolate}</div>
                      
                      <button onClick={() => { setActiveTool(null); setReceiptResult(null); }} style={{ background: '#2E7D32', color: '#fff', border: 'none', padding: '8px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', marginTop: '4px' }}>
                        Swap Suggested Items (+20🪙)
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tool 3: Image Verification */}
            {activeTool === 'image' && (
              <div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', color: '#1B4332', fontWeight: 700, margin: '0 0 4px' }}>📸 AI Image Verification</h3>
                <p style={{ fontSize: '13px', color: '#6B7280', margin: '0 0 16px' }}>Take a picture of your completed mission to instantly earn Sprout points.</p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#1B4332' }}>Select Task to Verify</label>
                    <select value={imageTaskType} onChange={(e) => setImageTaskType(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #E8DFC8', borderRadius: '10px', fontSize: '13px', background: '#fff', fontFamily: 'inherit' }}>
                      <option value="cycling">🚲 Cycling to campus/office</option>
                      <option value="bottle">🥤 Carrying reusable bottle</option>
                      <option value="plant">🌱 Planting a tree/flowers</option>
                      <option value="meal">🥗 Eating a plant-based meal</option>
                    </select>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#1B4332' }}>Enter Image File Name (simulation)</label>
                    <input type="text" placeholder="e.g. proof_cycling.jpg" value={imageFileName} onChange={(e) => setImageFileName(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #E8DFC8', borderRadius: '10px', fontSize: '13px' }} />
                  </div>

                  <button onClick={runImageVerify} style={{ background: '#2E7D32', color: '#fff', border: 'none', padding: '12px', borderRadius: '12px', fontWeight: 700, cursor: 'pointer' }} disabled={verifyingImage}>
                    {verifyingImage ? 'AI Scan In Progress...' : 'Submit to AI Coach'}
                  </button>

                  {verifyingImage && (
                    <div style={{ textAlign: 'center', padding: '10px' }}>
                      <div style={{ width: '40px', height: '40px', border: '3px solid #E8DFC8', borderTopColor: '#2E7D32', borderRadius: '50%', display: 'inline-block', animation: 'spin 1s linear infinite' }}></div>
                      <p style={{ fontSize: '12px', color: '#6B7280', margin: '6px 0 0' }}>Scanning image nodes for habit proof...</p>
                    </div>
                  )}

                  {imageResult && (
                    <div style={{ background: 'rgba(46,125,50,0.06)', border: '1px solid rgba(46,125,50,0.15)', borderRadius: '14px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ display: 'flex', justify: 'between', alignItems: 'center' }}>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#1B4332' }}>Status:</span>
                        <strong style={{ fontSize: '13px', color: '#2E7D32' }}>{imageResult.status} ({imageResult.confidence})</strong>
                      </div>
                      <p style={{ fontSize: '11.5px', color: '#6B7280', margin: 0 }}>{imageResult.details}</p>
                      <strong style={{ fontSize: '12px', color: '#2E7D32' }}>🪙 +{imageResult.reward} Sprout Coins earned!</strong>
                      
                      <button onClick={() => { setActiveTool(null); setImageResult(null); }} style={{ background: '#2E7D32', color: '#fff', border: 'none', padding: '8px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', marginTop: '4px' }}>
                        Close
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tool 4: Voice Assistant */}
            {activeTool === 'voice' && (
              <div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', color: '#1B4332', fontWeight: 700, margin: '0 0 4px' }}>🎙️ AI Voice Coach Assistant</h3>
                <p style={{ fontSize: '13px', color: '#6B7280', margin: '0 0 12px' }}>Trigger sustainability commands hands-free with simulated replies.</p>
                
                <div style={{ background: '#0F2A1C', borderRadius: '16px', padding: '14px', height: '180px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', border: '1px solid #28503C' }}>
                  {voiceMessages.map((msg, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start' }}>
                      <div style={{ background: msg.from === 'user' ? '#2E7D32' : 'rgba(255,255,255,0.08)', color: '#fff', padding: '8px 12px', borderRadius: '12px', fontSize: '12px', maxWidth: '80%', lineHeight: 1.4 }}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {voiceListening && (
                    <div style={{ color: '#8FCB7A', fontSize: '11.5px', fontStyle: 'italic' }}>🎙️ Sprout is talking...</div>
                  )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '12px' }}>
                  <div style={{ fontSize: '11px', color: '#6B7280', fontWeight: 700 }}>Choose a voice command snippet:</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <button onClick={() => handleVoiceCommand('Hey Sprout, how green was my week?', 'Great week! You completed 5 missions and saved 4.2 kg CO₂ — 18% better than last week.')} style={{ background: '#fff', border: '1px solid #E8DFC8', padding: '8px 10px', fontSize: '12px', textAlign: 'left', cursor: 'pointer', borderRadius: '8px', color: '#2F3A3D' }} onMouseEnter={(e) => e.target.style.background = '#E8DFC8'} onMouseLeave={(e) => e.target.style.background = '#fff'}>
                      🗣️ "Hey Sprout, how green was my week?"
                    </button>
                    <button onClick={() => handleVoiceCommand('Tell me how composting works.', 'Composting breaks down food scraps organically. Separate organic bins, keep it aerated, and you cut trash methane emissions by 80%!')} style={{ background: '#fff', border: '1px solid #E8DFC8', padding: '8px 10px', fontSize: '12px', textAlign: 'left', cursor: 'pointer', borderRadius: '8px', color: '#2F3A3D' }} onMouseEnter={(e) => e.target.style.background = '#E8DFC8'} onMouseLeave={(e) => e.target.style.background = '#fff'}>
                      🗣️ "Tell me how composting works."
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', justify: 'center', marginTop: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#2E7D32', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', animation: 'ringPulse 2s infinite' }} onClick={() => showToast('🎙️ Simulated audio microphone active!')}>
                    <span style={{ fontSize: '20px', color: '#fff' }}>🎙️</span>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Confetti or modal spinner styles */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

    </div>
  );
};

export default DashboardDynamic;
