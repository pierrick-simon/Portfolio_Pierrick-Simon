import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import Header from '@/components/Header';
import Toast from '@/components/admin/Toast';
import AdminNav from '@/components/admin/AdminNav';
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
      <div className='admin-toolbar'>
        <AdminNav />
        <form action={logout}>
          <button type='submit' className='admin-toolbar-logout'>Se déconnecter</button>
        </form>
      </div>
      <main>{children}</main>
      <Suspense>
        <Toast />
      </Suspense>
    </>
  );
}
