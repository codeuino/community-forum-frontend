import React, { Component } from "react";
import { Container, Row, Col, Modal, Form, Button, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { updateOrg } from "../../reducers/orgSlice";
import {
  checkFieldValidation,
  fieldNames,
} from "../../commonFunctions/validateFormField";

class UpdateOrganizationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      nameError: null,
      organizationShortDescription: "",
      organizationShortDescriptionError: null,
      organizationLongDescription: "",
      organizationLongDescriptionError: "",
      email: "",
      website: "",
      websiteError: null,
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
      name,
      organizationShortDescription,
      organizationLongDescription,
      website,
    } = this.state;
    e.preventDefault();
    this.props.updateOrg(
      name,
      organizationShortDescription,
      organizationLongDescription,
      this.props.organization.contactInfo.email,
      website
    );
  };

  componentDidUpdate(prevProps) {
    const {
      nameError,
      organizationShortDescriptionError,
      organizationLongDescriptionError,
      websiteError,
      formSubmissionError,
      isFormInvalid,
    } = this.state;
    const {
      name,
      description,
      contactInfo,
    } = this.props.organization;
    let newState = {};
    if (prevProps.showModal != this.props.showModal) {
      newState = {
        ...newState,
        name: name,
        nameError: null,
        organizationShortDescription: description.shortDescription,
        organizationShortDescriptionError: null,
        organizationLongDescription: description.longDescription,
        organizationLongDescriptionError: null,
        email: contactInfo.email,
        website: contactInfo.website,
        websiteError: null,
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
        if (nameError === null &&
           organizationShortDescriptionError === null &&
           organizationLongDescriptionError === null &&
           websiteError === null
           ) {
          newState = {
            ...newState,
            isFormInvalid: false,
          };
        }
      } else if (
        nameError !== null || 
        organizationShortDescriptionError !== null ||
        organizationLongDescriptionError !== null ||
        websiteError !== null
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

    if (!prevProps.isCompleted && prevProps.isCompleted != this.props.isCompleted) {
      this.props.handleClose();
    }
  }

  render() {
    return (
      <Modal
        size="lg"
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
                  <h1 className="modal-heading">Edit Organization Details</h1>
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
                        <Form.Group controlId="orgUpdationBasicText1">
                          <Form.Label>Organization Name</Form.Label>
                          <Form.Control
                            onChange={this.onFieldChange}
                            type="text"
                            name={fieldNames.NAME}
                            value={this.state.name}
                          />
                          {this.state.nameError && (
                            <h6 className="form-field-error">
                              {this.state.nameError}
                            </h6>
                          )}
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="orgCreationFormBasicEmail">
                          <Form.Label>Email Address</Form.Label>
                          <Form.Control
                            onChange={this.onFieldChange}
                            type="email"
                            name={fieldNames.EMAIL}
                            value={this.state.email}
                            disabled
                          />
                          {this.state.emailError && (
                            <h6 className="form-field-error">
                              {this.state.emailError}
                            </h6>
                          )}
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group controlId="orgUpdationFormBasicTextArea1">
                      <Form.Label>Short Description</Form.Label>
                      <Form.Control
                        onChange={this.onFieldChange}
                        name={fieldNames.ORGANIZATION_SHORT_DESCRIPTION}
                        as="textarea"
                        rows={3}
                        value={this.state.organizationShortDescription}
                      />
                      {this.state.organizationShortDescriptionError && (
                        <h6 className="form-field-error">
                          {this.state.organizationShortDescriptionError}
                        </h6>
                      )}
                    </Form.Group>
                    <Form.Group controlId="orgUpdationFormBasicTextArea2">
                      <Form.Label>Long Description</Form.Label>
                      <Form.Control
                        onChange={this.onFieldChange}
                        name={fieldNames.ORGANIZATION_LONG_DESCRIPTION}
                        as="textarea"
                        rows={5}
                        value={this.state.organizationLongDescription}
                      />
                      {this.state.organizationLongDescriptionError && (
                        <h6 className="form-field-error">
                          {this.state.organizationLongDescriptionError}
                        </h6>
                      )}
                    </Form.Group>
                    <Form.Group controlId="orgUpdationFormBasicText2">
                      <Form.Label>Website</Form.Label>
                      <Form.Control
                        onChange={this.onFieldChange}
                        type="text"
                        name={fieldNames.WEBSITE}
                        value={this.state.website}
                      />
                      {this.state.websiteError && (
                        <h6 className="form-field-error">
                          {this.state.websiteError}
                        </h6>
                      )}
                    </Form.Group>
                    <Row className="center-row">
                      <Button
                        className="primary-button organization-page-create-button"
                        variant=""
                        type="submit"
                        disabled={this.state.isFormInvalid}
                      >
                        Update
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
    organization: state.org.get.org,
    isCompleted: state.org.update.isCompleted,
    error: state.org.update.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateOrg: (name, organizationShortDescription, organizationLongDescription, email, website) =>
      dispatch(
        updateOrg({
          name,
          description: {
            shortDescription: organizationShortDescription,
            longDescription: organizationLongDescription,
          },
          contactInfo: {
            email,
            website,
          }
        })
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateOrganizationModal);
