import React, { Component } from "react";
import { Container, Row, Col, Button, Tab, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { toggleMaintenanceMode } from "../../reducers/orgSlice";
import NavBar from "../../components/navbar/navbar";
import PowerIcon from "@material-ui/icons/Power";
import GroupIcon from "@material-ui/icons/Group";
import EqualizerIcon from "@material-ui/icons/Equalizer";

class AdminPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container fluid>
        <NavBar history={this.props} />
        <Container className="container-mid admin-page-container">
          <Tab.Container defaultActiveKey="members">
            <Row>
              <Col sm={3} className="admin-page-tab-selector">
                <Nav variant="pills">
                  <Nav.Item>
                    <Nav.Link eventKey="members">
                      <GroupIcon />
                      Members
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="statistics">
                      <EqualizerIcon />
                      Statistics
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="maintenance">
                      <PowerIcon />
                      Maintenance Mode
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="maintenance">
                    <h2 className="main-heading">Maintenance Mode</h2>
                    <Row>
                      <Col>
                        <label className="primary-checkpoint-container admin-page-checkpoint-container">
                          <h6>Toggle Maintenance Mode :</h6>
                          <input
                            type="checkbox"
                            checked={this.props.organization.isUnderMaintenance}
                            onClick={() => {
                              this.props.toggleMaintenanceMode();
                            }}
                          ></input>
                          <div class="primary-checkpoint"></div>
                        </label>
                      </Col>
                    </Row>
                    <p className="admin-page-maintenance-text">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                  </Tab.Pane>
                  {/* <Tab.Pane eventKey="second">
                    <Sonnet />
                  </Tab.Pane> */}
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Container>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    currentUser: state.auth.currentUser,
    organization: state.org.get.org,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleMaintenanceMode: () => 
    dispatch(
      toggleMaintenanceMode()
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);
