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
      <ProjectPres name={`${page}`} text="J’ai développé NanoTekSpice, un simulateur de circuits électroniques permettant de créer et simuler des circuits logiques à partir d’un fichier de configuration."/>
      <div className='Section' id="functionality">
        <h2>Fonctionnalités clés</h2>
          <ul>
            <li>Création et connexion des composants sous forme de graphe</li>
            <li>Implémentation de portes logiques : AND, OR, XOR et NOT</li>
            <li>Simulation de composants avancés : compteurs, registres, multiplexeurs, mémoires, etc.</li>
            <li>Gestion des entrées, sorties et horloges</li>
            <li>Simulation par ticks et gestion de l’état des composants</li>
            <li>Architecture basée sur un système générique de création des composants</li>
            <li>Rendu graphique interactif du circuit</li>
          </ul>
      </div>
      <div className='Section' id="directskill">
        <h2>Compétences mises en pratique</h2>
          <ul>
            <li>Conception d’une architecture orientée objet en C++</li>
            <li>Modélisation et manipulation d’un graphe de composants</li>
            <li>Implémentation d’un système de simulation logique</li>
            <li>Développement d’une interface graphique interactive</li>
            <li>Gestion des interactions utilisateur avec les composants</li>
            <li>Organisation et structuration d’un projet complexe</li>
            <li>Utilisation de la SFML pour le rendu graphique 2D</li>
          </ul>
      </div>
      <div className='Section' id="demo">
          <h2>Démo</h2>
          <Video name={`${page}`} />
      </div>
      <div className='Section' id="link">
        <h2>Liens</h2>
        <div className='Section_body'>
          <p>Repo GitHub : <a href='https://github.com/ArielAmriou/NanoTekSpice' target='_blank' rel='noreferrer'>{page}</a></p>
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

function NanoTeckSpice() {
    return (
      <React.StrictMode>
        <Header Title={"NanoTeckSpice - Duo (4 semaines)"} SubTitle={"C++ · fev. 2026 - mars 2026"}/>
        <Nav page="NanoTeckSpice"/>
        <Body page="NanoTeckSpice"/>
      </React.StrictMode>
    );
  }
  
  export default NanoTeckSpice;