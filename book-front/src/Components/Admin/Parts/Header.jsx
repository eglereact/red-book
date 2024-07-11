export default function Header() {
  return (
    <header id="header">
      <a href="index.html" className="logo">
        <strong>Admin</strong>
      </a>
      <ul className="icons">
        <li>
          <a href="#logout">
            <span className="label">Logout</span>
          </a>
        </li>
      </ul>
    </header>
  );
}
