import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import CreateOrganization from "../../pages/organization/createOrganization";
import { getOrg } from "../../reducers/orgSlice";

function OrganizationSetupRoute({...rest}) {
  const dispatch = useDispatch();
  const orgExists = useSelector(state => state.org.get.org);
  if(Object.keys(orgExists).length == 0) {
    dispatch(getOrg());
    return null;
  }
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        orgExists.exists ? (
          <Redirect to="/" />
        ) : (
          <CreateOrganization {...routeProps} />
        )
      }
    />
  );
}

export default OrganizationSetupRoute;
  
