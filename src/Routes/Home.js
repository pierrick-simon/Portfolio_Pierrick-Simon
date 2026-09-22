import './../App.css';
import React from 'react';
import ProjectCard from './Component/ProjectCard';

const skillGroups = [
  { label: 'Développement', items: ['C++', 'C', 'Python', 'FastAPI', 'Rust', 'React', 'JavaScript'] },
  { label: 'Technologies', items: ['Git', 'API REST', 'Okta', 'Model Context Protocol', 'Shell', 'Docker', 'Linux'] },
  { label: 'Soft skills', items: ['Pédagogie', 'Communication', 'Travail collaboratif', 'Autonomie', 'Sens de l’organisation'] },
];

function About() {
  return (
    <div className='Section' id='about'>
      <h2 className='intro-animate'>À propos de moi</h2>

      <div className='about-grid'>
        <div className='about-bio'>
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
          </div>
        </div>

        <dl className='about-facts'>
          <dt>Formation</dt>
          <dd>Epitech Paris - Promo 2029</dd>
          <dt>Recherche</dt>
          <dd>Stage de 4 à 5 mois, avril - août 2027</dd>
          <dt>Poste actuel</dt>
          <dd>Assistant Pédagogique, Epitech Paris</dd>
          <dt>Localisation</dt>
          <dd>Île-de-France</dd>
          <dt>Langues</dt>
          <dd>Français (natif) · Anglais (C1)</dd>
        </dl>
      </div>

      <div className='Section_body'>
        {skillGroups.map((group) => (
          <div className='skill-group' key={group.label}>
            <h4>{group.label}</h4>
            <div className='pill-row'>
              {group.items.map((item) => (
                <span className='pill' key={item}>{item}</span>
              ))}
            </div>
          </div>
        ))}

        <p style={{ marginTop: '1.25rem' }}>
          <strong>Expérience précédente :</strong> Stage développeur IA chez ENGIE
          (août - décembre 2025), avec le développement d’agents IA, de serveurs MCP
          et d’une application full stack.
        </p>
      </div>
    </div>
  );
}

function Project() {
  return (
    <div className='Section' id='project'>
      <h2>Mes Projets</h2>

      <div className='project-group'>
        <p className='group-label'>~/projets/perso</p>
        <div className='Section_body_projects'>
          <ProjectCard name="Meme_Application" />
          <ProjectCard name="Portfolio" />
          <ProjectCard name="Watchlist" />
        </div>
      </div>

      <div className='project-group'>
        <p className='group-label'>~/projets/tek2 · 2025-2026</p>
        <div className='Section_body_projects'>
          <ProjectCard name="Zappy" />
          <ProjectCard name="RayTracer" />
          <ProjectCard name="NanoTekSpice" />
          <ProjectCard name="Cartridge" />
          <ProjectCard name="Arcade" />
          <ProjectCard name="StoneAnalysis" />
          <ProjectCard name="The-Plazza" />
        </div>
      </div>

      <div className='project-group'>
        <p className='group-label'>~/projets/tek1 · 2024-2025</p>
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
    </div>
  );
}

function Formation() {
  return (
    <div className='Section' id='formation'>
      <h2>Mes Formations</h2>
      <ul className='timeline'>
        <li className='timeline-item'>
          <span className='timeline-date'>2024 - 2029</span>
          <h3>EPITECH Paris (promo 2029)</h3>
          <ul>
            <li>Programme Grande École</li>
            <li>Titre d'expert en ingénierie logicielle (RNCP 7)</li>
          </ul>
        </li>
        <li className='timeline-item'>
          <span className='timeline-date'>2021 - 2024</span>
          <h3>Lycée LAKANAL</h3>
          <ul>
            <li>Baccalauréat (mention bien)</li>
            <li>Spécialités : Mathématiques, NSI, Physique-Chimie</li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

function Experience() {
  return (
    <div className='Section' id='experience'>
      <h2>Mes Experiences</h2>
      <ul className='timeline'>
        <li className='timeline-item'>
          <span className='timeline-date'>fév. 2026 - mars 2027</span>
          <h3>Epitech - Assistant pédagogique</h3>
          <ul>
            <li>Accompagnement des étudiants de première année en programmation (C, algorithmique, structures de code).</li>
            <li>Animation de sessions de travail, code reviews et accompagnement méthodologique.</li>
          </ul>
        </li>
        <li className='timeline-item'>
          <span className='timeline-date'>août 2025 - déc. 2025</span>
          <h3>Engie - Stagiaire Développeur IA/Logiciel</h3>
          <ul>
            <li>Développement d’agents IA et de serveurs MCP pour automatiser les tâches du département SPM.</li>
            <li>Développement full stack de ReleaseLab (FastAPI, React, Okta) pour la gestion des environnements.</li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

function Cv() {
  return (
    <div className='Section' id='cv'>
      <h2>Mon CV</h2>
      <div className='Section_body'>
        <a href="CV-PierrickSimon.pdf" className="btn" download>Télécharger le CV</a>
      </div>
    </div>
  );
}

function Contact() {
  return (
    <div className='Section' id='contact'>
      <h2>Contact</h2>
      <ul className='contact-list'>
        <li>
          <svg className='contact-icon' viewBox='0 0 24 24'><path d='M3 5h18v14H3z' /><path d='M3 6l9 7 9-7' /></svg>
          <a href="mailto:pierrick.simon@epitech.eu">pierrick.simon@epitech.eu</a>
        </li>
        <li>
          <svg className='contact-icon' viewBox='0 0 24 24'><path d='M4 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v4a2 2 0 0 1-2 2C9.5 21 3 14.5 3 6a2 2 0 0 1 1-2z' /></svg>
          <span>+33 6 02 63 38 06</span>
        </li>
        <li>
          <svg className='contact-icon' viewBox='0 0 24 24'><rect x='3' y='3' width='18' height='18' rx='2' /><path d='M7 10v7M7 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 13v4' /></svg>
          <a href="https://www.linkedin.com/in/pierrick-simon/" target='_blank' rel='noreferrer'>pierrick-simon</a>
        </li>
        <li>
          <svg className='contact-icon' viewBox='0 0 24 24'><path d='M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z' /></svg>
          <a href="https://github.com/pierrick-simon" target='_blank' rel='noreferrer'>pierrick-simon</a>
        </li>
      </ul>
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