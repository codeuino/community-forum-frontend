import React from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";

function BlockModal(props) {
  const {
    modalAction,
    showModal,
    handleClose,
    userName,
    modalDescription,
    modalFunction,
  } = props;
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Container>
            <Row>
              <Col xs={12}>
                <h1 className="modal-heading">
                  {modalAction} {userName.firstName}
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
              <div className="modal-delete-container">
                <p className="modal-delete-text">
                  Are you absolutely sure? This will{" "}
                  <span className="medium-text">
                    {modalAction.toLowerCase()} {userName.firstName}{" "}
                    {userName.lastName}
                  </span>{" "}
                  {modalDescription}
                </p>
                <Button
                  variant=""
                  className="primary-button organization-page-create-button"
                  type="submit"
                  onClick={() => {
                    handleClose();
                    modalFunction();
                  }}
                >
                  {modalAction}
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default BlockModal;
