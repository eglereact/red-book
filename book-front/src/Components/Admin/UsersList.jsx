import { useEffect, useState } from "react";
import * as l from "../../Constants/urls";
import useServerGet from "../../Hooks/useServerGet";

export default function UsersList() {
  const { doAction, serverResponse } = useServerGet(l.SERVER_GET_USERS);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    doAction();
  }, [doAction]);

  useEffect(() => {
    if (null === serverResponse) {
      return;
    }
    setUsers(serverResponse.serverData.users ?? null);
  }, [serverResponse]);

  return (
    <>
      <section id="banner">
        <div className="content">
          <header>
            <h1>Users List</h1>
          </header>
        </div>
      </section>
      <section>
        {users === null ? (
          <h2>Loading...</h2>
        ) : (
          <div className="table-wrapper">
            <table className="alt">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td className="smaller">
                      <ul className="actions">
                        <li>
                          <input
                            type="button"
                            value="Delete"
                            className="small"
                          />
                        </li>
                        <li>
                          <input type="button" value="Edit" className="small" />
                        </li>
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="2"></td>
                  <td>Total users: {users.length} </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
