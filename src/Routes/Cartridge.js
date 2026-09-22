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
      <ProjectPres name={`${page}`} text="J’ai développé un jeu pour Game Boy, composé de plusieurs mini-jeux, avec pour objectif de proposer une expérience fluide malgré les ressources limitées de la console. Le projet demande notamment de travailler avec les contraintes matérielles de la Game Boy et d’optimiser les ressources utilisées."/>
      <div className='Section' id="functionality">
        <h2>Fonctionnalités clés</h2>
          <ul>
            <li>Développement de trois mini-jeux : MoonDash, ShootX et SlimeJump</li>
            <li>MoonDash : jeu d’esquive avec possibilité d’effectuer des dashs</li>
            <li>ShootX : jeu de tir permettant d’éliminer des vaisseaux ennemis</li>
            <li>SlimeJump : jeu de plateforme inspiré de Doodle Jump</li>
            <li>Création de musiques en utilisant le système audio de la Game Boy</li>
            <li>Animations, menus et éléments graphiques adaptés aux capacités de la console</li>
            <li>Système de leaderboard avec sauvegarde des scores sur la cartouche</li>
            <li>Gestion et optimisation des ressources pour respecter les contraintes matérielles</li>
          </ul>
      </div>
      <div className='Section' id="directskill">
        <h2>Compétences mises en pratique</h2>
          <ul>
            <li>Programmation en C sur système embarqué</li>
            <li>Optimisation des ressources et des performances</li>
            <li>Adaptation d’un programme aux contraintes matérielles d’une console rétro</li>
            <li>Gestion du son et création de musiques sur matériel limité</li>
            <li>Développement de plusieurs gameplays au sein d’une même application</li>
            <li>Gestion de sauvegardes et de données persistantes</li>
          </ul>
      </div>
      <div className='Section' id="demo">
          <h2>Démo</h2>
          <Video name={`${page}`} />
      </div>
      <div className='Section' id="link">
        <h2>Liens</h2>
        <div className='Section_body'>
          <p>Repo GitHub : <a href='https://github.com/pierrick-simon/Cartridge' target='_blank' rel='noreferrer'>{page}</a></p>
          <div className='contributor'>
            Contributor :
            <Link.Ariel />
            <Link.Sandes />
            <Link.Pierrick />
          </div>
        </div>
      </div>
    </body>
  );
}

function Cartridge() {
    return (
      <React.StrictMode>
        <Header Title={"Cartridge - Trio (5 semaines)"} SubTitle={"C · avr. 2026 - mai 2026"}/>
        <Nav page="Cartridge"/>
        <Body page="Cartridge"/>
      </React.StrictMode>
    );
  }
  
  export default Cartridge;