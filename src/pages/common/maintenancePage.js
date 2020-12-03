import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import maintenanceImage from "../../assets/images/maintenance.svg";
import PowerIcon from "@material-ui/icons/Power";

function MaintenancePage() {
  return (
    <Container className="common-page-maintenance-container">
      <Row className="center-row">
        <Col>
          <h2 className="main-heading">
            <PowerIcon />
            Under Maintenance
          </h2>
          <Image
            src={maintenanceImage}
            className="common-page-maintenance-image"
          />
          <h6 className="common-page-maintenance-message">
            We are currently under maintenance. Apologies for the
            inconvenience caused. Please check back sometime later.
          </h6>
        </Col>
      </Row>
    </Container>
  );
}
export default MaintenancePage;