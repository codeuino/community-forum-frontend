import React, { Component } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import "./navbar.scss"

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
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
    );
  }
}

export default NavBar;
