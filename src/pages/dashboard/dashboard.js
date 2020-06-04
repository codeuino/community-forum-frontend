import React, { Component } from "react";
import { Navbar, Nav, Form, FormControl, Button, Card } from "react-bootstrap";
import "./dashboard.scss";
import Projects from '../../components/projects/projects'


class Dashboard extends Component {
  render() {
    return (
      <div className="main">
        <Navbar bg="light" variant="light" className="navbar">
          <Navbar.Brand className="header" href="#home">
            C-FORMS
          </Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="#option1">Options</Nav.Link>
            <Nav.Link href="#option2">Options</Nav.Link>
            <Nav.Link href="#option3">Options</Nav.Link>
            <Button variant="outline-primary" className="bootstrapbutton">
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
            <Projects/>
          </Card>
        </div>
      </div>
    );
  }
}

export default Dashboard;
