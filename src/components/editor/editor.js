import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Editor } from "@tinymce/tinymce-react";
import Avatar from "@material-ui/core/Avatar";
import "./editor.scss";
import { GrFormClose } from "react-icons/gr";
import ReactHtmlParser from "react-html-parser";

class EditorChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      contentValue: "",
      disabled: true,
    };
  }
  handleOnSubmit = () => {
    this.setState({ content: "" });
  };
  handleEditorChange = (content) => {
    this.setState({
      content,
      disabled: !(content.length > 0),
    });
  };
  handleValue = (value) => {
    this.setState({ contentValue: value });
  };

  render() {
    return (
      <div>
        <div className="discussionHeader">Write a New Discussion</div>
        {this.props.commenting ? (
          <div>
            <div className="chatHead">
              <div className="Reply">
                <div> Replying to: </div>
                <div className="icon" onClick={this.props.handleCommentOff}>
                  <GrFormClose size={20} />
                </div>
              </div>
              <div className="chatReply">
                <Avatar
                  src={this.props.chatReply.avatarurl}
                  className="avatarReply"
                ></Avatar>
                <div className="chatinforeply">
                  <div className="usernamereply">
                    {this.props.chatReply.username}
                  </div>
                  <div className="chatdescriptionreply">
                    {ReactHtmlParser(
                      this.props.chatReply.description.replace(/(&nbsp;)*/g, "")
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <Editor
          initialValue="<p>Newb Content</p>"
          id="uuid"
          apiKey="8kftszxlfioswims1pl978knfa7p4qyoknx7afc7tvsvzruh"
          init={{
            height: 400,
            menubar: false,
            branding: false,
            plugins: [
              "advlist autolink lists link image preview mentions",
              "charmap print preview anchor code",
              "searchreplace visualblocks codesample",
              "insertdatetime media table paste wordcount textpattern",
            ],
            toolbar:
              // eslint-disable-next-line no-multi-str
              "undo redo | bold italic strikethrough            \
                    bullist numlist codesample code",
          }}
          value={this.state.content}
          onEditorChange={this.handleEditorChange}
        />
        <Button
          type="submit"
          disabled={this.state.disabled}
          onClick={() =>
            this.props.handleSubmit(
              this.state.content,
              this.props.chatReply,
              this.handleOnSubmit
            )
          }
          className="sendchat"
        >
          Send
        </Button>
      </div>
    );
  }
}

export default EditorChat;
