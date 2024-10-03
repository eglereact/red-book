import { useEffect, useState } from "react";
import useServerGet from "../../Hooks/useServerGet";
import * as l from "../../Constants/urls";

export default function Home() {
  const [types, setTypes] = useState(null);
  const [posts, setPosts] = useState(null);
  const { doAction: doGetTypes, serverResponse: serverGetTypesResponse } =
    useServerGet(l.GET_TYPES);
  const { doAction: doGetPosts, serverResponse: serverGetPostsResponse } =
    useServerGet(l.GET_POSTS);

  useEffect(() => {
    doGetTypes();
    doGetPosts();
  }, [doGetTypes, doGetPosts]);

  useEffect(() => {
    if (null === serverGetTypesResponse) {
      return;
    }
    if (serverGetTypesResponse.type === "success") {
      setTypes(serverGetTypesResponse.serverData.types);
    }
  }, [serverGetTypesResponse]);

  useEffect(() => {
    if (null === serverGetPostsResponse) {
      return;
    }
    if (serverGetPostsResponse.type === "success") {
      setPosts(serverGetPostsResponse.serverData.posts);
    }
  }, [serverGetPostsResponse]);

  const topPost = posts === null ? null : posts.find((p) => p.is_top === 1);

  const allPosts = posts === null ? [] : posts.filter((p) => p.is_top === 0);

  return (
    <>
      <section id="banner">
        {topPost === null ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="content">
              <header>
                <h1>{topPost.title}</h1>
              </header>
              <p>{topPost.preview}</p>
              <ul className="actions">
                <li>
                  <a
                    href={l.SITE_POST + "/" + topPost.id}
                    className="button big"
                  >
                    Read more
                  </a>
                </li>
              </ul>
            </div>
            <span className="image object">
              {topPost.photo === null ? (
                <img
                  src={l.SERVER_IMAGES_URL + "no-image.png"}
                  alt="no image"
                />
              ) : (
                <img
                  src={l.SERVER_IMAGES_URL + topPost.photo}
                  alt={topPost.title}
                />
              )}
            </span>
          </>
        )}
      </section>

      <section>
        <header className="major">
          <h2>Erat lacinia</h2>
        </header>
        <div className="features">
          {types === null ? (
            <p>Loading...</p>
          ) : (
            types.map((t) => (
              <article key={t.id}>
                <span className={"icon " + t.icon}></span>
                <div className="content">
                  <h3>{t.title}</h3>
                  <p>{t.description}</p>
                </div>
              </article>
            ))
          )}
        </div>
      </section>

      <section>
        <header className="major">
          <h2>Ipsum sed dolor</h2>
        </header>
        <div className="posts">
          {allPosts === null ? (
            <p>Loading...</p>
          ) : (
            allPosts.map((p) => (
              <article key={p.id}>
                <a href={l.SITE_POST + "/" + p.id} className="image">
                  {p.photo === null ? (
                    <img
                      src={l.SERVER_IMAGES_URL + "no-image.png"}
                      alt="no photo"
                    />
                  ) : (
                    <img src={l.SERVER_IMAGES_URL + p.photo} alt={p.title} />
                  )}
                </a>
                <h3>{p.title}</h3>
                <p>{p.preview}</p>
                <ul className="actions">
                  <li>
                    <a href={l.SITE_POST + "/" + p.id} className="button">
                      More
                    </a>
                  </li>
                </ul>
              </article>
            ))
          )}
        </div>
      </section>
    </>
  );
}
