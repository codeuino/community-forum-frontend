import React, { Component } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ReactTooltip from "react-tooltip";
import NavBar from "../../components/navbar/navbar";
import CategoryTopicsContainer from "../../components/category/categoryTopicsContainer";
import AddTopicModal from "../../components/topic/addTopicModal";
import UpdateCategoryModal from "../../components/category/updateCategoryModal";
import { getCategory, clearCurrentCategory } from "../../reducers/categorySlice";
import { getCategoryTopics } from "../../reducers/topicSlice";
import ReplyAllIcon from "@material-ui/icons/ReplyAll";
import BubbleChartRoundedIcon from "@material-ui/icons/BubbleChartRounded";
import InsertCommentOutlinedIcon from "@material-ui/icons/InsertCommentOutlined";
import TodayIcon from "@material-ui/icons/Today";
import ArchiveIcon from "@material-ui/icons/Archive";
import { handleModal } from "../../commonFunctions/handleModal";

class CategoryDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddTopicModal: false,
      showUpdateCategoryModal: false,
    };
  }

  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    this.props.getCategory(params.id);
  }

  componentDidUpdate(prevProps) {
    const {
      match: { params },
    } = this.props;
    ReactTooltip.rebuild();
    if (
      (!prevProps.isUpdateCompleted &&
        prevProps.isUpdateCompleted != this.props.isUpdateCompleted) ||
      (!prevProps.isArchiveCompleted &&
        prevProps.isArchiveCompleted != this.props.isArchiveCompleted)
    ) {
      this.props.getCategory(params.id);
    }
    if (
      !prevProps.isAddTopicCompleted &&
      prevProps.isAddTopicCompleted != this.props.isAddTopicCompleted
    ) {
      this.props.getCategory(params.id);
      this.props.getTopics(this.props.category);
    }
  }

  componentWillUnmount() {
    this.props.clearCategory();
  }

  render() {
    return (
      <Container fluid>
        <NavBar history={this.props.history} />
        <Container className="primary-container">
          <Row>
            <Col>
              {Object.keys(this.props.category).length != 0 && (
                <React.Fragment>
                  <h2 className="dashboard-category-name">
                    {this.props.category.isArchived && (
                      <ArchiveIcon
                        className="archive-icon"
                        data-tip="This category had been archived"
                      />
                    )}
                    {this.props.category.name}
                  </h2>
                  {(this.props.category.createdBy._id ==
                    this.props.currentUser._id ||
                    this.props.currentUser.isModerator) && (
                    <React.Fragment>
                      <Link
                        className="anchor-text dashboard-anchor-text"
                        onClick={() => {
                          this.setState(handleModal("updateCategory", "open"));
                        }}
                      >
                        Edit
                      </Link>
                      <UpdateCategoryModal
                        showModal={this.state.showUpdateCategoryModal}
                        handleClose={() => {
                          this.setState(handleModal("updateCategory", "close"));
                        }}
                        handleShow={() => {
                          this.setState(handleModal("updateCategory", "open"));
                        }}
                        category={this.props.category}
                        history={this.props.history}
                      />
                    </React.Fragment>
                  )}
                  <h6 className="dashboard-category-creator">
                    <ReplyAllIcon />
                    Created By:{" "}
                    {this.props.category.createdBy.isRemoved ||
                    this.props.category.createdBy.isBlocked ? (
                      "Removed User"
                    ) : (
                      <Link
                        className="anchor-text"
                        to={`/profile/${this.props.category.createdBy._id}`}
                      >
                        {this.props.category.createdBy.name.firstName}
                      </Link>
                    )}
                  </h6>
                  <h6 className="dashboard-category-description">
                    {this.props.category.description}
                  </h6>
                  <h6 className="dashboard-category-date">
                    <TodayIcon />
                    Last Activity: {this.props.category.updatedAt.slice(0, 10)}
                    &nbsp;
                    {this.props.category.updatedAt.slice(11, 16)}
                  </h6>
                  {!this.props.category.isArchived && this.props.isLoggedIn && (
                    <React.Fragment>
                      <div className="dashboard-main-button-container">
                        <Button
                          variant=""
                          className="primary-button dashboard-main-button"
                          onClick={() => {
                            this.setState(handleModal("addTopic", "open"));
                          }}
                        >
                          <InsertCommentOutlinedIcon />
                          Start Discussion
                        </Button>
                        <AddTopicModal
                          showModal={this.state.showAddTopicModal}
                          parentCategory={this.props.category}
                          handleClose={() => {
                            this.setState(handleModal("addTopic", "close"));
                          }}
                          handleShow={() => {
                            this.setState(handleModal("addTopic", "open"));
                          }}
                        />
                      </div>
                    </React.Fragment>
                  )}
                  <hr className="dashboard-main-separator" />
                  <h2 className="dashboard-topics-heading">
                    <BubbleChartRoundedIcon />
                    Topics ({this.props.category.topics.length}) :
                  </h2>
                  <Row>
                    <CategoryTopicsContainer
                      currentCategory={this.props.category}
                      columnValue={6}
                    />
                  </Row>
                </React.Fragment>
              )}
            </Col>
          </Row>
        </Container>
        <ReactTooltip delayShow={500} effect="solid" data-border="true" />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    currentUser: state.auth.currentUser,
    category: state.category.getCurrent.category,
    isAddTopicCompleted: state.topic.add.isCompleted,
    isUpdateCompleted: state.category.update.isCompleted,
    isArchiveCompleted: state.category.archive.isCompleted,
    isDeleteCompleted: state.category.delete.isCompleted,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCategory: () => dispatch(
      clearCurrentCategory()
    ),
    getCategory: (_id) => dispatch(getCategory({
      _id,
    })),
    getTopics: (category) =>
      dispatch(
        getCategoryTopics({
          _id: category._id,
        })
      ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryDetailsPage);
