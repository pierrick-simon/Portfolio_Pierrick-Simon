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
      <ProjectPres name={`${page}`} text="J’ai conçu un jeu de tir à la première personne (FPS) en pseudo-3D, inspiré du classique Wolfenstein 3D, en utilisant la technique du raycasting. Le joueur évolue dans un labyrinthe en vue subjective, avec une interface fluide et une navigation intuitive. Ce projet a été l’occasion d’approfondir les fondements du développement de moteurs de jeu simples et de manipulations graphiques en temps réel."/>
      <div className='Section' id="functionality">
        <h2>Fonctionnalités clés</h2>
          <ul>
            <li>Affichage 2.5D en temps réel avec moteur de rendu basé sur le raycasting</li>
            <li>Déplacement fluide du joueur avec gestion des collisions</li>
            <li>Contrôles au clavier pour la navigation et l’action</li>
            <li>Mini-carte intégrée pour aider à l’orientation</li>
            <li>Ajout de textures, création de niveaux personnalisés, et système de scores</li>
            <li>Gestion d’entités variées (ennemis, objets interactifs...)</li>
          </ul>
      </div>
      <div className='Section' id="directskill">
        <h2>Compétences mises en pratique</h2>
          <ul>
            <li>Programmation en langage C</li>
            <li>Utilisation de la CSFML pour le rendu graphique 2D/3D</li>
            <li>Structuration d’un projet complexe en modules</li>
            <li>Débogage avancé et optimisation des performances</li>
            <li>Gestion des événements utilisateur (clavier, caméra)</li>
            <li>Organisation personnelle et rigueur technique</li>
          </ul>
      </div>
      <div className='Section' id="demo">
          <h2>Démo</h2>
          <Video name={`${page}`} />
      </div>
      <div className='Section' id="link">
        <h2>Liens</h2>
        <div className='Section_body'>
          <p>Repo GitHub : <a href='https://github.com/pierrick-simon/Wolf3D' target='_blank' rel='noreferrer'>{page}</a></p>
          <div className='contributor'>
            <a>Contributor : </a>
            <Link.Ariel />
            <Link.Pierrick />
          </div>
        </div>
      </div>
    </body>
  );
}

function Wolf3D() {
    return (
      <React.StrictMode>
        <Header Title={"Wolf3d - Duo (6 semaines)"} SubTitle={"C · avr. 2025 - mai 2025"}/>
        <Nav page="Wolf3D"/>
        <Body page="Wolf3D"/>
      </React.StrictMode>
    );
  }
  
  export default Wolf3D;