import React, { Component } from "react";
import { Card, Badge } from "react-bootstrap";
import "./projects.scss";
import projectInfo from "../../jsonData/projects";
import { IconContext } from "react-icons";
import { FiPlus } from "react-icons/fi";

class Projects extends Component {
  render() {
    return (
      <div className="projectCards">
        {projectInfo.projects.map((i) => {
          return (
            <Card className="projectCard" bg="light" style={{ width: "21rem" }}>
              <Card.Header color="#366FF0" className="projectcardheader">
                {i.projectName}
              </Card.Header>
              <div className="cardcontent">
                {i.topics.map((j) => {
                  return (
                    <Card className="topicscard">
                      <Card.Title className="topicsheading">
                        {j.topicName}
                      </Card.Title>
                      <Card.Text className="topicdescription">
                        {j.topicDescription}
                      </Card.Text>
                      <div>
                        {j.topicTags ? (
                          j.topicTags.map((k) => {
                            return (
                              <Badge variant="primary" className="tags">
                                {k}
                              </Badge>
                            );
                          })
                        ) : (
                          <Badge variant="primary"></Badge>
                        )}
                      </div>
                    </Card>
                  );
                })}
              </div>
              <div className="addnewcard">
                <IconContext.Provider
                  value={{ style: { verticalAlign: 'middle' }, className: "reacticon" }}
                >
                  <FiPlus />
                </IconContext.Provider>{" "}
                 Add another discussion
              </div>
            </Card>
          );
        })}
      </div>
    );
  }
}
export default Projects;
