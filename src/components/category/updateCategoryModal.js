import React, { Component } from "react";
import { Container, Row, Col, Modal, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAllCategories, updateCategory, deleteCategory } from "../../reducers/categorySlice";
import {
  fieldNames,
  checkFieldValidation,
} from "../../commonFunctions/validateFormField";
import DeleteModal from "../common/deleteModal";

class UpdateCategoryModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      nameError: null,
      description: "",
      descriptionError: null,
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
    const { name, description } = this.state;
    e.preventDefault();
    this.props.updateCategory(this.props.category._id, name, description);
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
    this.props.deleteCategory(this.props.category._id);
  }

  componentDidUpdate(prevProps) {
    const {
      nameError,
      descriptionError,
      formSubmissionError,
      isFormInvalid,
    } = this.state;
    const {
      name,
      description,
    } = this.props.category;
    let newState = {};
    if (prevProps.showModal != this.props.showModal) {
      newState = {
        ...newState,
        name: name,
        nameError: null,
        description: description,
        descriptionError: null,
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
        if (nameError === null && descriptionError === null) {
          newState = {
            ...newState,
            isFormInvalid: false,
          };
        }
      } else if (nameError !== null || descriptionError !== null) {
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
      this.props.getCategories();
      this.props.handleClose("updateCategory");
    }
    if (
      !prevProps.isDeleteCompleted &&
      prevProps.isDeleteCompleted != this.props.isDeleteCompleted
    ) {
      this.props.getCategories();
      this.handleDeleteModalClose();
      this.props.resetCurrentCategory();
    }
  }

  render() {
    return (
      <React.Fragment>
        <Modal
          show={this.props.showModal}
          onHide={() => {
            this.props.handleClose("updateCategory");
          }}
          centered
        >
          <Modal.Body>
            <Container>
              <Row className="center-row">
                <Col xs={12}>
                  <h1 className="modal-heading">Edit Category</h1>
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
                      <Button
                        variant=""
                        className="primary-button"
                        type="submit"
                        disabled={this.state.isFormInvalid}
                      >
                        Update
                      </Button>
                      <Link
                        className="pl-2 pr-1 anchor-danger-text"
                        onClick={() => {
                          this.props.handleClose("updateCategory");
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
          modalHeading="Category"
          objectName={`${this.props.category.name} Category`}
          handleClose={this.handleDeleteModalClose}
          deleteFunction={this.onDeleteSubmit}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isUpdateCompleted: state.category.update.isCompleted,
    isDeleteCompleted: state.category.delete.isCompleted,
    error: state.category.update.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCategory: (_id, name, description) =>
      dispatch(
        updateCategory({
          _id,
          name,
          description,
        })
      ),
    getCategories: () => 
    dispatch(
      getAllCategories()
    ),
    deleteCategory: (_id) => 
    dispatch(
      deleteCategory({
        _id,
      })
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateCategoryModal);
