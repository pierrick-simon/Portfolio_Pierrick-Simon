import './Margin.css';

function Nav( {page} ) {
  return (
    <div className='Nav'>
      <a href={`/${page}/#about`}>Présentation</a>
      <a href={`/${page}/#functionality`}>Fonctionnalités</a>
      <a href={`/${page}/#directskill`}>Compétences</a>
      <a href={`/${page}/#demo`}>Démo</a>
      <a href={`/${page}/#link`}>Liens</a>
    </div>
  );
}

export default Nav;