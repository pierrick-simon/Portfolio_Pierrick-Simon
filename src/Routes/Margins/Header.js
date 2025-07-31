import './Margin.css';

function Header( { Title, SubTitle } ) {
  return (
    <div className="Header">
      <h1>{Title}</h1>
      <p>{SubTitle}</p>
    </div>
  );
}
//Développeur Fullstack | Étudiant à Epitech Paris
export default Header;