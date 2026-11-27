import { Suspense } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import Header from '@/components/Header';
import Toast from '@/components/admin/Toast';
import { getAdmin } from '@/lib/supabase/server';
import { logout } from '../login/actions';
import '@/styles/Admin.css';

export const metadata = {
  title: { default: 'Admin', template: '%s · Admin' },
  robots: { index: false, follow: false },
};

// Server-side gate for every /admin page: logged in AND listed in `admins`.
// (src/proxy.js only checks for a session; RLS still protects the data.)
export default async function AdminLayout({ children }) {
  const { user, isAdmin } = await getAdmin();
  if (!user || !isAdmin) redirect('/login');

  return (
    <>
      <Header title='Admin' subtitle={user.email} />
      <div className='admin-bar'>
        <nav>
          <Link href='/admin'>Tableau de bord</Link>
          <Link href='/admin/projects'>Projets</Link>
          <Link href='/admin/experiences'>Expériences</Link>
          <Link href='/admin/formations'>Formations</Link>
          <Link href='/admin/profile'>Profil</Link>
          <Link href='/admin/people'>Contributeurs</Link>
          <Link href='/admin/groups'>Groupes</Link>
          <Link href='/' target='_blank'>Voir le site ↗</Link>
        </nav>
        <form action={logout}>
          <button type='submit' className='btn btn-secondary'>Se déconnecter</button>
        </form>
      </div>
      <main>{children}</main>
      <Suspense>
        <Toast />
      </Suspense>
    </>
  );
}
