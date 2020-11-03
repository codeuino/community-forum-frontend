import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from 'react-redux';
import { login } from '../../reducers/authSlice';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      emailError: "",
      password: "",
      passwordError: "",
      isFormInvalid: true,
      formSubmissionError: "",
    }
  }

  onFieldChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      this.checkFieldValidation(name);
    });
  }

  checkFieldValidation = (field) => {
    switch (field) {
      case "email": {
        if (
          this.state.email.length < 255 &&
          this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
        ) {
          this.setState({
            emailError: null,
          });
        } else {
          this.setState({
            emailError: "Please enter a valid email address",
          });
        }
        break;
      }
      case "password": {
        if(this.state.password.length < 6) {
          this.setState({
            passwordError: "Your password should be atleast 6 characters long",
          });
        } else {
          this.setState({
            passwordError: null,
          });
        }
        break;
      }
    }
    return;
  };

  onFormSubmit = e => {
    e.preventDefault();
    this.props.login(this.state.email, this.state.password);
  };
  
  componentDidUpdate() {
    if(this.state.isFormInvalid != false) {
      if (this.state.emailError === null && this.state.passwordError === null) {
        this.setState({ isFormInvalid: false });
      }
    } else {
      if (this.state.emailError !== null || this.state.passwordError !== null)
        this.setState({ isFormInvalid: true });
    }
  }

  render() {
    this.state.formSubmissionError = this.props.error;
    return (
      <div className="login-form">
        {this.state.formSubmissionError && (
          <div className="alert alert-danger" role="alert">
            {this.state.formSubmissionError}
          </div>
        )}
        <Form onSubmit={this.onFormSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>
              <div className="formLabel">Email address</div>
            </Form.Label>
            <Form.Control
              onChange={this.onFieldChange}
              type="email"
              name="email"
            />
            {this.state.emailError && (
              <h6 className="form-field-error">{this.state.emailError}</h6>
            )}
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>
              <div className="formLabel">Password</div>
            </Form.Label>
            <Form.Control
              onChange={this.onFieldChange}
              type="password"
              name="password"
            />
            {this.state.passwordError && (
              <h6 className="form-field-error">{this.state.passwordError}</h6>
            )}
          </Form.Group>
          <Button
            className="primary-button"
            variant="primary"
            type="submit"
            disabled={this.state.isFormInvalid}
          >
            Login
          </Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(
        login({
          email,
          password,
        })
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
