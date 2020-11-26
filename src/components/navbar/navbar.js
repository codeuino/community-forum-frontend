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
import { logout } from "../../reducers/authSlice";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoginModal: false,
      showSignupModal: false,
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

