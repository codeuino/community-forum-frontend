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
  MESSAGE_DESCRIPTION: "messageDescription",
};
Object.freeze(fieldNames);

export const checkFieldValidation = (fieldName, fieldValue, repeatFieldValue=null) => {
  switch (fieldName) {
    case fieldNames.FIRSTNAME: {
      if (fieldValue.trim().length === 0) {
        return {
          firstNameError: "Enter first name",
        };
      }
      return { firstNameError: null };
    }
    case fieldNames.LASTNAME: {
      if (fieldValue.trim().length === 0) {
        return {
          lastNameError: "Enter last name",
        };
      }
      return { lastNameError: null };
    }
    case fieldNames.EMAIL: {
      if (
        fieldValue.trim().length < 255 &&
        fieldValue.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
      ) {
        return { emailError: null };
      }
      return {
        emailError: "Enter a valid email address",
      };
    }
    case fieldNames.PASSWORD: {
      if (fieldValue.trim().length < 6) {
        return {
          passwordError: "Use 6 characters or more for your password",
        };
      }
      return { passwordError: null };
    }
    case fieldNames.VERIFY_PASSWORD: {
      if (fieldValue !== repeatFieldValue) {
        return {
          verifyPasswordError: "Passwords don't match",
        };
      }
      return { verifyPasswordError: null };
    }
    case fieldNames.PHONE: {
      if (fieldValue.trim().length !== 10) {
        return {
          phoneError: "Enter a valid phone number",
        };
      }
      return { phoneError: null };
    }
    case fieldNames.USER_SHORT_DESCRIPTION: {
      if (fieldValue.trim().length === 0) {
        return {
          userShortDescriptionError: "Enter short description",
        };
      }
      return { userShortDescriptionError: null };
    }
    case fieldNames.NAME: {
      if (fieldValue.trim().length < 3) {
        return {
          nameError: "Use 3 characters or more for name",
        };
      }
      return { nameError: null };
    }
    case fieldNames.DESCRIPTION: {
      if (fieldValue.trim().length < 6) {
        return {
          descriptionError: "Use 6 characters or more for description",
        };
      }
      return { descriptionError: null };
    }
    case fieldNames.WEBSITE: {
      if (
        //TBD: Regex
        fieldValue.match()
      ) {
        return {
          websiteError: null,
        };
      } else {
        return {
          websiteError: "Enter a valid website URL",
        };
      }
    }
    case fieldNames.ORGANIZATION_SHORT_DESCRIPTION: {
      if (fieldValue.trim().length < 5) {
        return {
          organizationShortDescriptionError:
            "Use 5 characters or more for short description",
        };
      }
      return { organizationShortDescriptionError: null };
    }
    case fieldNames.ORGANIZATION_LONG_DESCRIPTION: {
      if (fieldValue.trim().length < 10) {
        return {
          organizationLongDescriptionError:
            "Use 10 characters or more for long description",
        };
      }
      return { organizationLongDescriptionError: null };
    }
    case fieldNames.DESIGNATION: {
      if (fieldValue.trim().length < 2 && fieldValue.trim().length !== 0) {
        return {
          designationError: "Use 2 characters or more for designation",
        };
      }
      return { designationError: null };
    }
    case fieldNames.TWITTER: {
      if (
        fieldValue.match(
          `http(?:s)?://(?:www.)?twitter.com/([a-zA-Z0-9_]{1,15}$)`
        ) ||
        fieldValue.length === 0
      ) {
        return {
          twitterError: null,
        };
      } else {
        return {
          twitterError: "Enter a valid twitter handle",
        };
      }
    }
    case fieldNames.MESSAGE_DESCRIPTION: {
      if (fieldValue.trim().length === 0) {
        return {
          messageDescriptionError: "Enter message",
        };
      }
      return { messageDescriptionError: null };
    }
    default: {
      console.log(`Validation not defined for: ${fieldName}`);
      return;
    }
  }
};
