import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard";
import OrganizationSetupRoute from "./components/common/organizationSetupRoute";
import CategoryDetailsPage from "./pages/category/categoryDetailPage";
import UserProfilePage from "./pages/user/userProfilePage";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/category/:id" component={CategoryDetailsPage} />
      <Route exact path="/profile/:id" component={UserProfilePage} />
      <OrganizationSetupRoute path="/setup" />
    </Switch>
  </BrowserRouter>
);

export default Router;
