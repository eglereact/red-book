import { createContext, useCallback, useEffect, useState } from "react";
import Page404 from "../Components/Common/Page404";

const RouterContext = createContext([]);

const Router = ({ children }) => {
  const [route, setRoute] = useState("");
  const [params, setParams] = useState([]);

  const handleHashChange = useCallback(() => {
    const hash = window.location.hash.split("/");
    hash[0] || (hash[0] = "#");
    setRoute(hash.shift());
    setParams(hash);
  }, [setRoute, setParams]);

  useEffect(() => {
    const hash = window.location.hash.split("/");
    hash[0] || (hash[0] = "#");
    setRoute(hash.shift());
    setParams(hash);

    window.addEventListener("hashchange", handleHashChange);

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [handleHashChange]);

  const Home = () => {
    return (
      <>
        <h1>Home page</h1>
        <div>
          <a href="/#cat/1">Cat</a>
          <a href="/#dog/1">Dog</a>
          <a href="/#">Home</a>
        </div>
      </>
    );
  };

  const Cat = () => {
    return (
      <>
        <h1>Cat page</h1>
        <div>
          <a href="/#cat/1">Cat</a>
          <a href="/#dog/1">Dog</a>
          <a href="/#">Home</a>
        </div>
      </>
    );
  };

  const Dog = () => {
    return (
      <>
        <h1>Dog page</h1>
        <div>
          <a href="/#cat/1">Cat</a>
          <a href="/#dog/1">Dog</a>
          <a href="/#">Home</a>
        </div>
      </>
    );
  };

  const routes = [
    { path: "", pc: 0, component: null },
    { path: "#", pc: 0, component: <Home /> },
    { path: "#cat", pc: 1, component: <Cat /> },
    { path: "#dog", pc: 1, component: <Dog /> },
  ];

  const routeComponent = routes.find(
    (r) => r.path === route && r.pc === params.length
  )?.component ?? <Page404 />;

  return (
    <RouterContext.Provider value={params}>
      {routeComponent}
    </RouterContext.Provider>
  );
};

export { RouterContext, Router };
