import './../App.css';
import React from 'react';
import ProjectCard from './Component/ProjectCard';

function About() {
  return (
    <div className='Section' id='about'>
      <h2>À propos de moi</h2>
      <div className='Section_body'>
        <p>Étudiant en développement informatique à Epitech, je transforme des idées en projets concrets.</p>
      </div>
    </div>
  );
}

function Skill() {
  return (
    <div className='Section' id='skill'>
      <h2>Compétences</h2>
      <div className='Section_body'>
        <h3>Techniques</h3>
        <ul>
          <li>C, Python, JavaScript, HTML, CSS, GO</li>
          <li>Environnement Windows / Linux, GitHub, Shell, Docker, React</li>
        </ul>
        <h3>Humaines</h3>
        <ul>
          <li>Travail en équipe</li>
          <li>Autonomie</li>
          <li>Sens de l'organisation</li>
          <li>Rigoureux</li>
        </ul>
        <h3>Langues</h3>
        <ul>
          <li>Français &ensp; (Langue maternelle)</li>
          <li>Anglais &ensp; (C1, 3 années passées en Angleterre)</li>
        </ul>
      </div>
    </div>
  );
}

function Project() {
  return (
    <div className='Section' id='project'>
      <h2>Mes Projets</h2>
      <h2 className='Section_body'>Perso</h2>
      <div className='Section_body_projects'>
        <ProjectCard name="Meme_Application" />
        <ProjectCard name="Portfolio" />
        <ProjectCard name="Watchlist" />
      </div>
      <h2 className='Section_body'>Académique</h2>
      <h3 className='Year'>Teck 1</h3>
      <div className='Section_body_projects'>
        <ProjectCard name="Wolf3D" />
        <ProjectCard name="42sh" />
        <ProjectCard name="Corewar" />
        <ProjectCard name="Amazed" />
        <ProjectCard name="Cuddle" />
        <ProjectCard name="MyWorld" />
        <ProjectCard name="MyRadar" />
      </div>
    </div>
  );
}

function Formation() {
  return (
    <div className='Section' id='formation'>
      <h2>Mes Formations</h2>
        <div className='Section_body'>
          <h3>EPITECH Paris (promo 2029)</h3>
          <ul>
            <li>Programme Grande École</li>
            <li>Titre d'expert en ingénierie logicielle (RNCP 7)</li>
          </ul>
          <h3>Lycée LAKANAL (2024)</h3>
          <ul>
            <li>Baccalauréat (mention bien)</li>
            <li>Spécialités : Mathématiques, NSI, Physique-Chimie</li>
          </ul>
        </div>
    </div>
  );
}

function Experience() {
  return (
    <div className='Section' id='experience'>
      <h2>Mes Experiences</h2>
        <div className='Section_body'>
          <h3>N/A</h3>
        </div>
    </div>
  );
}

function Cv() {
  return (
    <div className='Section' id='cv'>
      <h2>Mon CV</h2>
      <br></br>
      <div className='Section_body'>
        <a href="CV-PierrickSimon.pdf" className="btn" download>Télécharger le CV</a>
      </div>
      <br></br>
      <br></br>
    </div>
  );
}

function Contact() {
  return (
    <div className='Section' id='contact'>
      <h2>Contact</h2>
      <div className='Section_body'>
        <p>Email : <a href="mailto:pierrick.simon@epitech.eu">pierrick.simon@epitech.eu</a></p>
        <p>Téléphone : +33 6 02 63 38 06</p>
        <p>LinkedIn : <a href="https://www.linkedin.com/in/pierrick-simon/" target='_blank' rel='noreferrer'>pierrick-simon</a></p>
        <p>GitHub : <a href="https://github.com/pierrick-simon" target='_blank' rel='noreferrer'>pierrick-simon</a></p>
      </div>
    </div>
  )
}

function Home() {
  return (
    <React.StrictMode>
      <About />
      <Skill />
      <Project />
      <Formation />
      <Experience />
      <Cv />
      <Contact />
    </React.StrictMode>
  );
}

export default Home;
