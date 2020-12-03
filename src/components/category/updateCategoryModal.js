import React, { Component } from "react";
import { Container, Row, Col, Modal, Form, Button, Alert, ModalDialog } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { updateCategory, archiveCategory, unarchiveCategory, deleteCategory } from "../../reducers/categorySlice";
import {
  fieldNames,
  checkFieldValidation,
} from "../../commonFunctions/validateFormField";
import DeleteModal from "../common/deleteModal";
import {
  handleModal,
} from "../../commonFunctions/handleModal";

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

  onArchiveSubmit = (action) => {
    switch (action) {
      case "archive": {
        this.props.archiveCategory(this.props.category._id);
        break;
      }
      case "unarchive": {
        this.props.unarchiveCategory(this.props.category._id);
        break;
      }
    }
  };

  onDeleteSubmit = () => {
    this.props.deleteCategory(this.props.category._id);
  };

  componentDidUpdate(prevProps) {
    const {
      nameError,
      descriptionError,
      formSubmissionError,
      isFormInvalid,
    } = this.state;
    const { name, description } = this.props.category;
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
      if (this.props.updateError != prevProps.updateError) {
        newState = {
          ...newState,
          formSubmissionError: this.props.updateError,
        };
      }
      else if (this.props.archiveError != prevProps.archiveError) {
        newState = {
          ...newState,
          formSubmissionError: this.props.archiveError,
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
      this.props.handleClose();
    } 
     else if (
      !prevProps.isDeleteCompleted &&
      prevProps.isDeleteCompleted != this.props.isDeleteCompleted
    ) {
      this.setState(handleModal("delete", "close"));
      if (this.props.resetCurrentCategory) {
        this.props.resetCurrentCategory();
      } else if (
        this.props.history && this.props.history.location.pathname ==
        `/category/${this.props.category._id}`
      ) {
        this.props.history.push("/");
      }
    }
  }

  render() {
    return (
      <React.Fragment>
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
                    <h1 className="modal-heading">Edit Details</h1>
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
                      <Button
                        variant=""
                        className="primary-button"
                        type="submit"
                        disabled={this.state.isFormInvalid}
                      >
                        Update
                      </Button>
                      <div className="anchor-container">
                        {this.props.category.isArchived ? (
                          <Link
                            className="pl-2 pr-1 anchor-danger-text anchor-update-text"
                            onClick={() => {
                              this.onArchiveSubmit("unarchive");
                            }}
                          >
                            Unarchive
                          </Link>
                        ) : (
                          <Link
                            className="pl-2 pr-1 anchor-danger-text anchor-update-text"
                            onClick={() => {
                              this.onArchiveSubmit("archive");
                            }}
                          >
                            Archive
                          </Link>
                        )}
                        <Link
                          className="pl-2 pr-1 anchor-danger-text"
                          onClick={() => {
                            this.props.handleClose();
                            this.setState(handleModal("delete", "open"));
                          }}
                        >
                          Delete
                        </Link>
                      </div>
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
          handleClose={() => {
            this.setState(handleModal("delete", "close"));
          }}
          deleteFunction={this.onDeleteSubmit}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isUpdateCompleted: state.category.update.isCompleted,
    updateError: state.category.update.error,
    isArchiveCompleted: state.category.archive.isCompleted,
    archiveError: state.category.archive.error,
    isDeleteCompleted: state.category.delete.isCompleted,
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
    archiveCategory: (_id) =>
      dispatch(
        archiveCategory({
          _id,
        })
      ),
    unarchiveCategory: (_id) =>
      dispatch(
        unarchiveCategory({
          _id,
        })
      ),
    deleteCategory: (_id) =>
      dispatch(
        deleteCategory({
          _id,
        })
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateCategoryModal);
