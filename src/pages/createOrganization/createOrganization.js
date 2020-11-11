import React, { Component } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { createOrg } from "../../reducers/orgSlice";
import { checkFieldValidation } from "../../commonFunctions/validateFormField";

class CreateOrganization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      nameError: "",
      organizationShortDescription: "",
      organizationShortDescriptionError: "",
      email: "",
      emailError: "",
      website: "",
      websiteError: "",
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
      shortDescription,
      email,
      website,
    } = this.state;
    e.preventDefault();
    this.props.createOrg(
      name,
      shortDescription,
      email,
      website,
    );
  };

  componentDidUpdate(prevProps) {
    const {
      nameError,
      organizationShortDescriptionError,
      emailError,
      websiteError,
      isFormInvalid,
    } = this.state;
    let newState = {};
    if (this.props.error != prevProps.error) {
      newState = {
        ...newState,
        formSubmissionError: this.props.error,
      };
    }
    if (isFormInvalid == true) {
      if (
        nameError === null &&
        organizationShortDescriptionError === null &&
        emailError === null && 
        websiteError === null) {
          newState = {
            ...newState,
            isFormInvalid: false,
          };
      }
    } else if (
      nameError !== null ||
      organizationShortDescriptionError !== null ||
      emailError !== null || 
      websiteError !== null
    ) {
      newState = {
        ...newState,
        isFormInvalid: true,
      };
    }
    if (Object.keys(newState).length != 0) {
      this.setState(newState);
    }
    if (this.props.result &&
      prevProps.result != this.props.result
    ) {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <Container>
        <Row className="organization-parent-row">
          <Col xs={12}>
            <h1 className="main-heading">Setup Organization</h1>
            {this.state.formSubmissionError && (
              <div className="alert alert-danger" role="alert">
                {this.state.formSubmissionError}
              </div>
            )}
            <Form onSubmit={this.onFormSubmit}>
              <Form.Group controlId="orgCreationFormBasicText1">
                <Form.Label>Organization Name</Form.Label>
                <Form.Control
                  onChange={this.onFieldChange}
                  type="text"
                  name="name"
                />
                {this.state.nameError && (
                  <h6 className="form-field-error">{this.state.nameError}</h6>
                )}
              </Form.Group>
              <Form.Group controlId="orgCreationFormBasicTextArea">
                <Form.Label>Short Description</Form.Label>
                <Form.Control
                  onChange={this.onFieldChange}
                  name="organizationShortDescription"
                  as="textarea"
                  rows={3}
                />
                {this.state.organizationShortDescriptionError && (
                  <h6 className="form-field-error">
                    {this.state.organizationShortDescriptionError}
                  </h6>
                )}
              </Form.Group>
              <Form.Group controlId="orgCreationFormBasicEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  onChange={this.onFieldChange}
                  type="email"
                  name="email"
                />
                {this.state.emailError && (
                  <h6 className="form-field-error">{this.state.emailError}</h6>
                )}
              </Form.Group>
              <Form.Group controlId="orgCreationFormBasicText2">
                <Form.Label>
                  Website
                </Form.Label>
                <Form.Control
                  onChange={this.onFieldChange}
                  type="text"
                  name="website"
                />
                {this.state.websiteError && (
                  <h6 className="form-field-error">
                    {this.state.websiteError}
                  </h6>
                )}
              </Form.Group>
              <Button
                className="primary-button organization-creation-button"
                type="submit"
                disabled={this.state.isFormInvalid}
              >
                Create
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    result: state.org.create.result,
    error: state.org.create.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createOrg: (name, shortDescription, email, website) => {
      dispatch(
        createOrg({
          name,
          description: {
            shortDescription,
          },
          contactInfo: {
            email,
            website,
          }
        })
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrganization);