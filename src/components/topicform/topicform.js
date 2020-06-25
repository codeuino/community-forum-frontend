import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import "./topicform.scss";

class TopicForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Topic Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Topic" />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter the Description"
              rows="3"
            />
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    );
  }
}

export default TopicForm;
