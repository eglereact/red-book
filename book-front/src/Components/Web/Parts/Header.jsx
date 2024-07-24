import { useContext } from "react";
import * as l from "../../../Constants/urls";
import { AuthContext } from "../../../Contexts/Auth";
import Logout from "../../Common/Logout";
import Gate from "../../Common/Gate";

const Header = () => {
  const { user } = useContext(AuthContext);
  return (
    <header id="header">
      <a href="index.html" className="logo">
        <strong>Red</strong> book
      </a>
      <ul className="icons">
        {user ? (
          <Gate status="logged">
            <li>
              <span className="label">Hello, {user.name}</span>
            </li>
            <li>
              <button className="link">
                <Logout />
              </button>
            </li>
          </Gate>
        ) : (
          <Gate status="not-logged">
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
          </Gate>
        )}
        <Gate status="role" role={["admin"]}>
          <li>
            <a href={l.SITE_DASHBOARD}>
              <span className="label">ADMIN </span>
            </a>
          </li>
        </Gate>
      </ul>
    </header>
  );
};
export default Header;
