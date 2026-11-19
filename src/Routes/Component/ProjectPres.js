import  './Component.css';
import './../../App.css';

function ProjectPres({ cover, title, text }) {
  return (
    <div className='Section' id="about">
      <h2>Présentation du projet</h2>
      <div className='Section_body_Pres'>
        <img src={`/${cover}`} alt={`Aperçu du Projet ${title}`} />
        <p> &ensp; {text}</p>
      </div>
    </div>
  );
}

export default ProjectPres;
