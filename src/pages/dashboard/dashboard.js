import React, { Component } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ReactTooltip from "react-tooltip";
import NavBar from "../../components/navbar/navbar";
import { getAllCategories } from "../../reducers/categorySlice";
import AddCategoryModal from "../../components/category/addCategoryModal";
import ForumRoundedIcon from "@material-ui/icons/ForumRounded";
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';
import CategoryTopicsContainer from "../../components/topic/categoryTopicsContainer";
import InsertCommentOutlinedIcon from "@material-ui/icons/InsertCommentOutlined";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import { getCategoryTopics } from "../../reducers/topicSlice";
import AddTopicModal from "../../components/topic/addTopicModal";
import ReplyAllIcon from "@material-ui/icons/ReplyAll";
import BubbleChartRoundedIcon from "@material-ui/icons/BubbleChartRounded";
import TodayIcon from "@material-ui/icons/Today";
import UpdateCategoryModal from "../../components/category/updateCategoryModal"

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddCategoryModal: false,
      showAddTopicModal: false,
      showUpdateCategoryModal: false,
      currentCategory: {},
    };
  }

  componentDidMount() {
    this.props.getCategories();
  }

  componentDidUpdate(prevProps) {
    ReactTooltip.rebuild();
    let newState = {};
    if (
      this.props.categories.length == 0 &&
      this.state.currentCategory._id != undefined
    ) {
      newState = {
        ...newState,
        currentCategory: {},
      };
    } else if (
      this.state.currentCategory._id == undefined &&
      this.props.categories[0]
    ) {
      newState = {
        ...newState,
        currentCategory: this.props.categories[0],
      };
    }
    if (
      (this.props.newCategory._id &&
        prevProps.newCategory._id != this.props.newCategory._id)
    ) {
      this.props.getCategories();
    }
    if (
      this.props.newTopic._id &&
      this.props.newTopic.parentCategory == this.state.currentCategory._id
    ) {
      this.props.getTopics(this.state.currentCategory);
    }
    if (
      this.props.categories.length != 0 &&
      (
        JSON.stringify(prevProps.categories) !=
        JSON.stringify(this.props.categories)
      )
    ) {
      const updatedCategory = this.props.categories.filter(
        (category) => category._id == this.state.currentCategory._id
      );
      this.setState({ currentCategory: updatedCategory[0] });
    }
    if (Object.keys(newState).length != 0) {
      this.setState(newState);
    }
  }

  handleModalShow = (modalName) => {
    switch (modalName) {
      case "addCategory": {
        this.setState({
          showAddCategoryModal: true,
        });
        break;
      }
      case "addTopic": {
        this.setState({
          showAddTopicModal: true,
        });
        break;
      }
      case "updateCategory": {
        this.setState({
          showUpdateCategoryModal: true,
        });
        break;
      }
    }
  };

  handleModalClose = (modalName) => {
    switch (modalName) {
      case "addCategory": {
        this.setState({
          showAddCategoryModal: false,
        });
        break;
      }
      case "addTopic": {
        this.setState({
          showAddTopicModal: false,
        });
        break;
      }
      case "updateCategory": {
        this.setState({
          showUpdateCategoryModal: false,
        });
        break;
      }
    }
  };

  handleCurrentCategory = (category) => {
    this.setState({
      currentCategory: category,
    }, () => {this.props.getCategories();});
  };

  resetCurrentCategory = () => {
    if(
      (
        this.props.categories[0]._id == this.state.currentCategory._id
        ) && 
        this.props.categories[1]
    ) {
      this.setState({
        currentCategory: this.props.categories[1],
      });
    } else {
      this.setState({
        currentCategory: {},
      });
    }
  };

  render() {
    return (
      <Container fluid>
        <NavBar history={this.props.history} />
        <Row className="dashboard-row">
          <Col sm={4} className="dashboard-sidebar">
            {this.props.isLoggedIn && (
              <React.Fragment>
                <div className="dashboard-sidebar-button-container">
                  <Button
                    variant=""
                    className="primary-button navbar-button dashboard-sidebar-button"
                    onClick={() => {
                      this.handleModalShow("addCategory");
                    }}
                  >
                    <CreateOutlinedIcon />
                    Add Category
                  </Button>
                  <AddCategoryModal
                    showModal={this.state.showAddCategoryModal}
                    handleClose={this.handleModalClose}
                    handleShow={this.handleModalShow}
                  />
                </div>
              </React.Fragment>
            )}
            <React.Fragment>
              <div className="dashboard-sidebar-categories-container">
                {this.props.categories.length > 0 && (
                  <React.Fragment>
                    <ul className="dashboard-sidebar-category-list">
                      {this.props.categories.map((category) => (
                        <React.Fragment>
                          <li
                            data-tip={category.name}
                            onClick={() => {
                              this.handleCurrentCategory(category);
                            }}
                          >
                            {this.state.currentCategory._id == category._id ? (
                              <ForumRoundedIcon />
                            ) : (
                              <ForumOutlinedIcon />
                            )}
                            <div
                              className={
                                this.state.currentCategory._id == category._id
                                  ? "dashboard-sidebar-category-item active"
                                  : "dashboard-sidebar-category-item"
                              }
                            >
                              {category.name}
                            </div>
                          </li>
                          <hr className="dashboard-sidebar-separator" />
                        </React.Fragment>
                      ))}
                    </ul>
                  </React.Fragment>
                )}
              </div>
            </React.Fragment>
          </Col>
          <Col sm={4} className="dashboard-sidebar-base"></Col>
          <Col sm={8} className="dashboard-main-container">
            {Object.keys(this.state.currentCategory).length != 0 && (
              <React.Fragment>
                <h2 className="dashboard-category-name">
                  {this.state.currentCategory.name}
                </h2>
                {(this.state.currentCategory.createdBy._id ==
                  this.props.currentUser._id || this.props.currentUser.isModerator) && (
                  <React.Fragment>
                    <Link
                      className="anchor-text dashboard-anchor-text"
                      onClick={() => {
                        this.handleModalShow("updateCategory");
                      }}
                    >
                      Edit
                    </Link>
                    <UpdateCategoryModal
                      showModal={this.state.showUpdateCategoryModal}
                      handleClose={this.handleModalClose}
                      handleShow={this.handleModalShow}
                      category={this.state.currentCategory}
                      resetCurrentCategory={this.resetCurrentCategory}
                    />
                  </React.Fragment>
                )}
                <h6 className="dashboard-category-creator">
                  <ReplyAllIcon />
                  Created By:{" "}
                  {this.state.currentCategory.createdBy.name.firstName}
                </h6>
                <h6 className="dashboard-category-description">
                  {this.state.currentCategory.description}
                </h6>
                <h6 className="dashboard-category-date">
                  <TodayIcon />
                  Last Activity:{" "}
                  {this.state.currentCategory.updatedAt.slice(0, 10)}&nbsp;
                  {this.state.currentCategory.updatedAt.slice(11, 16)}
                </h6>
                {this.props.isLoggedIn && (
                  <React.Fragment>
                    <div className="dashboard-main-button-container">
                      <Button
                        variant=""
                        className="primary-button dashboard-main-button"
                        onClick={() => {
                          this.handleModalShow("addTopic");
                        }}
                      >
                        <InsertCommentOutlinedIcon />
                        Start Discussion
                      </Button>
                      <AddTopicModal
                        showModal={this.state.showAddTopicModal}
                        parentCategory={this.state.currentCategory}
                        handleClose={this.handleModalClose}
                        handleShow={this.handleModalShow}
                      />
                    </div>
                  </React.Fragment>
                )}
                <hr className="dashboard-main-separator" />
                <h2 className="dashboard-topics-heading">
                  <BubbleChartRoundedIcon />
                  Topics ({this.state.currentCategory.topics.length}) :
                </h2>
                <CategoryTopicsContainer
                  currentCategory={this.state.currentCategory}
                />
              </React.Fragment>
            )}
          </Col>
        </Row>
        <ReactTooltip delayShow={500} effect="solid" data-border="true" />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    currentUser: state.auth.currentUser,
    categories: state.category.getAll.categories,
    newCategory: state.category.add.newCategory,
    newTopic: state.topic.add.newTopic,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCategories: () =>
      dispatch(
        getAllCategories()
      ),
    getTopics: (currentCategory) =>
    dispatch(
      getCategoryTopics({
        _id: currentCategory._id,
      })
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
