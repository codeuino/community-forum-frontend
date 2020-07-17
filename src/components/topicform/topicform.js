import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import TagsInput from "react-tagsinput";
import "./topicform.scss";
import "react-tagsinput/react-tagsinput.css";

class TopicForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TopicName: "",
      TopicDescription: "",
      tags: [],
    };
  }

  handleTopicSubmission = () => {};

  handleChangeTags = (tags) => {
    this.setState({ tags });
    console.log(tags);
  };

  handleChange = (params, event) => {
    event.preventDefault();
    if (params === "TopicName") {
      this.setState({ TopicName: event.target.value });
    } else if (params === "TopicDescription") {
      this.setState({ TopicDesctiption: event.target.value });
    }
  };

  render() {
    return (
      <div>
        <Form
          onSubmit={() =>
            this.props.handleTopicSubmission(
              this.state.TopicName,
              this.state.TopicDesctiption,
              this.props.projectID,
              this.state.tags
            )
          }
        >
          <Form.Group controlId="formBasic">
            <Form.Label>Topic Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Topic"
              onChange={(e) => {
                this.handleChange("TopicName", e);
              }}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter the Description"
              rows="3"
              onChange={(e) => {
                this.handleChange("TopicDescription", e);
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Tags</Form.Label>
            <TagsInput
              className="react-tagsinput tagsinput"
              value={this.state.tags}
              onChange={this.handleChangeTags}
            />
            <Button
              onClick={() =>
                this.props.handleTopicSubmission(
                  this.state.TopicName,
                  this.state.TopicDesctiption,
                  this.props.projectID,
                  this.state.tags
                )
              }
            >
              Submit
            </Button>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default TopicForm;
