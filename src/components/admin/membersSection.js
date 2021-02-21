import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import {
  getUsers,
  blockUser,
  unblockUser,
  removeUser,
} from "../../reducers/userSlice";
import { 
  getAdminsModerators,
  makeAdmin,
  makeModerator,
  removeAdmin,
  removeModerator, 
} from "../../reducers/orgSlice";
import MembersCard from "./membersCard";
import { handleModal } from "../../commonFunctions/handleModal";
import BlockModal from "../../components/user/user/blockUserModal";
import DeleteModal from "../../components/common/deleteModal";

class MembersSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showBlockModal: false,
      showDeleteModal: false,
      currentUser: {},
    };
  }

  componentDidMount() {
    this.props.getUsers();
    this.props.getAdminsModerators();
  }

  componentDidUpdate(prevProps) {
    if (
      (!prevProps.isChangeAccessCompleted &&
      prevProps.isChangeAccessCompleted !==
        this.props.isChangeAccessCompleted) ||
      (!prevProps.isBlockCompleted &&
      prevProps.isBlockCompleted !== 
        this.props.isBlockCompleted)
    ) {
      this.props.getUsers();
      this.props.getAdminsModerators();
    }
    if (
      !prevProps.isOtherUserDeleteCompleted &&
      prevProps.isOtherUserDeleteCompleted !==
        this.props.isOtherUserDeleteCompleted &&
      localStorage.getItem("token") !== null
    ) {
      this.props.getUsers();
      this.props.getAdminsModerators();
    }
  }

  onBlockSubmit = (action, _id) => {
    switch (action) {
      case "block": {
        this.props.blockUser(_id);
        break;
      }
      case "unblock": {
        this.props.unblockUser(_id);
        break;
      }
    }
  };

  onDeleteSubmit = (_id) => {
    this.props.removeUser(_id);
  };

  changeAccess = (action, _id) => {
    switch (action) {
      case "makeAdmin": {
        this.props.makeAdmin(_id);
        break;
      }
      case "removeAdmin": {
        this.props.removeAdmin(_id);
        break;
      }
      case "makeModerator": {
        this.props.makeModerator(_id);
        break;
      }
      case "removeModerator": {
        this.props.removeModerator(_id);
        break;
      }
    }
  };

  setCurrentUser = (user) => {
    this.setState({currentUser: user});
  }

  render() {
    const modalAction = this.state.currentUser?.isBlocked ? "Unblock" : "Block";
    const modalDescription = this.state.currentUser?.isBlocked
      ? "on the platform. The user will get complete user-access rights to communicate."
      : "from the platform. The user won't be able to perform any action until allowed access again.";
    
    return (
      <React.Fragment>
        <h2 className="main-heading">Members</h2>
        {this.props.adminsModerators.admins.length !== 0 && (
          <Row className="center-row">
            <Col xs={12}>
              <h2 className="admin-members-heading">Admins :</h2>
            </Col>
            {this.props.adminsModerators.admins.map((user) => (
              <MembersCard
                key={user._id}
                user={user}
                memberType="admin"
                handleOpenBlock={() => {
                  this.setState(handleModal("blockUser", "open"));
                }}
                handleOpenDelete={() => {
                  this.setState(handleModal("delete", "open"));
                }}
                changeAccess={this.changeAccess}
                setCurrentUser={this.setCurrentUser}
              />
            ))}
          </Row>
        )}
        {this.props.adminsModerators.moderators.length !== 0 && (
          <Row className="center-row">
            <Col xs={12}>
              <h2 className="admin-members-heading">Moderators :</h2>
            </Col>
            {this.props.adminsModerators.moderators.map((user) => (
              <MembersCard
                key={user._id}
                user={user}
                memberType="moderator"
                handleOpenBlock={() => {
                  this.setState(handleModal("blockUser", "open"));
                }}
                handleOpenDelete={() => {
                  this.setState(handleModal("delete", "open"));
                }}
                changeAccess={this.changeAccess}
                setCurrentUser={this.setCurrentUser}
              />
            ))}
          </Row>
        )}
        {this.props.users.users.length !== 0 && (
          <Row className="center-row">
            <Col xs={12}>
              <h2 className="admin-members-heading">Users :</h2>
            </Col>
            {this.props.users.users.map((user) => (
              <MembersCard
                key={user._id}
                user={user}
                memberType="user"
                handleOpenBlock={() => {
                  this.setState(handleModal("blockUser", "open"));
                }}
                handleOpenDelete={() => {
                  this.setState(handleModal("delete", "open"));
                }}
                changeAccess={this.changeAccess}
                setCurrentUser={this.setCurrentUser}
              />
            ))}
          </Row>
        )}
        {this.props.users.blockedUsers.length !== 0 && (
          <Row className="center-row">
            <Col xs={12}>
              <h2 className="admin-members-heading">Blocked Users :</h2>
            </Col>
            {this.props.users.blockedUsers.map((user) => (
              <MembersCard
                key={user._id}
                user={user}
                memberType="blocked"
                handleOpenBlock={() => {
                  this.setState(handleModal("blockUser", "open"));
                }}
                handleOpenDelete={() => {
                  this.setState(handleModal("delete", "open"));
                }}
                changeAccess={this.changeAccess}
                setCurrentUser={this.setCurrentUser}
              />
            ))}
          </Row>
        )}
        {Object.keys(this.state.currentUser).length !== 0 && (
          <React.Fragment>
            <BlockModal
              showModal={this.state.showBlockModal}
              modalAction={modalAction}
              handleClose={() => {
                this.setState(handleModal("blockUser", "close"));
              }}
              handleShow={() => {
                this.setState(handleModal("blockUser", "open"));
              }}
              userName={this.state.currentUser.name}
              modalDescription={modalDescription}
              modalFunction={() => {
                if (this.state.currentUser.isBlocked) {
                  this.onBlockSubmit("unblock", this.state.currentUser._id);
                  return;
                }
                this.onBlockSubmit("block", this.state.currentUser._id);
              }}
            />
            <DeleteModal
              showModal={this.state.showDeleteModal}
              modalHeading="Account"
              objectName={`${this.state.currentUser.name.firstName} ${this.state.currentUser.name.lastName}'s account`}
              handleClose={() => {
                this.setState(handleModal("delete", "close"));
              }}
              handleShow={() => {
                this.setState(handleModal("delete", "open"));
              }}
              deleteFunction={() => {
                this.onDeleteSubmit(this.state.currentUser._id);
              }}
            />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.user.usersData,
    adminsModerators: state.org.orgData,
    isChangeAccessCompleted: state.org.changeAccess.isCompleted,
    isBlockCompleted: state.user.block.isCompleted,
    isOtherUserDeleteCompleted: state.user.remove.isCompleted,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: () => dispatch(getUsers()),
    getAdminsModerators: () => dispatch(getAdminsModerators()),
    removeUser: (_id = null, email = null) =>
      dispatch(
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
    makeAdmin: (_id) =>
      dispatch(
        makeAdmin({
          _id,
        })
      ),
    makeModerator: (_id) =>
      dispatch(
        makeModerator({
          _id,
        })
      ),
    removeAdmin: (_id) =>
      dispatch(
        removeAdmin({
          _id,
        })
      ),
    removeModerator: (_id) =>
      dispatch(
        removeModerator({
          _id,
        })
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MembersSection);
