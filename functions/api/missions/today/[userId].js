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
    // Get user's current stage
    const { data: userStats } = await supabase
      .from('user_stats')
      .select('world_stage, missions_completed')
      .eq('user_id', userId)
      .single();

    // Get all available missions
    const { data: allMissions } = await supabase
      .from('missions')
      .select('*')
      .order('difficulty', { ascending: true });

    if (!allMissions || allMissions.length === 0) {
      return new Response(JSON.stringify({ error: 'No missions available' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Rotate mission based on day and user ID
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    const missionIndex = (dayOfYear + userId.charCodeAt(0)) % allMissions.length;
    const todayMission = allMissions[missionIndex];

    // Check if already completed today
    const today = new Date().toISOString().split('T')[0];
    const { data: completed } = await supabase
      .from('mission_completions')
      .select('id')
      .eq('user_id', userId)
      .eq('mission_id', todayMission.id)
      .gte('completed_at', `${today}T00:00:00`)
      .single();

    return new Response(
      JSON.stringify({
        ...todayMission,
        completed: !!completed,
        worldStage: userStats?.world_stage || 0,
        missionsTotal: userStats?.missions_completed || 0,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Today mission error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
