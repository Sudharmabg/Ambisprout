import { createClient } from '@supabase/supabase-js';

export async function onRequest({ request, env }) {
  const supabase = createClient(
    env.SUPABASE_URL,
    env.SUPABASE_SERVICE_KEY
  );
  const url = new URL(request.url);
  const limit = parseInt(url.searchParams.get('limit')) || 10;
  const offset = parseInt(url.searchParams.get('offset')) || 0;

  try {
    // Get community posts
    const { data: posts, error: postsError } = await supabase
      .from('community_posts')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (postsError) throw postsError;

    // Get user details and likes for each post
    const enrichedPosts = await Promise.all(
      (posts || []).map(async (post) => {
        // Get user info
        const { data: user } = await supabase
          .from('users')
          .select('name, avatar_url')
          .eq('id', post.user_id)
          .single();

        // Get likes count
        const { count: likesCount } = await supabase
          .from('post_likes')
          .select('id', { count: 'exact' })
          .eq('post_id', post.id);

        // Get comments
        const { data: comments } = await supabase
          .from('post_comments')
          .select('id, text, user_id, users(name)')
          .eq('post_id', post.id)
          .order('created_at', { ascending: true });

        return {
          ...post,
          user,
          likes: likesCount || 0,
          commentCount: comments?.length || 0,
          comments: comments || [],
        };
      })
    );

    return new Response(JSON.stringify(enrichedPosts), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Community feed error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
