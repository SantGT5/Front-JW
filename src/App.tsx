import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContextComponent } from "../src/contexts/authContext";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Login } from "./Component/Login";
import { NavBar } from "./Component/NavBar"

function App() {
  return (
    <BrowserRouter>
    <AuthContextComponent>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/home" component={NavBar}/>
      </Switch>
      </AuthContextComponent>
    </BrowserRouter>
  );
}

export default App;
