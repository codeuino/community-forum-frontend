import React, { Component } from "react";
import { Container, Row, Col, Modal, Form, Button } from "react-bootstrap";
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
    const isLongDescription =
      this.props.organization.description.longDescription == null ? "" : null;
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
        organizationLongDescriptionError: isLongDescription,
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
      this.props.handleClose("updateOrg");
    }
  }

  render() {
    return (
      <Modal
        show={this.props.showModal}
        onHide={() => {
          this.props.handleClose("updateOrg");
        }}
        className="modal-wide"
        centered
      >
        <Modal.Body>
          <Container>
            <Row className="center-row">
              <Col xs={12}>
                <h1 className="modal-heading">Edit Organization Details</h1>
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
                    <Button
                      variant=""
                      className="primary-button"
                      type="submit"
                      disabled={this.state.isFormInvalid}
                    >
                      Update
                    </Button>
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