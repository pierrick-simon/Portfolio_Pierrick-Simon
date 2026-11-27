import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

// Supabase client acting as the logged-in user (session read from cookies).
// For the admin, the login page and Server Actions. Reading cookies makes the
// page dynamic, so public pages keep using publicClient() instead.
// Create one per request: never share it.
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
          } catch {
            // Server Components can't set cookies. Fine: src/proxy.js refreshes the session.
          }
        },
      },
    }
  );
}

// The logged-in user and whether they are in the `admins` table.
// is_admin() runs in the database with the user's token, the same check RLS uses.
export async function getAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { supabase, user: null, isAdmin: false };

  const { data: isAdmin, error } = await supabase.rpc('is_admin');
  if (error) throw new Error(`Supabase (is_admin): ${error.message}`);
  return { supabase, user, isAdmin: isAdmin === true };
}
