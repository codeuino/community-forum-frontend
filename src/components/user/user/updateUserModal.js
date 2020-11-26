import React, { Component } from "react";
import { Container, Row, Col, Modal, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  fieldNames,
  checkFieldValidation,
} from "../../../commonFunctions/validateFormField";
import { getCurrentUser } from "../../../reducers/authSlice";
import { updateUser, removeUser } from "../../../reducers/userSlice";
import DeleteModal from "../../common/deleteModal";

class UpdateUserModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      firstNameError: null,
      lastName: "",
      lastNameError: null,
      email: "",
      phone: "",
      phoneError: null,
      userShortDescription: "",
      userShortDescriptionError: null,
      designation: "",
      designationError: null,
      twitter: "",
      twitterError: null,
      isFormInvalid: true,
      formSubmissionError: "",
      showDeleteModal: false,
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
      firstName,
      lastName,
      phone,
      userShortDescription,
      designation,
      twitter,
    } = this.state;
    e.preventDefault();
    this.props.updateUser(
      firstName,
      lastName,
      phone,
      userShortDescription,
      designation,
      twitter
    );
  };

  handleDeleteModalShow = () => {
    this.setState({
      showDeleteModal: true,
    });
  };

  handleDeleteModalClose = () => {
    this.setState({
      showDeleteModal: false,
    });
  };

  onDeleteSubmit = () => {
    this.props.removeUser();
  };

  componentDidUpdate(prevProps) {
    const {
      firstNameError,
      lastNameError,
      phoneError,
      userShortDescriptionError,
      designationError,
      twitterError,
      formSubmissionError,
      isFormInvalid,
    } = this.state;
    const { name, email, phone, info, socialMedia } = this.props.currentUser;
    let newState = {};
    if (prevProps.showModal != this.props.showModal) {
      newState = {
        ...newState,
        firstName: name.firstName,
        firstNameError: null,
        lastName: name.lastName,
        lastNameError: null,
        email: email,
        phone: phone,
        phoneError: null,
        userShortDescription: info.about.shortDescription,
        userShortDescriptionError: null,
        designation: info.about.designation,
        designationError: null,
        twitter: socialMedia?.twitter,
        twitterError: null,
        isFormInvalid: true,
      };
      if (formSubmissionError != "") {
        newState = {
          ...newState,
          formSubmissionError: "",
        };
      }
    } else {
      if (this.props.error != prevProps.error) {
        newState = {
          ...newState,
          formSubmissionError: this.props.error,
        };
      }
      if (isFormInvalid == true) {
        if (
          firstNameError === null &&
          lastNameError === null &&
          phoneError === null &&
          userShortDescriptionError === null &&
          designationError === null &&
          twitterError === null
        ) {
          newState = {
            ...newState,
            isFormInvalid: false,
          };
        }
      } else if (
        firstNameError !== null ||
        lastNameError !== null ||
        phoneError !== null ||
        userShortDescriptionError !== null ||
        designationError !== null ||
        twitterError !== null
      ) {
        newState = {
          ...newState,
          isFormInvalid: true,
        };
      }
    }
    if (Object.keys(newState).length != 0) {
      this.setState(newState);
    }

    if (
      !prevProps.isUpdateCompleted &&
      prevProps.isUpdateCompleted != this.props.isUpdateCompleted
    ) {
      this.props.getCurrentUser();
      this.props.handleClose("updateUser");
    }
    if (
      !prevProps.isDeleteCompleted &&
      prevProps.isDeleteCompleted != this.props.isDeleteCompleted
    ) {
      this.handleDeleteModalClose();
      if (this.props.history.location.pathname == "/") {
        window.location.reload();
      } else {
        this.props.getCurrentUser();
        this.props.history.push("/");
      }
    }

  }

  render() {
    return (
      <React.Fragment>
        <Modal
          show={this.props.showModal}
          onHide={() => {
            this.props.handleClose("updateUser");
          }}
          centered
        >
          <Modal.Body>
            <Container>
              <Row className="center-row">
                <Col xs={12}>
                  <h1 className="modal-heading">Edit Details</h1>
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <div className="modal-form">
                    {this.state.formSubmissionError && (
                      <div className="alert alert-danger" role="alert">
                        {this.state.formSubmissionError}
                      </div>
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
                      <Form.Group controlId="signupFormBasicEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                          onChange={this.onFieldChange}
                          type="email"
                          name={fieldNames.EMAIL}
                          value={this.state.email}
                          disabled
                        />
                      </Form.Group>
                      <Form.Group controlId="signupFormBasicText3">
                        <Form.Label>Designation</Form.Label>
                        <Form.Control
                          onChange={this.onFieldChange}
                          type="text"
                          name={fieldNames.DESIGNATION}
                          value={this.state.designation}
                        />
                        {this.state.designationError && (
                          <h6 className="form-field-error">
                            {this.state.designationError}
                          </h6>
                        )}
                      </Form.Group>
                      <Form.Group controlId="signupFormBasicText4">
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
                      <Form.Group controlId="signupFormBasicText5">
                        <Form.Label>Twitter Link</Form.Label>
                        <Form.Control
                          onChange={this.onFieldChange}
                          type="text"
                          name={fieldNames.TWITTER}
                          value={this.state.twitter}
                        />
                        {this.state.twitterError && (
                          <h6 className="form-field-error">
                            {this.state.twitterError}
                          </h6>
                        )}
                      </Form.Group>
                      <Button
                        className="primary-button"
                        variant=""
                        type="submit"
                        disabled={this.state.isFormInvalid}
                      >
                        Update
                      </Button>
                      <Link
                        className="pl-2 pr-1 anchor-danger-text"
                        onClick={() => {
                          this.props.handleClose("updateUser");
                          this.handleDeleteModalShow();
                        }}
                      >
                        Delete
                      </Link>
                    </Form>
                  </div>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
        </Modal>
        <DeleteModal
          showModal={this.state.showDeleteModal}
          modalHeading="Account"
          objectName={`your account`}
          handleClose={this.handleDeleteModalClose}
          deleteFunction={this.onDeleteSubmit}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser,
    isUpdateCompleted: state.user.update.isCompleted,
    isDeleteCompleted: state.user.remove.isCompleted,
    error: state.user.update.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (
      firstName,
      lastName,
      phone,
      userShortDescription,
      designation,
      twitter,
    ) =>
      dispatch(
        updateUser({
          name: {
            firstName,
            lastName,
          },
          phone,
          info: {
            about: {
              shortDescription: userShortDescription,
              designation,
            },
          },
          socialMedia: {
            twitter,
          },
        })
      ),
    getCurrentUser: () => dispatch(
      getCurrentUser()
    ),
    removeUser: (_id=null, email=null) => dispatch(
      removeUser({
        _id,
        email,
      })
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateUserModal);