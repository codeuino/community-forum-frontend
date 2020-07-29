import React, { Component } from "react";
import { Card, Badge, Modal } from "react-bootstrap";
import "./projects.scss";
import { IconContext } from "react-icons";
import { FiPlus } from "react-icons/fi";
import { Droppable, DragDropContext, Draggable } from "react-beautiful-dnd";
import TopicForm from "../../components/topicform/topicform";
import converttodict from "../../utils/dictConversion";

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      Topics: { topic: {} },
      topic: "",
      topicDescription: "",
      categories: {},
      projectID: "",
      categoriesArray: [],
    };
    this.onDragEnd = this.onDragEnd.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleTopicSubmission = this.handleTopicSubmission.bind(this);
  }

  componentDidMount() {
    this.fetchTopics();
    this.fetchCategories();
    console.log("component mounted");
  }

  fetchCategories() {
    let requestBody = {
      query: `
      query {
        categories{
          categoryName
          _id
          topicIds
        }
    }
      `,
    };
    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        const categoryData = resData.data.categories;
        this.setState({
          categoriesArray: categoryData,
          categories: converttodict(categoryData),
        });
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
  fetchTopics() {
    let requestBody = {
      query: `
      query{
      topics{
        _id
        topicName
        topicDescription
        topicTags
        chats {
          _id
          replyTo
          avatarUrl
          likes
          comments
          description
          username
        }
      }
    }
      `,
    };
    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed");
        }
        return res.json();
      })
      .then((resData) => {
        this.setState({ Topics: converttodict(resData.data.topics) });
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
  handleTopicSubmission(topic, topicdes, projectid, tags) {
    let tagsArray = JSON.stringify(tags);
    console.log(`${[tags]}`);
    let requestBody = {
      query: `
      mutation{
        createTopics(topicInput:{
          topicName:"${topic}",
          topicDescription:"${topicdes}",
          topicTags:${tagsArray},
          categoryID:"${projectid}",
        }){
          _id
          topicName
          topicDescription
          topicTags
        }
      }
      `,
    };
    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (res.status === 400) {
          console.log(res);
        }
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        window.location.reload();
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
  handleShow(projectID) {
    if (localStorage.getItem("token") === null) {
      this.props.handleShow();
      return;
    }
    this.setState({ showModal: true, projectID: projectID });
  }
  handleClose() {
    this.setState({ showModal: false });
  }

  onDragEnd = (result) => {
    if (localStorage.getItem("token") === null) {
      this.props.handleShow();
      return;
    }
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

    const start = this.state.categories[source.droppableId];
    const finish = this.state.categories[destination.droppableId];

    if (start === finish) {
      const newTopicIds = Array.from(start.topicIds);
      newTopicIds.splice(source.index, 1);
      newTopicIds.splice(destination.index, 0, draggableId);
      console.log(draggableId);

      const newCategory = {
        ...start,
        topicIds: newTopicIds,
      };

      const categoriesNew = {
        ...this.state.categories,
        [newCategory._id]: newCategory,
      };

      this.setState({ categories: categoriesNew });
      return;
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

    const categoriesNew1 = {
      ...this.state.categories,
      [newStart._id]: newStart,
      [newFinish._id]: newFinish,
    };

    this.setState({ categories: categoriesNew1 });
  };

  render() {
    return (
      <div>
        <Modal show={this.state.showModal} onHide={this.handleClose} centered>
          <div className="modalbody">
            <Modal.Body>
              <TopicForm
                projectID={this.state.projectID}
                handleTopicSubmission={this.handleTopicSubmission}
              />
            </Modal.Body>
          </div>
        </Modal>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div className="projectCards">
            {this.state.categoriesArray.map((categoryID) => {
              const category = this.state.categories[categoryID._id];
              return (
                <Card
                  className="projectCard"
                  bg="light"
                  style={{ width: "21rem" }}
                  key={category._id}
                >
                  <Card.Header color="#366FF0" className="projectcardheader">
                    {category.categoryName}
                  </Card.Header>
                  <Droppable droppableId={category._id}>
                    {(provided) => (
                      <div
                        className="cardcontent"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        {category.topicIds.map((topicid, index) => {
                          const topic = this.state.Topics[topicid];
                          if (topic) {
                            return (
                              <Draggable draggableId={topic._id} index={index}>
                                {(provided) => (
                                  <Card
                                    onClick={() =>
                                      this.props.handleDiscussionTrue(topic)
                                    }
                                    key={topic._id}
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
                          }
                        })}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                  <div
                    className="addnewcard"
                    onClick={() => this.handleShow(category._id)}
                  >
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
      </div>
    );
  }
}
export default Projects;
