import { useEffect, useState, useContext } from "react";
import useServerGet from "../../Hooks/useServerGet";
import * as l from "../../Constants/urls";
import { RouterContext } from "../../Contexts/Router";

export default function Post() {
  const { params } = useContext(RouterContext);
  const [post, setPost] = useState(null);
  const { doAction: doGetPost, serverResponse: serverGetPostResponse } =
    useServerGet(l.GET_POST);

  useEffect(() => {
    doGetPost("/" + params[0]);
  }, [doGetPost, params]);

  useEffect(() => {
    if (null === serverGetPostResponse) {
      return;
    }
    if (serverGetPostResponse.type === "success") {
      setPost(serverGetPostResponse.serverData.post);
    }
  }, [serverGetPostResponse]);

  return (
    <section>
      {post === null ? (
        <p>Loading...</p>
      ) : (
        <>
          <header className="main">
            <h1>{post.title}</h1>
          </header>
          <span className="image main">
            {post.photo === null ? (
              <img src={l.SERVER_IMAGES_URL + "noimage.jpg"} alt="no photo" />
            ) : (
              <img src={l.SERVER_IMAGES_URL + post.photo} alt={post.title} />
            )}
          </span>
          <p>{post.preview}</p>
          <hr className="major" />
          <div>{post.content}</div>
        </>
      )}
    </section>
  );
}
