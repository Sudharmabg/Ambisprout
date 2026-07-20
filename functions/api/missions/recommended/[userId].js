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
    // Get user profile for personalization
    const { data: user } = await supabase
      .from('users')
      .select('lifestyle, commute_type, diet_type')
      .eq('id', userId)
      .single();

    // Get recommended missions based on user profile
    let query = supabase
      .from('missions')
      .select('*')
      .eq('status', 'active');

    // Filter by user lifestyle
    if (user?.lifestyle) {
      query = query.or(`target_lifestyle.eq.${user.lifestyle},target_lifestyle.is.null`);
    }

    const { data: missions } = await query
      .order('impact_score', { ascending: false })
      .limit(4);

    // Get completed missions for this user
    const { data: completed } = await supabase
      .from('mission_completions')
      .select('mission_id')
      .eq('user_id', userId);

    const completedIds = new Set(completed?.map(c => c.mission_id) || []);

    // Mark completed missions
    const recommendedWithStatus = missions?.map(m => ({
      ...m,
      done: completedIds.has(m.id),
    })) || [];

    return new Response(JSON.stringify(recommendedWithStatus), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Recommended missions error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
