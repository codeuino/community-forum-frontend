export const fieldNames = {
  FIRSTNAME: "firstName",
  LASTNAME: "lastName",
  EMAIL: "email",
  PASSWORD: "password",
  VERIFY_PASSWORD: "verifyPassword",
  PHONE: "phone",
  USER_SHORT_DESCRIPTION: "userShortDescription",
  NAME: "name",
  DESCRIPTION: "description",
  WEBSITE: "website",
  ORGANIZATION_SHORT_DESCRIPTION: "organizationShortDescription",
  ORGANIZATION_LONG_DESCRIPTION: "organizationLongDescription",
  DESIGNATION: "designation",
  TWITTER: "twitter",
};
Object.freeze(fieldNames);

export const checkFieldValidation = (fieldName, fieldValue, repeatFieldValue=null) => {
  switch (fieldName) {
    case fieldNames.FIRSTNAME: {
      if (fieldValue.length == 0) {
        return {
          firstNameError: "First name is required",
        };
      }
      return { firstNameError: null };
    }
    case fieldNames.LASTNAME: {
      if (fieldValue.length == 0) {
        return {
          lastNameError: "Last name is required",
        };
      }
      return { lastNameError: null };
    }
    case fieldNames.EMAIL: {
      if (
        fieldValue.length < 255 &&
        fieldValue.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
      ) {
        return { emailError: null };
      }
      return {
        emailError: "Please enter a valid email address",
      };
    }
    case fieldNames.PASSWORD: {
      if (fieldValue.length < 6) {
        return {
          passwordError: "Your password must be atleast 6 characters long",
        };
      }
      return { passwordError: null };
    }
    case fieldNames.VERIFY_PASSWORD: {
      if (fieldValue != repeatFieldValue) {
        return {
          verifyPasswordError: "Please make sure your passwords match",
        };
      }
      return { verifyPasswordError: null };
    }
    case fieldNames.PHONE: {
      if (fieldValue.length != 10) {
        return {
          phoneError: "Please enter a valid phone number",
        };
      }
      return { phoneError: null };
    }
    case fieldNames.USER_SHORT_DESCRIPTION: {
      if (fieldValue.length == 0) {
        return {
          userShortDescriptionError: "Short Description is required",
        };
      }
      return { userShortDescriptionError: null };
    }
    case fieldNames.NAME: {
      if (fieldValue.length < 3) {
        return {
          nameError: "Name must be atleast 3 characters long",
        };
      }
      return { nameError: null };
    }
    case fieldNames.DESCRIPTION: {
      if (fieldValue.length < 6) {
        return {
          descriptionError: "Description must be atleast 6 characters long",
        };
      }
      return { descriptionError: null };
    }
    case fieldNames.WEBSITE: {
      if (
        //regex to be added
        fieldValue.match()
      ) {
        return {
          websiteError: null,
        };
      } else {
        return {
          websiteError: "Please enter a valid website URL",
        };
      }
    }
    case fieldNames.ORGANIZATION_SHORT_DESCRIPTION: {
      if (fieldValue.length < 5) {
        return {
          organizationShortDescriptionError:
            "Short Description must be atleast 5 characters long",
        };
      }
      return { organizationShortDescriptionError: null };
    }
    case fieldNames.ORGANIZATION_LONG_DESCRIPTION: {
      if (fieldValue.length < 10) {
        return {
          organizationLongDescriptionError:
            "Long Description must be atleast 10 characters long",
        };
      }
      return { organizationLongDescriptionError: null };
    }
    case fieldNames.DESIGNATION: {
      if (fieldValue.length < 2 && fieldValue.length != 0) {
        return {
          designationError: "Designation must be atleast 2 characters long",
        };
      }
      return { designationError: null };
    }
    case fieldNames.TWITTER: {
      if (
        fieldValue.match(
          `http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]{1,15}$)`
        ) ||fieldValue.length == 0
      ) {
        return {
          twitterError: null,
        };
      } else {
        return {
          twitterError: "Please enter a valid twitter handle",
        };
      }
    }
  }
};
