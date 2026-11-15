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
      <ProjectPres name={`${page}`} text="Développement d'une bibliothèque personnalisée de réseaux de neurones permettant de créer, configurer, entraîner et sauvegarder des modèles sans utiliser de framework de Deep Learning existant. Nous avons ensuite utilisé cette bibliothèque pour développer un modèle capable d'analyser des positions d'échecs et de déterminer leur état. Notre meilleur modèle a atteint plus de 97 % de précision"/>
      <div className='Section' id="functionality">
        <h2>Fonctionnalités clés</h2>
          <ul>
            <li>Création et configuration de réseaux de neurones personnalisés</li>
            <li>Implémentation de l'apprentissage supervisé</li>
            <li>Entraînement des modèles et optimisation de leurs paramètres</li>
            <li>Sauvegarde et chargement des réseaux de neurones</li>
            <li>Analyse de positions d'échecs à partir de leur notation FEN</li>
            <li>Classification des positions : normale, échec ou échec et mat</li>
            <li>Évaluation et comparaison des performances des modèles</li>
            <li>Précision supérieure à 97 % pour le meilleur modèle</li>
          </ul>
      </div>
      <div className='Section' id="directskill">
        <h2>Compétences mises en pratique</h2>
          <ul>
            <li>Programmation Python</li>
            <li>Conception et implémentation de réseaux de neurones</li>
            <li>Compréhension des mécanismes mathématiques du Deep Learning</li>
            <li>Machine Learning et apprentissage supervisé</li>
            <li>Optimisation des hyperparamètres et des performances des modèles</li>
            <li>Évaluation, comparaison et analyse des résultats</li>
            <li>Conception d'une bibliothèque logicielle modulaire et réutilisable</li>
          </ul>
      </div>
      <div className='Section' id="preview">
        <h2>Aperçu</h2>
        <div className='Section_body_preview'>
          <PreviewGallery names={["MyTorch_input_formats_comparison"]} />
        </div>
      </div>
      <div className='Section' id="link">
        <h2>Liens</h2>
        <div className='Section_body'>
          <p>Repo GitHub : <a href='https://github.com/pierrick-simon/MyTorch' target='_blank' rel='noreferrer'>{page}</a></p>
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

function MyTorch() {
    return (
      <React.StrictMode>
        <Header Title={"MyTorch - Duo (4 semaines)"} SubTitle={"Python · oct. 2026 - nov. 2026"}/>
        <Nav page="MyTorch" preview={true} demo={false} />
        <Body page="MyTorch"/>
      </React.StrictMode>
    );
  }
  
  export default MyTorch;