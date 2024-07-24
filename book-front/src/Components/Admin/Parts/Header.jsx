import { useContext } from "react";
import Logout from "../../Common/Logout";
import { AuthContext } from "../../../Contexts/Auth";
import Gate from "../../Common/Gate";
import * as l from "../../../Constants/urls";

export default function Header() {
  const { user } = useContext(AuthContext);

  return (
    <header id="header">
      <a href="index.html" className="logo">
        <strong>Admin</strong>
      </a>
      <ul className="icons">
        <li>Hello, {user?.name}</li>

        <Gate status="logged">
          <li>
            <Logout />
          </li>
        </Gate>
        <li>
          <a href={l.SITE_HOME}>
            <span className="label">HOME</span>
          </a>
        </li>
      </ul>
    </header>
  );
}
