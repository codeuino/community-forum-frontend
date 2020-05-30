import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Router from "./router";

function App() {
  return (
    <React.Fragment>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossorigin="anonymous"
      />
      <Router />
    </React.Fragment>
  );
}

export default App;
