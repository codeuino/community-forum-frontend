import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { signup } from "../../reducers/userSlice";

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      firstNameError: "",
      lastName: "",
      lastNameError: "",
      email: "",
      emailError: "",
      password: "",
      passwordError: "",
      verifyPassword: "",
      verifyPasswordError: "",
      phone: "",
      phoneError: "",
      shortDescription: "",
      shortDescriptionError: "",
      isFormInvalid: true,
      formSubmissionError: "",
    };
  }

  onFieldChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      this.checkFieldValidation(name);
    });
  };

  checkFieldValidation = (field) => {
    switch (field) {
      case "firstName": {
        if (this.state.firstName.length == 0) {
          this.setState({
            firstNameError: "First name is required",
          });
        } else
          this.setState({
            firstNameError: null,
          });
        break;
      }
      case "lastName": {
        if (this.state.lastName.length == 0) {
          this.setState({
            lastNameError: "Last name is required",
          });
        } else
          this.setState({
            lastNameError: null,
          });
        break;
      }
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
        if (this.state.password.length < 6) {
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
      case "verifyPassword": {
        if (this.state.password != this.state.verifyPassword) {
          this.setState({
            verifyPasswordError: "Please make sure your passwords match",
          });
        } else {
          this.setState({
            verifyPasswordError: null,
          });
        }
        break;
      }
      case "phone": {
        if (this.state.phone.length != 10) {
          this.setState({
            phoneError: "Please enter a valid phone number",
          });
        } else {
          this.setState({
            phoneError: null,
          });
        }
        break;
      }
      case "shortDescription": {
        if (this.state.shortDescription.length == 0) {
          this.setState({
            shortDescriptionError: "Short Description is required",
          });
        } else
          this.setState({
            shortDescriptionError: null,
          });
        break;
      }
    }
    return;
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    this.props.signup(
      this.state.firstName,
      this.state.lastName,
      this.state.email,
      this.state.password,
      this.state.phone,
      this.state.shortDescription
    );
  };

  static getDerivedStateFromProps(props, state) {
    if (props.error) {
      return {
        formSubmissionError: props.error,
      };
    }
    return null;
  }

  componentDidUpdate() {
    if (this.state.isFormInvalid != false) {
      if (
        this.state.firstNameError === null &&
        this.state.lastNameError === null &&
        this.state.emailError === null &&
        this.state.passwordError === null &&
        this.state.phoneError === null &&
        this.state.shortDescriptionError === null
      ) {
        this.setState({ isFormInvalid: false });
      }
    } else {
      if (
        this.state.firstNameError !== null ||
        this.state.lastNameError !== null ||
        this.state.emailError !== null ||
        this.state.passwordError !== null ||
        this.state.phoneError !== null ||
        this.state.shortDescriptionError !== null
      )
        this.setState({ isFormInvalid: true });
    }
  }

  render() {
    return (
      <div className="signup-form">
        {this.state.formSubmissionError && (
          <div className="alert alert-danger" role="alert">
            {this.state.formSubmissionError}
          </div>
        )}
        <Form onSubmit={this.onFormSubmit}>
          <Form.Group controlId="text">
            <Form.Label>
              <div className="formLabel">First Name</div>
            </Form.Label>
            <Form.Control
              onChange={this.onFieldChange}
              type="text"
              name="firstName"
            />
            {this.state.firstNameError && (
              <h6 className="form-field-error">{this.state.firstNameError}</h6>
            )}
          </Form.Group>
          <Form.Group controlId="text">
            <Form.Label>
              <div className="formLabel">Last Name</div>
            </Form.Label>
            <Form.Control
              onChange={this.onFieldChange}
              type="text"
              name="lastName"
            />
            {this.state.lastNameError && (
              <h6 className="form-field-error">{this.state.lastNameError}</h6>
            )}
          </Form.Group>
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
          <Form.Group controlId="formBasicPassword">
            <Form.Label>
              <div className="formLabel">Re-Type Password</div>
            </Form.Label>
            <Form.Control
              onChange={this.onFieldChange}
              type="password"
              name="verifyPassword"
            />
            {this.state.verifyPasswordError && (
              <h6 className="form-field-error">
                {this.state.verifyPasswordError}
              </h6>
            )}
          </Form.Group>
          <Form.Group controlId="text">
            <Form.Label>
              <div className="formLabel">Phone</div>
            </Form.Label>
            <Form.Control
              onChange={this.onFieldChange}
              type="text"
              name="phone"
            />
            {this.state.phoneError && (
              <h6 className="form-field-error">{this.state.phoneError}</h6>
            )}
          </Form.Group>
          <Form.Group controlId="text">
            <Form.Label>
              <div className="formLabel">Short Description</div>
            </Form.Label>
            <Form.Control
              onChange={this.onFieldChange}
              type="text"
              name="shortDescription"
            />
            {this.state.shortDescriptionError && (
              <h6 className="form-field-error">
                {this.state.shortDescriptionError}
              </h6>
            )}
          </Form.Group>
          <Button
            className="primary-button"
            variant="primary"
            type="submit"
            disabled={this.state.isFormInvalid}
          >
            Sign Up
          </Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.user.signup.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (firstName, lastName, email, password, phone, shortDescription) => {
      dispatch(
        signup({
          name: {
            firstName,
            lastName,
          },
          email,
          password,
          phone,
          info: {
            about: {
              shortDescription
            }
          }
        })
      );
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
