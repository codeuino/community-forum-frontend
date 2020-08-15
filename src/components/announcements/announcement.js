import React, { Component } from "react";
import { Avatar } from "@material-ui/core";
import {
  Tabs,
  Tab,
  Button,
  Form,
  DropdownButton,
  InputGroup,
  Dropdown,
  Modal,
  FormControl,
} from "react-bootstrap";
import { IconContext } from "react-icons";
import { MdInfoOutline } from "react-icons/md";
import "./announcement.scss";

class Announcements extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Topics: props.Topics,
      announcements: [],
      showModal: false,
      topicName: "Please Select Topic",
    };
  }
  componentDidMount() {
    this.fetchAnnouncments();
  }
  handleChange = (params, e) => {
    if (params === "description") {
      this.setState({ description: e.target.value });
    }
  };

  handleAddAnnouncements = () => {
    this.setState({ showModal: true });
  };
  handleSelect = (e, event, params) => {
    if (params === "topics") {
      this.setState({ topicName: event.topic, topicId: event.id });
    }
  };
  handleClose = () => {
    this.setState({ showModal: false });
  };

  handleAddAnnouncement = async (e) => {
    e.preventDefault();
    console.log("announcementAdded");
    let requestBody = {
      query: `
      mutation{
        createAnnouncement(announcementInput:{
          announcement:"${this.state.description}",
          userId: "${localStorage.getItem("userId")}"
          topicId: "${this.state.topicId}",
        }){
          _id
          announcement
           user{
             email
            _id
            username
          }
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

  fetchAnnouncments = async () => {
    let requestBody = {
      query: `
      query{
        announcements{
          announcement,
          date,
          user{
            _id
            username
            email
          }
          topic{
            _id
            topicName
          }
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
    this.setState({ announcements: resData.data.announcements });
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
                  </div>
                </div>
                <div className="cta-register">
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={(e) => this.handleAddAnnouncement(e)}
                  >
                    Add Announcement
                  </Button>
                </div>
              </Form>
            </Modal.Body>
          </div>
        </Modal>
        <div className="AnnouncementsHeading">
          Activities
          <Button className="addbutton" onClick={this.handleAddAnnouncements}>
            Add
          </Button>
        </div>

        <div className="navTabs">
          <Tabs defaultActiveKey="Announcements" id="uncontrolled-tab-example">
            <Tab
              eventKey="Announcements"
              title="Announcements"
              className="Announcementtab"
            >
              <div className="announcements">
                {this.state.announcements.map((announcement) => {
                  return (
                    <div className="announcement">
                      <div className="topannouncement">
                        <Avatar className="avatar"></Avatar>
                        <div className="text">
                          <div>{announcement.announcement}</div>
                          <div className="bottomannouncement">
                            {announcement.user.username},
                            {announcement.topic.topicName}
                          </div>
                        </div>
                        <IconContext.Provider
                          value={{ color: "#F04B58", size: "24px" }}
                        >
                          <div className="icon">
                            <MdInfoOutline />
                          </div>
                        </IconContext.Provider>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Tab>
            <Tab eventKey="Recents" title="Recents" className="recenttab">
              <div className="announcements">
                <div className="announcement">
                  <div className="topannouncement">
                    <Avatar className="avatar"></Avatar>
                    <div className="text">
                      <div>
                        @Jaskirat Singh Mentioned you in the comments in the
                        Topic: “Random”.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="announcement">
                  <div className="topannouncement">
                    <Avatar className="avatar"></Avatar>
                    <div className="text">
                      <div>
                        @Jaskirat Singh Mentioned you in the comments in the
                        Topic: “Random”.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="announcement">
                  <div className="topannouncement">
                    <Avatar className="avatar"></Avatar>
                    <div className="text">
                      <div>
                        @Jaskirat Singh Mentioned you in the comments in the
                        Topic: “Random”.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="announcement">
                  <div className="topannouncement">
                    <Avatar className="avatar"></Avatar>
                    <div className="text">
                      <div>
                        @Jaskirat Singh Mentioned you in the comments in the
                        Topic: “Random”.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default Announcements;
