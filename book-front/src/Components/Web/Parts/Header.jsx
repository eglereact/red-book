import * as l from "../../../Constants/urls";

const Header = () => {
  return (
    <header id="header">
      <a href="index.html" className="logo">
        <strong>Red</strong> book
      </a>
      <ul className="icons">
        <li>
          <a href={l.SITE_LOGIN}>
            <span className="label">Login</span>
          </a>
        </li>
        <li>
          <a href={l.SITE_REGISTER}>
            <span className="label">Sign Up</span>
          </a>
        </li>
        <li>
          <a href={l.SITE_DASHBOARD}>
            <span className="label">ADMIN</span>
          </a>
        </li>
      </ul>
    </header>
  );
};
export default Header;
