import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard"
import Discussion from "./pages/discussion/discussion"

const Router = () => (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/discussion" component={Discussion} />
      </Switch>
    </BrowserRouter>
  );
  
  export default Router;
  
