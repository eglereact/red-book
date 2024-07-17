import { createContext, useCallback, useEffect, useState } from "react";
import Page404 from "../Components/Common/Page404";
import Home from "../Components/Web/Home";
import Web from "../Components/Web/Parts/Layout";
import Admin from "../Components/Admin/Parts/Layout";
import Register from "../Components/Common/Register";
import Login from "../Components/Common/Login";
import Dashboard from "../Components/Admin/Dashboard";
import UsersList from "../Components/Admin/UsersList";
import * as l from "../Constants/urls";
import UserEdit from "../Components/Admin/UserEdit";

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
      path: l.SITE_HOME,
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
      path: l.SITE_REGISTER,
      pc: 0,
      component: <Register />,
    },
    {
      path: l.SITE_LOGIN,
      pc: 0,
      component: <Login />,
    },
    {
      path: l.SITE_DASHBOARD,
      pc: 1,
      p1: "dashboard",
      component: (
        <Admin>
          <Dashboard />
        </Admin>
      ),
    },
    {
      path: l.USERS_LIST,
      pc: 1,
      p1: "users",
      component: (
        <Admin>
          <UsersList />
        </Admin>
      ),
    },
    {
      path: l.USER_EDIT,
      pc: 2,
      p1: "user-edit",
      component: (
        <Admin>
          <UserEdit />
        </Admin>
      ),
    },
  ];

  const findRoute = (_) => {
    return routes.find((r) => {
      const realPath = r.path.split("/");
      if (realPath.length === 1) {
        return realPath[0] === route && r.pc === params.length;
      }
      if (realPath.length === 2) {
        return (
          realPath[0] === route && r.pc === params.length && r.p1 === params[0]
        );
      }
      return false;
    });
  };

  const routeComponent = findRoute()?.component ?? <Page404 />;

  return (
    <RouterContext.Provider value={{ params }}>
      {routeComponent}
    </RouterContext.Provider>
  );
};

export { RouterContext, Router };
