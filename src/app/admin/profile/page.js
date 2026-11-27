import { getAdmin } from '@/lib/supabase/server';
import ProfileForms from './ProfileForms';

export const metadata = { title: 'Profil' };

export default async function ProfilePage() {
  const { supabase } = await getAdmin();
  const { data, error } = await supabase.from('settings').select('key, value');
  if (error) throw new Error(error.message);
  const profile = Object.fromEntries(data.map((r) => [r.key, r.value]));

  return (
    <div className='Section'>
      <h2>Profil</h2>
      <p className='admin-hint'>Le contenu unique de l’accueil. Chaque bloc s’enregistre séparément.</p>
      <ProfileForms profile={profile} />
    </div>
  );
}
