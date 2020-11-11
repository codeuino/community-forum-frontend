export const checkFieldValidation = (fieldName, fieldValue, repeatFieldValue=null) => {
  switch (fieldName) {
    case "firstName": {
      if (fieldValue.length == 0) {
        return {
          firstNameError: "First name is required",
        };
      }
      return { firstNameError: null };
    }
    case "lastName": {
      if (fieldValue.length == 0) {
        return {
          lastNameError: "Last name is required",
        };
      }
      return { lastNameError: null };
    }
    case "email": {
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
    case "password": {
      if (fieldValue.length < 6) {
        return {
          passwordError: "Your password must be atleast 6 characters long",
        };
      }
      return { passwordError: null };
    }
    case "verifyPassword": {
      if (fieldValue != repeatFieldValue) {
        return {
          verifyPasswordError: "Please make sure your passwords match",
        };
      }
      return { verifyPasswordError: null };
    }
    case "phone": {
      if (fieldValue.length != 10) {
        return {
          phoneError: "Please enter a valid phone number",
        };
      }
      return { phoneError: null };
    }
    case "userShortDescription": {
      if (fieldValue.length == 0) {
        return {
          userShortDescriptionError: "Short Description is required",
        };
      }
      return { userShortDescriptionError: null };
    }
    case "name": {
      if (fieldValue.length < 3) {
        return {
          nameError: "Name must be atleast 3 characters long",
        };
      }
      return { nameError: null };
    }
    case "description": {
      if (fieldValue.length < 6) {
        return {
          descriptionError: "Description must be atleast 6 characters long",
        };
      }
      return { descriptionError: null };
    }
    case "website": {
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
    case "organizationShortDescription": {
      if (fieldValue.length < 5) {
        return {
          organizationShortDescriptionError:
            "Short Description must be atleast 5 characters long",
        };
      }
      return { organizationShortDescriptionError: null };
    }
  }
};
