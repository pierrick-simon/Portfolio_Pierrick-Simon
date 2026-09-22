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
            <li>Développement d’IA autonomes en Python pour contrôler les joueurs</li>
            <li>Gestion d’un monde composé de cases et de différentes ressources</li>
            <li>Gestion de plusieurs équipes et de leurs IA</li>
            <li>Communication entre les IA, le serveur et le client graphique</li>
            <li>Interface graphique 3D développée avec Raylib</li>
            <li>Mise à jour dynamique de l’état du jeu à partir des informations du serveur</li>
            <li>Gestion simultanée de plusieurs communications et événements</li>
          </ul>
      </div>
      <div className='Section' id="directskill">
        <h2>Compétences mises en pratique</h2>
          <ul>
            <li>Programmation en C++ et Python sur un projet de grande envergure</li>
            <li>Conception d’algorithmes de décision et de stratégies pour des IA autonomes</li>
            <li>Conception et développement d’un serveur robuste</li>
            <li>Programmation réseau et architecture client-serveur</li>
            <li>Développement d’une interface graphique 3D avec Raylib</li>
            <li>Conception d’une architecture modulaire composée de plusieurs composants communicants</li>
            <li>Gestion de communications et d’événements concurrents</li>
            <li>Travail en équipe sur un projet conséquent</li>
          </ul>
      </div>
      <div className='Section' id="demo">
          <h2>Démo</h2>
          <Video name={`${page}`} />
      </div>
      <div className='Section' id="link">
        <h2>Liens</h2>
        <div className='Section_body'>
          <p>Repo GitHub : <a href='https://github.com/pierrick-simon/Zappy' target='_blank' rel='noreferrer'>{page}</a></p>
          <div className='contributor'>
            Contributor :
            <Link.Ariel />
            <Link.Armand />
            <Link.Natan />
            <Link.Rayan />
            <Link.Pierrick />
          </div>
        </div>
      </div>
    </body>
  );
}

function Zappy() {
    return (
      <React.StrictMode>
        <Header Title={"Zappy - Groupe de 5 (5 semaines)"} SubTitle={"C++/Python · mai 2026 - juin 2026"}/>
        <Nav page="Zappy"/>
        <Body page="Zappy"/>
      </React.StrictMode>
    );
  }
  
  export default Zappy;