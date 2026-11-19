import './../App.css';
import { useParams } from 'react-router-dom';
import Header from '../Routes/Margins/Header';
import ProjectNav from '../Routes/Margins/ProjectNav';
import ProjectPres from '../Routes/Component/ProjectPres';
import PreviewGallery from '../Routes/Component/PreviewGallery';
import Video from '../Routes/Component/Video';
import InlineCode from '../Routes/Component/InlineCode';
import NotFound from './NotFound';
import { projects } from '../data/projects';
import { people } from '../data/people';

// Old routes were matched case-insensitively (e.g. /NanoTekspice), keep that behaviour.
export function findProject(slug = '') {
  const wanted = slug.toLowerCase();
  return projects.find((p) => p.slug.toLowerCase() === wanted && !p.href);
}

function List({ id, title, items }) {
  if (!items || items.length === 0) return null;
  return (
    <div className='Section' id={id}>
      <h2>{title}</h2>
      <ul>
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}

function Docs({ docs }) {
  return (
    <ul className='demo_cuddle'>
      {docs.map((group) => (
        <li key={group.title}>
          <strong><InlineCode text={group.title} /></strong>
          <ul>
            {group.items.map((item) => <li key={item}><InlineCode text={item} /></li>)}
          </ul>
        </li>
      ))}
    </ul>
  );
}

function Links({ project }) {
  const links = project.links || [];
  const contributors = project.contributors || [];
  return (
    <div className='Section' id='link'>
      <h2>Liens</h2>
      <div className='Section_body'>
        {links.map((link) => (
          <p key={link.url}>
            {link.label} : <a href={link.url} target='_blank' rel='noreferrer'>{link.text}</a>
          </p>
        ))}
        {contributors.length > 0 && (
          <div className='contributor'>
            Contributor :
            {contributors.map((id) => (
              <a key={id} href={people[id].url} target='_blank' rel='noreferrer'>{people[id].name}</a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectPage() {
  const { slug } = useParams();
  const project = findProject(slug);
  if (!project) return <NotFound />;

  const gallery = project.gallery || [];
  const hasDemo = Boolean(project.video || project.docs);

  return (
    <>
      <Header
        Title={`${project.title} - ${project.team} (${project.duration})${project.note || ''}`}
        SubTitle={`${project.stack.join(' / ')} · ${project.period}`}
      />
      <ProjectNav preview={gallery.length > 0} demo={hasDemo} />
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
        {hasDemo && (
          <div className='Section' id='demo'>
            <h2>Démo</h2>
            {project.video && <Video src={project.video} />}
            {project.docs && <Docs docs={project.docs} />}
          </div>
        )}
        <Links project={project} />
      </main>
    </>
  );
}

export default ProjectPage;
