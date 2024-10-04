import { useEffect, useState, useContext, useCallback, useRef } from "react";
import useServerGet from "../../Hooks/useServerGet";
import useServerDelete from "../../Hooks/useServerDelete";
import useServerPut from "../../Hooks/useServerPut";
import { ModalsContext } from "../../Contexts/Modals";
import { LoaderContext } from "../../Contexts/Loader";
import * as l from "../../Constants/urls";

export default function PostsList() {
  const { doAction: doGet, serverResponse: serverGetResponse } = useServerGet(
    l.SERVER_GET_POSTS
  );
  const { doAction: doDelete, serverResponse: serverDeleteResponse } =
    useServerDelete(l.SERVER_DELETE_POST);
  const { doAction: doPut, serverResponse: serverPutResponse } = useServerPut(
    l.SERVER_CHANGE_POST_TOP
  );

  const { setDeleteModal } = useContext(ModalsContext);
  const [posts, setPosts] = useState(null);
  const { setShow } = useContext(LoaderContext);

  const oldTopId = useRef(null);

  const hidePost = (post) => {
    setPosts((p) =>
      p.map((p) => (p.id === post.id ? { ...p, hidden: true } : p))
    );
  };

  const showPost = useCallback(() => {
    setPosts((p) =>
      p.map((p) => {
        delete p.hidden;
        return p;
      })
    );
  }, []);

  const removeHidden = useCallback(() => {
    setPosts((p) => p.filter((p) => !p.hidden));
  }, []);

  useEffect(() => {
    doGet();
  }, [doGet]);

  useEffect(() => {
    if (null === serverGetResponse) {
      return;
    }
    setPosts(serverGetResponse.serverData.posts ?? null);
    oldTopId.current =
      serverGetResponse.serverData.posts.find((p) => p.is_top === 1)?.id ??
      null;
  }, [serverGetResponse]);

  useEffect(() => {
    if (null === serverDeleteResponse) {
      return;
    }
    if (serverDeleteResponse.type === "error") {
      showPost();
    } else {
      removeHidden();
    }
  }, [serverDeleteResponse, showPost, removeHidden]);

  useEffect(() => {
    if (null === serverPutResponse) {
      return;
    }
    if (serverPutResponse.type === "error") {
      setPosts((p) =>
        p.map((p) =>
          p.id === oldTopId.current ? { ...p, is_top: 1 } : { ...p, is_top: 0 }
        )
      );
    } else {
      oldTopId.current = serverPutResponse?.serverData?.newId;
    }
  }, [serverPutResponse, oldTopId]);

  const makeTop = (post) => {
    setPosts((p) =>
      p.map((p) =>
        p.id === post.id ? { ...p, is_top: 1 } : { ...p, is_top: 0 }
      )
    );
    setShow(true);
    doPut({ id: post.id });
  };

  return (
    <>
      <section id="banner">
        <div className="content">
          <header>
            <h1>Posts List</h1>
          </header>
        </div>
      </section>
      <section>
        {posts === null && <h3>Wait, sending post list...</h3>}
        {posts !== null && (
          <div className="table-wrapper">
            <table className="alt">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Photo</th>
                  <th>Main</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((p) =>
                  p.hidden ? null : (
                    <tr key={p.id}>
                      <td>{p.title}</td>
                      <td>
                        {p.photo === null ? (
                          <img
                            style={{ height: "70px", width: "auto" }}
                            src={l.SERVER_IMAGES_URL + "noimage.jpg"}
                            alt="no photo"
                          />
                        ) : (
                          <img
                            style={{ height: "70px", width: "auto" }}
                            src={l.SERVER_IMAGES_URL + p.photo}
                            alt={p.name}
                          />
                        )}
                      </td>
                      <td>
                        {p.is_top ? (
                          <b>Main</b>
                        ) : (
                          <input
                            type="button"
                            className="small"
                            value="Make main"
                            onClick={() => makeTop(p)}
                          />
                        )}
                      </td>
                      <td className="two">
                        <ul className="actions special">
                          <li>
                            <a
                              href={l.POST_EDIT + "/" + p.id}
                              className="button small"
                            >
                              edit
                            </a>
                          </li>
                          <li>
                            <input
                              onClick={(_) =>
                                setDeleteModal({
                                  data: p,
                                  doDelete,
                                  hideData: hidePost,
                                })
                              }
                              type="button"
                              value="delete"
                              className="small"
                            />
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
                  <td>All post: {posts.filter((p) => !p.hidden).length}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
