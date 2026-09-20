import './Margin.css';

function Nav( {page, preview=false} ) {
  return (
    <div className='Nav'>
      <a href={`/${page}/#about`}>Présentation</a>
      <a href={`/${page}/#functionality`}>Fonctionnalités</a>
      <a href={`/${page}/#directskill`}>Compétences</a>
      {preview && (
        <a href={`/${page}/#preview`}>Aperçu</a>
      )}
      <a href={`/${page}/#demo`}>Démo</a>
      <a href={`/${page}/#link`}>Liens</a>
    </div>
  );
}

export default Nav;