import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard";
import OrganizationSetupRoute from "./components/common/organizationSetupRoute";
import AdminRoute from "./components/common/adminRoute";
import CategoryDetailsPage from "./pages/category/categoryDetailPage";
import UserProfilePage from "./pages/user/userProfilePage";
import TagSearchPage from "./pages/tag/tagSearchPage";
import MaintenancePage from "./pages/common/maintenancePage";
import AdminPage from "./pages/admin/adminPage";
import DiscussionPage from "./pages/discussion/discussionPage";

const Router = () => {
  const token = useSelector((state) => state.auth.currentUser.token);
  const isAdmin = useSelector((state) => state.auth.currentUser.isAdmin);
  const isUnderMaintenance = useSelector((state) => state.org.get.org.isUnderMaintenance);
  if ((token !== null && isAdmin === undefined) || isUnderMaintenance === undefined) {
    return null;
  } else if (!isAdmin && isUnderMaintenance) {
    return (
      <BrowserRouter>
        <Route path="/" component={MaintenancePage} />
      </BrowserRouter>
    )
  } else {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/category/:id" component={CategoryDetailsPage} />
          <Route exact path="/category/:categoryId/topic/:id" component={DiscussionPage} />
          <Route exact path="/profile/:id" component={UserProfilePage} />
          <Route exact path="/tag/:id" component={TagSearchPage} />
          <AdminRoute exact path="/admin" component={AdminPage} />
          <OrganizationSetupRoute path="/setup" />
        </Switch>
      </BrowserRouter>
    );
  }
};

export default Router;
