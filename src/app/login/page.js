import { redirect } from 'next/navigation';
import Header from '@/components/Header';
import { getAdmin } from '@/lib/supabase/server';
import { logout } from './actions';
import LoginForm from './LoginForm';
import '@/styles/Admin.css';

export const metadata = {
  title: 'Connexion',
  robots: { index: false, follow: false },
};

// Logged in but not in `admins`: show how to grant access (first-time setup).
function NotAdmin({ user }) {
  return (
    <div className='Section'>
      <h2>Accès refusé</h2>
      <div className='Section_body'>
        <p>Le compte <strong>{user.email}</strong> est connecté mais n’est pas administrateur.</p>
        <p>Pour lui donner accès, exécute dans Supabase → SQL Editor :</p>
        <pre className='admin-code'>{`insert into public.admins (user_id) values ('${user.id}');`}</pre>
        <form action={logout}>
          <button type='submit' className='btn btn-secondary'>Se déconnecter</button>
        </form>
      </div>
    </div>
  );
}

export default async function LoginPage() {
  const { user, isAdmin } = await getAdmin();
  if (isAdmin) redirect('/admin');

  return (
    <>
      <Header title='Admin' subtitle='Espace réservé' />
      <main>
        {user ? <NotAdmin user={user} /> : (
          <div className='Section'>
            <h2>Connexion</h2>
            <div className='Section_body'>
              <LoginForm />
            </div>
          </div>
        )}
      </main>
    </>
  );
}
