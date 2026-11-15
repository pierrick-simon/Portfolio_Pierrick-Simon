import './../App.css';
import React from 'react';
import Header from './Margins/Header';
import Nav from './Margins/ProjectNav';
import ProjectPres from './Component/ProjectPres';
import Link from './Component/Link';

function Body( {page} ) {
  return (
    <body>
      <ProjectPres name={`${page}`} text="My_PGP est un outil de cryptographie développé en C++ permettant de manipuler différents algorithmes de chiffrement et de déchiffrement. Le programme prend en charge plusieurs méthodes cryptographiques, allant du chiffrement symétrique à la cryptographie asymétrique, avec la possibilité de les combiner dans un système hybride. Développé en binôme, le projet nous a amenés à réimplémenter les mécanismes cryptographiques sans dépendre de bibliothèques spécialisées, tout en portant une attention particulière à la gestion des données, aux calculs sur de grands nombres et à la fiabilité des résultats."/>
      <div className='Section' id="functionality">
        <h2>Fonctionnalités clés</h2>
          <ul>
            <li>Implémentation de XOR et AES pour le chiffrement symétrique</li>
            <li>Implémentation de RSA et ElGamal pour le chiffrement asymétrique</li>
            <li>Développement des systèmes hybrides PGP-XOR et PGP-AES</li>
            <li>Génération de clés publiques et privées avec RSA</li>
            <li>Chiffrement et déchiffrement de messages depuis une interface en ligne de commande</li>
            <li>Prise en charge du chiffrement par blocs et du chiffrement en mode flux</li>
            <li>Gestion des opérations cryptographiques et des données associées</li>
          </ul>
      </div>
      <div className='Section' id="directskill">
        <h2>Compétences mises en pratique</h2>
          <ul>
            <li>Programmation C++ et conception logicielle</li>
            <li>Implémentation d'algorithmes cryptographiques à partir de zéro</li>
            <li>Algorithmique et arithmétique modulaire</li>
            <li>Manipulation de grands entiers et gestion des opérations numériques</li>
            <li>Conception d'architectures logicielles et séparation des responsabilités</li>
            <li>Tests unitaires, tests fonctionnels et intégration continue</li>
            <li>Analyse des propriétés, des contraintes et des limites des systèmes de chiffrement</li>
          </ul>
      </div>
      {/* <div className='Section' id="preview">
        <h2>Aperçu</h2>
        <div className='Section_body_preview'>
          <PreviewGallery names={["MyPGP_input_formats_comparison"]} />
        </div>
      </div> */}
      <div className='Section' id="link">
        <h2>Liens</h2>
        <div className='Section_body'>
          <p>Repo GitHub : <a href='https://github.com/ArielAmriou/PGP' target='_blank' rel='noreferrer'>{page}</a></p>
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

function MyPGP() {
    return (
      <React.StrictMode>
        <Header Title={"MyPGP - Duo (4 semaines)"} SubTitle={"C++ · sep. 2026 - oct. 2026"}/>
        <Nav page="MyPGP" preview={false} demo={false} />
        <Body page="MyPGP"/>
      </React.StrictMode>
    );
  }
  
  export default MyPGP;