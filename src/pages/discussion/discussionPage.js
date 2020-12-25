import React, { Component } from "react";
import { Container, Row, Col, Badge, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import io from "socket.io-client";
import NavBar from "../../components/navbar/navbar";
import UpdateTopicModal from "../../components/topic/updateTopicModal";
import MessageCard from "../../components/discussion/messageCard";
import AnnouncementsModal from "../../components/discussion/announcementsModal";
import {
  getTopic,
  clearCurrentTopic,
} from "../../reducers/topicSlice";
import { 
  getTopicChats, 
  addMessage, 
  clearCurrentChats, 
  turnAnnouncement, 
  removeAnnouncement,
  deleteMessage,
} from "../../reducers/messageSlice";
import { fieldNames, checkFieldValidation } from "../../commonFunctions/validateFormField";
import ReplyAllIcon from "@material-ui/icons/ReplyAll";
import TodayIcon from "@material-ui/icons/Today";
import ArchiveIcon from "@material-ui/icons/Archive";
import { handleModal } from "../../commonFunctions/handleModal";

class DiscussionPage extends Component {
  socket = io(process.env.REACT_APP_BACKEND_URL);
  constructor(props) {
    super(props);
    this.state = {
      messageDescription: "",
      messageDescriptionError: "",
      isFormInvalid: true,
      replyTo: null,
      showUpdateTopicModal: false,
      showAnnouncementsModal: false,
    };
  }

  onFieldChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      this.setState(checkFieldValidation(name, value));
    });
  };

  componentDidMount = () => {
    const {
      match: { params },
    } = this.props;
    this.props.getTopic(params.id);
    this.props.getTopicChats(params.id);
    this.socket.on("connect", () => {
      this.socket.emit("joinRoom", params.id.toString());
    });
    this.socket.on("newMessage", (messageData, userName) => {
      messageData.user = userName;
      this.props.addMessage(messageData);
      console.log(messageData);
    });
    this.scrollToBottom();
    this.setState({ showAnnouncementsModal: true });
  };

  componentDidUpdate(prevProps) {
    const {
      match: { params },
    } = this.props;
    if (prevProps.chats === undefined || prevProps.chats.length !== this.props.chats.length) {
      this.scrollToBottom();
    }
    let newState = {};
    if (
      this.state.messageDescriptionError === null &&
      this.state.isFormInvalid === true
    ) {
      newState = {
        ...newState,
        isFormInvalid: false,
      };
    } else if (
      this.state.messageDescriptionError !== null &&
      this.state.isFormInvalid === false
    ) {
      newState = {
        ...newState,
        isFormInvalid: true,
      };
    }
    if (Object.keys(newState).length !== 0) {
      this.setState(newState);
    }
    if (
      !prevProps.isToggleAnnouncementCompleted &&
      prevProps.isToggleAnnouncementCompleted !==
        this.props.isToggleAnnouncementCompleted
    ) {
      this.props.getTopic(params.id);
      this.props.getTopicChats(params.id);
      this.setState({ showAnnouncementsModal: true });
    }
    if (
      (!prevProps.isUpdateCompleted &&
        prevProps.isUpdateCompleted !== this.props.isUpdateCompleted) ||
      (!prevProps.isArchiveCompleted &&
        prevProps.isArchiveCompleted !== this.props.isArchiveCompleted)
    ) {
      this.props.getTopic(params.id);
    }
    if (
      !prevProps.isMessageDeleteCompleted &&
      prevProps.isMessageDeleteCompleted !== this.props.isMessageDeleteCompleted
    ) {
      this.props.getTopicChats(params.id);
    }
  }

  onMessageSubmit = (e) => {
    e.preventDefault();
    let newMessage;
    const {
      match: { params },
    } = this.props;
    if (this.state.messageDescription === "") {
      return;
    }
    newMessage = {
      token: localStorage.getItem("token"),
      description: this.state.messageDescription,
      replyTo: this.state.replyTo,
      parentTopic: params.id,
    };
    this.socket.emit("newMessage", newMessage, (error) => {
      console.log(error);
    });
    this.setState({
      messageDescription: "",
      messageDescriptionError: "",
    });
  };

  componentWillUnmount() {
    const {
      match: { params },
    } = this.props;
    this.socket.emit("leaveRoom", params.id.toString());
    this.socket.disconnect();
    this.props.clearTopic();
    this.props.clearChats(params.id);
  }

  scrollToBottom() {
    this.el.scrollIntoView({ behavior: "smooth" });
  }

  render() {
    const {
      match: { params },
    } = this.props;
    return (
      <React.Fragment>
        <Container fluid>
          <NavBar history={this.props.history} />
          <Container className="primary-container discussion-container">
            <Row>
              <Col xs={12}>
                {Object.keys(this.props.topic).length !== 0 && (
                  <React.Fragment>
                    <h2 className="dashboard-category-name">
                      {(this.props.topic.isSelfArchived ||
                        this.props.topic.isArchived) && (
                        <ArchiveIcon
                          className="archive-icon"
                          data-tip="This topic had been archived"
                        />
                      )}
                      {this.props.topic.name}
                    </h2>
                    {(this.props.topic.createdBy._id ===
                      this.props.currentUser._id ||
                      this.props.currentUser.isModerator) && (
                      <React.Fragment>
                        <Link
                          className="anchor-text dashboard-anchor-text"
                          onClick={() => {
                            this.setState(handleModal("updateTopic", "open"));
                          }}
                        >
                          Edit
                        </Link>
                        <UpdateTopicModal
                          showModal={this.state.showUpdateTopicModal}
                          handleClose={() => {
                            this.setState(handleModal("updateTopic", "close"));
                          }}
                          handleShow={() => {
                            this.setState(handleModal("updateTopic", "open"));
                          }}
                          categoryId={params.categoryId}
                          topic={this.props.topic}
                          history={this.props.history}
                        />
                      </React.Fragment>
                    )}
                    <AnnouncementsModal
                      showModal={this.state.showAnnouncementsModal}
                      handleClose={() => {
                        this.setState(handleModal("announcements", "close"));
                      }}
                      announcements={this.props.topic.announcements}
                      removeAnnouncement={this.props.removeAnnouncement}
                      isLoggedIn={this.props.isLoggedIn}
                      currentUser={this.props.currentUser}
                      isTopicArchived={
                        this.props.topic.isArchived ||
                        this.props.topic.isSelfArchived
                      }
                    />
                    <h6 className="dashboard-category-creator">
                      <ReplyAllIcon />
                      Created By:{" "}
                      {this.props.topic.createdBy.isRemoved ||
                      this.props.topic.createdBy.isBlocked ? (
                        "Removed User"
                      ) : (
                        <Link
                          className="anchor-text"
                          to={`/profile/${this.props.topic.createdBy._id}`}
                        >
                          {this.props.topic.createdBy.name.firstName}
                        </Link>
                      )}
                    </h6>
                    {this.props.topic.tags.length !== 0 &&
                      this.props.topic.tags.map((tag) => (
                        <Badge
                          key={tag._id}
                          pill
                          variant=""
                          className="primary-tag"
                          style={{ backgroundColor: tag.hexColorCode }}
                        >
                          <Link to={`/tag/${tag._id}`}>{tag.name}</Link>
                        </Badge>
                      ))}
                    <h6 className="discussion-topic-description">
                      {this.props.topic.description}
                    </h6>
                    <h6 className="dashboard-category-date">
                      <TodayIcon />
                      Last Activity: {this.props.topic.updatedAt.slice(0, 10)}
                      &nbsp;
                      {this.props.topic.updatedAt.slice(11, 16)}
                    </h6>
                    <hr className="dashboard-main-separator" />
                  </React.Fragment>
                )}
              </Col>
            </Row>
            <Row className="center-row">
              {this.props.chats !== undefined &&
                this.props.chats.map((message) => (
                  <MessageCard
                    messageData={message}
                    isLoggedIn={this.props.isLoggedIn}
                    currentUser={this.props.currentUser}
                    turnAnnouncement={this.props.turnAnnouncement}
                    removeAnnouncement={this.props.removeAnnouncement}
                    deleteMessage={this.props.deleteMessage}
                    isTopicArchived={
                      this.props.topic.isArchived ||
                      this.props.topic.isSelfArchived
                    }
                  />
                ))}
            </Row>
          </Container>
        </Container>
        {this.props.isLoggedIn &&
        !this.props.topic.isArchived &&
        !this.props.topic.isSelfArchived ? (
          <div
            className="discussion-bottom-scroll"
            ref={(el) => {
              this.el = el;
            }}
          />
        ) : (
          <div
            ref={(el) => {
              this.el = el;
            }}
          />
        )}
        {this.props.isLoggedIn &&
          !this.props.topic.isArchived &&
          !this.props.topic.isSelfArchived && (
            <Container fluid className="discussion-message-input-container">
              <Container>
                <Row className="center-row discussion-message-input-row">
                  <Col>
                    <Form onSubmit={this.onMessageSubmit}>
                      <Form.Group controlId="addMessageBasicText1">
                        <Form.Control
                          onChange={this.onFieldChange}
                          type="text"
                          as="textarea"
                          rows={1}
                          placeholder={`Message in ${this.props.topic.name} discussion`}
                          name={fieldNames.MESSAGE_DESCRIPTION}
                          value={this.state.messageDescription}
                        />
                      </Form.Group>
                      <Row className="discussion-message-submit-button-container">
                        <Col>
                          <Button
                            variant=""
                            className="primary-button discussion-message-submit-button"
                            type="submit"
                            disabled={this.state.isFormInvalid}
                          >
                            Send
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </Col>
                </Row>
              </Container>
            </Container>
          )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, props) => {
  const {
    match: { params },
  } = props;
  return {
    isLoggedIn: state.auth.isLoggedIn,
    currentUser: state.auth.currentUser,
    topic: state.topic.getCurrent.topic,
    chats: state.message.get.chats[params.id],
    isToggleAnnouncementCompleted: state.message.toggleAnnouncement.isCompleted,
    isUpdateCompleted: state.topic.update.isCompleted,
    isArchiveCompleted: state.topic.archive.isCompleted,
    isDeleteCompleted: state.topic.delete.isCompleted,
    isMessageDeleteCompleted: state.message.delete.isCompleted,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addMessage: (message) => dispatch(addMessage(message)),
    clearTopic: () => dispatch(clearCurrentTopic()),
    clearChats: (_id) =>
      dispatch(
        clearCurrentChats({
          _id,
        })
      ),
    getTopic: (_id) =>
      dispatch(
        getTopic({
          _id,
        })
      ),
    getTopicChats: (_id) =>
      dispatch(
        getTopicChats({
          _id,
        })
      ),
    turnAnnouncement: (_id) =>
      dispatch(
        turnAnnouncement({
          _id,
        })
      ),
    removeAnnouncement: (_id) =>
      dispatch(
        removeAnnouncement({
          _id,
        })
      ),
    deleteMessage: (_id) =>
      dispatch(
        deleteMessage({
          _id,
        })
      ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiscussionPage);
