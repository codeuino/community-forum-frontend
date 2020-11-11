import React from "react";
import Router from "./router";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./reducers/authSlice";

function App() {
  const dispatch = useDispatch();
  dispatch(getCurrentUser());
  return (
    <React.Fragment>
      <Router />
    </React.Fragment>
  );
}

export default App;
