import { createClient } from '@supabase/supabase-js';

export async function onRequest({ request, env }) {
  const supabase = createClient(
    env.SUPABASE_URL,
    env.SUPABASE_SERVICE_KEY
  );
  const url = new URL(request.url);
  const limit = parseInt(url.searchParams.get('limit')) || 10;
  const offset = parseInt(url.searchParams.get('offset')) || 0;
  const featured = url.searchParams.get('featured') === 'true';

  try {
    let query = supabase
      .from('blogs')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (featured) {
      query = query.eq('featured', true).limit(3);
    } else {
      query = query.range(offset, offset + limit - 1);
    }

    const { data: blogs, error } = await query;

    if (error) throw error;

    return new Response(JSON.stringify(blogs || []), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Blogs error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
