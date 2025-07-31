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
      <ProjectPres name={`${page}`} text="Dans le cadre d’un projet personnel et collaboratif, nous avons développé une application web qui permet à l’utilisateur de rechercher, sauvegarder et gérer une liste de films à regarder (watchlist). L’objectif était d’offrir une expérience fluide et moderne, combinant un backend robuste en Go et une interface utilisateur intuitive en React."/>
      <div className='Section' id="functionality">
        <h2>Fonctionnalités clés</h2>
          <ul>
            <li>Recherche de films via une API publique (titre, image, description)</li>
            <li>Affichage dynamique des résultats avec visuels et résumés</li>
            <li>Ajout et suppression de films dans une watchlist personnalisée</li>
            <li>Interface responsive et fluide, adaptée aux différents supports</li>
          </ul>
      </div>
      <div className='Section' id="directskill">
        <h2>Compétences mises en pratique</h2>
          <ul>
            <li>Développement fullstack web</li>
            <li>Création et consommation d’API REST</li>
            <li>Structuration d’un backend en Go (routes, handlers, logique métier)</li>
            <li>Intégration front/back avec React</li>
            <li>Organisation de projet et gestion des fonctionnalités</li>
          </ul>
      </div>
      <div className='Section' id="demo">
          <h2>Démo</h2>
          <Video name={`${page}`} />
      </div>
      <div className='Section' id="link">
        <h2>Liens</h2>
        <div className='Section_body'>
          <p>Repo GitHub : <a href='https://github.com/skl1017/PoCSoftware2025-rush' target='_blank' rel='noreferrer'>{page}</a></p>
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

function Watchlist() {
  return (
    <React.StrictMode>
      <Header Title={"Watchlist - Duo (2 jours)"} SubTitle={"Go / Node.js · Mars 2025"}/>
      <Nav page="Watchlist"/>
      <Body page="Watchlist"/>
    </React.StrictMode>
  );
}

export default Watchlist;