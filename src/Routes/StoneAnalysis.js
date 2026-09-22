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
      <ProjectPres name={`${page}`} text="J’ai développé un programme d’analyse audio capable de lire des fichiers WAV, d’analyser leurs fréquences et de cacher ou décoder des messages dans le signal audio grâce à la stéganographie."/>
      <div className='Section' id="functionality">
        <h2>Fonctionnalités clés</h2>
          <ul>
            <li>Lecture et manipulation de fichiers WAV</li>
            <li>Analyse des fréquences avec la DFT et la FFT</li>
            <li>Encodage de messages dans un fichier audio</li>
            <li>Décodage de messages cachés dans le signal audio</li>
            <li>Visualisation du signal audio en temps réel</li>
          </ul>
      </div>
      <div className='Section' id="directskill">
        <h2>Compétences mises en pratique</h2>
          <ul>
            <li>Analyse et traitement du signal audio</li>
            <li>Implémentation d’algorithmes de DFT, IDFT et FFT</li>
            <li>Conception d’algorithmes de stéganographie</li>
            <li>Manipulation et traitement de fichiers WAV</li>
            <li>Développement d’une interface graphique avec SFML</li>
            <li>Optimisation de calculs numériques</li>
            <li>Gestion et manipulation de données audio</li>
          </ul>
      </div>
      <div className='Section' id="demo">
          <h2>Démo</h2>
          <Video name={`${page}`} />
      </div>
      <div className='Section' id="link">
        <h2>Liens</h2>
        <div className='Section_body'>
          <p>Repo GitHub : <a href='https://github.com/ArielAmriou/StoneAnalysis' target='_blank' rel='noreferrer'>{page}</a></p>
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

function StoneAnalysis() {
    return (
      <React.StrictMode>
        <Header Title={"StoneAnalysis - Duo (3 semaines)"} SubTitle={"C++ · mai 2026 - mai 2026"}/>
        <Nav page="StoneAnalysis"/>
        <Body page="StoneAnalysis"/>
      </React.StrictMode>
    );
  }
  
  export default StoneAnalysis;