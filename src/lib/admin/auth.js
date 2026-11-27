import 'server-only';
import { getAdmin } from '@/lib/supabase/server';

// Every admin Server Action starts with this. Server Actions are public HTTP
// endpoints: the admin layout doesn't protect them, so each one checks again.
// Returns the Supabase client acting as the admin (RLS allows its writes).
export async function requireAdmin() {
  const { supabase, isAdmin } = await getAdmin();
  if (!isAdmin) throw new Error('Not allowed.');
  return supabase;
}
