import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Login from "./layouts/login";
import Main from "./layouts/main";
import Users from "./layouts/users";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "../hooks/useProfession";
import { QualitiesProvider } from "../hooks/useQuality";

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Main} />
        <QualitiesProvider>
          <ProfessionProvider>
            <Route path="/login/:type?" component={Login} />
            <Route path="/users/:userId?/:edit?" component={Users} />
          </ProfessionProvider>
        </QualitiesProvider>
        <Redirect to="/" />
      </Switch>
      <ToastContainer />
    </div>
  );
}

export default App;
