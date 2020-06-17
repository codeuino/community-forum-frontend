import React, { Component } from "react";
import "./discussion.scss";
import NavBar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";
import { Container, Row, Col, Badge } from "react-bootstrap";
import Avatar from "@material-ui/core/Avatar";
import { Editor } from "@tinymce/tinymce-react";
import {DiscussionInfo, UserInfo} from "../../jsonData/chats";

class Discussion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      contentValue: "",
      DiscussionInfo: DiscussionInfo,
      UserInfo: UserInfo,
    };
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleValue = this.handleValue.bind(this);
    console.log(this.state.contentValue);
  }
  handleEditorChange(value) {
    this.setState({ content: value });
    // console.log(value)
  }
  handleValue(value) {
    this.setState({ contentValue: value });
    console.log(value);
  }

  render() {
    return (
      <div>
        <NavBar />
        <Container fluid>
          <Row md={12}>
            <Col xs={2} id="sidebar-wrapper">
              <Sidebar DiscussionInfo={this.state.DiscussionInfo} UserInfo = {this.state.UserInfo} />
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
                  {this.state.DiscussionInfo.Discussion.chats.map((chat)=>{
                    return <div className="chatHead">
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
                  })}
                </div>
              </div>
            </Col>
            <Col xs={3} id="contentwriting">
              <div className="discussionHeader">Write a New Discussion</div>
              <Editor
                initialValue="<p>Newb Content</p>"
                apiKey="8kftszxlfioswims1pl978knfa7p4qyoknx7afc7tvsvzruh"
                init={{
                  height: 600,
                  menubar: false,
                  branding: false,
                  plugins: [
                    "advlist autolink lists link image advcode preview",
                    "charmap print preview anchor help code",
                    "searchreplace visualblocks codesample",
                    "insertdatetime media table paste wordcount",
                  ],
                  toolbar:
                    // eslint-disable-next-line no-multi-str
                    "undo redo | bold italic strikethrough            \
                    bullist numlist codesample code",
                }}
                onChange={this.handleEditorChange}
                value={this.state.contentValue}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Discussion;
