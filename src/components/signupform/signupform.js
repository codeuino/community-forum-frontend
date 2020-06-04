import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import "./signupform.scss";

class SignUpForm extends Component {
  render() {
    return (
      <div className="signup-details">
        <Form>
          <div className="formdetails">
            <div className="forminsides">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="abc@gmail.com" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="***********" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Re-Type Password</Form.Label>
              <Form.Control type="password" placeholder="***********" />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Org Description</Form.Label>
              <Form.Control as="textarea" rows="3" />
            </Form.Group>
            </div>
          </div>
          <div className="cta-register">
            <Button variant="primary" type="submit">
              Register
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default SignUpForm;
