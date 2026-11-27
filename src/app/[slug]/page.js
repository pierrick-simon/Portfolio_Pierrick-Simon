import { notFound, permanentRedirect } from 'next/navigation';
import Header from '@/components/Header';
import SectionNav from '@/components/SectionNav';
import ProjectPres from '@/components/ProjectPres';
import PreviewGallery from '@/components/PreviewGallery';
import Video from '@/components/Video';
import { List, Docs, Links } from '@/components/ProjectSections';
import { getProject, getProjectSlugs } from '@/lib/data';
import { mediaUrl } from '@/lib/media';

// Pages are pre-rendered, then refreshed from Supabase at most once an hour.
// (Phase 6: the admin will also refresh them right after each save.)
export const revalidate = 3600;

// Pre-render every published project at build time. A project added later
// in the database is rendered on its first visit (dynamicParams is on by default).
export async function generateStaticParams() {
  return (await getProjectSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const project = await getProject((await params).slug);
  if (!project) return {};

  const description = project.summary.length > 160
    ? `${project.summary.slice(0, 157).trimEnd()}…`
    : project.summary;
  const images = project.cover ? [{ url: mediaUrl(project.cover), alt: project.title }] : [];

  return {
    title: project.title,
    description,
    alternates: { canonical: `/${project.slug}` },
    openGraph: { type: 'article', title: project.title, description, url: `/${project.slug}`, images },
    twitter: { card: 'summary_large_image', title: project.title, description, images },
  };
}

function navLinks(project) {
  return [
    { hash: 'about', label: 'Présentation' },
    ...(project.features?.length ? [{ hash: 'functionality', label: 'Fonctionnalités' }] : []),
    ...(project.skills?.length ? [{ hash: 'directskill', label: 'Compétences' }] : []),
    ...(project.gallery?.length ? [{ hash: 'preview', label: 'Aperçu' }] : []),
    ...(project.video || project.docs ? [{ hash: 'demo', label: 'Démo' }] : []),
    { hash: 'link', label: 'Liens' },
  ];
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();
  // Old links used other casings (e.g. /NanoTekspice): send them to the real URL.
  if (project.slug !== decodeURIComponent(slug)) permanentRedirect(`/${project.slug}`);

  const gallery = project.gallery || [];

  return (
    <>
      <Header
        title={`${project.title} - ${project.team} (${project.duration})${project.note || ''}`}
        subtitle={`${project.stack.join(' / ')} · ${project.period}`}
      />
      <SectionNav links={navLinks(project)} />
      <main>
        <ProjectPres cover={project.cover} title={project.title} text={project.summary} />
        <List id='functionality' title='Fonctionnalités clés' items={project.features} />
        <List id='directskill' title='Compétences mises en pratique' items={project.skills} />
        {gallery.length > 0 && (
          <div className='Section' id='preview'>
            <h2>Aperçu</h2>
            <div className='Section_body_preview'>
              <PreviewGallery images={gallery} />
            </div>
          </div>
        )}
        {(project.video || project.docs) && (
          <div className='Section' id='demo'>
            <h2>Démo</h2>
            {project.video && <Video src={project.video} />}
            {project.docs && <Docs docs={project.docs} />}
          </div>
        )}
        <Links links={project.links} contributors={project.contributors} />
      </main>
    </>
  );
}
