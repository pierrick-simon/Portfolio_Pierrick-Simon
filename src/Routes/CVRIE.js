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
      <ProjectPres name={`${page}`} text="Développement d'un système de machine learning appliqué à l'analyse de données médicales, avec pour objectif d'entraîner des modèles capables d'identifier des pathologies à partir d'images et de données patients. Le projet s'appuie notamment sur l'étude et la préparation de jeux de données, l'entraînement de différents algorithmes et la comparaison de leurs performances afin de construire un modèle de classification fiable."/>
      <div className='Section' id="functionality">
        <h2>Fonctionnalités clés</h2>
          <ul>
            <li>Analyse et nettoyage d'un jeu de données de radiographies thoraciques</li>
            <li>Répartition des données en ensembles d'entraînement, de validation et de test</li>
            <li>Prétraitement des images : conversion en niveaux de gris, redimensionnement et extraction de caractéristiques sous forme de vecteurs</li>
            <li>Réduction de dimension avec l'algorithme PCA</li>
            <li>Implémentation et comparaison de plusieurs algorithmes : Logistic Regression, SVC, Random Forest et LDA</li>
            <li>Optimisation des hyperparamètres avec GridSearchCV et validation croisée</li>
            <li>Combinaison de plusieurs modèles avec une approche de stacking</li>
            <li>Sauvegarde du modèle entraîné et du transformateur PCA pour réaliser des prédictions sur de nouvelles images</li>
          </ul>
      </div>
      <div className='Section' id="directskill">
        <h2>Compétences mises en pratique</h2>
          <ul>
            <li>Machine Learning et apprentissage supervisé</li>
            <li>Préparation, nettoyage et analyse de jeux de données</li>
            <li>Prétraitement et classification d'images</li>
            <li>Réduction de dimension et sélection de caractéristiques</li>
            <li>Entraînement, comparaison et optimisation de modèles</li>
            <li>Utilisation de techniques d'ensemble learning, notamment le stacking</li>
            <li>Évaluation des performances avec différentes métriques : Accuracy, F1-score et ROC-AUC</li>
            <li>Analyse des résultats et visualisation de données</li>
            <li>Expérimentation et documentation d'une démarche scientifique</li>
          </ul>
      </div>
      <div className='Section' id="preview">
        <h2>Aperçu</h2>
        <div className='Section_body_preview'>
          <PreviewGallery names={["CVRIE_pre_comparison", "CVRIE_model_comparison"]} />
        </div>
      </div>
      <div className='Section' id="link">
        <h2>Liens</h2>
        <div className='Section_body'>
          <p>Repo GitHub : <a href='https://github.com/pierrick-simon/CVRIE' target='_blank' rel='noreferrer'>{page}</a></p>
          <div className='contributor'>
            Contributor :
            <Link.Armand />
            <Link.Loan />
            <Link.Pierrick />
          </div>
        </div>
      </div>
    </body>
  );
}

function CVRIE() {
    return (
      <React.StrictMode>
        <Header Title={"CVRIE - Trio (5 semaines)"} SubTitle={"Python/Jupyter Notebook · fev. 2026 - mars 2026"}/>
        <Nav page="CVRIE" preview={true} demo={false} />
        <Body page="CVRIE"/>
      </React.StrictMode>
    );
  }
  
  export default CVRIE;