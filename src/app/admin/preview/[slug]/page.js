import { notFound } from 'next/navigation';
import ProjectView from '@/components/ProjectView';
import { fetchProject } from '@/lib/data';
import { getAdmin } from '@/lib/supabase/server';

export const metadata = { title: 'Aperçu' };

// A project page as visitors will see it, drafts included (admin only,
// through the admin layout and RLS). Public pages stay static.
export default async function PreviewPage({ params }) {
  const { slug } = await params;
  const { supabase } = await getAdmin();
  const project = await fetchProject(supabase, slug, { drafts: true });
  if (!project) notFound();

  return (
    <>
      <p className='admin-preview-bar'>
        Aperçu{project.published ? '' : ' — brouillon, invisible pour les visiteurs'}
      </p>
      <ProjectView project={project} main={false} />
    </>
  );
}
