import "antd/dist/antd.css";
import React, { useLayoutEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import Checkout from "./components/Checkout";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Search from "./components/Search";
import Thanks from "./components/Thanks";
import ipConfig from "./ipConfig.json";

export const config = {
  endpoint: `http://${ipConfig.workspaceIp}:8082/api/v1`,
};

export default function App(props) {
  const location = useLocation();
  // Scroll to top if path changes
  useLayoutEffect(() => {
    window && window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="App">
        {/* TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - To add route for /register */}
      <Switch>
        {/* TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - To add route for /login */}

        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        {/* CRIO_SOLUTION_END_MODULE_UNDERSTANDING_BASICS */}
        <Route path="/products">
          <Search />
        </Route>
        <Route path="/checkout">
          <Checkout />
        </Route>

        <Route path="/thanks">
          <Thanks />
        </Route>

        {/* TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - To add route for /login */}

        <Route path="/">
          <Home />
        </Route>

      </Switch>
    </div>
  );
}
