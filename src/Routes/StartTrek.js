import './../App.css';
import React from 'react';
import Header from './Margins/Header';
import Nav from './Margins/ProjectNav';
import PreviewGallery from './Component/PreviewGallery';
import ProjectPres from './Component/ProjectPres';
import Link from './Component/Link';

function Body( {page} ) {
  return (
    <body>
      <ProjectPres name={`${page}`} text="J’ai développé deux agents d’apprentissage par renforcement capable d’apprendre de manière autonome à piloter un module lunaire et à réaliser un atterrissage sécurisé. Le projet s’appuie sur l’environnement LunarLander de Gymnasium, où les agents apprennent à corriger leur trajectoire par essais et erreurs à partir des informations de leur environnement et d’un système de récompenses. Élu meilleur projet Start Trek de l’année à Epitech Paris."/>
      <div className='Section' id="functionality">
        <h2>Fonctionnalités clés</h2>
          <ul>
            <li>Entraînement d’un agent autonome avec l’algorithme Q-Learning</li>
            <li>Entraînement d’un second agent avec l’algorithme DQN</li>
            <li>Apprentissage autonome du pilotage et de l’atterrissage du module lunaire</li>
            <li>Utilisation d’un système de récompenses pour guider l’apprentissage</li>
            <li>Suivi des performances et de l’évolution de l’entraînement</li>
            <li>Comparaison de différentes configurations et techniques d’apprentissage</li>
          </ul>
      </div>
      <div className='Section' id="directskill">
        <h2>Compétences mises en pratique</h2>
          <ul>
            <li>Programmation en Python</li>
            <li>Mise en œuvre d’algorithmes de Machine Learning et de Reinforcement Learning</li>
            <li>Implémentation et comparaison de Q-Learning et DQN</li>
            <li>Conception d’algorithmes de décision basés sur l’apprentissage par essais et erreurs</li>
            <li>Utilisation de Gymnasium et de l’environnement LunarLander</li>
            <li>Analyse des performances et interprétation des résultats d’entraînement</li>
            <li>Documentation et présentation des choix techniques</li>
          </ul>
      </div>
      <div className='Section' id="preview">
        <h2>Aperçu</h2>
        <div className='Section_body_preview'>
          <PreviewGallery names={["StartTrek-premieressai", "StartTrek-premierresultats", "StartTrek-resultatfinal"]} />
        </div>
      </div>
      <div className='Section' id="link">
        <h2>Liens</h2>
        <div className='Section_body'>
          <p>Repo GitHub : <a href='https://github.com/ArielAMR/StarTtrek' target='_blank' rel='noreferrer'>{page}</a></p>
          <div className='contributor'>
            Contributor :
            <Link.Ariel />
            <Link.Sacha />
            <Link.Pierrick />
          </div>
        </div>
      </div>
    </body>
  );
}

function StartTrek() {
    return (
      <React.StrictMode>
        <Header Title={"Start Trek - Trio (5 semaines)"} SubTitle={"Python · avr. 2026 - mai 2026"}/>
        <Nav page="StartTrek" preview={true} demo={false} />
        <Body page="StartTrek"/>
      </React.StrictMode>
    );
  }
  
  export default StartTrek;