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
    ['Projets', projects],
    ['Brouillons', drafts],
    ['Expériences', experiences],
    ['Formations', formations],
    ['Contributeurs', people],
  ];

  return (
    <div className='Section'>
      <h2>Tableau de bord</h2>
      <dl className='admin-stats'>
        {stats.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <div className='Section_body'>
        <p>Les formulaires d’édition arrivent en Phase 6.</p>
      </div>
    </div>
  );
}
