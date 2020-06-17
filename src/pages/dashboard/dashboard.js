import React, { Component } from "react";
import {
  Form,
  FormControl,
  Button,
  Card,
  Modal,
  Tabs,
  Tab,
} from "react-bootstrap";
import "./dashboard.scss";
import LoginForm from "../../components/loginform/loginform";
import SignUpForm from "../../components/signupform/signupform"
import Projects from "../../components/projects/projects";
import NavBar from "../../components/navbar/navbar"

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      email: "",
      password: "",
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleShow() {
    this.setState({ showModal: true });
  }
  handleClose() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <div className="main">
        <Modal show={this.state.showModal} onHide={this.handleClose} centered>
          <div className="modalbody">
            <Modal.Body>
              <Tabs defaultActiveKey="login" id="uncontrolled-tab-example">
                <Tab eventKey="login" title="Login" className="logintab">
                  <LoginForm />
                </Tab>
                <Tab eventKey="signup" title="Sign Up" className="signuptab">
                  <SignUpForm />
                </Tab>
              </Tabs>
            </Modal.Body>
          </div>
        </Modal>
        <NavBar/>
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
                <Button variant="primary" className="bootstrapbutton">
                  Open Workspaces
                </Button>
              </div>
            </div>
          </div>
          <Card className="card">
            <Projects />
          </Card>
        </div>
      </div>
    );
  }
}

export default Dashboard;
