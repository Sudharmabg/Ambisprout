import { useState, useEffect } from 'react';
import { dashboardAPI, missionsAPI, communityAPI, achievementsAPI, impactAPI, blogsAPI } from '../lib/api';

// Hook to fetch dashboard data
export const useDashboard = (userId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const dashboardData = await dashboardAPI.getDashboard(userId);
        setData(dashboardData);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [userId]);

  return { data, loading, error };
};

// Hook to fetch user profile
export const useUserProfile = (userId) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const profileData = await dashboardAPI.getUserProfile(userId);
        setProfile(profileData);
        setError(null);
      } catch (err) {
        setError(err.message);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  return { profile, loading, error };
};

// Hook to fetch missions
export const useMissions = (userId) => {
  const [todayMission, setTodayMission] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const fetchMissions = async () => {
      try {
        setLoading(true);
        const [today, rec] = await Promise.all([
          missionsAPI.getTodayMission(userId),
          missionsAPI.getRecommendedMissions(userId),
        ]);
        setTodayMission(today);
        setRecommended(rec);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMissions();
  }, [userId]);

  return { todayMission, recommended, loading, error };
};

// Hook to fetch community feed
export const useCommunityFeed = () => {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        setLoading(true);
        const feedData = await communityAPI.getFeed();
        setFeed(feedData);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, []);

  return { feed, loading, error, setFeed };
};

// Hook to fetch achievements
export const useAchievements = (userId) => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const fetchAchievements = async () => {
      try {
        setLoading(true);
        const achievementsData = await achievementsAPI.getUserAchievements(userId);
        setAchievements(achievementsData);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, [userId]);

  return { achievements, loading, error };
};

// Hook to fetch impact stats
export const useImpactStats = (userId) => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const fetchStats = async () => {
      try {
        setLoading(true);
        const statsData = await impactAPI.getImpactStats(userId);
        setStats(statsData);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [userId]);

  return { stats, loading, error };
};

// Hook to fetch blogs
export const useBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const blogsData = await blogsAPI.getFeaturedBlogs();
        setBlogs(blogsData);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return { blogs, loading, error };
};
