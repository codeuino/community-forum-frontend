import React from "react";
import {
  Container,
  Row,
  Col,
  Modal,
} from "react-bootstrap";
import { Link } from "react-router-dom";

function AnnouncementsModal(props) {
  const {
    isLoggedIn,
    currentUser,
    isTopicArchived,
    removeAnnouncement,
    showModal,
    handleClose,
    announcements,
  } = props;

  if (announcements.length === 0) {
    return null;
  }

  return (
    <Modal size="lg" show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Container>
            <Row>
              <Col xs={12}>
                <h1 className="modal-heading">Announcements</h1>
              </Col>
            </Row>
          </Container>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container className="discussion-announcements-modal-container">
          <Row>
            <Col xs={12}>
              <ul>
                {announcements.map((announcement) => (
                  <React.Fragment>
                    <li key={announcement._id}>{announcement.description}</li>
                    {!isTopicArchived &&
                      isLoggedIn &&
                      currentUser.isModerator && (
                        <Link
                          className="anchor-danger-text discussion-announcement-remove-text"
                          onClick={() => {
                            removeAnnouncement(announcement._id);
                          }}
                        >
                          Remove
                        </Link>
                      )}
                    <br />
                  </React.Fragment>
                ))}
              </ul>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default AnnouncementsModal;
