import React, { Component, createRef } from "react";
import {
  Navbar,
  Nav,
  Button,
  NavDropdown,
} from "react-bootstrap";
import { connect } from "react-redux";
import { HashLink as Link } from "react-router-hash-link";
import LoginModal from "../user/auth/loginModal";
import SignUpModal from "../user/auth/signupModal";
import UpdateOrganizationModal from "../organization/updateOrganizationModal";
import { logout } from "../../reducers/authSlice";
import UpdateUserModal from "../user/user/updateUserModal";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoginModal: false,
      showSignupModal: false,
      showUpdateOrganizationModal: false,
      showUpdateUserModal: false,
    };
  }
  navbarRef = createRef();

  smoothScroll = (el) => {
    window.scrollTo({
      top: el.offsetTop - this.navbarRef.current.offsetHeight,
      left: 0,
      behavior: "smooth",
    });
  };

  scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  handleModalShow = (modalName) => {
    switch (modalName) {
      case "login": {
        this.setState({
          showLoginModal: true,
        });
        break;
      }
      case "signup": {
        this.setState({
          showLoginModal: false,
          showSignupModal: true,
        });
        break;
      }
      case "updateOrg": {
        this.setState({
          showUpdateOrganizationModal: true,
        });
        break;
      }
      case "updateUser": {
        this.setState({
          showUpdateUserModal: true,
        });
        break;
      }
    }
  };

  handleModalClose = (modalName) => {
    switch (modalName) {
      case "login": {
        this.setState({
          showLoginModal: false,
        });
        break;
      }
      case "signup": {
        this.setState({
          showSignupModal: false,
        });
        break;
      }
      case "updateOrg": {
        this.setState({
          showUpdateOrganizationModal: false,
        });
        break;
      }
      case "updateUser": {
        this.setState({
          showUpdateUserModal: false,
        });
        break;
      }
    }
  };

  render() {
    return (
      <div>
        <LoginModal
          showModal={this.state.showLoginModal}
          handleClose={this.handleModalClose}
          handleShow={this.handleModalShow}
        />
        <SignUpModal
          showModal={this.state.showSignupModal}
          handleClose={this.handleModalClose}
          handleShow={this.handleModalShow}
        />
        {this.props.isLoggedIn && this.props.currentUser.isFirstAdmin && (
          <UpdateOrganizationModal
            showModal={this.state.showUpdateOrganizationModal}
            handleClose={this.handleModalClose}
            handleShow={this.handleModalShow}
          />
        )}
        {this.props.isLoggedIn && (
          <UpdateUserModal
            showModal={this.state.showUpdateUserModal}
            handleClose={this.handleModalClose}
            handleShow={this.handleModalShow}
            history={this.props.history}
          />
        )}
        <Navbar
          bg="light"
          variant="light"
          fixed="top"
          className="navbar-container"
        >
          <Link to="" onClick={this.scrollToTop}>
            <span className="navbar-brand">SPANSBERRY</span>
          </Link>
          <Nav className="ml-auto">
            {this.props.isLoggedIn ? (
              <NavDropdown
                title={this.props.currentUser.name.firstName}
                className="navbar-user-dropdown"
              >
                {this.props.currentUser.isFirstAdmin && (
                  <NavDropdown.Item>
                    <div
                      onClick={() => {
                        this.handleModalShow("updateOrg");
                      }}
                    >
                      Update <br />
                      Organization
                    </div>
                  </NavDropdown.Item>
                )}
                <NavDropdown.Item>
                  <div
                    onClick={() => {
                      this.handleModalShow("updateUser");
                    }}
                  >
                    Edit <br />
                    Profile
                  </div>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <div onClick={this.props.logout}>Logout</div>
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Button
                variant=""
                className="primary-button navbar-button"
                onClick={() => {
                  this.handleModalShow("login");
                }}
              >
                Login
              </Button>
            )}
          </Nav>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    currentUser: state.auth.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(
        logout()
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);

