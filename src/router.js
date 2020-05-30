import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import loginpage from "./loginpage/loginpage"

const Router = () => (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={loginpage} />
      </Switch>
    </BrowserRouter>
  );
  
  export default Router;
  
