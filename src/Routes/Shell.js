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
      <ProjectPres name={`${page}`} text="J’ai développé un interpréteur de commandes Unix complet, appelé 42sh, combinant les fonctionnalités essentielles d’un shell Bash et la rigueur d’un projet système en C. Le shell supporte les commandes classiques, les pipes (|), les redirections (>, >>, <), les variables d’environnement, les opérateurs logiques (&&, ||), et plus encore. Une attention particulière a été portée à la robustesse et à la gestion des erreurs."/>
      <div className='Section' id="functionality">
        <h2>Fonctionnalités clés</h2>
          <ul>
            <li>Gestion de processus : fork, exec, pipe, redirections</li>
            <li>Programmation système Unix (fichiers, signaux, environnement)</li>
            <li>Implémentation de parsing complexe (analyse lexicale/syntaxique)</li>
            <li>Création d’un prompt interactif et gestion de l’historique</li>
            <li>Maîtrise de la programmation modulaire et du debug avancé</li>
            <li>Auto-complétion intelligente des fichiers</li>
            <li>Gestion avancée des signaux (Ctrl+C, Ctrl+Z, gestion des processus zombies)</li>
            <li>Job control : mise en arrière-plan, reprise de jobs (fg, bg)</li>
            <li>Scripting : if, repeat, foreach ...</li>
            <li>Support de l’édition en ligne de commande (navigation, suppression, insertion)</li>
            <li>IA intégrée</li>
          </ul>
      </div>
      <div className='Section' id="directskill">
        <h2>Compétences mises en pratique</h2>
          <ul>
            <li>Développement C</li>
            <li>Unix, Bash, shell scripting</li>
            <li>Programmation système</li>
            <li>Optimisation et tests unitaires</li>
            <li>Gestion d’équipe, travail collaboratif avec Git</li>
          </ul>
      </div>
      <div className='Section' id="demo">
          <h2>Démo</h2>
          <Video name={`${page}`} />
      </div>
      <div className='Section' id="link">
        <h2>Liens</h2>
        <div className='Section_body'>
          <p>Repo GitHub : <a href='https://github.com/leroy-antoine/my_shell' target='_blank' rel='noreferrer'>{page}</a></p>
          <div className='contributor'>
            <a>Contributor : </a>
            <Link.Ariel />
            <Link.Antoine />
            <Link.Loan />
            <Link.Maxime />
            <Link.Pierrick />
          </div>
        </div>
      </div>
    </body>
  );
}

function Shell() {
  return (
    <React.StrictMode>
      <Header Title={"42sh - Groupe de 5 (11 semaines)"} SubTitle={"C · févr. 2025 - mai 2025"}/>
      <Nav page="42sh"/>
      <Body page="42sh"/>
    </React.StrictMode>
  );
}

export default Shell;