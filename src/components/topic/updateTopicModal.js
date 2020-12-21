import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Modal,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  updateTopic,
  archiveTopic,
  unarchiveTopic,
  deleteTopic,
} from "../../reducers/topicSlice";
import {
  fieldNames,
  checkFieldValidation,
} from "../../commonFunctions/validateFormField";
import DeleteModal from "../common/deleteModal";
import { handleModal } from "../../commonFunctions/handleModal";

class UpdateTopicModal extends Component {
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
    const { name, description, tagString } = this.state;
    e.preventDefault();
    this.props.updateTopic(
      this.props.topic._id,
      name,
      description,
      tagString,
    );
  };

  onArchiveSubmit = (action) => {
    switch (action) {
      case "archive": {
        this.props.archiveTopic(this.props.topic._id);
        break;
      }
      case "unarchive": {
        this.props.unarchiveTopic(this.props.topic._id);
        break;
      }
    }
  };

  onDeleteSubmit = () => {
    this.props.deleteTopic(this.props.topic._id);
  };

  componentDidUpdate(prevProps) {
    const {
      nameError,
      descriptionError,
      formSubmissionError,
      isFormInvalid,
    } = this.state;
    const { name, description, tagString } = this.props.topic;
    let newState = {};
    if (prevProps.showModal !== this.props.showModal) {
      newState = {
        ...newState,
        name: name,
        nameError: null,
        description: description,
        descriptionError: null,
        tagString: tagString,
        isFormInvalid: true,
      };
      if (formSubmissionError !== "") {
        newState = {
          ...newState,
          formSubmissionError: "",
        };
      }
    } else {
      if (this.props.updateError !== prevProps.updateError) {
        newState = {
          ...newState,
          formSubmissionError: this.props.updateError,
        };
      } else if (this.props.archiveError !== prevProps.archiveError) {
        newState = {
          ...newState,
          formSubmissionError: this.props.archiveError,
        };
      }
      if (isFormInvalid === true) {
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
    if (Object.keys(newState).length !== 0) {
      this.setState(newState);
    }
    if (
      !prevProps.isUpdateCompleted &&
      prevProps.isUpdateCompleted !== this.props.isUpdateCompleted
    ) {
      this.props.handleClose();
    } else if (
      !prevProps.isDeleteCompleted &&
      prevProps.isDeleteCompleted !== this.props.isDeleteCompleted
    ) {
      this.setState(handleModal("delete", "close"));
      if (
        this.props.history &&
        this.props.history.location.pathname ===
          `/category/${this.props.categoryId}/topic/${this.props.topic._id}`
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
                      <Form.Group controlId="updateTopicFormBasicText1">
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
                      <Form.Group controlId="updateTopicFormBasicText2">
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
                      <Form.Group controlId="updateTopicFormBasicTextArea">
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
                        {!this.props.topic.isArchived && (
                          this.props.topic.isSelfArchived ? (
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
                        ))}
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
          modalHeading="Topic"
          objectName={`${this.props.topic.name} Topic`}
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
    isUpdateCompleted: state.topic.update.isCompleted,
    updateError: state.topic.update.error,
    isArchiveCompleted: state.topic.archive.isCompleted,
    archiveError: state.topic.archive.error,
    isDeleteCompleted: state.topic.delete.isCompleted,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTopic: (_id, name, description, tagString) =>
      dispatch(
        updateTopic({
          _id,
          name,
          description,
          tagString,
        })
      ),
    archiveTopic: (_id) =>
      dispatch(
        archiveTopic({
          _id,
        })
      ),
    unarchiveTopic: (_id) =>
      dispatch(
        unarchiveTopic({
          _id,
        })
      ),
    deleteTopic: (_id) =>
      dispatch(
        deleteTopic({
          _id,
        })
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateTopicModal);
