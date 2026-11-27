import Image from 'next/image';
import Link from 'next/link';
import { mediaUrl } from '@/lib/media';

// Card on the home page. A project with an `href` (e.g. "#top") links there
// instead of to its own page.
function ProjectCard({ project }) {
  const content = (
    <>
      <Image
        src={mediaUrl(project.cover)}
        alt={`Aperçu du Projet ${project.title}`}
        width={640}
        height={360}
        sizes='(max-width: 600px) 90vw, 260px'
      />
      <h4>{project.title}</h4>
    </>
  );

  if (project.href) return <a href={project.href}>{content}</a>;
  return <Link href={`/${project.slug}`}>{content}</Link>;
}

export default ProjectCard;
