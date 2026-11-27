import Link from 'next/link';
import { getAdmin } from '@/lib/supabase/server';

// Counts read as the admin, so RLS also includes draft projects.
async function count(supabase, table, filter = (q) => q) {
  const { count: n, error } = await filter(supabase.from(table).select('*', { count: 'exact', head: true }));
  if (error) throw new Error(`Supabase (${table}): ${error.message}`);
  return n;
}

const dateFormat = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });

const ACTIONS = [
  { href: '/admin/projects/new', icon: '+', title: 'Nouveau projet', text: 'Créer une page projet', primary: true },
  { href: '/admin/experiences#ajouter', icon: '◷', title: 'Ajouter une expérience', text: 'Stage, job, assistanat…' },
  { href: '/admin/profile', icon: '✎', title: 'Modifier le profil', text: 'À propos, compétences, CV' },
  { href: '/', icon: '↗', title: 'Voir le site', text: 'Ouvre le portfolio public', external: true },
];

export default async function AdminPage() {
  const { supabase } = await getAdmin();
  const [projects, drafts, experiences, formations, people, recent] = await Promise.all([
    count(supabase, 'projects'),
    count(supabase, 'projects', (q) => q.eq('published', false)),
    count(supabase, 'experiences'),
    count(supabase, 'formations'),
    count(supabase, 'people'),
    supabase.from('projects').select('id, title, published, updated_at').order('updated_at', { ascending: false }).limit(5),
  ]);
  if (recent.error) throw new Error(`Supabase (projects): ${recent.error.message}`);

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

      <ul className='admin-stats'>
        {stats.map(([label, value, href]) => (
          <li key={label}>
            <Link href={href}>
              <span className='admin-stats-value'>{value}</span>
              <span className='admin-stats-label'>{label} <span aria-hidden='true'>→</span></span>
            </Link>
          </li>
        ))}
      </ul>

      <h3 className='admin-dash-title'>Actions rapides</h3>
      <div className='admin-quick'>
        {ACTIONS.map((a) => (
          <Link
            key={a.href}
            href={a.href}
            className={a.primary ? 'admin-quick-card admin-quick-primary' : 'admin-quick-card'}
            target={a.external ? '_blank' : undefined}
          >
            <span className='admin-quick-icon' aria-hidden='true'>{a.icon}</span>
            <span>
              <strong>{a.title}</strong>
              <small>{a.text}</small>
            </span>
          </Link>
        ))}
      </div>

      <h3 className='admin-dash-title'>Derniers projets modifiés</h3>
      <ul className='admin-list'>
        {recent.data.map((p) => (
          <li key={p.id} className='admin-item'>
            <span className='admin-item-title'>
              {p.title}
              <small>{dateFormat.format(new Date(p.updated_at))}</small>
            </span>
            <span className={p.published ? 'badge badge-on' : 'badge'}>{p.published ? 'Publié' : 'Brouillon'}</span>
            <Link href={`/admin/projects/${p.id}`} className='btn btn-secondary btn-small'>Modifier</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
