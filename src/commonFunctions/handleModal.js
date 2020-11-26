export const handleModal = (modalName, action) => {
  let showValue = action == "open";
  switch (modalName) {
    case "login": {
      return {
        showLoginModal: showValue,
      };
    }
    case "signup": {
      if (showValue) {
        return {
          showLoginModal: !showValue,
          showSignupModal: showValue,
        };
      }
      return {
        showSignupModal: showValue,
      };
    }
    case "updateOrg": {
      return {
        showUpdateOrganizationModal: showValue,
      };
    }
    case "updateUser": {
      return {
        showUpdateUserModal: showValue,
      };
    }
    case "blockUser": {
      return {
        showBlockModal: showValue,
      };
    }
    case "addCategory": {
      return {
        showAddCategoryModal: showValue,
      };
    }
    case "updateCategory": {
      return {
        showUpdateCategoryModal: showValue,
      };
    }
    case "addTopic": {
      return {
        showAddTopicModal: showValue,
      };
    }
    case "updateTopic": {
      return {
        showUpdateTopicModal: showValue,
      };
    }
    case "delete": {
      return {
        showDeleteModal: showValue,
      };
    }
  }
};