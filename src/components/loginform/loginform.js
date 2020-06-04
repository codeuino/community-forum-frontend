import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import "./loginform.scss";

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

  render() {
    return (
      <div className="login-details">
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label><div className='formLabel'>Email address</div></Form.Label>
            <Form.Control type="email" placeholder="abc@gmail.com" />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label><div className="formLabel">Password</div></Form.Label>
            <Form.Control type="password" placeholder="***********" />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember Me"/>
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
