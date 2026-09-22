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
      <ProjectPres name={`${page}`} text="J’ai développé une simulation de pizzeria utilisant le multithreading pour gérer les différentes cuisines et leurs commandes. Le projet met en pratique la synchronisation entre plusieurs threads et la gestion concurrente des ressources."/>
      <div className='Section' id="functionality">
        <h2>Fonctionnalités clés</h2>
          <ul>
            <li>Gestion des commandes et de leur répartition entre les cuisines</li>
            <li>Gestion des cuisiniers avec des threads</li>
            <li>Synchronisation des ressources partagées avec des mutexes</li>
            <li>Interface graphique représentant l’état et l’activité des cuisines</li>
          </ul>
      </div>
      <div className='Section' id="directskill">
        <h2>Compétences mises en pratique</h2>
          <ul>
            <li>Programmation orientée objet en C++</li>
            <li>Programmation concurrente et multithreading</li>
            <li>Synchronisation de threads et gestion des mutexes</li>
            <li>Implémentation du modèle Producer/Consumer</li>
            <li>Développement d’une interface graphique avec SFML</li>
          </ul>
      </div>
      <div className='Section' id="demo">
          <h2>Démo</h2>
          <Video name={`${page}`} />
      </div>
      <div className='Section' id="link">
        <h2>Liens</h2>
        <div className='Section_body'>
          <p>Repo GitHub : <a href='https://github.com/pierrick-simon/The-Plazza' target='_blank' rel='noreferrer'>{page}</a></p>
          <div className='contributor'>
            Contributor :
            <Link.Ariel />
            <Link.Pierrick />
          </div>
        </div>
      </div>
    </body>
  );
}

function The_Plazza() {
    return (
      <React.StrictMode>
        <Header Title={"The-Plazza - Duo (3 semaines)"} SubTitle={"C++ · mai 2026 - mai 2026"}/>
        <Nav page="The-Plazza"/>
        <Body page="The-Plazza"/>
      </React.StrictMode>
    );
  }
  
  export default The_Plazza;