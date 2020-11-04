import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard"
import CreateOrganization from "./pages/createOrganization/createOrganization";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route path="/setup" component={CreateOrganization} />
    </Switch>
  </BrowserRouter>
);

export default Router;
