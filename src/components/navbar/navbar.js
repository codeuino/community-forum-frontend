import React, { Component } from "react";
import {
  Navbar,
  Nav,
  Button,
  Tab,
  Tabs,
  Modal,
  NavDropdown,
  Form,
} from "react-bootstrap";
import "./navbar.scss";
import Announcements from "../announcements/announcement";
import Tasks from "../tasks/tasks";
import LoginForm from "../loginform/loginform";
import SignUpForm from "../signupform/signupform";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      isLogin: false,
      username: localStorage.getItem("username"),
    };
  }
  handleShowTask = () => {
    this.setState({ showModal: true });
  };
  handleShow = () => {
    this.setState({ showModal: true });
  };
  handleClose = () => {
    this.setState({ showModal: false });
  };
  handleLogin = () => {
    this.setState({
      isLogin: true,
      username: localStorage.getItem("username"),
    });
    this.props.handleClose();
  };
  handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    this.setState({ isLogin: false, username: null });
  };
  render() {
    return (
      <div>
        <Modal
          show={this.props.showModal}
          onHide={this.props.handleClose}
          centered
        >
          <div className="modalbody">
            <Modal.Body>
              <Tabs defaultActiveKey="login" id="uncontrolled-tab-example">
                <Tab eventKey="login" title="Login" className="logintab">
                  <LoginForm handleLogin={this.handleLogin} />
                </Tab>
                <Tab eventKey="signup" title="Sign Up" className="signuptab">
                  <SignUpForm handleClose={this.handleClose} />
                </Tab>
              </Tabs>
            </Modal.Body>
          </div>
        </Modal>
        <Modal
          show={this.state.showModal}
          onHide={this.state.handleClose}
          centered
        >
          <div className="modalbody">
            <Modal.Body>
              <Form.Group>
                <Form.Control type="text" placeholder="Description" />
              </Form.Group>
            </Modal.Body>
          </div>
        </Modal>
        <Navbar bg="light" variant="light" className="navbar">
          <Navbar.Brand className="header" href="#home">
            C-FORMS
          </Navbar.Brand>
          <Nav className="ml-auto">
            <NavDropdown title="Announcements" id="collasible-nav-dropdown">
              <Announcements />
            </NavDropdown>
            <NavDropdown title="Tasks" id="collasible-nav-dropdown">
              <Tasks />
            </NavDropdown>
            <Nav.Link href="#option2">Options</Nav.Link>
            <Nav.Link href="#option3">Options</Nav.Link>
            {this.state.username ? (
              <NavDropdown
                title={this.state.username}
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item>
                  <div onClick={this.handleLogout}>Logout</div>
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Button
                variant="outline-primary"
                className="bootstrapbutton"
                onClick={this.props.handleShow}
              >
                Login/Signup
              </Button>
            )}
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
