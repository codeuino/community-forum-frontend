import React, { Component } from "react";
import "./discussion.scss";
import NavBar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";
import { Container, Row, Col, Badge } from "react-bootstrap";
import Avatar from "@material-ui/core/Avatar";
import EditorChat from "../../components/editor/editor";
import { DiscussionInfo, UserInfo } from "../../jsonData/chats";

class Discussion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DiscussionInfo: DiscussionInfo,
      UserInfo: UserInfo,
    };
  }

  render() {
    return (
      <div>
        <NavBar />
        <Container fluid>
          <Row md={12}>
            <Col xs={2} id="sidebar-wrapper">
              <Sidebar
                DiscussionInfo={this.state.DiscussionInfo}
                UserInfo={this.state.UserInfo}
              />
            </Col>
            <Col xs={7} className="sidewrapper border-right">
              <div>
                <div className="topicHeading">
                  {this.state.DiscussionInfo.Discussion.TopicName}
                  {this.state.DiscussionInfo.Discussion.Tags.map((tag) => {
                    return (
                      <Badge variant="primary" className="tags">
                        {tag}
                      </Badge>
                    );
                  })}
                </div>
                <p className="description">
                  {this.state.DiscussionInfo.Discussion.TopicDescription}
                </p>
                <hr />
                <div className="chat">
                  {this.state.DiscussionInfo.Discussion.chats.map((chat) => {
                    return (
                      <div className="chatHead">
                        <Avatar src={chat.avatarurl}></Avatar>
                        <div className="chatinfo">
                          <div className="username">{chat.username}</div>
                          <div className="chatdescription">
                            {chat.description}
                          </div>
                          <div className="buttonsclass">
                            <a className="buttons" href="/">
                              Like
                            </a>
                            <a className="buttons" href="/">
                              Comment
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Col>
            <Col xs={3} id="contentwriting">
              <EditorChat />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Discussion;
