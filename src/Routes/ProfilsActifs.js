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
      <ProjectPres name={`${page}`} text="J’ai développé une plateforme web destinée à faciliter la mise en relation entre candidats et recruteurs, à partir d’un besoin fourni par un client fictif. Le projet comprend plusieurs espaces dédiés aux candidats, recruteurs et administrateurs, ainsi qu’un système de certification permettant de valoriser les compétences des candidats."/>
      <div className='Section' id="functionality">
        <h2>Fonctionnalités clés</h2>
          <ul>
            <li>Gestion des rôles candidat, recruteur et administrateur</li>
            <li>Création et gestion d’un profil professionnel</li>
            <li>Ajout et visualisation de vidéos de présentation</li>
            <li>Questionnaire de certification avec attribution d’un badge</li>
            <li>Recherche et filtrage des profils par compétences, secteur et localisation</li>
            <li>Interaction avec les profils et gestion des favoris</li>
            <li>Tableaux de bord pour suivre les interactions</li>
            <li>Espace administrateur pour modérer les profils et gérer la certification</li>
            <li>Interface responsive adaptée aux ordinateurs et aux mobiles</li>
          </ul>
      </div>
      <div className='Section' id="directskill">
        <h2>Compétences mises en pratique</h2>
          <ul>
            <li>Développement d’une application web complète avec Next.js</li>
            <li>Conception et utilisation d’une base de données relationnelle avec PostgreSQL</li>
            <li>Conception et développement d’une API REST</li>
            <li>Gestion de l’authentification et des différents rôles avec Better Auth</li>
            <li>Analyse et clarification des besoins avec un client fictif</li>
            <li>Adaptation du projet à des demandes et spécifications évolutives</li>
            <li>Travail en équipe sur un projet web conséquent</li>
            <li>Organisation et structuration d’un projet full-stack</li>
          </ul>
      </div>
      <div className='Section' id="demo">
          <h2>Démo</h2>
          <Video name={`${page}`} />
      </div>
      <div className='Section' id="link">
        <h2>Liens</h2>
        <div className='Section_body'>
          <p>Repo GitHub : <a href='https://github.com/pierrick-simon/ProfilsActifs' target='_blank' rel='noreferrer'>{page}</a></p>
          <div className='contributor'>
            Contributor :
            <Link.Andriamirado />
            <Link.Natan />
            <Link.Pierrick />
          </div>
        </div>
      </div>
    </body>
  );
}

function ProfilsActifs() {
    return (
      <React.StrictMode>
        <Header Title={"ProfilsActifs - Groupe de 4 (2 semaines)"} SubTitle={"next.js/postgresql · sep. 2026 - sep. 2026"}/>
        <Nav page="ProfilsActifs"/>
        <Body page="ProfilsActifs"/>
      </React.StrictMode>
    );
  }
  
  export default ProfilsActifs;