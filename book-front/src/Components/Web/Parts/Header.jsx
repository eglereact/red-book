import { useContext } from "react";
import * as l from "../../../Constants/urls";
import { AuthContext } from "../../../Contexts/Auth";

const Header = () => {
  const { user } = useContext(AuthContext);
  return (
    <header id="header">
      <a href="index.html" className="logo">
        <strong>Red</strong> book
      </a>
      <ul className="icons">
        {user ? (
          <>
            <li>
              <span className="label">Hello, {user.name}</span>
            </li>
            <li>
              <button className="link">
                <span className="label">Logout</span>
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <a href={l.SITE_LOGIN}>
                <span className="label">Sign In</span>
              </a>
            </li>
            <li>
              <a href={l.SITE_REGISTER}>
                <span className="label">Sign Up</span>
              </a>
            </li>
          </>
        )}

        <li>
          <a href={l.SITE_DASHBOARD}>
            <span className="label">ADMIN </span>
          </a>
        </li>
      </ul>
    </header>
  );
};
export default Header;
