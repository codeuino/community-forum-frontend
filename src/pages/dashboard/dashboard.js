import React, { Component } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ReactTooltip from "react-tooltip";
import NavBar from "../../components/navbar/navbar";
import AddCategoryModal from "../../components/category/addCategoryModal";
import CategoryTopicsContainer from "../../components/category/categoryTopicsContainer";
import AddTopicModal from "../../components/topic/addTopicModal";
import UpdateCategoryModal from "../../components/category/updateCategoryModal";
import { getAllCategories } from "../../reducers/categorySlice";
import { getCategoryTopics } from "../../reducers/topicSlice";
import LaunchIcon from "@material-ui/icons/Launch";
import ForumRoundedIcon from "@material-ui/icons/ForumRounded";
import ForumOutlinedIcon from "@material-ui/icons/ForumOutlined";
import ReplyAllIcon from "@material-ui/icons/ReplyAll";
import BubbleChartRoundedIcon from "@material-ui/icons/BubbleChartRounded";
import InsertCommentOutlinedIcon from "@material-ui/icons/InsertCommentOutlined";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import TodayIcon from "@material-ui/icons/Today";
import ArchiveIcon from "@material-ui/icons/Archive";
import { handleModal } from "../../commonFunctions/handleModal";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddCategoryModal: false,
      showAddTopicModal: false,
      showUpdateCategoryModal: false,
      currentCategory: {},
      dashboardSidebarClass: "dashboard-sidebar",
    };
  }

  componentDidMount() {
    this.props.getCategories();
  }

  componentDidUpdate(prevProps) {
    ReactTooltip.rebuild();
    if (!this.props.isOrgExist) {
      this.props.history.push("/setup");
    }
    let newState = {};
    if (
      this.props.categories.length === 0 &&
      this.state.currentCategory._id !== undefined
    ) {
      newState = {
        ...newState,
        currentCategory: {},
      };
    } else if (
      this.state.currentCategory._id === undefined &&
      this.props.categories[0]
    ) {
      newState = {
        ...newState,
        currentCategory: this.props.categories[0],
      };
    }
    if (
      (!prevProps.isAddCategoryCompleted &&
      prevProps.isAddCategoryCompleted !== this.props.isAddCategoryCompleted) ||
      (!prevProps.isUpdateCompleted &&
        prevProps.isUpdateCompleted !== this.props.isUpdateCompleted) ||
      (!prevProps.isArchiveCompleted &&
        prevProps.isArchiveCompleted !== this.props.isArchiveCompleted) ||
      (!prevProps.isDeleteCompleted &&
        prevProps.isDeleteCompleted !== this.props.isDeleteCompleted)
    ) {
      this.props.getCategories();
    }
    if (
      !prevProps.isAddTopicCompleted &&
      prevProps.isAddTopicCompleted !== this.props.isAddTopicCompleted
    ) {
      this.props.getCategories();
      this.props.getTopics(this.state.currentCategory);
    }
    if (
      this.props.categories.length !== 0 &&
      (
        JSON.stringify(prevProps.categories) !==
        JSON.stringify(this.props.categories)
      )
    ) {
      const updatedCategory = this.props.categories.filter(
        (category) => category._id === this.state.currentCategory._id
      );
      this.setState({ currentCategory: updatedCategory[0] });
    }
    if (Object.keys(newState).length !== 0) {
      this.setState(newState);
    }
  }

  handleCurrentCategory = (category) => {
    this.setState({
      currentCategory: category,
    }, () => {this.props.getCategories();});
  };

  resetCurrentCategory = () => {
    if(
      (
        this.props.categories[0]._id === this.state.currentCategory._id
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

  toggleSidebar = () => {
    let newClassList = "";
    if (this.state.dashboardSidebarClass.includes("active")) {
      newClassList = this.state.dashboardSidebarClass.replace(" active", "");
    } else {
      newClassList = this.state.dashboardSidebarClass + " active";
    }
    this.setState({ dashboardSidebarClass: newClassList });
  }

  render() {
    if (this.props.isOrgExist === undefined || !this.props.isOrgExist) {
      return null
    }
    return (
      <Container fluid>
        <NavBar
          history={this.props.history}
          toggleSidebar={this.toggleSidebar}
        />
        <Container fluid className="container-mid">
          <Row className="dashboard-row">
            <Col md={4} xl={3} className={this.state.dashboardSidebarClass}>
              {this.props.isLoggedIn && (
                <React.Fragment>
                  <div className="dashboard-sidebar-button-container">
                    <Button
                      variant=""
                      className="primary-button navbar-button dashboard-sidebar-button"
                      onClick={() => {
                        this.setState(handleModal("addCategory", "open"));
                      }}
                    >
                      <CreateOutlinedIcon />
                      Add Category
                    </Button>
                    <AddCategoryModal
                      showModal={this.state.showAddCategoryModal}
                      handleClose={() => {
                        this.setState(handleModal("addCategory", "close"));
                      }}
                      handleShow={() => {
                        this.setState(handleModal("addCategory", "open"));
                      }}
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
                          <React.Fragment key={category._id}>
                            <li
                              data-tip={category.name}
                              onClick={() => {
                                this.handleCurrentCategory(category);
                              }}
                            >
                              {this.state.currentCategory._id ===
                              category._id ? (
                                <ForumRoundedIcon />
                              ) : (
                                <ForumOutlinedIcon />
                              )}
                              <div
                                className={
                                  this.state.currentCategory._id ===
                                  category._id
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
            <Col md={4} className="dashboard-sidebar-base"></Col>
            <Col md={8} xl={9} className="dashboard-main-container">
              {Object.keys(this.state.currentCategory).length !== 0 && (
                <React.Fragment>
                  <h2 className="dashboard-category-name">
                    {this.state.currentCategory.isArchived && (
                      <ArchiveIcon
                        className="archive-icon"
                        data-tip="This category had been archived"
                      />
                    )}
                    {this.state.currentCategory.name}
                    <Link
                      className="anchor-text"
                      to={`/category/${this.state.currentCategory._id}`}
                    >
                      <LaunchIcon />
                    </Link>
                  </h2>
                  {(this.state.currentCategory.createdBy._id ===
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
                        category={this.state.currentCategory}
                        resetCurrentCategory={this.resetCurrentCategory}
                      />
                    </React.Fragment>
                  )}
                  <h6 className="dashboard-category-creator">
                    <ReplyAllIcon />
                    Created By:{" "}
                    {(this.state.currentCategory.createdBy.isRemoved ||
                      (this.state.currentCategory.createdBy.isBlocked &&
                        !this.props.currentUser.isAdmin)) &&
                      "Removed User"}
                    {!this.state.currentCategory.createdBy.isRemoved &&
                      this.state.currentCategory.createdBy.isBlocked &&
                      this.props.currentUser.isAdmin && (
                        <Link
                          className="anchor-text"
                          to={`/profile/${this.state.currentCategory.createdBy._id}`}
                        >
                          Blocked User
                        </Link>
                      )}
                    {!this.state.currentCategory.createdBy.isRemoved &&
                      !this.state.currentCategory.createdBy.isBlocked && (
                        <Link
                          className="anchor-text"
                          to={`/profile/${this.state.currentCategory.createdBy._id}`}
                        >
                          {this.state.currentCategory.createdBy.name.firstName}
                        </Link>
                      )}
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
                  {!this.state.currentCategory.isArchived &&
                    this.props.isLoggedIn && (
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
                            parentCategory={this.state.currentCategory}
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
                    Topics ({this.state.currentCategory.topics.length}) :
                  </h2>
                  <CategoryTopicsContainer
                    currentCategory={this.state.currentCategory}
                    columnValue={12}
                  />
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
    categories: state.category.getAll.categories,
    isAddCategoryCompleted: state.category.add.isCompleted,
    isAddTopicCompleted: state.topic.add.isCompleted,
    isUpdateCompleted: state.category.update.isCompleted,
    isArchiveCompleted: state.category.archive.isCompleted,
    isDeleteCompleted: state.category.delete.isCompleted,
    isOrgExist: state.org.get.org.exists,
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
