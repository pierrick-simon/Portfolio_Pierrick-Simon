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
      <ProjectPres name={`${page}`} text="J’ai réalisé Amazed, un simulateur dans lequel des robots doivent traverser un labyrinthe de manière optimale en utilisant des algorithmes de graphes. L’objectif : faire passer le plus de robots possible de l’entrée à la sortie, sans collision, en un minimum de tours."/>
      <div className='Section' id="functionality">
        <h2>Fonctionnalités clés</h2>
          <ul>
            <li>Lecture et validation d’une carte de labyrinthe via l'entrée standard</li>
            <li>Représentation des salles, tunnels et positions des robots</li>
            <li>Calcul du chemin le plus court pour chaque robot</li>
            <li>Simulation dynamique du déplacement simultané des robots</li>
            <li>Respect strict des contraintes : un robot par pièce, synchronisation des mouvements</li>
            <li>Création d’un rendu graphique interactif de la simulation</li>
            <li>Vue en 2D du labyrinthe avec animation des déplacements</li>
          </ul>
      </div>
      <div className='Section' id="directskill">
        <h2>Compétences mises en pratique</h2>
          <ul>
            <li>Parsing de fichiers complexes avec gestion robuste des entrées</li>
            <li>Manipulation de structures de données avancées : graphes, listes chaînées, matrices</li>
            <li>Implémentation d’algorithmes de pathfinding (A*)</li>
            <li>Optimisation des parcours et gestion intelligente du trafic</li> 
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
            <Link.Sacha />
            <Link.Pierrick />
          </div>
        </div>
      </div>
    </body>
  );
}

function Amazed() {
  return (
    <React.StrictMode>
      <Header Title={"Amazed - Duo (2 semaines)"} SubTitle={"C · mars 2025"}/>
      <Nav page="Amazed"/>
      <Body page="Amazed"/>
    </React.StrictMode>
  );
}

export default Amazed;