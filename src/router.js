import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard";
import OrganizationSetupRoute from "./components/common/organizationSetupRoute";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={ Dashboard } />
      <OrganizationSetupRoute path="/setup" />
    </Switch>
  </BrowserRouter>
);

export default Router;
