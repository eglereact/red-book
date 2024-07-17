import { useCallback, useContext, useEffect, useState } from "react";
import * as l from "../../Constants/urls";
import useServerGet from "../../Hooks/useServerGet";
import useServerDelete from "../../Hooks/useServerDelete";
import { ModalsContext } from "../../Contexts/Modals";

export default function UsersList() {
  const { doAction: doGet, serverResponse: serverGetResponse } = useServerGet(
    l.SERVER_GET_USERS
  );
  const { doAction: doDelete, serverResponse: serverDeleteResponse } =
    useServerDelete(l.SERVER_DELETE_USER);
  const { setDeleteModal } = useContext(ModalsContext);
  const [users, setUsers] = useState(null);

  const hideUser = (user) => {
    setUsers((us) =>
      us.map((u) => (u.id === user.id ? { ...u, hidden: true } : u))
    );
  };

  const showUser = useCallback(() => {
    setUsers((us) =>
      us.map((u) => {
        delete u.hidden;
        return u;
      })
    );
  }, []);

  const removeHidden = useCallback(() => {
    setUsers((u) => u.filter((u) => !u.hidden));
  }, []);

  useEffect(() => {
    doGet();
  }, [doGet]);

  useEffect(() => {
    if (null === serverGetResponse) {
      return;
    }
    setUsers(serverGetResponse.serverData.users ?? null);
  }, [serverGetResponse]);

  useEffect(() => {
    if (null === serverDeleteResponse) {
      return;
    }
    if (serverDeleteResponse.type === "error") {
      showUser();
    } else {
      removeHidden();
    }
  }, [serverDeleteResponse, showUser, removeHidden]);

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
                {users.map((user) =>
                  user.hidden ? null : (
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
                              onClick={() =>
                                setDeleteModal({
                                  data: user,
                                  doDelete,
                                  hideData: hideUser,
                                })
                              }
                            />
                          </li>
                          <li>
                            <a
                              href={l.USER_EDIT + "/" + user.id}
                              type="button"
                              className="small"
                            >
                              Edit
                            </a>
                          </li>
                        </ul>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="2"></td>
                  <td>Total users: {users.filter((u) => !u.hidden).length} </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
