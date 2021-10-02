import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContextComponent } from "../src/contexts/authContext";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRouter/PrivateRouter";

import { Login } from "./Component/Login";
import { NavBar } from "./Component/NavBar";
import { Profile } from "./Component/Profile";
import { Test } from "./Component/Test";

function App() {
  const storedUser = localStorage.getItem("loggedInUser");

  const loggedInUser = JSON.parse(storedUser || '""');

  return (
    <BrowserRouter>
    <NavBar />
      <AuthContextComponent>
        <Switch>
        <PrivateRoute exact path="/" component={NavBar} />
        <PrivateRoute exact path="/profile" component={Profile} />
          {loggedInUser.token ? (
            <Route exact path="/" component={Test} />
          ) : (
            <Route exact path="/login" component={Login} />
          )}
        </Switch>
      </AuthContextComponent>
    </BrowserRouter>
  );
}

export default App;
