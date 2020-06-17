import React from "react";
import { Nav } from "react-bootstrap";
import { withRouter } from "react-router";
import "./sidebar.scss";

const Side = (props) => {
  return (
    <>
      <Nav
        className="col-md-12 d-none d-md-block sidebar navbarcolor"
        onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
      >
        <div className="sidebar-sticky">
          <div>
            <Nav.Item>
              <div className="category">Discussion</div>
            </Nav.Item>
            <Nav.Item>
              <div className="category-items">
                {props.DiscussionInfo.Discussion.chats.length} Discussion
              </div>
              <div className="category-items">0 Documents Shared</div>
              <div className="category-items">
                {props.UserInfo.UserEngaged.length} Users Participated
              </div>
            </Nav.Item>
          </div>
          <div>
            <Nav.Item>
              <div className="category">Users</div>
            </Nav.Item>
            <Nav.Item>
              {props.UserInfo.UserEngaged.map((user) => {
                return <div className="category-items">{user}</div>;
              })}
            </Nav.Item>
          </div>
        </div>
      </Nav>
    </>
  );
};
const Sidebar = withRouter(Side);
export default Sidebar;
