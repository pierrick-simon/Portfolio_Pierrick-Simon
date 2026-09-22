import './../App.css';
import React from 'react';
import ProjectCard from './Component/ProjectCard';

function About() {
  return (
    <div className='Section' id='about'>
      <h2>À propos de moi</h2>
      <div className='Section_body'>
        <p>
          Étudiant en 3ᵉ année à Epitech Paris (Promo 2029), en formation
          d’Expert en Ingénierie Logicielle.
        </p>

        <p>
          Actuellement en recherche d’un stage de 4 à 5 mois, d’avril à août 2027,
          dans le développement logiciel.
        </p>

        <p>
          En parallèle de mes études, je travaille toujours à temps partiel en tant
          qu’Assistant Pédagogique à Epitech Paris, où j’accompagne et encadre les
          étudiants de première année dans leur apprentissage de la programmation.
        </p>

        <h3>Missions principales</h3>
        <ul>
          <li>Accompagnement pédagogique en programmation (C, algorithmique, structures de données)</li>
          <li>Support technique et aide à la résolution de problèmes sur les projets</li>
          <li>Animation de sessions de travail collaboratif et de code reviews</li>
          <li>Mentorat sur l’organisation, les bonnes pratiques de développement et la gestion de projet</li>
        </ul>

        <h3>Compétences clés</h3>
        <ul>
          <li><strong>Développement :</strong> C++, C, Python, FastAPI, Rust, React, JavaScript</li>
          <li><strong>Technologies :</strong> Git, API REST, Okta, Model Context Protocol (MCP), Shell, Docker, Linux</li>
          <li><strong>Soft skills :</strong> Pédagogie, communication, travail collaboratif, autonomie</li>
          <li>
            <strong>Expérience précédente :</strong> Stage développeur IA chez ENGIE
            (août - décembre 2025), avec le développement d’agents IA, de serveurs MCP
            et d’une application full stack.
          </li>
        </ul>

        <h3>Langues</h3>
        <ul>
          <li><strong>Français</strong> (Langue maternelle)</li>
          <li><strong>Anglais</strong> (C1, 3 années passées en Angleterre)</li>
        </ul>

        <p>
          Basé en Île-de-France et ouvert aux opportunités en développement logiciel.
        </p>
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
      <h3 className='Year'>Tek 2 (2025-2026)</h3>
      <div className='Section_body_projects'>
        <ProjectCard name="RayTracer" />
        <ProjectCard name="NanoTekSpice" />
        <ProjectCard name="Cartridge" />
        <ProjectCard name="Arcade" />
        <ProjectCard name="StoneAnalysis" />
        <ProjectCard name="The-Plazza" />
      </div>
      <h3 className='Year'>Tek 1 (2024-2025)</h3>
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
          <h3>Epitech - Assitant pédagogiquel</h3>
          <ul>
            <li>fev. 2026 - mars 2027</li>
            <li>Accompagnement des étudiants de première année en programmation (C, algorithmique, structures de code).</li>
            <li>Animation de sessions de travail, code reviews et accompagnement méthodologique.</li>
          </ul>
          <h3>Engie - Stagiaire Développeur IA/Logiciel</h3>
          <ul>
            <li>août 2025 - déc. 2025</li>
            <li>Développement d’agents IA et de serveurs MCP pour automatiser les tâches du département SPM.</li>
            <li>Développement full stack de ReleaseLab (FastAPI, React, Okta) pour la gestion des environnements.</li>
          </ul>
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
      <Project />
      <Formation />
      <Experience />
      <Cv />
      <Contact />
    </React.StrictMode>
  );
}

export default Home;
