import React, { Component } from "react";
import "./discussion.scss";
import Sidebar from "../../components/sidebar/sidebar";
import { Container, Row, Col, Badge } from "react-bootstrap";
import Avatar from "@material-ui/core/Avatar";
import EditorChat from "../../components/editor/editor";
import { DiscussionInfo } from "../../jsonData/chats";
import {IoMdArrowRoundBack} from "react-icons/io"
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";

function transform(node, index) {
  if (node.type === "tag" && node.name === "b") {
    return <div>This was a bold tag</div>;
  }
}

const options = {
  transform,
};

const markdown =
  '<p><strong>das asdasad</strong></p> <ul> <li><strong>adsdas a</strong></li></ul><pre class="language-markup"><code>adsa das dasd</code></pre>';

function Discussions(props) {
  let obj = DiscussionInfo.Discussion.find((o) => o._ID === props.discussionID);
  console.log(obj);
  return obj;
}
function UserInfos(DiscussionInfo) {
  return [
    ...new Set(
      DiscussionInfo.chats.map((chat) => {
        return chat.username;
      })
    ),
  ];
}

class Discussion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DiscussionInfo: Discussions(props),
      UserInfo: UserInfos(Discussions(props)),
    };
  }

  render() {
    return (
      <div>
        <Container fluid>
          <Row md={12} className="row">
            <Col xs={2} id="sidebar-wrapper">
              <Sidebar
                DiscussionInfo={this.state.DiscussionInfo}
                UserInfo={this.state.UserInfo}
              />
            </Col>
            <Col xs={7} className="sidewrapper border-right">
              <div>
                
                <div className="topicHeading">
                <IoMdArrowRoundBack onClick={this.props.onClickingBack} className="backbutton"/>
                  {this.state.DiscussionInfo.TopicName}
                  {this.state.DiscussionInfo.Tags.map((tag) => {
                    return (
                      <Badge variant="primary" className="tags">
                        {tag}
                      </Badge>
                    );
                  })}
                </div>
                <p className="description">
                  {this.state.DiscussionInfo.TopicDescription}
                </p>
                <hr />
                <div className="chat">
                  {this.state.DiscussionInfo.chats.map((chat) => {
                    if (chat.replyTo.length !== 0) {
                      var replyID = chat.replyTo;
                      var chatreply = this.state.DiscussionInfo.chats.find(
                        (element) => element._ID === replyID
                      );
                      return (
                        <div className="chatHead">
                          <Avatar src={chat.avatarurl}></Avatar>
                          <div className="chatinfo">
                            <div className="username">{chat.username}</div>
                            <div className="chatReply">
                              <Avatar src={chatreply.avatarurl} className="avatarReply"></Avatar>
                              <div className="chatinforeply">
                                <div className="usernamereply">
                                  {chatreply.username}
                                </div>
                                <div className="chatdescriptionreply">
                                  {chatreply.description}
                                </div>
                              </div>
                              {}
                            </div>
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
                          {}
                        </div>
                      );
                    } else {
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
                          {/* <div>{ReactHtmlParser(markdown, options)}</div> */}
                          {}
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </Col>
            <Col xs={3} id="contentwriting">
              <div className="editor">
                <EditorChat />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Discussion;
