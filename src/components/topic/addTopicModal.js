import React, { Component } from "react";
import { Container, Row, Col, Modal, Form, Button, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { addTopic } from "../../reducers/topicSlice";
import { checkFieldValidation, fieldNames } from "../../commonFunctions/validateFormField";

class AddTopicModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      nameError: "",
      description: "",
      descriptionError: "",
      tagString: "",
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
      description,
      tagString,
    } = this.state;
    e.preventDefault();
    this.props.addTopic(name, description, tagString, this.props.parentCategory);
  };

  componentDidUpdate(prevProps) {
    const {
      nameError,
      descriptionError,
      formSubmissionError,
      isFormInvalid,
    } = this.state;
    let newState = {};
    if (prevProps.showModal != this.props.showModal) {
      newState = {
        ...newState,
        name: "",
        nameError: "",
        description: "",
        descriptionError: "",
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
          nameError === null &&
          descriptionError === null
        ) {
          newState = {
            ...newState,
            isFormInvalid: false,
          };
        }
      } else if (
        nameError !== null ||
        descriptionError !== null
      ) {
        newState = {
          ...newState,
          isFormInvalid: true,
        };
      }
    }
    if (
      !prevProps.isCompleted &&
      prevProps.isCompleted != this.props.isCompleted
    ) {
      this.props.handleClose();
    }
    if (Object.keys(newState).length != 0) {
      this.setState(newState);
    }
  }

  render() {
    return (
      <Modal
        show={this.props.showModal}
        onHide={this.props.handleClose}
        scrollable={true}
        centered
      >
        <Modal.Header>
          <Container>
            <Row className="center-row">
              <Col xs={12}>
                <h1 className="modal-heading">Add Topic</h1>
              </Col>
            </Row>
          </Container>
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
                    <Form.Group controlId="addTopicFormBasicText1">
                      <Form.Label>Name</Form.Label>
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
                    <Form.Group controlId="addTopicFormBasicText2">
                      <Form.Label>Tags</Form.Label>
                      <Form.Control
                        onChange={this.onFieldChange}
                        type="text"
                        name="tagString"
                        aria-describedby="tagStringHelp"
                        value={this.state.tagString}
                      />
                      <small id="tagStringHelp" class="form-text text-muted">
                        Enter tags separated by a space (" ")
                      </small>
                    </Form.Group>
                    <Form.Group controlId="addTopicFormBasicTextArea">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        onChange={this.onFieldChange}
                        as="textarea"
                        rows={3}
                        name={fieldNames.DESCRIPTION}
                        value={this.state.description}
                      />
                      {this.state.descriptionError && (
                        <h6 className="form-field-error">
                          {this.state.descriptionError}
                        </h6>
                      )}
                    </Form.Group>
                    <Button
                      variant=""
                      className="primary-button"
                      type="submit"
                      disabled={this.state.isFormInvalid}
                    >
                      Create
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
    isCompleted: state.topic.add.isCompleted,
    error: state.topic.add.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTopic: (name, description, tagString, parentCategory) =>
      dispatch(
        addTopic({
          name,
          description,
          tagString,
          parentCategory: parentCategory._id,
        })
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTopicModal);
