import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAdmin } from '@/lib/supabase/server';
import { formatDocs } from '@/lib/admin/form';
import ProjectForm from '../ProjectForm';
import { formOptions } from '../options';

export const metadata = { title: 'Modifier le projet' };

export default async function EditProjectPage({ params }) {
  const { id } = await params;
  const { supabase } = await getAdmin();

  const { data: row } = await supabase
    .from('projects')
    .select('*, project_contributors ( person_id, position )')
    .eq('id', id)
    .maybeSingle();
  if (!row) notFound();

  const { project_contributors: contributors, ...project } = row;
  project.contributors = contributors.sort((a, b) => a.position - b.position).map((c) => c.person_id);
  const { groups, people } = await formOptions(supabase);

  return (
    <div className='Section'>
      <div className='admin-section-head'>
        <h2>{project.title}</h2>
        {!project.href && (
          <Link href={project.published ? `/${project.slug}` : `/admin/preview/${project.slug}`} target='_blank'>
            {project.published ? 'Voir sur le site' : 'Aperçu du brouillon'}
          </Link>
        )}
      </div>
      <ProjectForm project={project} groups={groups} people={people} docsText={formatDocs(project.docs)} />
    </div>
  );
}
