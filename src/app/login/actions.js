'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

// Called by the login form (useActionState): returns { error } or redirects.
export async function login(_previousState, formData) {
  const email = String(formData.get('email') ?? '').trim();
  const password = String(formData.get('password') ?? '');
  if (!email || !password) return { error: 'Renseigne l’email et le mot de passe.', email };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  // Same message whatever went wrong: don't reveal whether the email exists.
  if (error) return { error: 'Email ou mot de passe incorrect.', email };

  // The admin layout decides what this account may see.
  redirect('/admin');
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/login');
}
