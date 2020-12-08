import React, { useState } from "react";
import { Row, Col, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
// import BlockModal from "../../components/user/user/blockUserModal";
// import DeleteModal from "../../components/common/deleteModal";

function MembersCard(props) {
  const [currentUser, setCurrentUser] = useState({});
  const {
    memberType,
    user,
  } = props;

  return (
    <Col md={6} lg={6} xl={4}>
      {" "}
      <React.Fragment>
        <div className="admin-user-card-container">
          <Row>
            <Col xs={3}>
              <AccountCircleIcon className="admin-user-icon" />
            </Col>
            <Col xs={8}>
              <Link className="common-card-link" to={`/profile/${user._id}`}>
                <h3 className="admin-user-card-heading">
                  {user.name.firstName}
                </h3>
              </Link>
              <h6 className="admin-user-card-email">{user.email}</h6>
              <h6 className="admin-user-card-description">
                <span>Joined:</span> {user.createdAt.slice(0, 10)}
              </h6>
            </Col>
            {!user.isFirstAdmin && (
              <Col xs={1}>
                <Dropdown>
                  <Dropdown.Toggle variant=""></Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      href=""
                      onClick={() => {
                        setCurrentUser(user);
                        props.handleOpenBlock();
                      }}
                    >
                      {memberType == "blocked" ? "Unblock User" : "Block User"}
                    </Dropdown.Item>
                    <Dropdown.Item
                      href=""
                      onClick={() => {
                        setCurrentUser(user);
                        props.handleOpenDelete();
                      }}
                    >
                      Remove Account
                    </Dropdown.Item>
                    {memberType != "blocked" &&
                      (memberType == "moderator" || memberType == "user") && (
                        <Dropdown.Item
                          href=""
                          onClick={() => {
                            props.changeAccess("makeAdmin", user._id);
                          }}
                        >
                          Make Admin
                        </Dropdown.Item>
                      )}
                    {memberType != "blocked" &&
                      (memberType == "admin" || memberType == "user") && (
                        <Dropdown.Item
                          href=""
                          onClick={() => {
                            props.changeAccess("makeModerator", user._id);
                          }}
                        >
                          Make Moderator
                        </Dropdown.Item>
                      )}
                    {memberType != "blocked" && memberType == "admin" && (
                      <Dropdown.Item
                        href=""
                        onClick={() => {
                          props.changeAccess("removeAdmin", user._id);
                        }}
                      >
                        Remove Admin
                      </Dropdown.Item>
                    )}
                    {memberType != "blocked" && memberType == "moderator" && (
                      <Dropdown.Item
                        href=""
                        onClick={() => {
                          props.changeAccess("removeModerator", user._id);
                        }}
                      >
                        Remove Moderator
                      </Dropdown.Item>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            )}
          </Row>
        </div>
      </React.Fragment>
    </Col>
  );
}

export default MembersCard;