import React, { Component } from "react";
import { Container, Row, Col, Modal, Form, Button, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { addCategory } from "../../reducers/categorySlice";
import { fieldNames, checkFieldValidation } from "../../commonFunctions/validateFormField";

class AddCategoryModal extends Component {
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
    this.props.addCategory(name, description);
  };

  componentDidUpdate(prevProps) {
    const {
      nameError,
      descriptionError,
      formSubmissionError,
      isFormInvalid,
    } = this.state;
    let newState = {};
    if (prevProps.showModal !== this.props.showModal) {
      newState = {
        ...newState,
        name: "",
        nameError: "",
        description: "",
        descriptionError: "",
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
      prevProps.isCompleted !== this.props.isCompleted
    ) {
      this.props.handleClose();
    }
    if (Object.keys(newState).length !== 0) {
      this.setState(newState);
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
                  <h1 className="modal-heading">
                    New Category
                  </h1>
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
                    <Form.Group controlId="addCategoryFormBasicText">
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
                    <Form.Group controlId="addCategoryFormBasicTextArea">
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
                    <Row className="center-row">
                      <Button
                        variant=""
                        className="primary-button organization-page-create-button"
                        type="submit"
                        disabled={this.state.isFormInvalid}
                      >
                        Create
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
    isCompleted: state.category.add.isCompleted,
    error: state.category.add.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCategory: (name, description) =>
      dispatch(
        addCategory({
          name,
          description,
        })
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCategoryModal);
