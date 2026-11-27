import { notFound, permanentRedirect } from 'next/navigation';
import ProjectView from '@/components/ProjectView';
import { getProject, getProjectSlugs } from '@/lib/data';
import { mediaUrl } from '@/lib/media';

// Pages are pre-rendered, then refreshed from Supabase at most once an hour.
// Admin saves also refresh them immediately (refreshSite() in lib/admin/write.js).
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

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();
  // Old links used other casings (e.g. /NanoTekspice): send them to the real URL.
  if (project.slug !== decodeURIComponent(slug)) permanentRedirect(`/${project.slug}`);

  return <ProjectView project={project} />;
}
