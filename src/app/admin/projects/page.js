import Link from 'next/link';
import { getAdmin } from '@/lib/supabase/server';
import { mediaUrl } from '@/lib/media';
import MoveButtons from '@/components/admin/MoveButtons';
import { moveProject, togglePublished } from './actions';

export const metadata = { title: 'Projets' };

async function load(supabase) {
  const [groups, projects] = await Promise.all([
    supabase.from('project_groups').select('id, label').order('position'),
    supabase.from('projects').select('id, slug, title, group_id, published, cover_url, href').order('position'),
  ]);
  if (groups.error || projects.error) throw new Error((groups.error ?? projects.error).message);
  const sections = [...groups.data, { id: null, label: 'Sans groupe (masqués de l’accueil)' }];
  return sections
    .map((g) => ({ ...g, projects: projects.data.filter((p) => p.group_id === g.id) }))
    .filter((g) => g.id !== null || g.projects.length);
}

function ProjectRow({ project, first, last }) {
  const viewHref = project.href ? null : project.published ? `/${project.slug}` : `/admin/preview/${project.slug}`;
  return (
    <li className='admin-item'>
      {project.cover_url ? <img src={mediaUrl(project.cover_url)} alt='' /> : null}
      <span className='admin-item-title'>
        {project.title}
        <small>/{project.slug}</small>
      </span>
      <form action={togglePublished.bind(null, project.id)}>
        <button type='submit' className={`badge ${project.published ? 'badge-on' : ''}`} title='Changer la visibilité'>
          {project.published ? 'Publié' : 'Brouillon'}
        </button>
      </form>
      <MoveButtons action={moveProject.bind(null, project.id)} first={first} last={last} />
      {viewHref && <Link href={viewHref} target='_blank'>{project.published ? 'Voir' : 'Aperçu'}</Link>}
      <Link href={`/admin/projects/${project.id}`}>Modifier</Link>
    </li>
  );
}

export default async function ProjectsPage() {
  const { supabase } = await getAdmin();
  const groups = await load(supabase);

  return (
    <div className='Section'>
      <div className='admin-section-head'>
        <h2>Projets</h2>
        <Link href='/admin/projects/new' className='btn btn-small'>+ Nouveau projet</Link>
      </div>
      {groups.map((group) => (
        <section key={group.id ?? 'none'}>
          <p className='admin-group-label'>{group.label}</p>
          {group.projects.length === 0 ? <p className='admin-hint'>Aucun projet.</p> : (
            <ul className='admin-list'>
              {group.projects.map((p, i) => (
                <ProjectRow key={p.id} project={p} first={i === 0} last={i === group.projects.length - 1} />
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}
