import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Login from "./layouts/login";
import Main from "./layouts/main";
import Users from "./layouts/users";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "../hooks/useProfession";
import { QualitiesProvider } from "../hooks/useQuality";
import AuthProvider from "../hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";

function App() {
  return (
    <div>
      <AuthProvider>
        <NavBar />
        <QualitiesProvider>
          <ProfessionProvider>
            <Switch>
              <ProtectedRoute path="/users/:userId?/:edit?" component={Users} />
              <Route path="/login/:type?" component={Login} />
              <Route path="/logout" component={LogOut} />
              <Route path="/" exact component={Main} />
              <Redirect to="/" />
            </Switch>
          </ProfessionProvider>
        </QualitiesProvider>
      </AuthProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
