import React from "react";
import { Row, Col, Tabs, Tab } from "react-bootstrap";
import CategoryTopicCard from "../../common/categoryTopicCard";

function UserCategoriesTopicsContainer(props) {
  return (
    <Tabs variant="pills" defaultActiveKey="categories">
      <Tab
        eventKey="categories"
        title={`Categories (${props.categoriesCreated.length})`}
      >
        <Row className="user-categories-topics-list">
          {props.categoriesCreated.map((category) => (
            <Col md={props.columnValue}>
              <CategoryTopicCard entityType="category" category={category} />
            </Col>
          ))}
        </Row>
      </Tab>
      <Tab
        eventKey="topics"
        title={`Topics (${props.topicsCreated.length})`}
      >
        <Row className="user-categories-topics-list">
          {props.topicsCreated.map((topic) => (
            <Col md={props.columnValue}>
              <CategoryTopicCard
                entityType="topic"
                category={{ _id: topic.parentCategory }}
                topic={topic}
              />
            </Col>
          ))}
        </Row>
      </Tab>
    </Tabs>
  );
}

export default UserCategoriesTopicsContainer;