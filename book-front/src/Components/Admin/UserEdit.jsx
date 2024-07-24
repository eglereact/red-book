import { useContext, useEffect, useState } from "react";
import { RouterContext } from "../../Contexts/Router";
import useServerGet from "../../Hooks/useServerGet";
import useServerPut from "../../Hooks/useServerPut";
import * as l from "../../Constants/urls";
import Input from "../Forms/Input";
import Select from "../Forms/Select";
import roles from "../../Constants/roles";
import { LoaderContext } from "../../Contexts/Loader";

export default function UserEdit() {
  const { params } = useContext(RouterContext);
  const { doAction: doGet, serverResponse: serverGetResponse } = useServerGet(
    l.SERVER_EDIT_USER
  );
  const { doAction: doPut, serverResponse: serverPutResponse } = useServerPut(
    l.SERVER_UPDATE_USER
  );
  const { setShow } = useContext(LoaderContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    doGet("/" + params[1]);
  }, [doGet, params]);

  useEffect(() => {
    if (null === serverGetResponse) {
      return;
    }
    setUser(serverGetResponse.serverData.user ?? null);
  }, [serverGetResponse]);

  useEffect(() => {
    if (null === serverPutResponse) {
      return;
    }
    if ("success" === serverPutResponse.type) {
      window.location.hash = l.USERS_LIST;
    }
  }, [serverPutResponse]);

  const handleForm = (e) => {
    setUser((u) => ({ ...u, [e.target.name]: e.target.value }));
  };

  const submit = () => {
    //TODO Validation
    setShow(true);
    doPut(user);
  };

  return (
    <>
      <section id="banner">
        <div className="content">
          <header>
            <h1>Edit user</h1>
          </header>
        </div>
      </section>
      <section>
        {null === user && <h3>Loading...</h3>}
        {null !== user && (
          <div className="row aln-center">
            <div className="col-6 col-8-large col-10-medium col-12-small">
              <form>
                <div className="row gtr-uniform">
                  <div className="col-12">
                    <Input
                      onChange={handleForm}
                      value={user.name}
                      type="text"
                      name="name"
                    />
                  </div>
                  <div className="col-12">
                    <Input
                      onChange={handleForm}
                      value={user.email}
                      type="text"
                      name="email"
                    />
                  </div>
                  <div className="col-12">
                    <Select
                      onChange={handleForm}
                      value={user.role}
                      name="role"
                      options={roles}
                    />
                  </div>
                  <div className="col-12">
                    <Input
                      onChange={handleForm}
                      value={user.password}
                      type="password"
                      name="password"
                      placeholder="Change password"
                    />
                  </div>

                  <div className="col-12">
                    <ul className="actions">
                      <li>
                        <input
                          onClick={submit}
                          type="button"
                          value="Save"
                          className="primary"
                        />
                      </li>
                      <li>
                        <a className="button" href={"/" + l.USERS_LIST}>
                          All users
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
