import React, { Component } from "react";
import { Card, Badge } from "react-bootstrap";
import "./projects.scss";
import projectInfo1 from "../../jsonData/projects";
import { IconContext } from "react-icons";
import { FiPlus } from "react-icons/fi";
import { Droppable, DragDropContext, Draggable } from "react-beautiful-dnd";

class Projects extends Component {
  state = projectInfo1;
  constructor(props) {
    super(props);
    this.onDragEnd = this.onDragEnd.bind(this);
  }
  onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const start = this.state.projects[source.droppableId];
    const finish = this.state.projects[destination.droppableId];

    if (start === finish) {
      const newTopicIds = Array.from(start.topicIds);
      newTopicIds.splice(source.index, 1);
      newTopicIds.splice(destination.index, 0, draggableId);

      const newProject = {
        ...start,
        topicIds: newTopicIds,
      };

      const newState = {
        ...this.state,
        projects: {
          ...this.state.projects,
          [newProject.id]: newProject
        }
      }

      this.setState(newState);
      return
    }

    //moving from one list to another 

    const startTopicIds = Array.from(start.topicIds);
    startTopicIds.splice(source.index, 1);
    const newStart = {
      ...start,
      topicIds: startTopicIds,
    };

    const finishTopicIds = Array.from(finish.topicIds);
    finishTopicIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      topicIds: finishTopicIds,
    };

    const newState = {
      ...this.state,
      projects: {
        ...this.state.projects,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    this.setState(newState);
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="projectCards">
          {this.state.projectsOrder.map((projectID) => {
            const project = this.state.projects[projectID];
            return (
              <Card
                className="projectCard"
                bg="light"
                style={{ width: "21rem" }}
                key={project.id}
              >
                <Card.Header color="#366FF0" className="projectcardheader">
                  {project.projectName}
                </Card.Header>
                <Droppable droppableId={project.id}>
                  {(provided) => (
                    <div
                      className="cardcontent"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {project.topicIds.map((topicid, index) => {
                        const topic = this.state.topics[topicid];
                        return (
                          <Draggable draggableId={topic.id} index={index}>
                            {(provided) => (
                              <Card
                                key={topic.id}
                                className="topicscard"
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                              >
                                <Card.Title className="topicsheading">
                                  {topic.topicName}
                                </Card.Title>
                                <Card.Text className="topicdescription">
                                  {topic.topicDescription}
                                </Card.Text>
                                <div>
                                  {topic.topicTags ? (
                                    topic.topicTags.map((k) => {
                                      return (
                                        <Badge
                                          variant="primary"
                                          className="tags"
                                        >
                                          {k}
                                        </Badge>
                                      );
                                    })
                                  ) : (
                                    <Badge variant="primary"></Badge>
                                  )}
                                </div>
                              </Card>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
                <div className="addnewcard">
                  <IconContext.Provider
                    value={{
                      style: { verticalAlign: "middle" },
                      className: "reacticon",
                    }}
                  >
                    <FiPlus />
                  </IconContext.Provider>{" "}
                  Add another discussion
                </div>
              </Card>
            );
          })}
        </div>
      </DragDropContext>
    );
  }
}
export default Projects;
