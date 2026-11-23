function Header({ title, subtitle }) {
  return (
    <div className="Header">
      <h1>{title}<span className="Header_cursor">_</span></h1>
      <p className="Header_subtitle">{subtitle}</p>
    </div>
  );
}

export default Header;
