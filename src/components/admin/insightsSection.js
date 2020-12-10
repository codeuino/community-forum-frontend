import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { getOrganizationData } from "../../reducers/orgSlice";

function InsightsSection(props) {
  const adminsModerators = useSelector((state) => state.org.orgData);
  const users = useSelector((state) => state.user.usersData);
  const organizationData = useSelector((state) => state.org.orgData.data);
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      Object.keys(organizationData).length == 0
    ) {
      dispatch(getOrganizationData());
    }
    });

  return (
    <React.Fragment>
      <h2 className="main-heading">Insights</h2>
      <Row className="center-row admin-insights-row">
        <Col sm={6} lg={3}>
          <div className="admin-insights-card">
            <h3>{adminsModerators.admins.length}</h3>
            <h6>Admins</h6>
          </div>
        </Col>
        <Col sm={6} lg={3}>
          <div className="admin-insights-card">
            <h3>{adminsModerators.moderators.length}</h3>
            <h6>Moderators</h6>
          </div>
        </Col>
        <Col sm={6} lg={3}>
          <div className="admin-insights-card">
            <h3>{users.users.length}</h3>
            <h6>Users</h6>
          </div>
        </Col>
        <Col sm={6} lg={3}>
          <div className="admin-insights-card">
            <h3>{users.blockedUsers.length}</h3>
            <h6>Blocked Users</h6>
          </div>
        </Col>
      </Row>
      <Row className="center-row admin-insights-row">
        <Col sm={6} lg={3}>
          <div className="admin-insights-card">
            <h3>{organizationData.categories}</h3>
            <h6>Categories</h6>
          </div>
        </Col>
        <Col sm={6} lg={3}>
          <div className="admin-insights-card">
            <h3>{organizationData.topics}</h3>
            <h6>Topics</h6>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default InsightsSection;
