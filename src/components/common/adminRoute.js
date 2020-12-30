import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

function AdminRoute({component: Component, ...rest}) {
  const token = useSelector((state) => state.auth.currentUser.token);
  const isAdmin = useSelector(state => state.auth.currentUser.isAdmin);
  if (token === null || isAdmin === false) {
    return <Redirect to="/" />;
  } else if (token !== null && isAdmin === undefined) {
    return null;
  } else if (token !== null && isAdmin) {
    return (
      <Route
      {...rest}
      render={routeProps => (
        <Component {...routeProps} />
      )}
    />
    );
  }
}

export default AdminRoute;
