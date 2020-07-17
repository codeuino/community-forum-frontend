import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import "./loginform.scss";
import Login from "../../utils/login";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleChange = (event, params) => {
    event.preventDefault();
    params === "email"
      ? this.setState({ email: event.target.value })
      : this.setState({ password: event.target.value });
  };

  checkValidation = () => {
    if (this.state.email.includes("@") && this.state.email.includes(".")) {
      return true;
    }
    return false;
  };
  onSubmit = (e) => {
    e.preventDefault();
    let requestBody = {
      query: `
        query {
          login(email: "${this.state.email}", password: "${this.state.password}") {
            userId
            token
            tokenexpiration
            username
          }
        }
      `,
    };
    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed");
        }
        return res.json();
      })
      .then((resData) => {
        Login(
          resData.data.login.token,
          resData.data.login.tokenexpiration,
          resData.data.login.userId,
          resData.data.login.username
        );
        console.log(resData)
        this.props.handleLogin();
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  render() {
    return (
      <div className="login-details">
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>
              <div className="formLabel">Email address</div>
            </Form.Label>
            <Form.Control
              onChange={(e) => this.handleChange(e, "email")}
              type="email"
              placeholder="abc@gmail.com"
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>
              <div className="formLabel">Password</div>
            </Form.Label>
            <Form.Control
              onChange={(e) => this.handleChange(e, "password")}
              type="password"
              placeholder="***********"
            />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember Me" />
          </Form.Group>
          <div className="cta-register">
            <Button variant="primary" type="submit">
              Login
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default LoginForm;
