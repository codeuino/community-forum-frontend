import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import "./signupform.scss";
import { MdBorderAll } from "react-icons/md";

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      isLogin: true,
      email: "",
      password: "",
      passwordVerify: "",
    };
  }

  handleChange = (params, event) => {
    event.preventDefault();
    switch (params) {
      case "email":
        this.setState({ email: event.target.value });
        break;
      case "password":
        this.setState({ password: event.target.value });
        break;
      case "passwordVerify":
        this.setState({ passwordVerify: event.target.value });
        break;
      case "username":
        this.setState({ username: event.target.value });
        break;
    }
    // if (params === "email") {
    //   this.setState({ email: event.target.value });
    // } else if (params === "password") {
    //   this.setState({ password: event.target.value });
    // } else if (params === "passwordVerify") {
    //   this.setState({ passwordVerify: event.target.value });
    // } else if (params === "username") {
    //   this.setState({ username: event.target.value });
    // }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.password !== this.state.passwordVerify) {
      alert("Password does not match with Re-Entered Password!");
      return;
    } else {
      console.log(this.state.username);
      let requestBody = {
        query: `
          mutation {
            createUser(userInput:{
              email:"${this.state.email}",
              password:"${this.state.password}",
              username: "${this.state.username}"
            }) {
              _id
              email
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
          console.log(resData);
          this.props.handleClose();
        })
        .catch((err) => {
          throw new Error(err);
        });
    }
  };

  render() {
    return (
      <div className="signup-details">
        <Form onSubmit={this.handleSubmit}>
          <div className="formdetails">
            <div className="forminsides">
              <Form.Group controlId="text">
                <Form.Label>UserName</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="username"
                  onChange={(e) => {
                    this.handleChange("username", e);
                  }}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="abc@gmail.com"
                  onChange={(e) => {
                    this.handleChange("email", e);
                  }}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="***********"
                  onChange={(e) => {
                    this.handleChange("password", e);
                  }}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Re-Type Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="***********"
                  onChange={(e) => {
                    this.handleChange("passwordVerify", e);
                  }}
                />
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
