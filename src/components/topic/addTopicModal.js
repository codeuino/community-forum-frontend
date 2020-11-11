import React, { Component } from "react";
import { Container, Row, Col, Modal, Form, Button } from "react-bootstrap";
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
    } = this.state;
    e.preventDefault();
    this.props.addTopic(name, description, this.props.parentCategory);
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
      this.props.newTopic._id &&
      prevProps.newTopic._id != this.props.newTopic._id
    ) {
      this.props.handleClose("addTopic");
    }
    if (Object.keys(newState).length != 0) {
      this.setState(newState);
    }
  }

  render() {
    return (
      <Modal
        show={this.props.showModal}
        onHide={() => {
          this.props.handleClose("addTopic");
        }}
        centered
      >
        <Modal.Body>
          <Container>
            <Row className="center-row">
              <Col xs={12}>
                <h1 className="modal-heading">Add Topic</h1>
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
                    <Form.Group controlId="addTopicFormBasicText">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        onChange={this.onFieldChange}
                        type="text"
                        name={fieldNames.NAME}
                      />
                      {this.state.nameError && (
                        <h6 className="form-field-error">
                          {this.state.nameError}
                        </h6>
                      )}
                    </Form.Group>
                    <Form.Group controlId="addTopicFormBasicTextArea">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        onChange={this.onFieldChange}
                        as="textarea"
                        rows={3}
                        name={fieldNames.DESCRIPTION}
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
    newTopic: state.topic.add.newTopic,
    error: state.topic.add.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTopic: (name, description, parentCategory) =>
      dispatch(
        addTopic({
          name,
          description,
          parentCategory: parentCategory._id,
        })
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTopicModal);
