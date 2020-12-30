import React, { Component } from "react";
import {
  Button,
  Tab,
  Tabs,
  Form,
  Modal,
  Dropdown,
  DropdownButton,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { MdInfoOutline } from "react-icons/md";
import { FiMoreVertical } from "react-icons/fi";
import socketIOClient from "socket.io-client";
import "./tasks.scss";

var socket;

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      users: [],
      showModal: false,
      Topics: [],
      description: "",
      username: "Please Select User",
      topicName: "Please Select Topic",
    };
    socket = socketIOClient.connect("http://localhost:8000/");
  }

  componentDidMount() {
    this.fetchTasks();
    this.fetchTopicNames();
    this.fetchUsers();
  }

  fetchTopicNames = async () => {
    let requestBody = {
      query: `
      query{
      topics{
        _id
        topicName
      }
    }
      `,
    };
    let res = await fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: { "Content-Type": "application/json" },
    });
    if (res.status === 400) {
      console.log(res);
    }
    if (res.status !== 200 && res.status !== 201) {
      throw new Error("Failed");
    }
    var resData = await res.json();
    console.log(resData.data.topics);
    this.setState({ Topics: resData.data.topics });
  };

  fetchUsers = async () => {
    let requestBody = {
      query: `
      query{
        users{
        _id
        email
        username
      }
      }
      `,
    };
    let res = await fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    if (res.status === 400) {
      console.log(res);
    }
    if (res.status !== 200 && res.status !== 201) {
      throw new Error("Failed");
    }
    var resData = await res.json();
    this.setState({ users: resData.data.users });
  };

  fetchTasks = async () => {
    console.log(localStorage.getItem("userId"));
    let requestBody = {
      query: `
      query{
        tasks(userId:"${localStorage.getItem("userId")}"){
          userId,
          description,
          completed,
          topicId,
          date,
          _id,
          dueDate,
          assignedBy{
              username,
              _id,
              email
          },
        }
      }
      `,
    };
    if (localStorage.getItem("userId") === null || undefined) {
      return alert("Please Login!");
    }
    let res = await fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    if (res.status === 400) {
      console.log(res);
    }
    if (res.status !== 200 && res.status !== 201) {
      throw new Error("Failed");
    }
    var resData = await res.json();
    this.setState({ tasks: resData.data.tasks });
  };

  handleAddTask = async (e) => {
    e.preventDefault();
    console.log("tasktriggered");
    let requestBody = {
      query: `
      mutation{
        createTasks(TasksInput:{
          description:"${this.state.description}",
          completed:false,
          assignedBy: "${this.state.id}",
          topicId: "${this.state.topicId}"
          userId: "${localStorage.getItem("userId")}"
          dueDate: "${this.state.date}"
        }){
          date
          description,
          assignedBy{
              _id
          },
          topicId,
          dueDate
        }
      }
      `,
    };
    let res = await fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    if (res.status === 400) {
      console.log(res);
    }
    if (res.status !== 200 && res.status !== 201) {
      throw new Error("Failed");
    }
    var resData = await res.json();
    this.handleClose();
    window.location.reload();
    console.log(resData);
  };

  handleChange = (params, e) => {
    if (params === "description") {
      this.setState({ description: e.target.value });
    } else if (params === "date") {
      console.log(e.target.value);
      this.setState({ date: e.target.value });
    }
  };
  handleClose = () => {
    this.setState({ showModal: false });
  };
  handleTasksAdd = () => {
    this.setState({ showModal: true });
  };
  handleSelect = (e, event, params) => {
    if (params === "topics") {
      this.setState({ topicName: event.topic, topicId: event.id });
    } else if (params === "users") {
      this.setState({
        username: event.username,
        email: event.email,
        id: event.id,
      });
    }
  };
  handleChangeTask = (params, e, taskId) => {
    if (params === "completed") {
      let newTasks = this.state.tasks;
      let newTask = newTasks.find((task) => task._id === taskId);
      newTasks.find((task) => {
        return task._id === taskId;
      }).completed = true;
      this.setState({ tasks: newTasks });
      socket.emit("TaskCompleted", newTask);
    }
    if (params === "notCompleted") {
      let newTasks = this.state.tasks;
      let newTask = newTasks.find((task) => task._id === taskId);
      newTasks.find((task) => {
        return task._id === taskId;
      }).completed = false;
      this.setState({ tasks: newTasks });
      socket.emit("TaskIncomplete", newTask);
    }
  };

  render() {
    return (
      <div>
        <Modal show={this.state.showModal} onHide={this.handleClose} centered>
          <div className="modalbody">
            <Modal.Body>
              <Form>
                <div className="formdetails">
                  <div className="forminsides">
                    <Form.Group controlId="Description">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows="3"
                        placeholder="Description"
                        onChange={(e) => {
                          this.handleChange("description", e);
                        }}
                      />
                    </Form.Group>
                    <Form.Group controlId="TopicList">
                      <Form.Label>Topic</Form.Label>
                      <InputGroup>
                        <FormControl
                          placeholder={this.state.topicName}
                          aria-describedby="basic-addon2"
                          disabled="true"
                        />

                        <DropdownButton
                          as={InputGroup.Append}
                          variant="outline-secondary"
                          title=""
                          id="input-group-dropdown-2"
                        >
                          {this.state.Topics.map((topic) => {
                            return (
                              <Dropdown.Item
                                eventKey={topic.topicName}
                                onSelect={() =>
                                  this.handleSelect(
                                    topic.topicName,
                                    {
                                      topic: topic.topicName,
                                      id: topic._id,
                                    },
                                    "topics"
                                  )
                                }
                              >
                                {topic.topicName}
                              </Dropdown.Item>
                            );
                          })}
                        </DropdownButton>
                      </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="assigned">
                      <Form.Label>Assign To:</Form.Label>
                      <InputGroup>
                        <FormControl
                          placeholder={this.state.username}
                          aria-describedby="basic-addon2"
                          disabled="true"
                        />
                        <DropdownButton
                          as={InputGroup.Append}
                          variant="outline-secondary"
                          title=""
                          id="input-group-dropdown-2"
                        >
                          {this.state.users.map((user) => {
                            return (
                              <Dropdown.Item
                                eventKey={user.username}
                                onSelect={() =>
                                  this.handleSelect(
                                    user.username,
                                    {
                                      username: user.username,
                                      email: user.email,
                                      id: user._id,
                                    },
                                    "users"
                                  )
                                }
                              >
                                {user.username}
                              </Dropdown.Item>
                            );
                          })}
                        </DropdownButton>
                      </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="setDate">
                      <Form.Label>Complete By: </Form.Label>
                      <Form.Control
                        type="date"
                        placeholder="Enter email"
                        onChange={(e) => this.handleChange("date", e)}
                      />
                    </Form.Group>
                  </div>
                </div>
                <div className="cta-register">
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={(e) => this.handleAddTask(e)}
                  >
                    Add Task
                  </Button>
                </div>
              </Form>
            </Modal.Body>
          </div>
        </Modal>
        <div className="ToDosHeading">
          To-Do Tasks
          <Button className="addbutton" onClick={this.handleTasksAdd}>
            Add
          </Button>
        </div>
        <div className="navTabs">
          <Tabs defaultActiveKey="ongoing" id="uncontrolled-tab-example">
            <Tab eventKey="ongoing" title="OnGoing" className="ongoingTab">
              <Form>
                {this.state.tasks.map((task) => {
                  return task.completed ? (
                    ""
                  ) : (
                    <div>
                      <Form.Group
                        controlId="formBasicCheckbox"
                        className="formCheckbox"
                        onChange={(e) =>
                          this.handleChangeTask("completed", e, task._id)
                        }
                        id={task.description}
                      >
                        <Form.Check type="checkbox" />
                        <div className="textTasks">
                          <div className="labelParra">{task.description}</div>
                          <div className="subparra">
                            {task.assignedBy.username}, {task.dueDate}.
                          </div>
                        </div>
                        <div className="icons">
                          <FiMoreVertical
                            size={20}
                            className="FiMoreVertical"
                          />
                          <MdInfoOutline size={20} className="FiMoreVertical" />
                        </div>
                      </Form.Group>
                    </div>
                  );
                })}
              </Form>
            </Tab>

            <Tab
              eventKey="completed"
              title="Completed"
              className="completedTab"
            >
              {this.state.tasks.map((task) => {
                return task.completed ? (
                  <Form.Group
                    controlId="formBasicCheckbox"
                    className="formCheckbox"
                    onChange={(e) =>
                      this.handleChangeTask("notCompleted", e, task._id)
                    }
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
                            {task.assignedBy.username}, {task.dueDate}.
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
