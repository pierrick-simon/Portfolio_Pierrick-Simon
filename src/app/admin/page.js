import Link from 'next/link';
import { getAdmin } from '@/lib/supabase/server';

// Counts read as the admin, so RLS also includes draft projects.
async function count(supabase, table, filter = (q) => q) {
  const { count: n, error } = await filter(supabase.from(table).select('*', { count: 'exact', head: true }));
  if (error) throw new Error(`Supabase (${table}): ${error.message}`);
  return n;
}

export default async function AdminPage() {
  const { supabase } = await getAdmin();
  const [projects, drafts, experiences, formations, people] = await Promise.all([
    count(supabase, 'projects'),
    count(supabase, 'projects', (q) => q.eq('published', false)),
    count(supabase, 'experiences'),
    count(supabase, 'formations'),
    count(supabase, 'people'),
  ]);

  const stats = [
    ['Projets', projects, '/admin/projects'],
    ['Brouillons', drafts, '/admin/projects'],
    ['Expériences', experiences, '/admin/experiences'],
    ['Formations', formations, '/admin/formations'],
    ['Contributeurs', people, '/admin/people'],
  ];

  return (
    <div className='Section'>
      <h2>Tableau de bord</h2>
      <dl className='admin-stats'>
        {stats.map(([label, value, href]) => (
          <div key={label}>
            <dt><Link href={href}>{label}</Link></dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <div className='Section_body admin-actions'>
        <Link href='/admin/projects/new' className='btn'>+ Nouveau projet</Link>
        <Link href='/admin/profile' className='btn btn-secondary'>Modifier le profil</Link>
      </div>
    </div>
  );
}
