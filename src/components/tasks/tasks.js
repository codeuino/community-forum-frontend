import React, { Component } from "react";
import taskData from "../../jsonData/tasks";
import { Button, Tab, Tabs, Form } from "react-bootstrap";
import { MdInfoOutline } from "react-icons/md";
import { FiMoreVertical } from "react-icons/fi";
import "./tasks.scss"

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="ToDosHeading">
          To-Do Tasks
          <Button className="addbutton" onClick={this.handleShowTask}>
            Add
          </Button>
        </div>
        <div className="navTabs">
          <Tabs defaultActiveKey="ongoing" id="uncontrolled-tab-example">
            <Tab eventKey="ongoing" title="OnGoing" className="ongoingTab">
              {taskData.map((task) => {
                return task.completed ? (
                  ""
                ) : (
                  <Form.Group
                    controlId="formBasicCheckbox"
                    className="formCheckbox"
                  >
                    <Form.Check
                      type="checkbox"
                      label={
                        <div className="textTasks">
                          <div className="labelParra">{task.description}</div>
                          <div className="subparra">
                            {task.assignedBy}, {task.dateCompletion}.
                          </div>
                        </div>
                      }
                    />
                    <div className="icons">
                      <FiMoreVertical size={20} className="FiMoreVertical" />
                      <MdInfoOutline size={20} className="FiMoreVertical" />
                    </div>
                  </Form.Group>
                );
              })}
            </Tab>
            <Tab
              eventKey="completed"
              title="Completed"
              className="completedTab"
            >
              {taskData.map((task) => {
                return task.completed ? (
                  <Form.Group
                    controlId="formBasicCheckbox"
                    className="formCheckbox"
                  >
                    <Form.Check
                      defaultChecked="true"
                      type="checkbox"
                      label={
                        <div className="textTasks">
                          <div className="labelParra">
                            <s>{task.description}</s>
                          </div>
                          <div className="subparra">
                            {task.assignedBy}, {task.dateCompletion}.
                          </div>
                        </div>
                      }
                    />
                    <div className="icons">
                      <FiMoreVertical size={20} className="FiMoreVertical" />
                      <MdInfoOutline size={20} className="FiMoreVertical" />
                    </div>
                  </Form.Group>
                ) : (
                  ""
                );
              })}
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default Tasks;
