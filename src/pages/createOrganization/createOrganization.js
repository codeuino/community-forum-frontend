import React, { Component } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { createOrg } from "../../reducers/orgSlice";

class CreateOrganization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      nameError: "",
      shortDescription: "",
      shortDescriptionError: "",
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
      this.checkFieldValidation(name);
    });
  };

  checkFieldValidation = (field) => {
    switch (field) {
      case "name": {
        if (this.state.name.length < 3) {
          this.setState({
            nameError: "Name must be atleast 3 characters long",
          });
        } else
          this.setState({
            nameError: null,
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
      case "website": {
        if (
          //regex to be added
          this.state.website.match()
        ) {
          this.setState({
            websiteError: null,
          });
        } else {
          this.setState({
            websiteError: "Please enter a valid website URL",
          });
        }
        break;
      }
      case "shortDescription": {
        if (this.state.shortDescription.length < 5) {
          this.setState({
            shortDescriptionError: "Short Description must be atleast 5 characters long",
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
    this.props.createOrg(
      this.state.name,
      this.state.shortDescription,
      this.state.email,
      this.state.website,
    );
  };

  static getDerivedStateFromProps(props, state) {
    if (props.error) {
      return {
        formSubmissionError: props.error,
      };
    } else if (props.result) {
      props.history.push("/");
      return null;
    }
    return null;
  }

  componentDidUpdate() {
    if (this.state.isFormInvalid != false) {
      if (
        this.state.nameError === null &&
        this.state.shortDescriptionError === null &&
        this.state.emailError === null && 
        this.state.websiteError === null) {
        this.setState({ isFormInvalid: false });
      }
    } else {
      if (
        this.state.nameError !== null ||
        this.state.shortDescriptionError !== null ||
        this.state.emailError !== null || 
        this.state.websiteError !== null)
        this.setState({ isFormInvalid: true });
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
              <Form.Group controlId="formBasicText1">
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
              <Form.Group controlId="formBasicTextArea">
                <Form.Label>Short Description</Form.Label>
                <Form.Control
                  onChange={this.onFieldChange}
                  name="shortDescription"
                  as="textarea"
                  rows={3}
                />
                {this.state.shortDescriptionError && (
                  <h6 className="form-field-error">
                    {this.state.shortDescriptionError}
                  </h6>
                )}
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
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
              <Form.Group controlId="formBasicText2">
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