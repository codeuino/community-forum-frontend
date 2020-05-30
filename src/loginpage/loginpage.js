import React, { Component } from "react";
import { Tab, Tabs } from "react-bootstrap";
import "./loginpage.scss";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Card, CardContent } from "@material-ui/core";

class LoginPage extends Component {
  render() {
    return (
      <div className="login-page">
        <div className="welcome-text">
          <p className="heading">
            Welcome To <br></br> C-Forms
          </p>
          <p className="text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
        <div className="user-details">
          <Card>
            <CardContent>
                <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                  <Tab eventKey="home" title="Login">
                    <p>Login</p>
                    {/* <LoginForm /> */}
                  </Tab>
                  <Tab eventKey="profile" title="Sign Up">
                    {/* <SignUpForm /> */}
                    <p>SignUp</p>
                  </Tab>
                </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

export default LoginPage;
