import { createClient } from '@supabase/supabase-js';

// Read-only client for public pages: the publishable key, no session, no cookies.
// RLS only lets it read published content. Because it doesn't read cookies,
// pages using it can still be pre-rendered and cached.
// (Phase 5 adds a cookie-based client for the admin.)
let client;

export function publicClient() {
  if (!client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) {
      throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY.');
    }
    client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  }
  return client;
}
