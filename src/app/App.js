import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/navBar";
import Login from "./layouts/login";
import Main from "./layouts/main";
import Users from "./layouts/users";
// import Users from "./components/users";

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/users" component={Users} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
