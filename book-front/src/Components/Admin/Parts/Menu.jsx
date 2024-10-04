import * as l from "../../../Constants/urls";

export default function Menu() {
  return (
    <nav id="menu">
      <header className="major">
        <h2>Menu</h2>
      </header>
      <ul>
        <li>
          <a href={"/" + l.SITE_DASHBOARD}>Dashboard</a>
        </li>
        <li>
          <a href={"/" + l.USERS_LIST}>Users</a>
        </li>
        <li>
          <a href={"/" + l.EDIT_CONTACTS}>Contacts edit</a>
        </li>
        <li>
          <a href={"/" + l.POSTS_LIST}>Posts</a>
        </li>
        <li>
          <a href={"/" + l.POST_ADD}>New Post</a>
        </li>
      </ul>
    </nav>
  );
}
