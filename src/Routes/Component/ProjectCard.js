import  './Component.css';

function ProjectCard({ name }) {
  if (name === "Portfolio") {
    return (
    <a href='#root'>
      <img src={`${name}.png`} alt={`Aperçu du Projet ${name}`} />
      <h4>{name}</h4>
    </a>
    );
  } 
  return (
      <a href={`/${name}`}>
        <img src={`${name}.png`} alt={`Aperçu du Projet ${name}`} />
        <h4>{name}</h4>
      </a>
  );
}

export default ProjectCard;