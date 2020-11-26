import React, { Component } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ReactTooltip from "react-tooltip";
import NavBar from "../../components/navbar/navbar";
import UserCategoriesTopicsContainer from "../../components/user/user/userCategoriesTopicsContainer";
import BlockModal from "../../components/user/user/blockUserModal";
import DeleteModal from "../../components/common/deleteModal";
import {
  getUserProfile,
  clearCurrentUserProfile,
  blockUser,
  unblockUser,
  removeUser,
} from "../../reducers/userSlice";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import TwitterIcon from "@material-ui/icons/Twitter";
import BlockIcon from '@material-ui/icons/Block';
import { handleModal } from "../../commonFunctions/handleModal";

class UserProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showBlockModal: false,
      showDeleteModal: false,
    };
  }

  componentWillMount() {
    const {
      match: { params },
    } = this.props;
    this.props.getUserProfile(params.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.userProfile.isRemoved) {
      this.props.history.push("/");
    }
    ReactTooltip.rebuild();
    const {
      match: { params },
    } = this.props;
    if (
      !prevProps.isBlockCompleted &&
      prevProps.isBlockCompleted != this.props.isBlockCompleted
    ) {
      this.props.getUserProfile(params.id);
    }
    if (
      !prevProps.isOtherUserDeleteCompleted &&
      prevProps.isOtherUserDeleteCompleted != this.props.isOtherUserDeleteCompleted &&
      localStorage.getItem("token") != null
    ) {
      console.log(localStorage.getItem("token"));
      this.props.history.push("/");
    }
  }

  componentWillUnmount() {
    this.props.clearUserProfile();
  }

  onBlockSubmit = (action) => {
    switch (action) {
      case "block": {
        this.props.blockUser(this.props.userProfile._id);
        break;
      }
      case "unblock": {
        this.props.unblockUser(this.props.userProfile._id);
        break;
      }
    }
  };

  onDeleteSubmit = () => {
    this.props.removeUser(this.props.userProfile._id);
  };

  render() {
    const modalAction = this.props.userProfile.isBlocked ? "Unblock" : "Block";
    const modalDescription = this.props.userProfile.isBlocked
      ? "on the platform. The user will get complete user-access rights to communicate."
      : "from the platform. The user won't be able to perform any action until allowed access again.";
    return (
      <React.Fragment>
        {Object.keys(this.props.userProfile).length != 0 &&
          !this.props.userProfile.isRemoved && (
            <Container fluid>
              <NavBar history={this.props.history} />
              <Container className="primary-container">
                <Row className="center-row user-details-container">
                  <Col md={4} className="user-image">
                    <AccountCircleIcon />
                  </Col>
                  <Col md={8} className="user-details">
                    <h2>
                      {this.props.userProfile.isBlocked && (
                        <BlockIcon data-tip="This user had been blocked" />
                      )}
                      {this.props.userProfile.name.firstName}{" "}
                      {this.props.userProfile.name.lastName}
                    </h2>
                    <h5>{this.props.userProfile.info.about.designation}</h5>
                    <h6>
                      {this.props.userProfile.info.about.shortDescription}
                    </h6>
                    <div className="user-anchor-text-container">
                      {this.props.userProfile.socialMedia?.twitter && (
                        <a
                          className="user-twitter-icon"
                          href={this.props.userProfile.socialMedia.twitter}
                        >
                          <TwitterIcon />
                        </a>
                      )}
                      {!this.props.userProfile.isFirstAdmin &&
                        this.props.currentUser.isAdmin && (
                          <React.Fragment>
                            <Link
                              className="anchor-text dashboard-anchor-text"
                              onClick={() => {
                                this.setState(handleModal("blockUser", "open"));
                              }}
                            >
                              {modalAction}
                            </Link>
                            <BlockModal
                              showModal={this.state.showBlockModal}
                              modalAction={modalAction}
                              handleClose={() => {
                                this.setState(
                                  handleModal("blockUser", "close")
                                );
                              }}
                              handleShow={() => {
                                this.setState(handleModal("blockUser", "open"));
                              }}
                              userName={this.props.userProfile.name}
                              modalDescription={modalDescription}
                              modalFunction={() => {
                                if (this.props.userProfile.isBlocked) {
                                  this.onBlockSubmit("unblock");
                                  return;
                                }
                                this.onBlockSubmit("block");
                              }}
                            />
                          </React.Fragment>
                        )}
                      {!this.props.userProfile.isFirstAdmin &&
                        this.props.currentUser.isAdmin && (
                          <React.Fragment>
                            <Link
                              className="anchor-danger-text dashboard-anchor-text"
                              onClick={() => {
                                this.setState(handleModal("delete", "open"));
                              }}
                            >
                              Delete
                            </Link>
                            <DeleteModal
                              showModal={this.state.showDeleteModal}
                              modalHeading="Account"
                              objectName={`${this.props.userProfile.name.firstName} ${this.props.userProfile.name.lastName}'s account`}
                              handleClose={() => {
                                this.setState(handleModal("delete", "close"));
                              }}
                              deleteFunction={this.onDeleteSubmit}
                            />
                          </React.Fragment>
                        )}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col className="user-categories-topics-container">
                    <UserCategoriesTopicsContainer
                      columnValue={6}
                      categoriesCreated={
                        this.props.userProfile.categoriesCreated
                      }
                      topicsCreated={this.props.userProfile.topicsCreated}
                    />
                  </Col>
                </Row>
              </Container>
              <ReactTooltip delayShow={500} effect="solid" data-border="true" />
            </Container>
          )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    currentUser: state.auth.currentUser,
    userProfile: state.user.getCurrent.userProfile,
    isBlockCompleted: state.user.block.isCompleted,
    isOtherUserDeleteCompleted: state.user.remove.isCompleted,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearUserProfile: () => dispatch(clearCurrentUserProfile()),
    getUserProfile: (_id) =>
      dispatch(
        getUserProfile({
          _id,
        })
      ),
    removeUser: (_id=null, email=null) => dispatch(
      removeUser({
        _id,
        email,
      })
    ),
    blockUser: (_id) =>
      dispatch(
        blockUser({
          _id,
        })
      ),
    unblockUser: (_id) =>
      dispatch(
        unblockUser({
          _id,
        })
      ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfilePage);
