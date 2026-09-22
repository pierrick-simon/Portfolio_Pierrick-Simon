import './../App.css';
import React from 'react';
import Header from './Margins/Header';
import Nav from './Margins/ProjectNav';
import Video from './Component/Video';
import ProjectPres from './Component/ProjectPres';
import Link from './Component/Link';
import PreviewGallery from './Component/PreviewGallery';

function Body( {page} ) {
  return (
    <body>
      <ProjectPres name={`${page}`} text="J’ai développé un moteur de ray tracing capable de générer des scènes 3D à partir de fichiers de configuration. Le projet permet de visualiser la scène en temps réel et d'interagir avec la caméra pour explorer le rendu."/>
      <div className='Section' id="functionality">
        <h2>Fonctionnalités clés</h2>
          <ul>
            <li>Génération d’images 3D par ray tracing</li>
            <li>Gestion des lumières, matériaux et effets de rendu</li>
            <li>Déplacement et exploration de la scène en temps réel</li>
            <li>Calcul du rendu en multithreading pour accélérer les temps de génération</li>
            <li>Réduction du nombre de pixels et de rebonds pendant les déplacements pour générer un aperçu rapide</li>
            <li>Rendu complet et plus précis une fois la caméra stabilisée</li>
          </ul>
      </div>
      <div className='Section' id="directskill">
        <h2>Compétences mises en pratique</h2>
          <ul>
            <li>Programmation orientée objet en C++</li>
            <li>Implémentation d’algorithmes de ray tracing</li>
            <li>Calculs mathématiques et géométriques en 3D</li>
            <li>Gestion du multithreading et optimisation des performances</li>
            <li>Développement d’un rendu graphique interactif avec SFML</li>
            <li>Gestion d’une scène 3D et d’une caméra</li>
            <li>Conception d’un système de rendu adaptatif en temps réel</li>
          </ul>
      </div>
      <div className='Section' id="preview">
        <h2>Aperçu</h2>
        <div className='Section_body_preview'>
          <PreviewGallery names={["RayTracer-step1", "RayTracer-step2", "RayTracer-step3", "RayTracer", "RayTracer-scene", "RayTracer-mirror"]} />
        </div>
      </div>
      <div className='Section' id="demo">
          <h2>Démo</h2>
          <Video name={`${page}`} />
      </div>
      <div className='Section' id="link">
        <h2>Liens</h2>
        <div className='Section_body'>
          <p>Repo GitHub : <a href='https://github.com/pierrick-simon/Raytracer' target='_blank' rel='noreferrer'>{page}</a></p>
          <div className='contributor'>
            Contributor :
            <Link.Ariel />
            <Link.Armand />
            <Link.Natan />
            <Link.Pierrick />
          </div>
        </div>
      </div>
    </body>
  );
}

function RayTracer() {
    return (
      <React.StrictMode>
        <Header Title={"RayTracer - Groupe de 4 (4 semaines)"} SubTitle={"C++ · avr. 2026 - mai 2026"}/>
        <Nav page="RayTracer" preview="true"/>
        <Body page="RayTracer"/>
      </React.StrictMode>
    );
  }
  
  export default RayTracer;