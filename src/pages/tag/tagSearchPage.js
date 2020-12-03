import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Badge } from "react-bootstrap";
import NavBar from "../../components/navbar/navbar";
import CategoryTopicCard from "../../components/common/categoryTopicCard";
import { tagSearch } from "../../reducers/tagSlice";

function TagSearchPage(props) {
  const {
    match: { params },
  } = props;
  const tagTopics = useSelector((state) => state.tag.search);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(tagSearch({ _id: params.id}));
  }, params.id);

  if (tagTopics.isCompleted) {
    return (
      <Container fluid>
        <NavBar history={props.history} />
        <Container className="primary-container">
          <Row className="center-row">
            <Col>
              <h2 className="dashboard-category-name">
                Topics (Tag: {" "}
                <Badge
                  pill
                  variant=""
                  className="primary-big-tag"
                  style={{ backgroundColor: tagTopics.tag.hexColorCode }}
                >
                  {tagTopics.tag.name}
                </Badge>)
              </h2>
            </Col>
          </Row>
          <Row className="tag-page-topics-container">
            {tagTopics.topics.map((topic) => (
              <Col md="6">
                <CategoryTopicCard
                  entityType="topic"
                  category={{ _id: topic.parentCategory }}
                  topic={topic}
                />
              </Col>
            ))}
          </Row>
        </Container>
      </Container>
    );
  } else {
    return null;
  }
}

export default TagSearchPage;
