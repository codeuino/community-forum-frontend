import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateUser = createAsyncThunk(
  "user/update",
  async (userUpdateData, { rejectWithValue }) => {
    const tokenHeader = `Bearer ${localStorage.getItem("token")}`;
    const response = await axios
      .post(
        process.env.REACT_APP_GRAPHQL_API_ENDPOINT,
        {
          query: `mutation{ updateUser(userInput: {
            name: {
              firstName: "${userUpdateData.name.firstName}"
              lastName: "${userUpdateData.name.lastName}"
            }
            phone: "${userUpdateData.phone}"
            info: {
              about: {
                shortDescription: "${userUpdateData.info.about.shortDescription}"
                designation: "${userUpdateData.info.about.designation}"
              }
            }
            socialMedia: {
              twitter: "${userUpdateData.socialMedia.twitter}"
            }
          }
          ) {
          _id
          }}`,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: tokenHeader,
          },
        }
      )
      .catch((error) => {
        if (error.response) {
          return error.response.data.errors[0].message;
        }
      });
      if (response.data != undefined) {
        return response.data.data.updateUser;
      }
    return rejectWithValue(response);
  }
);

export const removeUser = createAsyncThunk(
  "user/remove",
  async (userRemoveData, { rejectWithValue }) => {
    const isId = userRemoveData._id ? userRemoveData._id : "";
    const isEmail = userRemoveData._email ? userRemoveData._email : "";
    const tokenHeader = `Bearer ${localStorage.getItem("token")}`;
    const response = await axios
      .post(
        process.env.REACT_APP_GRAPHQL_API_ENDPOINT,
        {
          query: `mutation{ removeUser(userFindInput: {
            _id: "${isId}"
            email: "${isEmail}"
          }
          ) {
          result
          }}`,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: tokenHeader,
          },
        }
      )
      .catch((error) => {
        if (error.response) {
          return error.response.data.errors[0].message;
        }
      });
    const isOtherUser = (isId || isEmail) ? true: false;
    if (response.data != undefined) {
      return {
        response: response.data.data.removeUser,
        isOtherUser,
      };
    }
    return rejectWithValue({
      response,
      isOtherUser,
    });
  }
);

export const blockUser = createAsyncThunk(
  "user/block",
  async (userBlockData, { rejectWithValue }) => {
    const isId = userBlockData._id ? userBlockData._id : "";
    const isEmail = userBlockData._email ? userBlockData._email : "";
    const tokenHeader = `Bearer ${localStorage.getItem("token")}`;
    const response = await axios
      .post(
        process.env.REACT_APP_GRAPHQL_API_ENDPOINT,
        {
          query: `mutation{ blockUser(userFindInput: {
            _id: "${isId}"
            email: "${isEmail}"
          }
          ) {
          result
          }}`,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: tokenHeader,
          },
        }
      )
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          return error.response.data.errors[0].message;
        }
      });
    if (response.data != undefined) {
      return response.data.data.blockUser;
    }
    return rejectWithValue(response);
  }
);

export const unblockUser = createAsyncThunk(
  "user/unblock",
  async (userUnblockData, { rejectWithValue }) => {
    const isId = userUnblockData._id ? userUnblockData._id : "";
    const isEmail = userUnblockData._email ? userUnblockData._email : "";
    const tokenHeader = `Bearer ${localStorage.getItem("token")}`;
    const response = await axios
      .post(
        process.env.REACT_APP_GRAPHQL_API_ENDPOINT,
        {
          query: `mutation{ unblockUser(userFindInput: {
            _id: "${isId}"
            email: "${isEmail}"
          }
          ) {
          result
          }}`,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: tokenHeader,
          },
        }
      )
      .catch((error) => {
        if (error.response) {
          return error.response.data.errors[0].message;
        }
      });
    if (response.data != undefined) {
      return response.data.data.unblockUser;
    }
    return rejectWithValue(response);
  }
);

export const getUserProfile = createAsyncThunk(
  "user/profile",
  async (userProfileData, { rejectWithValue }) => {
    const tokenHeader = `Bearer ${localStorage.getItem("token")}`;
    const response = await axios
      .post(
        process.env.REACT_APP_GRAPHQL_API_ENDPOINT,
        {
          query: `query{ getUserProfile(userFindInput: {
            _id: "${userProfileData._id}"
          }
          ) {
          _id
          name {
            firstName
            lastName
          }
          email
          phone
          info {
            about {
              shortDescription
              designation
            }
          }
          socialMedia {
            twitter
          }
          isFirstAdmin
          isAdmin
          isModerator
          isBlocked
          isRemoved
          categoriesCreated {
            _id
            name
            description
            isArchived
            topics
          }
          topicsCreated {
            _id
            name
            description
            parentCategory
            isSelfArchived
            isArchived
            tags {
              _id
              name
              hexColorCode
            }
            chats
          }
          }}`,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: tokenHeader,
          },
        }
      )
      .catch((error) => {
        if (error.response) {
          return error.response.data.errors[0].message;
        }
      });
    if (response.data != undefined) {
      return response.data.data.getUserProfile;
    }
    return rejectWithValue(response);
  }
);

export const getUsers = createAsyncThunk(
  "user/data",
  async (getUsersData, { rejectWithValue }) => {
    const tokenHeader = `Bearer ${localStorage.getItem("token")}`;
    const response = await axios
      .post(
        process.env.REACT_APP_GRAPHQL_API_ENDPOINT,
        {
          query: `query{ users {
            users {
              _id
              name {
                firstName
                lastName
              }
              email
              info {
                about {
                  shortDescription
                  designation
                }
              }
              isBlocked
              createdAt
            }
            blockedUsers {
              _id
              name {
                firstName
                lastName
              }
              email
              info {
                about {
                  shortDescription
                  designation
                }
              }
              isBlocked
              createdAt
            }
          }}`,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: tokenHeader,
          },
        }
      )
      .catch((error) => {
        if (error.response) {
          return error.response.data.errors[0].message;
        }
      });
    if (response.data != undefined) {
      return response.data.data.users;
    }
    return rejectWithValue(response);
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    update: {
      isCompleted: true,
      error: "",
    },
    block: {
      isCompleted: true,
      error: "",
    },
    remove: {
      isCompleted: true,
    },
    getCurrent: {
      userProfile: {},
      error: "",
    },
    usersData: {
      users: [],
      blockedUsers: [],
    }
  },
  reducers: {
    clearCurrentUserProfile: (state) => {
      state.getCurrent.userProfile = {};
      state.getCurrent.error = "";
    },
  },
  extraReducers: {
    [updateUser.fulfilled]: (state, action) => {
      state.update.error = "";
      state.update.isCompleted = true;
    },
    [updateUser.pending]: (state, action) => {
      state.update.isCompleted = false;
    },
    [updateUser.rejected]: (state, action) => {
      state.update.error = action.payload;
      state.update.isCompleted = false;
    },
    [blockUser.fulfilled]: (state, action) => {
      state.block.isCompleted = true;
      state.block.error = "";
    },
    [blockUser.pending]: (state, action) => {
      state.block.isCompleted = false;
    },
    [blockUser.rejected]: (state, action) => {
      state.block.error = action.payload;
      state.block.isCompleted = false;
    },
    [unblockUser.fulfilled]: (state, action) => {
      state.block.isCompleted = true;
      state.block.error = "";
    },
    [unblockUser.pending]: (state, action) => {
      state.block.isCompleted = false;
    },
    [unblockUser.rejected]: (state, action) => {
      state.block.error = action.payload;
      state.block.isCompleted = false;
    },
    [removeUser.fulfilled]: (state, action) => {
      if (!action.payload.isOtherUser) {
        localStorage.removeItem("token");
      }
      state.remove.isCompleted = true;
    },
    [removeUser.pending]: (state, action) => {
      state.remove.isCompleted = false;
    },
    [removeUser.rejected]: (state, action) => {
      state.remove.isCompleted = false;
    },
    [getUserProfile.fulfilled]: (state, action) => {
      state.getCurrent.userProfile = action.payload;
      state.getCurrent.error = "";
    },
    [getUserProfile.rejected]: (state, action) => {
      state.getCurrent.userProfile = {};
      state.getCurrent.error = action.payload;
    },
    [getUsers.fulfilled]: (state, action) => {
      state.usersData.users = action.payload.users;
      state.usersData.blockedUsers = action.payload.blockedUsers;
    }
  },
});

export const { clearCurrentUserProfile } = userSlice.actions;
export default userSlice.reducer;
