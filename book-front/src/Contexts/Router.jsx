import { createContext, useCallback, useEffect, useState } from "react";
import Page404 from "../Components/Common/Page404";
import Home from "../Components/Web/Home";
import Web from "../Components/Web/Parts/Layout";
import Admin from "../Components/Admin/Parts/Layout";
import Register from "../Components/Common/Register";
import Login from "../Components/Common/Login";
import Dashboard from "../Components/Admin/Dashboard";
import UsersList from "../Components/Admin/UsersList";

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

  const Cat = () => {
    return (
      <>
        <h1>Cat page</h1>
        <div>
          <a href="/#cat">Cat</a>
          <a href="/#dog">Dog</a>
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
          <a href="/#cat">Cat</a>
          <a href="/#dog">Dog</a>
          <a href="/#">Home</a>
        </div>
      </>
    );
  };

  const routes = [
    { path: "", pc: 0, component: null },
    {
      path: "#",
      pc: 0,
      component: (
        <Web>
          <Home />
        </Web>
      ),
    },
    {
      path: "#cat",
      pc: 0,
      component: (
        <Web>
          <Cat />
        </Web>
      ),
    },
    {
      path: "#dog",
      pc: 0,
      component: (
        <Web>
          <Dog />
        </Web>
      ),
    },
    {
      path: "#register",
      pc: 0,
      component: <Register />,
    },
    {
      path: "#login",
      pc: 0,
      component: <Login />,
    },
    {
      path: "#dashboard",
      pc: 0,
      component: (
        <Admin>
          <Dashboard />
        </Admin>
      ),
    },
    {
      path: "#userslist",
      pc: 0,
      component: (
        <Admin>
          <UsersList />
        </Admin>
      ),
    },
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
