import React, { Component } from "react";
import { Container, Row, Col, Modal, Form, Button } from "react-bootstrap";
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
      this.props.newCategory._id &&
      prevProps.newCategory._id != this.props.newCategory._id
    ) {
      this.props.handleClose("addCategory");
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
          this.props.handleClose("addCategory");
        }}
        centered
      >
        <Modal.Body>
          <Container>
            <Row className="center-row">
              <Col xs={12}>
                <h1 className="modal-heading">Add Category</h1>
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
                    <Form.Group controlId="addCategoryFormBasicText">
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
                    <Form.Group controlId="addCategoryFormBasicTextArea">
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
    newCategory: state.category.add.newCategory,
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
