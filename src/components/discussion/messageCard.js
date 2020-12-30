import React from "react";
import { Row, Col, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

function MessageCard(props) {
  const { 
    isLoggedIn,
    currentUser,
    messageData,
    isTopicArchived
   } = props;

  return (
    <Col sm={12} className="discussion-message-card-container">
      {" "}
      <React.Fragment>
        <div id={messageData._id} className="discussion-message-card">
          <Row>
            <Col
              xs={3}
              md={2}
              className="discussion-message-user-icon-container"
            >
              <Link
                className="common-card-link"
                to={`/profile/${messageData.userId}`}
              >
                <AccountCircleIcon className="discussion-message-user-icon" />
              </Link>
            </Col>
            <Col xs={9} md={10}>
              <h6 className="discussion-message-card-description">
                {messageData.description}
              </h6>
              <Row className="discussion-message-card-timestamp">
                <Col>
                  <small>
                    {messageData.createdAt.slice(0, 10)}
                    &nbsp;
                    {messageData.createdAt.slice(11, 16)}
                  </small>
                </Col>
              </Row>
            </Col>
            {!isTopicArchived &&
              isLoggedIn &&
              (currentUser._id === messageData.userId ||
                currentUser.isModerator) && (
                <Col
                  xs={1}
                  className="discussion-message-card-dropdown-container"
                >
                  <Dropdown className="admin-members-dropdown">
                    <Dropdown.Toggle variant=""></Dropdown.Toggle>
                    <Dropdown.Menu>
                    {currentUser.isModerator &&
                      (messageData.isAnnounced ? (
                        <Dropdown.Item
                          href=""
                          onClick={() => {
                            props.removeAnnouncement(messageData._id);
                          }}
                        >
                          Remove Announcement
                        </Dropdown.Item>
                        ) : (
                        <Dropdown.Item
                          href=""
                          onClick={() => {
                            props.turnAnnouncement(messageData._id);
                          }}
                        >
                          Add Announcement
                        </Dropdown.Item>
                      ))
                    }
                      <Dropdown.Item
                        href=""
                        onClick={() => {
                          props.deleteMessage(messageData._id);
                        }}
                      >
                        Remove Message
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              )}
          </Row>
        </div>
      </React.Fragment>
    </Col>
  );
}

export default MessageCard;
