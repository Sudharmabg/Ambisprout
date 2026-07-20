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
    // Get all completed missions for this user
    const { data: completions } = await supabase
      .from('mission_completions')
      .select('*, missions(co2_impact, water_impact, waste_impact)')
      .eq('user_id', userId);

    if (!completions || completions.length === 0) {
      return new Response(
        JSON.stringify([
          { icon: '🌍', value: '0 kg', label: 'CO₂ Saved', equivalent: 'Starting out' },
          { icon: '💧', value: '0 L', label: 'Water Conserved', equivalent: 'Keep going' },
          { icon: '♻️', value: '0 kg', label: 'Waste Avoided', equivalent: 'Complete missions' },
          { icon: '🌳', value: '0', label: 'Trees Equivalent', equivalent: 'Every action counts' },
        ]),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Calculate totals
    let totalCo2 = 0;
    let totalWater = 0;
    let totalWaste = 0;

    completions.forEach((completion) => {
      if (completion.missions) {
        totalCo2 += completion.missions.co2_impact || 0;
        totalWater += completion.missions.water_impact || 0;
        totalWaste += completion.missions.waste_impact || 0;
      }
    });

    // Calculate equivalents
    const drivingKm = Math.round(totalCo2 / 0.2); // Assuming 0.2 kg CO2 per km
    const buckets = Math.round(totalWater / 50); // Assuming 50L per bucket
    const plasticBottles = Math.round(totalWaste / 0.05); // Assuming 50g per bottle
    const treesEquivalent = (totalCo2 / 10).toFixed(1); // Assuming 10kg CO2 per tree per year

    const impactStats = [
      {
        icon: '🌍',
        value: `${totalCo2.toFixed(1)} kg`,
        label: 'CO₂ Saved',
        equivalent: `Driving ${drivingKm} fewer km`,
      },
      {
        icon: '💧',
        value: `${totalWater.toFixed(0)} L`,
        label: 'Water Conserved',
        equivalent: `${buckets} buckets saved`,
      },
      {
        icon: '♻️',
        value: `${totalWaste.toFixed(1)} kg`,
        label: 'Waste Avoided',
        equivalent: `${plasticBottles} plastic bottles`,
      },
      {
        icon: '🌳',
        value: treesEquivalent,
        label: 'Trees Equivalent',
        equivalent: `${(totalCo2 / 10).toFixed(1)} mature tree/year`,
      },
    ];

    return new Response(JSON.stringify(impactStats), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Impact stats error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
