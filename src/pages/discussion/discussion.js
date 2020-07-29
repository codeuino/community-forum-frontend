import React, { Component } from "react";
import "./discussion.scss";
import Sidebar from "../../components/sidebar/sidebar";
import { Container, Row, Col, Badge } from "react-bootstrap";
import Avatar from "@material-ui/core/Avatar";
import EditorChat from "../../components/editor/editor";
import socketIOClient from "socket.io-client";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaReply } from "react-icons/fa";
import ReactHtmlParser from "react-html-parser";

var socket;

function UserInfos(chats) {
  return [
    ...new Set(
      chats.map((chat) => {
        return chat.username;
      })
    ),
  ];
}

class Discussion extends Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      chats: props.Topics.chats,
      UserInfo: UserInfos(props.Topics.chats),
      commenting: false,
      chatReply: null,
      isShown: false,
    };
    socket = socketIOClient.connect("http://localhost:8000/");
    socket.on("newChat", async (data) => {
      console.log(data);
      var chats = this.state.chats;
      chats.push({
        _id: data._id,
        replyTo: data.replyTo,
        avatarUrl: data.avatarUrl,
        likes: data.likes,
        comments: data.comments,
        description: data.description,
        username: data.username,
      });
      this.setState({ chats: chats });
      const objDiv = document.getElementById("discussionScroll");
      objDiv.scrollTop = objDiv.scrollHeight;
    });
  }

  componentDidMount = () => {
    socket.on("connect", () => {
      socket.emit("room", this.props.Topics._id);
      console.log(this.props.Topics._id);
    });
    const objDiv = document.getElementById("discussionScroll");
    objDiv.scrollTop = objDiv.scrollHeight;
  };

  handleSubmit = (content, chatReply, handleOnSubmit) => {
    var newMessage;
    if (chatReply !== null) {
      newMessage = {
        topicId: this.props.Topics._id,
        userId: localStorage.getItem("userId"),
        description: content,
        replyTo: chatReply._id,
      };
    } else {
      newMessage = {
        topicId: this.props.Topics._id,
        userId: localStorage.getItem("userId"),
        description: content,
        replyTo: "",
      };
    }

    socket.emit("newMessage", newMessage);
    handleOnSubmit();
  };

  handleComment = (chat) => {
    this.setState({ commenting: true, chatReply: chat });
  };
  handleCommentOff = () => {
    console.log("off");
    this.setState({ commenting: false, chatReply: null });
  };

  render() {
    return (
      <div>
        <Container fluid>
          <Row md={12} className="row">
            <Col xs={2} id="sidebar-wrapper">
              <Sidebar
                chats={this.state.chats}
                UserInfo={UserInfos(this.props.Topics.chats)}
              />
            </Col>
            <Col xs={7} className="sidewrapper border-right">
              <div>
                <div className="topicHeading">
                  <IoMdArrowRoundBack
                    onClick={this.props.onClickingBack}
                    className="backbutton"
                  />
                  {this.props.Topics.topicName}
                  {this.props.Topics.topicTags.map((tag) => {
                    return (
                      <Badge variant="primary" className="tags">
                        {tag}
                      </Badge>
                    );
                  })}
                </div>
                <p className="description">
                  {this.props.Topics.topicDescription}
                </p>
                <hr />
                <div className="chat" id="discussionScroll">
                  {this.state.chats.map((chat) => {
                    if (chat.length !== 0) {
                      if (chat.replyTo !== null && chat.replyTo.length !== 0) {
                        var replyID = chat.replyTo;
                        var chatreply = this.state.chats.find(
                          (element) => element._id === replyID
                        );
                        return (
                          <div
                            className="chatHead"
                            onMouseEnter={() =>
                              this.setState({ isShown_id: chat._id })
                            }
                            onMouseLeave={() =>
                              this.setState({ isShown_id: null })
                            }
                          >
                            <Avatar src={chat.avatarurl}></Avatar>
                            <div className="chatinfo">
                              <div className="username">
                                <div>{chat.username}</div>{" "}
                                {this.state.isShown_id === chat._id ? (
                                  <div
                                    className="icon"
                                    onClick={() => this.handleComment(chat)}
                                  >
                                    <FaReply></FaReply>{" "}
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                              <div className="chatReply">
                                <Avatar
                                  src={chatreply.avatarurl}
                                  className="avatarReply"
                                ></Avatar>
                                <div className="chatinforeply">
                                  <div className="usernamereply">
                                    {chatreply.username}
                                  </div>
                                  <div className="chatdescriptionreply">
                                    {ReactHtmlParser(
                                      chatreply.description.replace(
                                        /(&nbsp;)*/g,
                                        ""
                                      )
                                    )}
                                  </div>
                                </div>
                                {}
                              </div>
                              <div className="chatdescription">
                                {ReactHtmlParser(
                                  chat.description.replace(/(&nbsp;)*/g, "")
                                )}{" "}
                              </div>
                            </div>
                            {}
                          </div>
                        );
                      } else {
                        return (
                          <div
                            className="chatHead"
                            onMouseEnter={() =>
                              this.setState({ isShown_id: chat._id })
                            }
                            onMouseLeave={() =>
                              this.setState({ isShown_id: null })
                            }
                          >
                            <Avatar src={chat.avatarurl}></Avatar>
                            <div className="chatinfo">
                              <div className="username">
                                <div>{chat.username}</div>{" "}
                                {this.state.isShown_id === chat._id ? (
                                  <div
                                    className="icon"
                                    onClick={() => this.handleComment(chat)}
                                  >
                                    <FaReply></FaReply>
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                              <div className="chatdescription">
                                {ReactHtmlParser(
                                  chat.description.replace(/(&nbsp;)*/g, "")
                                )}
                              </div>
                            </div>
                            {}
                          </div>
                        );
                      }
                    }
                  })}
                </div>
              </div>
            </Col>
            <Col xs={3} id="contentwriting">
              <div className="editor">
                <EditorChat
                  handleSubmit={this.handleSubmit}
                  commenting={this.state.commenting}
                  chatReply={this.state.chatReply}
                  handleCommentOff={this.handleCommentOff}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Discussion;
