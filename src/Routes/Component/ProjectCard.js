import  './Component.css';
import { Link } from 'react-router-dom';

// Card on the home page. A project with an `href` (e.g. "#root") links there
// instead of to its own page.
function ProjectCard({ project }) {
  const content = (
    <>
      <img src={`/${project.cover}`} alt={`Aperçu du Projet ${project.title}`} />
      <h4>{project.title}</h4>
    </>
  );

  if (project.href) return <a href={project.href}>{content}</a>;
  return <Link to={`/${project.slug}`}>{content}</Link>;
}

export default ProjectCard;
