// Everything shown on a project page. Used by the public page (/[slug])
// and by the admin preview (/admin/preview/[slug]), so drafts look exactly
// like they will once published.
import Header from '@/components/Header';
import SectionNav from '@/components/SectionNav';
import ProjectPres from '@/components/ProjectPres';
import PreviewGallery from '@/components/PreviewGallery';
import Video from '@/components/Video';
import { List, Docs, Links } from '@/components/ProjectSections';

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

// "MyPGP - Duo (4 semaines)" — parts left empty in the admin are skipped.
export function projectTitle(project) {
  return `${project.title}${project.team ? ` - ${project.team}` : ''}`
    + `${project.duration ? ` (${project.duration})` : ''}${project.note || ''}`;
}

// `main={false}` when the page already provides the <main> element (admin).
function ProjectView({ project, main = true }) {
  const gallery = project.gallery || [];
  const Content = main ? 'main' : 'div';

  return (
    <>
      <Header
        title={projectTitle(project)}
        subtitle={[project.stack.join(' / '), project.period].filter(Boolean).join(' · ')}
      />
      <SectionNav links={navLinks(project)} />
      <Content>
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
      </Content>
    </>
  );
}

export default ProjectView;
