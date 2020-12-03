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
import UpdateUserModal from "../user/user/updateUserModal";
import { logout } from "../../reducers/authSlice";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { handleModal } from "../../commonFunctions/handleModal";
import PersonIcon from "@material-ui/icons/Person";
import MenuIcon from "@material-ui/icons/Menu";

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

  render() {
    return (
      <div>
        <LoginModal
          showModal={this.state.showLoginModal}
          handleClose={() => {
            this.setState(handleModal("login", "close"));
          }}
          handleShow={() => {
            this.setState(handleModal("login", "open"));
          }}
          handleSignupShow={() => {
            this.setState(handleModal("signup", "open"));
          }}
        />
        <SignUpModal
          showModal={this.state.showSignupModal}
          handleClose={() => {
            this.setState(handleModal("signup", "close"));
          }}
          handleShow={() => {
            this.setState(handleModal("signup", "open"));
          }}
        />
        {this.props.isLoggedIn && this.props.currentUser.isFirstAdmin && (
          <UpdateOrganizationModal
            showModal={this.state.showUpdateOrganizationModal}
            handleClose={() => {
              this.setState(handleModal("updateOrg", "close"));
            }}
            handleShow={() => {
              this.setState(handleModal("updateOrg", "open"));
            }}
          />
        )}
        {this.props.isLoggedIn && (
          <UpdateUserModal
            showModal={this.state.showUpdateUserModal}
            handleClose={() => {
              this.setState(handleModal("updateUser", "close"));
            }}
            handleShow={() => {
              this.setState(handleModal("updateUser", "open"));
            }}
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
            {this.props.history.location.pathname == "/" ? (
              <span className="navbar-brand">
                <MenuIcon onClick={this.props.toggleSidebar} />
                SPANSBERRY
              </span>
            ) : (
              <span className="navbar-brand">
                SPANSBERRY
              </span>
            )}
          </Link>
          <Nav className="ml-auto">
            {this.props.isLoggedIn ? (
              <React.Fragment>
                <PersonIcon className="navbar-user-image" />
                <NavDropdown
                  title={this.props.currentUser.name.firstName}
                  className="navbar-user-dropdown"
                >
                  <NavDropdown.Item>
                    <div
                      onClick={() => {
                        this.setState(handleModal("updateUser", "open"));
                      }}
                    >
                      Edit Profile
                    </div>
                  </NavDropdown.Item>
                  {this.props.currentUser.isAdmin && (
                    <React.Fragment>
                      <NavDropdown.Item>
                        <div
                          onClick={() => {
                            this.props.history.push("/admin");
                          }}
                        >
                          Admin Dashboard
                        </div>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <div
                          onClick={() => {
                            this.setState(handleModal("updateOrg", "open"));
                          }}
                        >
                          Update Organization
                        </div>
                      </NavDropdown.Item>
                    </React.Fragment>
                  )}
                  <NavDropdown.Item>
                    <div onClick={this.props.logout}>
                      <ExitToAppIcon />
                      Logout
                    </div>
                  </NavDropdown.Item>
                </NavDropdown>
              </React.Fragment>
            ) : (
              <Button
                variant=""
                className="primary-button navbar-button"
                onClick={() => {
                  this.setState(handleModal("login", "open"));
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
