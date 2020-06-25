import React, { Component } from "react";
import { Navbar, Nav, Button, Tab, Tabs, Modal } from "react-bootstrap";
import "./navbar.scss";
import LoginForm from "../loginform/loginform";
import SignUpForm from "../signupform/signupform";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
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
      <div>
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
      </div>
    );
  }
}

export default NavBar;
