import React, { Component } from "react";
import announcementData from "../../jsonData/announcement";
import { Avatar } from "@material-ui/core";
import { Tabs, Tab } from "react-bootstrap";
import { IconContext } from "react-icons";
import { MdInfoOutline } from "react-icons/md";
import "./announcement.scss";

class Announcements extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="AnnouncementsHeading">Activities</div>
        <div className="navTabs">
          <Tabs defaultActiveKey="Announcements" id="uncontrolled-tab-example">
            <Tab
              eventKey="Announcements"
              title="Announcements"
              className="Announcementtab"
            >
              <div className="announcements">
                {announcementData.map((announcement) => {
                  return (
                    <div className="announcement">
                      <div className="topannouncement">
                        <Avatar
                          className="avatar"
                          src={announcement.avatarUrl}
                        ></Avatar>
                        <div className="text">
                          <div>{announcement.description}</div>
                          <div className="bottomannouncement">
                            {announcement.author}, {announcement.topicName}
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
