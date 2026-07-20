import { createClient } from '@supabase/supabase-js';

export async function onRequest({ params, env }) {
  const supabase = createClient(
    env.SUPABASE_URL,
    env.SUPABASE_SERVICE_KEY
  );
  const { userId } = params;

  if (!userId) {
    return new Response(JSON.stringify({ error: 'User ID required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Fetch user profile
    let { data: profile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    let stats = null;

    if (profileError && profileError.code === 'PGRST116') {
      // Profile doesn't exist, create it automatically
      let name = 'Eco User';
      let email = 'user@example.com';
      try {
        const { data: { user }, error: authError } = await supabase.auth.admin.getUserById(userId);
        if (!authError && user) {
          name = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Eco User';
          email = user.email || 'user@example.com';
        }
      } catch (authErr) {
        console.error('Error fetching auth user info:', authErr);
      }

      const { data: newProfile, error: createError } = await supabase
        .from('users')
        .insert({ id: userId, name, email })
        .select()
        .single();

      if (createError) throw createError;
      profile = newProfile;

      // Create default stats
      const { data: newStats, error: statsError } = await supabase
        .from('user_stats')
        .insert({ user_id: userId, coins: 150, eco_score: 50, streak: 1, missions_completed: 0, world_stage: 0 })
        .select()
        .single();

      if (statsError) throw statsError;
      stats = newStats;
    } else if (profileError) {
      throw profileError;
    } else {
      // Profile exists, fetch user stats
      const { data: existingStats, error: statsError } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', userId)
        .single();
      
      if (statsError && statsError.code === 'PGRST116') {
        const { data: newStats, error: createStatsError } = await supabase
          .from('user_stats')
          .insert({ user_id: userId, coins: 150, eco_score: 50, streak: 1, missions_completed: 0, world_stage: 0 })
          .select()
          .single();
        if (createStatsError) throw createStatsError;
        stats = newStats;
      } else if (statsError) {
        throw statsError;
      } else {
        stats = existingStats;
      }
    }

    // Fetch today's mission
    const { data: todayMission } = await supabase
      .from('daily_missions')
      .select('*')
      .eq('user_id', userId)
      .gte('created_at', new Date().toISOString().split('T')[0])
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    // Fetch missions completed today
    const { data: completedToday } = await supabase
      .from('mission_completions')
      .select('id')
      .eq('user_id', userId)
      .gte('completed_at', new Date().toISOString().split('T')[0]);

    // Fetch eco score
    const { data: ecoScore } = await supabase
      .from('user_stats')
      .select('eco_score')
      .eq('user_id', userId)
      .single();

    // Fetch notifications
    const { data: notifications } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(4);

    return new Response(
      JSON.stringify({
        profile,
        stats,
        todayMission,
        missionsCompletedToday: completedToday?.length || 0,
        ecoScore: ecoScore?.eco_score || 0,
        notifications: notifications || [],
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Dashboard error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
