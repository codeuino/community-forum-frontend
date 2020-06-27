import React, { Component } from "react";
import { Form, FormControl, Button, Card } from "react-bootstrap";
import "./dashboard.scss";
import Projects from "../../components/projects/projects";
import NavBar from "../../components/navbar/navbar";
import Discussion from "../discussion/discussion";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      discussion: false,
    };
    this.handleDiscussionTrue = this.handleDiscussionTrue.bind(this);
    this.handleDiscussionFalse = this.handleDiscussionFalse.bind(this);
  }
  handleDiscussionTrue(discussionID) {
    this.setState({ discussion: true, discussionID: discussionID });
    console.log(discussionID);
  }
  handleDiscussionFalse(){
    this.setState({discussion: false})
  }

  render() {
    return (
      <div className="main">
        <NavBar />
        {this.state.discussion ? (
          <Discussion discussionID={this.state.discussionID} onClickingBack={this.handleDiscussionFalse} />
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
                  <Button variant="primary" className="bootstrapbutton">
                    Open Workspaces
                  </Button>
                </div>
              </div>
            </div>
            <Card className="card">
              <Projects handleDiscussionTrue={this.handleDiscussionTrue} />
            </Card>
          </div>
        )}
      </div>
    );
  }
}

export default Dashboard;
