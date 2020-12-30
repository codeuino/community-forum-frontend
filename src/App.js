import React from "react";
import Router from "./router";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./reducers/authSlice";
import { getOrg } from "./reducers/orgSlice";

function App() {
  const dispatch = useDispatch();
  dispatch(getCurrentUser());
  dispatch(getOrg());
  return (
    <React.Fragment>
      <Router />
    </React.Fragment>
  );
}

export default App;
