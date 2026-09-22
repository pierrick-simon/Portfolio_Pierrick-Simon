import './Margin.css';

function Header( { Title, SubTitle } ) {
  return (
    <div className="Header">
      <h1>{Title}<span className="Header_cursor">_</span></h1>
      <p className="Header_subtitle">{SubTitle}</p>
    </div>
  );
}

export default Header;