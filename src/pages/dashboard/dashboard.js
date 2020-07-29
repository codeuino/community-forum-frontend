import React, { Component } from "react";
import { Form, FormControl, Button, Card, Modal } from "react-bootstrap";
import "./dashboard.scss";
import Projects from "../../components/projects/projects";
import NavBar from "../../components/navbar/navbar";
import Discussion from "../discussion/discussion";
import converttodict from "../../utils/dictConversion";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      discussion: false,
      showModal: false,
      showAddCategoryModal: false,
      Topics: "",
    };
  }

  handleAddCategory = (event) => {
    event.preventDefault();
    console.log(localStorage.getItem("token"));
    let requestBody = {
      query: `
        mutation {
          createCategories(categoryInput:{
            categoryName:"${this.state.category}",
          }){
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
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
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
  };

  handleAddCategoryModal = () => {
    if (localStorage.getItem("token") === null) {
      this.handleShow();
      return;
    }
    this.setState({ showAddCategoryModal: true });
  };

  handleShow = () => {
    this.setState({ showModal: true });
  };
  handleClose = () => {
    this.setState({ showModal: false, showAddCategoryModal: false });
  };

  handleChange = (params, event) => {
    event.preventDefault();
    if (params === "category") {
      this.setState({ category: event.target.value });
    }
  };

  handleDiscussionTrue = (Topics) => {
    if (localStorage.getItem("token") && localStorage.getItem("userId")) {
      this.setState({ Topics: Topics });
      this.setState({ discussion: true });
    } else {
      this.handleShow();
    }
  };
  handleDiscussionFalse = () => {
    this.setState({ discussion: false });
  };

  render() {
    return (
      <div className="main">
        <Modal
          show={this.state.showAddCategoryModal}
          onHide={this.handleClose}
          centered
        >
          <div className="modalbody">
            <Modal.Body>
              <Form onSubmit={this.handleAddCategory}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Category Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Category Name"
                    onChange={(e) => {
                      this.handleChange("category", e);
                    }}
                  />
                </Form.Group>
                <div className="cta-register">
                  <Button variant="primary" onClick={this.handleAddCategory}>
                    Add Category
                  </Button>
                </div>
              </Form>
            </Modal.Body>
          </div>
        </Modal>
        <NavBar
          showModal={this.state.showModal}
          handleShow={this.handleShow}
          handleClose={this.handleClose}
        />
        {this.state.discussion ? (
          <Discussion
            Topics={this.state.Topics}
            onClickingBack={this.handleDiscussionFalse}
          />
        ) : (
          <div className="content">
            <div className="start">
              <h1 className="highlight">Codeuino Board</h1>
              <div className="tools">
                <div className="search">
                  <Form inline>
                    <FormControl
                      type="text"
                      placeholder="Search"
                      className="mr-sm-2"
                    />
                    <Button variant="primary" className="bootstrapbutton">
                      Search
                    </Button>
                  </Form>
                </div>
                <div className="workspace">
                  <Button
                    variant="primary"
                    className="bootstrapbutton add-category"
                    onClick={this.handleAddCategoryModal}
                  >
                    Add Category
                  </Button>
                </div>
              </div>
            </div>
            <Card className="card">
              <Projects
                handleDiscussionTrue={this.handleDiscussionTrue}
                handleShow={this.handleShow}
              />
            </Card>
          </div>
        )}
      </div>
    );
  }
}

export default Dashboard;
