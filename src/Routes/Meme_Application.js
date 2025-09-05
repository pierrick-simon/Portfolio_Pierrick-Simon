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
      <ProjectPres name={`${page}`} text="Développement d’un éditeur de memes interactif généré entièrement via GitHub Copilot, à partir de simples prompts. Aucun code n’a été écrit manuellement : Copilot a produit l’intégralité du frontend, backend, documentation et fonctionnalités."/>
      <div className='Section' id="functionality">
        <h2>Fonctionnalités clés</h2>
          <ul>
            <li>Éditeur de memes interactif avec ajout de texte par clic</li>
            <li>Drag-and-drop et redimensionnement avec aperçu en temps réel</li>
            <li>Édition directe du texte (double-clic) et ajustement automatique</li>
            <li>Navigation parmi des centaines de templates (ImgFlip API)</li>
            <li>Recherche intégrée et sélection aléatoire de templates</li>
            <li>Sauvegarde automatique des memes créés</li>
            <li>Visionneuse plein écran avec navigation clavier</li>
            <li>Téléchargement local et réédition des memes</li>
            <li>Système d’undo/redo (Ctrl+Z)</li>
            <li>Design responsive, compatible desktop et mobile</li>
          </ul>
      </div>
      <div className='Section' id="directskill">
        <h2>Compétences mises en pratique</h2>
          <ul>
            <li>Prompt engineering pour piloter GitHub Copilot efficacement</li>
            <li>Conception d’interfaces riches et ergonomiques en React.js</li>
            <li>Implémentation de fonctionnalités avancées : drag-and-drop, inline editing, undo/redo</li>
            <li>Consommation d’API tierce (ImgFlip) et gestion dynamique des templates</li>
            <li>Mise en place de sauvegarde automatique et navigation intuitive</li>
            <li>Adaptabilité du design avec responsive et raccourcis clavier</li>
          </ul>
      </div>
      <div className='Section' id="demo">
          <h2>Démo</h2>
          <Video name={`${page}`} />
      </div>
      <div className='Section' id="link">
        <h2>Liens</h2>
        <div className='Section_body'>
          <p>Repo GitHub : <a href='https://github.com/pierrick-simon/Meme_Application' target='_blank' rel='noreferrer'>{page}</a></p>
          <div className='contributor'>
            <a>Contributor : </a>
            <Link.Pierrick />
          </div>
        </div>
      </div>
    </body>
  );
}

function Meme_Application() {
    return (
      <React.StrictMode>
        <Header Title={"Meme_Application - Solo (1 jour) - (généré avec GitHub Copilot)"} SubTitle={"Node.js / React.js · sep. 2025 - sep 2025"}/>
        <Nav page="Meme_Application"/>
        <Body page="Meme_Application"/>
      </React.StrictMode>
    );
  }
  
  export default Meme_Application;