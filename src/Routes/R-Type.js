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
      <ProjectPres name={`${page}`} text="Développement et amélioration d'un moteur de jeu en C++ dans le cadre du projet R-Type, avec pour objectif de proposer une architecture réutilisable et de démontrer ses capacités à travers un jeu complet. Nous avons notamment enrichi la partie réseau avec la gestion de plusieurs instances de serveur et un système de lobby, tout en améliorant le jeu R-Type. L'utilisation de Lua pour développer la logique du jeu d'un poc nous a permis de mettre en évidence la modularité du moteur et ses différentes fonctionnalités, sans avoir besoin d'écrire de code C++ pour la logique du jeu."/>
      <div className='Section' id="functionality">
        <h2>Fonctionnalités clés</h2>
          <ul>
            <li>Architecture ECS (Entity-Component-System) pour organiser les entités et leurs composants</li>
            <li>Prise en charge du rendu 2D et 3D avec Raylib</li>
            <li>Communication réseau client-serveur avec Asio et le protocole UDP</li>
            <li>Gestion de plusieurs instances de serveur simultanément</li>
            <li>Système de lobby pour organiser et rejoindre des parties multijoueurs</li>
            <li>Intégration de Lua avec sol2 pour développer la logique du jeu</li>
            <li>Système physique intégré avec gestion des interactions entre les objets</li>
            <li>Gestion audio avec spatialisation 3D pour positionner les sons dans l’environnement</li>
          </ul>
      </div>
      <div className='Section' id="directskill">
        <h2>Compétences mises en pratique</h2>
          <ul>
            <li>Programmation C++ et conception orientée objet</li>
            <li>Conception d’architectures modulaires, génériques et réutilisables</li>
            <li>Implémentation d’une architecture ECS</li>
            <li>Programmation réseau et communication via UDP</li>
            <li>Gestion de plusieurs instances serveur et des connexions multijoueurs</li>
            <li>Intégration d’un langage de script dans un moteur C++</li>
            <li>Séparation entre le moteur et la logique du jeu</li>
            <li>Développement de systèmes graphiques, physiques et audio</li>
          </ul>
      </div>
      <div className='Section' id="demo">
          <h2>Démo</h2>
          <Video name={`${page}`} />
      </div>
      <div className='Section' id="link">
        <h2>Liens</h2>
        <div className='Section_body'>
          <p>Repo GitHub : <a href='https://github.com/pierrick-simon/R-Type' target='_blank' rel='noreferrer'>{page}</a></p>
          <p>Repo GitHub Poc : <a href='https://github.com/ArielAmriou/LuaEngine-Poc' target='_blank' rel='noreferrer'>LuaEngine Poc</a></p>
          <div className='contributor'>
            Contributor :
            <Link.Aaron />
            <Link.Ariel />
            <Link.Lucas />
            <Link.Pierrick />
          </div>
        </div>
      </div>
    </body>
  );
}

function RType() {
    return (
      <React.StrictMode>
        <Header Title={"R-Type - Groupe de 4 (6 semaines)"} SubTitle={"C++/LUA · sep. 2026 - nov. 2026"}/>
        <Nav page="R-Type"/>
        <Body page="R-Type"/>
      </React.StrictMode>
    );
  }
  
  export default RType;