import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { getCategoryTopics } from "../../reducers/topicSlice";
import NotesRoundedIcon from "@material-ui/icons/NotesRounded";
import ChatBubbleOutlineRoundedIcon from "@material-ui/icons/ChatBubbleOutlineRounded";

class CategoryTopicsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getCategoryTopics(this.props.currentCategory);
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.currentCategory._id != this.props.currentCategory._id) {
      this.props.getCategoryTopics(this.props.currentCategory);
    }
  }

  render() {
    const currentCategory = this.props.currentCategory._id;
    if (this.props.topics[currentCategory] != undefined) {
      return (
        <React.Fragment>
          {this.props.topics[currentCategory].map((category) => (
            <React.Fragment>
              <div className="dashboard-topic-container">
                <Row>
                  <Col md={10}>
                    <Row>
                      <NotesRoundedIcon className="dashboard-topic-icon" />
                      <h3 className="dashboard-topic-heading">
                        {category.name}
                      </h3>
                    </Row>
                    <Row>
                      <h6 className="dashboard-topic-description">
                        {category.description}
                      </h6>
                    </Row>
                  </Col>
                  <Col md={2}>
                    <div className="dashboard-chat-count-container">
                      <ChatBubbleOutlineRoundedIcon />
                      <h6>{category.chats.length}</h6>
                    </div>
                  </Col>
                </Row>
              </div>
            </React.Fragment>
          ))}
        </React.Fragment>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    topics: state.topic.get.topics,
    error: state.topic.get.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCategoryTopics: (currentCategory) => {
      dispatch(
        getCategoryTopics({
          _id: currentCategory._id,
        })
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryTopicsContainer);
