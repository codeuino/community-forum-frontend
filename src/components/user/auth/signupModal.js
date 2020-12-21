import React, { Component } from "react";
import { Container, Row, Col, Modal, Form, Button, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { signup } from "../../../reducers/authSlice";
import { checkFieldValidation, fieldNames } from "../../../commonFunctions/validateFormField";

class SignUpModal extends Component {
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
      userShortDescription: "",
      userShortDescriptionError: "",
      isFormInvalid: true,
      formSubmissionError: "",
    };
  }

  onFieldChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      if(name === "verifyPassword") {
        this.setState(checkFieldValidation(name, value, this.state.password));
      } else {
        this.setState(checkFieldValidation(name, value));
      }
    });
  };

  onFormSubmit = (e) => {
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      userShortDescription
    } = this.state;
    e.preventDefault();
    this.props.signup(
      firstName,
      lastName,
      email,
      password,
      phone,
      userShortDescription
    );
  };

  componentDidUpdate(prevProps) {
    const {
      firstNameError,
      lastNameError,
      emailError,
      passwordError,
      verifyPasswordError,
      phoneError,
      userShortDescriptionError,
      formSubmissionError,
      isFormInvalid,
    } = this.state;
    let newState = {};
    if (prevProps.showModal !== this.props.showModal) {
      newState = {
        ...newState,
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
        userShortDescription: "",
        userShortDescriptionError: "",
        isFormInvalid: true,
      };
      if (formSubmissionError !== "") {
        newState = {
          ...newState,
          formSubmissionError: "",
        };
      }
    } else {
      if (this.props.error !== prevProps.error) {
        newState = {
          ...newState,
          formSubmissionError: this.props.error,
        };
      }
      if (isFormInvalid === true) {
        if (
          firstNameError === null &&
          lastNameError === null &&
          emailError === null &&
          passwordError === null &&
          verifyPasswordError === null &&
          phoneError === null &&
          userShortDescriptionError === null
        ) {
          newState = {
            ...newState,
            isFormInvalid: false,
          };
        }
      } else if (
        firstNameError !== null ||
        lastNameError !== null ||
        emailError !== null ||
        passwordError !== null ||
        verifyPasswordError !== null ||
        phoneError !== null ||
        userShortDescriptionError !== null
      ) {
        newState = {
          ...newState,
          isFormInvalid: true,
        };
      }
    }
    if (Object.keys(newState).length !== 0) {
      this.setState(newState);
    }
    if (
      !prevProps.isLoggedIn &&
      prevProps.isLoggedIn !== this.props.isLoggedIn
    ) {
      this.props.handleClose();
    }
  }

  render() {
    return (
      <Modal
        size="md"
        scrollable={true}
        show={this.props.showModal}
        onHide={this.props.handleClose}
        className="modal-wide"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <Container>
              <Row>
                <Col xs={12}>
                  <h1 className="modal-heading">Sign Up</h1>
                </Col>
              </Row>
            </Container>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col xs={12}>
                <div className="modal-form">
                  {this.state.formSubmissionError && (
                    <Alert variant="danger">
                      {this.state.formSubmissionError}
                    </Alert>
                  )}
                  <Form onSubmit={this.onFormSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group controlId="signupFormBasicText1">
                          <Form.Label>First Name</Form.Label>
                          <Form.Control
                            onChange={this.onFieldChange}
                            type="text"
                            name={fieldNames.FIRSTNAME}
                            value={this.state.firstName}
                          />
                          {this.state.firstNameError && (
                            <h6 className="form-field-error">
                              {this.state.firstNameError}
                            </h6>
                          )}
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="signupFormBasicText2">
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control
                            onChange={this.onFieldChange}
                            type="text"
                            name={fieldNames.LASTNAME}
                            value={this.state.lastName}
                          />
                          {this.state.lastNameError && (
                            <h6 className="form-field-error">
                              {this.state.lastNameError}
                            </h6>
                          )}
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={7}>
                        <Form.Group controlId="signupFormBasicEmail">
                          <Form.Label>Email Address</Form.Label>
                          <Form.Control
                            onChange={this.onFieldChange}
                            type="email"
                            name={fieldNames.EMAIL}
                            value={this.state.email}
                          />
                          {this.state.emailError && (
                            <h6 className="form-field-error">
                              {this.state.emailError}
                            </h6>
                          )}
                        </Form.Group>
                      </Col>
                      <Col md={5}>
                        <Form.Group controlId="signupFormBasicText3">
                          <Form.Label>Phone</Form.Label>
                          <Form.Control
                            onChange={this.onFieldChange}
                            type="text"
                            name={fieldNames.PHONE}
                            value={this.state.phone}
                          />
                          {this.state.phoneError && (
                            <h6 className="form-field-error">
                              {this.state.phoneError}
                            </h6>
                          )}
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group controlId="signupFormBasicTextArea">
                      <Form.Label>Short Description</Form.Label>
                      <Form.Control
                        onChange={this.onFieldChange}
                        as="textarea"
                        rows={3}
                        name={fieldNames.USER_SHORT_DESCRIPTION}
                        value={this.state.userShortDescription}
                      />
                      {this.state.userShortDescriptionError && (
                        <h6 className="form-field-error">
                          {this.state.userShortDescriptionError}
                        </h6>
                      )}
                    </Form.Group>
                    <Row>
                      <Col md={6}>
                        <Form.Group controlId="signupFormBasicPassword1">
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            onChange={this.onFieldChange}
                            type="password"
                            name={fieldNames.PASSWORD}
                            value={this.state.password}
                          />
                          {this.state.passwordError && (
                            <h6 className="form-field-error">
                              {this.state.passwordError}
                            </h6>
                          )}
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="signupFormBasicPassword2">
                          <Form.Label>Re-Type Password</Form.Label>
                          <Form.Control
                            onChange={this.onFieldChange}
                            type="password"
                            name={fieldNames.VERIFY_PASSWORD}
                            value={this.state.verifyPassword}
                          />
                          {this.state.verifyPasswordError && (
                            <h6 className="form-field-error">
                              {this.state.verifyPasswordError}
                            </h6>
                          )}
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="center-row">
                      <Button
                        className="primary-button organization-page-create-button"
                        variant=""
                        type="submit"
                        disabled={this.state.isFormInvalid}
                      >
                        Sign Up
                      </Button>
                    </Row>
                  </Form>
                </div>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    error: state.auth.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (firstName, lastName, email, password, phone, userShortDescription) => {
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
              shortDescription: userShortDescription,
            }
          }
        })
      );
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpModal);
