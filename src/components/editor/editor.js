import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Editor } from "@tinymce/tinymce-react";
import "./editor.scss";

class EditorChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      contentValue: "",
    };
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleValue = this.handleValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleEditorChange(content) {
    this.setState({ content });
  }
  handleSubmit(e) {
    e.preventDefault();
    alert(this.state.content);
  }
  handleValue(value) {
    this.setState({ contentValue: value });
  }

  render() {
    return (
      <div>
        <div className="discussionHeader">Write a New Discussion</div>
        <Editor
          initialValue="<p>Newb Content</p>"
          id="uuid"
          apiKey="8kftszxlfioswims1pl978knfa7p4qyoknx7afc7tvsvzruh"
          outputFormat="html"
          init={{
            height: 400,
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
          value={this.state.content}
          onEditorChange={this.handleEditorChange}
        />
        <Button type="submit" onClick={this.handleSubmit} className="sendchat">
          Send
        </Button>
      </div>
    );
  }
}

export default EditorChat;
