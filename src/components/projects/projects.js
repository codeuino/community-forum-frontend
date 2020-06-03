import React, { Component } from "react";
import { Card } from "react-bootstrap";
import "./projects.scss";
import projectInfo from "../../jsonData/projects";

class Projects extends Component {
  render() {
    return (
      <div className="projectCards">
        {projectInfo.projects.map((i) => {
          return (
            <Card className="projectCard" bg="light" style={{ width: "23rem" }}>
              <Card.Header color="#366FF0" className="projectcardheader">
                {i.projectName}
              </Card.Header>
              <div className="cardcontent">
                {i.topics.map((j) => {
                  return (
                    <Card className="topicscard">
                      <Card.Body>
                        <Card.Title className="topicsheading">
                          {j.topicName}
                        </Card.Title>
                        <Card.Text className="topicdescription">
                          {j.topicDescription}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  );
                })}
              </div>
            </Card>
          );
        })}
      </div>
    );
  }
}
export default Projects;
