import React, { useContext } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import "react-notifications/lib/notifications.css";
import Login from "./components/Login/Login";
import Main from "./components/Main";
import { AuthProvider, AuthContext } from "./AuthContext";
import { auth } from "./services/firebase";
import { getCurrentUser } from "./services/authService";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/login" exact component={Login} />
          <Route component={Main} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
