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
      <ProjectPres name={`${page}`} text="J’ai développé My_World, un moteur de rendu isométrique interactif inspiré des jeux de gestion/simulation. Ce projet m’a permis d’explorer plusieurs domaines comme la visualisation en 3D isométrique, la génération procédurale, et l’édition de terrain en temps réel."/>
      <div className='Section' id="functionality">
        <h2>Fonctionnalités clés</h2>
          <ul>
            <li>Affichage d’un monde en 3D isométrique à partir de données de hauteur</li>
            <li>Terraforming à la souris (élévation/abaissement du terrain)</li>
            <li>Génération automatique de cartes avec le bruit de Perlin</li>
            <li>Zoom, rotation et déplacement libre de la carte</li>
            <li>Mode édition / visualisation</li>
            <li>Coloration dynamique selon l’altitude (effet relief)</li>
            <li>Sauvegarde et chargement des cartes modifiées</li>
            <li>Affichage fluide et interactif via CSFML</li> 
          </ul>
      </div>
      <div className='Section' id="directskill">
        <h2>Compétences mises en pratique</h2>
          <ul>
            <li>Implémentation d’algorithmes de projection isométrique</li>
            <li>Intégration d’un générateur de terrain réaliste (bruit de Perlin)</li>
            <li>Création d’un éditeur de terrain interactif en temps réel</li>
            <li>Gestion de fichiers pour sauvegarde et restauration de maps</li>
            <li>Manipulation de structures de données 2D</li>
            <li>Optimisation graphique et gestion des interactions souris</li>
          </ul>
      </div>
      <div className='Section' id="demo">
          <h2>Démo</h2>
          <Video name={`${page}`} />
      </div>
      <div className='Section' id="link">
        <h2>Liens</h2>
        <div className='Section_body'>
          <p>Repo GitHub : <a href='https://github.com/leroy-antoine/my_world' target='_blank' rel='noreferrer'>{page}</a></p>
          <div className='contributor'>
            <a>Contributor : </a>
            <Link.Antoine />
            <Link.Pierrick />
          </div>
        </div>
      </div>
    </body>
  );
}

function MyWorld() {
  return (
    <React.StrictMode>
      <Header Title={"MyWorld - Duo (2 semaines)"} SubTitle={"C · févr. 2025 - mars 2025"}/>
      <Nav page="MyWorld"/>
      <Body page="MyWorld"/>
    </React.StrictMode>
  );
}

export default MyWorld;