// API endpoints via Cloudflare Workers
const API_BASE = import.meta.env.VITE_API_URL || '/api';

// Helper function to make API calls with auth token
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API call failed: ${endpoint}`, error);
    throw error;
  }
};

// User & Dashboard APIs
export const dashboardAPI = {
  // Get user dashboard data
  getDashboard: async (userId) => apiCall(`/dashboard/${userId}`),

  // Get user profile
  getUserProfile: async (userId) => apiCall(`/users/${userId}`),

  // Update user stats
  updateUserStats: async (userId, stats) =>
    apiCall(`/users/${userId}`, { method: 'PUT', body: JSON.stringify(stats) }),
};

// Missions APIs
export const missionsAPI = {
  // Get today's mission
  getTodayMission: async (userId) => apiCall(`/missions/today/${userId}`),

  // Get recommended missions
  getRecommendedMissions: async (userId) => apiCall(`/missions/recommended/${userId}`),

  // Start a mission
  startMission: async (userId, missionId) =>
    apiCall(`/missions/${missionId}/start`, {
      method: 'POST',
      body: JSON.stringify({ userId }),
    }),

  // Complete a mission
  completeMission: async (userId, missionId) =>
    apiCall(`/missions/${missionId}/complete`, {
      method: 'POST',
      body: JSON.stringify({ userId }),
    }),

  // Skip a mission
  skipMission: async (userId, missionId) =>
    apiCall(`/missions/${missionId}/skip`, {
      method: 'POST',
      body: JSON.stringify({ userId }),
    }),
};

// Community APIs
export const communityAPI = {
  // Get community feed
  getFeed: async (limit = 10, offset = 0) =>
    apiCall(`/community/feed?limit=${limit}&offset=${offset}`),

  // Get community post
  getPost: async (postId) => apiCall(`/community/posts/${postId}`),

  // Create community post
  createPost: async (userId, data) =>
    apiCall('/community/posts', {
      method: 'POST',
      body: JSON.stringify({ userId, ...data }),
    }),

  // Like a post
  likePost: async (userId, postId) =>
    apiCall(`/community/posts/${postId}/like`, {
      method: 'POST',
      body: JSON.stringify({ userId }),
    }),

  // Unlike a post
  unlikePost: async (userId, postId) =>
    apiCall(`/community/posts/${postId}/unlike`, {
      method: 'POST',
      body: JSON.stringify({ userId }),
    }),

  // Add comment
  addComment: async (userId, postId, text) =>
    apiCall(`/community/posts/${postId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ userId, text }),
    }),
};

// Achievements APIs
export const achievementsAPI = {
  // Get user achievements
  getUserAchievements: async (userId) => apiCall(`/achievements/${userId}`),

  // Get achievement details
  getAchievementDetail: async (achievementId) =>
    apiCall(`/achievements/detail/${achievementId}`),
};

// Environmental Impact APIs
export const impactAPI = {
  // Get user impact stats
  getImpactStats: async (userId) => apiCall(`/impact/${userId}`),

  // Get impact history
  getImpactHistory: async (userId, days = 30) =>
    apiCall(`/impact/${userId}/history?days=${days}`),
};

// Blogs APIs
export const blogsAPI = {
  // Get featured blogs
  getFeaturedBlogs: async (limit = 3) => apiCall(`/blogs?limit=${limit}&featured=true`),

  // Get all blogs
  getAllBlogs: async (limit = 10, offset = 0) =>
    apiCall(`/blogs?limit=${limit}&offset=${offset}`),
};

export default {
  dashboardAPI,
  missionsAPI,
  communityAPI,
  achievementsAPI,
  impactAPI,
  blogsAPI,
};
