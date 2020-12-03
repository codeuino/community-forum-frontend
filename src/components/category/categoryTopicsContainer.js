import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col } from "react-bootstrap";
import { getCategoryTopics } from "../../reducers/topicSlice";
import CategoryTopicCard from "../common/categoryTopicCard";

function CategoryTopicsContainer(props) {
  const topics = useSelector((state) => state.topic.get.topics);
  const dispatch = useDispatch();
  const prevCurrentCategoryRef = useRef();
  useEffect(() => {
    if (prevCurrentCategoryRef.current?.id || (prevCurrentCategoryRef.current?._id != props.currentCategory._id)) {
      dispatch(getCategoryTopics({_id: props.currentCategory._id}));
    }
    prevCurrentCategoryRef.current = props.currentCategory;
  });
  const currentCategory = props.currentCategory._id;
  if (topics[currentCategory] != undefined) {
    return (
      <Row>
        {topics[currentCategory].map((topic) => (
          <Col md={props.columnValue}>
            <CategoryTopicCard
              entityType="topic"
              category={props.currentCategory}
              topic={topic}
            />
          </Col>
        ))}
      </Row>
    );
  } else {
    return null;
  }
}

export default CategoryTopicsContainer;
