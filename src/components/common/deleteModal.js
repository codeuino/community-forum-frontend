import React, { Component } from "react";
import { Container, Row, Col, Modal, Form, Button } from "react-bootstrap";

function DeleteModal(props) {
  const {
    showModal,
    handleClose,
    modalHeading,
    objectName,
    deleteFunction,
  } = props;
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Body>
        <Container>
          <Row className="center-row">
            <Col xs={12}>
              <h1 className="modal-heading">Delete {modalHeading}</h1>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div className="modal-delete-container">
                <p className="modal-delete-text">
                  Are you absolutely sure? This action can't be undone. This will permanently delete{" "}
                  <span className="medium-text">
                    {objectName}
                  </span>
                  .
                </p>
                <Button
                  variant=""
                  className="primary-delete-button"
                  type="submit"
                  onClick={() => {
                    handleClose();
                    deleteFunction();
                  }}
                >
                  Delete
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default DeleteModal