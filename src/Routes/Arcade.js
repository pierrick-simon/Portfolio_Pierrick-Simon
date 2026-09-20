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
      <ProjectPres name={`${page}`} text="J’ai développé une plateforme de jeux permettant de jouer à différents jeux rétro tout en changeant dynamiquement d'interface graphique. Le projet repose sur une architecture modulaire utilisant des bibliothèques dynamiques chargées à l'exécution."/>
      <div className='Section' id="functionality">
        <h2>Fonctionnalités clés</h2>
          <ul>
            <li>Développement du jeu Snake</li>
            <li>Développement du jeu Minesweeper</li>
            <li>Implémentation de plusieurs interfaces graphiques avec SFML, SDL2 et ncurses</li>
            <li>Changement de bibliothèque graphique à la volée</li>
            <li>Changement de jeu sans modifier le fonctionnement de la plateforme</li>
            <li>Chargement et déchargement dynamique des bibliothèques</li>
            <li>Gestion des événements et des interactions utilisateur</li>
          </ul>
      </div>
      <div className='Section' id="directskill">
        <h2>Compétences mises en pratique</h2>
          <ul>
            <li>Programmation orientée objet en C++</li>
            <li>Conception d’une architecture modulaire et générique</li>
            <li>Utilisation et gestion de bibliothèques dynamiques</li>
            <li>Gestion des événements et des interactions utilisateur</li>
            <li>Développement de jeux avec une architecture réutilisable</li>
          </ul>
      </div>
      <div className='Section' id="demo">
          <h2>Démo</h2>
          <Video name={`${page}`} />
      </div>
      <div className='Section' id="link">
        <h2>Liens</h2>
        <div className='Section_body'>
          <p>Repo GitHub : <a href='https://github.com/ArielAmriou/Arcade' target='_blank' rel='noreferrer'>{page}</a></p>
          <div className='contributor'>
            <a>Contributor : </a>
            <Link.Ariel />
            <Link.Antoine />
            <Link.Pierrick />
          </div>
        </div>
      </div>
    </body>
  );
}

function Arcade() {
    return (
      <React.StrictMode>
        <Header Title={"Arcade - Trio (4 semaines)"} SubTitle={"C++ · mars 2026 - avr. 2026"}/>
        <Nav page="Arcade"/>
        <Body page="Arcade"/>
      </React.StrictMode>
    );
  }
  
  export default Arcade;