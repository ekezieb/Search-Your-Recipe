import React, { useState, useEffect } from "react";
import "./App.css";

import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";

import HomePage from "./pages/HomePage.js";
import CreatePage from "./pages/CreatePage.js";
import SignupPage from "./pages/SignupPage.js";
import NavigationComponent from "./components/NavigationComponent.js";
import Toogle from "./components/Toogle.js";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const res = await (await fetch("/getUser")).json();

      console.log("Got user", res.user);
      setUser(res.user);
    };
    console.log("Checking user");
    checkUser();
  }, []);
  return (
    <Router>
      <NavigationComponent username={user}></NavigationComponent>
      <Switch>
        <Route path="/create" exact>
          {user ? <CreatePage username={user} /> : <HomePage />}
        </Route>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/signup" exact>
          {!user ? <SignupPage /> : <HomePage />}
        </Route>
      </Switch>
      <Toogle></Toogle>
    </Router>
  );
}

export default App;
