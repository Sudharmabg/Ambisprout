import { createClient } from '@supabase/supabase-js';

export async function onRequest({ request, params, env }) {
  const supabase = createClient(
    env.SUPABASE_URL,
    env.SUPABASE_SERVICE_KEY
  );
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { missionId } = params;

  try {
    const { userId } = await request.json();

    if (!userId || !missionId) {
      return new Response(JSON.stringify({ error: 'User ID and Mission ID required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Get mission details
    const { data: mission } = await supabase
      .from('missions')
      .select('*')
      .eq('id', missionId)
      .single();

    if (!mission) {
      return new Response(JSON.stringify({ error: 'Mission not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Record mission completion
    const { data: completion, error: completionError } = await supabase
      .from('mission_completions')
      .insert({
        user_id: userId,
        mission_id: missionId,
        completed_at: new Date().toISOString(),
        coins_earned: mission.reward_coins,
        impact_value: mission.co2_impact,
      });

    if (completionError) throw completionError;

    // Update user stats
    const { data: currentStats } = await supabase
      .from('user_stats')
      .select('*')
      .eq('user_id', userId)
      .single();

    const newCoins = (currentStats?.coins || 0) + mission.reward_coins;
    const newEcoScore = Math.min(100, (currentStats?.eco_score || 0) + 1);
    const newMissionsCompleted = (currentStats?.missions_completed || 0) + 1;

    // Calculate new world stage
    const newStage = Math.min(5, Math.floor(newMissionsCompleted / 15));

    const { error: updateError } = await supabase
      .from('user_stats')
      .update({
        coins: newCoins,
        eco_score: newEcoScore,
        missions_completed: newMissionsCompleted,
        world_stage: newStage,
        last_mission_date: new Date().toISOString(),
      })
      .eq('user_id', userId);

    if (updateError) throw updateError;

    // Update streak
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    const { data: yesterdayCompletion } = await supabase
      .from('mission_completions')
      .select('id')
      .eq('user_id', userId)
      .gte('completed_at', `${yesterdayStr}T00:00:00`)
      .lte('completed_at', `${yesterdayStr}T23:59:59`)
      .limit(1);

    let newStreak = 1;
    if (yesterdayCompletion && yesterdayCompletion.length > 0) {
      newStreak = (currentStats?.streak || 0) + 1;
    }

    await supabase
      .from('user_stats')
      .update({ streak: newStreak })
      .eq('user_id', userId);

    // Create notification
    await supabase.from('notifications').insert({
      user_id: userId,
      type: 'mission_completed',
      title: `Mission Complete: ${mission.name}`,
      message: `You earned ${mission.reward_coins} Sprout Coins!`,
      icon: mission.emoji || '🎉',
      created_at: new Date().toISOString(),
    });

    return new Response(
      JSON.stringify({
        success: true,
        completion,
        newStats: {
          coins: newCoins,
          ecoScore: newEcoScore,
          streak: newStreak,
          missionsCompleted: newMissionsCompleted,
          worldStage: newStage,
        },
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Mission completion error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
