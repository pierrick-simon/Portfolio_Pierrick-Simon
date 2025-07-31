import './../App.css';
import React from 'react';
import Header from './Margins/Header';
import Nav from './Margins/ProjectNav';
import Video from './Component/Video';
import ProjectPres from './Component/ProjectPres';
import Link from './Component/Link';

function Body( {page} ) {
  return (
    <body>
      <ProjectPres name={`${page}`} text="J’ai participé au développement de Corewar, un projet inspiré du jeu d’IA compétitive historique. Le but : faire s’affronter plusieurs programmes appelés champions dans une machine virtuelle entièrement codée en C. Chaque champion suit ses propres instructions, et le dernier à survivre dans l’arène virtuelle remporte la partie. Le projet simule des cycles d’horloge, processus concurrents et une gestion fine des instructions en langage assembleur personnalisé."/>
      <div className='Section' id="functionality">
        <h2>Fonctionnalités clés</h2>
          <ul>
            <li>Machine virtuelle simulant une mémoire circulaire et des cycles d'exécution</li>
            <li>Support complet d’un langage assembleur dédié</li>
            <li>Assembleur convertissant le code source en bytecode</li>
            <li>Exécution concurrente de plusieurs programmes en compétition</li>
            <li>Gestion d’instructions, opcodes, sauts conditionnels, accès mémoire</li>
            <li>Visualisation graphique de l’arène avec CSFML</li>
            <li>Affichage de statistiques de combat en temps réel</li> 
          </ul>
      </div>
      <div className='Section' id="directskill">
        <h2>Compétences mises en pratique</h2>
          <ul>
            <li>Conception d’une machine virtuelle exécutable et isolée</li>
            <li>Développement d’un assembleur low-level</li>
            <li>Gestion de la mémoire simulée et des cycles CPU</li>
            <li>Optimisation du parsing binaire, lecture d’opcodes</li>
            <li>Travail en équipe sur architecture complexe</li>
            <li>Visualisation et rendu graphique avec CSFML</li>
            <li>Implémentation de statistiques et feedback utilisateur</li> 
          </ul>
      </div>
      <div className='Section' id="demo">
          <h2>Démo</h2>
          <Video name={`${page}`} />
      </div>
      <div className='Section' id="link">
        <h2>Liens</h2>
        <div className='Section_body'>
          <div className='contributor'>
            <a>Contributor : </a>
            <Link.Loan />
            <Link.Pierrick />
          </div>
        </div>
      </div>
    </body>
  );
}

function Corewar() {
  return (
    <React.StrictMode>
      <Header Title={"Corewar - Duo (4 semaines)"} SubTitle={"C · avr. 2025 - mai 2025"}/>
      <Nav page="Corewar"/>
      <Body page="Corewar"/>
    </React.StrictMode>
  );
}

export default Corewar;