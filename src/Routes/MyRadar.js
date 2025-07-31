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
      <ProjectPres name={`${page}`} text="J’ai réalisé My_Radar, une simulation graphique 2D en temps réel représentant les trajectoires d’avions. Le but du projet est de détecter les collisions potentielles entre avions en analysant leur déplacement dans l’espace, tout en affichant graphiquement leur mouvement, trajectoire et zone de sécurité."/>
      <div className='Section' id="functionality">
        <h2>Fonctionnalités clés</h2>
          <ul>
            <li>Lecture d’un fichier de configuration (avions et tours de contrôle)</li>
            <li>Simulation du mouvement linéaire selon position et vitesse</li>
            <li>Affichage des avions, trajectoires et zones de contrôle via CSFML</li>
            <li>Détection des risques de collision en fonction des trajectoires</li>
            <li>Visualisation des zones de sécurité (rayons de collision)</li>
          </ul>
      </div>
      <div className='Section' id="directskill">
        <h2>Compétences mises en pratique</h2>
          <ul>
            <li>Calculs vectoriels : vitesses, directions, déplacements en 2D</li>
            <li>Détection de collisions entre objets mobiles</li>
            <li>Utilisation de CSFML pour animations graphiques et rendu</li>
            <li>Gestion d’événements clavier / souris et de la boucle de rendu</li>
            <li>Optimisation des calculs de trajectoires et gestion des entités</li>
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
            <Link.Pierrick />
          </div>
        </div>
      </div>
    </body>
  );
}

function MyRadar() {
  return (
    <React.StrictMode>
      <Header Title={"Radar - Solo (2 semaines)"} SubTitle={"C · nov. 2024 - déc. 2024"}/>
      <Nav page="MyRadar"/>
      <Body page="MyRadar"/>
    </React.StrictMode>
  );
}

export default MyRadar;