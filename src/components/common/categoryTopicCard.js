import React from "react";
import { Row, Col, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import ForumRoundedIcon from "@material-ui/icons/ForumRounded";
import NotesRoundedIcon from "@material-ui/icons/NotesRounded";
import ChatBubbleOutlineRoundedIcon from "@material-ui/icons/ChatBubbleOutlineRounded";
import BubbleChartRoundedIcon from "@material-ui/icons/BubbleChartRounded";
import ArchiveIcon from "@material-ui/icons/Archive";

function CategoryTopicCard(props) {
  const {
    entityType,
    category,
    topic
  } = props;
  let linkValue, entity;
  switch (entityType) {
    case "category": {
      linkValue = `/category/${category._id}`
      entity = category;
      break;
    }
    case "topic": {
      linkValue = `/category/${category._id}/topic/${topic._id}`;
      entity = topic;
      break;
    }
  }
  return (
    <React.Fragment>
      <Link className="common-card-link" to={linkValue}>
        <div className="common-card-container">
          <Row>
            <Col md={10}>
              <Row>
                {entity.isArchived && (
                  <ArchiveIcon className="common-card-icon" />
                )}
                {!entity.isArchived &&
                  (entityType == "category" ? (
                    <ForumRoundedIcon className="common-card-icon" />
                  ) : (
                    <NotesRoundedIcon className="common-card-icon" />
                  ))}
                <h3 className="common-card-heading">{entity.name}</h3>
              </Row>
              {entityType == "topic" && (
                <Row>
                  {entity.tags.length != 0 &&
                    entity.tags.map((tag) => (
                      <Badge
                        pill
                        variant=""
                        className="primary-tag"
                        style={{ backgroundColor: tag.hexColorCode }}
                      >
                        <Link to={`/tag/${tag._id}`}>{tag.name}</Link>
                      </Badge>
                    ))}
                </Row>
              )}
              <Row>
                <h6 className="common-card-description">
                  {entity.description}
                </h6>
              </Row>
            </Col>
            <Col md={2}>
              <div className="common-card-count-container">
                {entityType == "category" ? (
                  <React.Fragment>
                    <BubbleChartRoundedIcon />
                    <h6>{entity.topics.length}</h6>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <ChatBubbleOutlineRoundedIcon />
                    <h6>{entity.chats.length}</h6>
                  </React.Fragment>
                )}
              </div>
            </Col>
          </Row>
        </div>
      </Link>
    </React.Fragment>
  );
}

export default CategoryTopicCard;
