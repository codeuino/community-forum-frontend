import React, { Component } from "react";
import { Container, Row, Col, Modal, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { login } from '../../../reducers/authSlice';
import { checkFieldValidation, fieldNames } from "../../../commonFunctions/validateFormField";

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      emailError: "",
      password: "",
      passwordError: "",
      isFormInvalid: true,
      formSubmissionError: "",
    };
  }

  onFieldChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      this.setState(checkFieldValidation(name, value));
    });
  };

  onFormSubmit = (e) => {
    const {
      email,
      password,
    } = this.state;
    e.preventDefault();
    this.props.login(email, password);
  };

  componentDidUpdate(prevProps) {
    const {
      emailError,
      passwordError,
      formSubmissionError,
      isFormInvalid,
    } = this.state;
    let newState = {};
    if(prevProps.showModal !== this.props.showModal) {
      newState = {
        ...newState,
        email: "",
        emailError: "",
        password: "",
        passwordError: "",
        isFormInvalid: true,
      };
      if (formSubmissionError !== "") {
        newState = {
          ...newState,
          formSubmissionError: "",
        };
      }
    } else {
      if(this.props.error !== prevProps.error) {
        newState = {
          ...newState,
          formSubmissionError: this.props.error,
        };
      }
      if (isFormInvalid === true) {
        if (
          emailError === null &&
          passwordError === null
        ) {
          newState = {
            ...newState,
            isFormInvalid: false,
          };
        }
      } else if (
        emailError !== null ||
        passwordError !== null
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

    if (!prevProps.isLoggedIn && prevProps.isLoggedIn !== this.props.isLoggedIn) {
      this.props.handleClose();
    }
  }

  render() {
    return (
      <Modal
        show={this.props.showModal}
        onHide={this.props.handleClose}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <Container>
              <Row>
                <Col xs={12}>
                  <h1 className="modal-heading">Login</h1>
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
                    <Form.Group controlId="loginFormBasicEmail">
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
                    <Form.Group controlId="loginFormBasicPassword">
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
                    <Button
                      variant=""
                      className="primary-button"
                      type="submit"
                      disabled={this.state.isFormInvalid}
                    >
                      Login
                    </Button>
                    <span className="pl-3 pr-1">New User?</span>
                    <Link
                      to=""
                      className="anchor-text"
                      onClick={(e) => {
                        e.preventDefault();
                        this.props.handleSignupShow();
                      }}
                    >
                      Sign Up
                    </Link>
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
    login: (email, password) => dispatch(
        login({
          email,
          password,
        })
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
