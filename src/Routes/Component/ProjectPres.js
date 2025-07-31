import  './Component.css';
import './../../App.css';

function ProjectPres({ name, text }) {
  return (
    <div className='Section' id="about">
      <h2>Présentation du projet</h2>
      <div className='Section_body_Pres'>
        <img src={`/${name}.png`} alt={`Aperçu du Projet ${name}`} />
        <p> &ensp; {text}</p>
      </div>
    </div>
  );
}
  
export default ProjectPres;