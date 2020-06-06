import React, { Component } from "react";
import {
  Navbar,
  Nav,
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
        <Navbar bg="light" variant="light" className="navbar">
          <Navbar.Brand className="header" href="#home">
            C-FORMS
          </Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="#option1">Options</Nav.Link>
            <Nav.Link href="#option2">Options</Nav.Link>
            <Nav.Link href="#option3">Options</Nav.Link>
            <Button
              variant="outline-primary"
              className="bootstrapbutton"
              onClick={this.handleShow}
            >
              Login/Signup
            </Button>
          </Nav>
        </Navbar>
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
