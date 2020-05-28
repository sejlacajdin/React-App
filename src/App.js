import React from 'react';
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";

import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import './App.css';

function App() {
  return (
      <div>
        <Switch>
          <Route path="/login" component={Login} />
          <ProtectedRoute path="/dashboard" component={Dashboard} />
          <Route path="*" render={() => <Redirect to="/login" />} />
        </Switch>
      </div>

  );
}

export default App;
