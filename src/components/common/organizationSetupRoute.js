import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import CreateOrganization from "../../pages/organization/createOrganization";

function OrganizationSetupRoute({...rest}) {
  const orgExists = useSelector(state => state.org.get.org.exists);
  if (orgExists === undefined) {
    return null;
  }
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        orgExists ? (
          <Redirect to="/" />
        ) : (
          <CreateOrganization {...routeProps} />
        )
      }
    />
  );
}

export default OrganizationSetupRoute;
