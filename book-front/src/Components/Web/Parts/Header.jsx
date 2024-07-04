const Header = () => {
  return (
    <header id="header">
      <a href="index.html" className="logo">
        <strong>Red</strong> book
      </a>
      <ul className="icons">
        <li>
          <a href="/#login">
            <span className="label">Login</span>
          </a>
        </li>
        <li>
          <a href="/#register">
            <span className="label">Sign Up</span>
          </a>
        </li>
      </ul>
    </header>
  );
};
export default Header;
