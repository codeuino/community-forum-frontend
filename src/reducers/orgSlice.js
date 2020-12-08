import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const axios = require("axios");

export const createOrg = createAsyncThunk(
  "org/create",
  async (orgCreateData, { rejectWithValue }) => {
    const tokenHeader = `Bearer ${localStorage.getItem("token")}`;
    const response = await axios
      .post(
        process.env.REACT_APP_GRAPHQL_API_ENDPOINT,
        {
          query: `mutation{ createOrganization(organizationInput: {
            name: "${orgCreateData.name}"
            description: {
              shortDescription: "${orgCreateData.description.shortDescription}"
            }
            contactInfo: {
              email: "${orgCreateData.contactInfo.email}"
              website: "${orgCreateData.contactInfo.website}"
            }
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
      return response.data.data.createOrganization;
    }
    return rejectWithValue(response);
  }
);

export const updateOrg = createAsyncThunk(
  "org/update",
  async (orgUpdateData, { rejectWithValue }) => {
    const tokenHeader = `Bearer ${localStorage.getItem("token")}`;
    const response = await axios
      .post(
        process.env.REACT_APP_GRAPHQL_API_ENDPOINT,
        {
          query: `mutation{ updateOrganization(organizationInput: {
            name: "${orgUpdateData.name}"
            description: {
              shortDescription: "${orgUpdateData.description.shortDescription}"
              longDescription: "${orgUpdateData.description.longDescription}"
            }
            contactInfo: {
              email: "${orgUpdateData.contactInfo.email}"
              website: "${orgUpdateData.contactInfo.website}"
            }
          }
          ) {
            _id
            name
            description {
                shortDescription
                longDescription
            }
            contactInfo {
                email
                website
            }
            isArchived
            isUnderMaintenance
            totalUsers
            exists
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
      return response.data.data.updateOrganization;
    }
    return rejectWithValue(response);
  }
);

export const toggleMaintenanceMode = createAsyncThunk(
  "org/toggleMaintenance",
  async (orgToggleMaintenanceModeData, { rejectWithValue }) => {
    const tokenHeader = `Bearer ${localStorage.getItem("token")}`;
    const response = await axios
      .post(
        process.env.REACT_APP_GRAPHQL_API_ENDPOINT,
        {
          query: `mutation{ toggleMaintenanceMode {
            _id
            name
            description {
                shortDescription
                longDescription
            }
            contactInfo {
                email
                website
            }
            isArchived
            isUnderMaintenance
            totalUsers
            exists
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
      return response.data.data.toggleMaintenanceMode;
    }
    return rejectWithValue(response);
  }
);

export const getOrg = createAsyncThunk(
  "org/get",
  async (orgGetData, { rejectWithValue }) => {
    const response = await axios
      .post(
        process.env.REACT_APP_GRAPHQL_API_ENDPOINT,
        {
          query: `query{ getOrganization {
            _id
            name
            description {
                shortDescription
                longDescription
            }
            contactInfo {
                email
                website
            }
            isArchived
            isUnderMaintenance
            totalUsers
            exists
          }}`,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Level": -1,
          },
        }
      )
      .catch((error) => {
        if (error.response) {
          return error.response.data.errors[0].message;
        }
      });
    if (response.data != undefined) {
      return response.data.data.getOrganization;
    }
    return rejectWithValue(response);
  }
);

export const getAdminsModerators = createAsyncThunk(
  "org/data",
  async (getAdminsModeratorsData, { rejectWithValue }) => {
    const tokenHeader = `Bearer ${localStorage.getItem("token")}`;
    const response = await axios
      .post(
        process.env.REACT_APP_GRAPHQL_API_ENDPOINT,
        {
          query: `query{ getAdminModerators {
            admins {
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
              isFirstAdmin
              createdAt
            }
            moderators {
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
      return response.data.data.getAdminModerators;
    }
    return rejectWithValue(response);
  }
);

export const makeAdmin = createAsyncThunk(
  "org/makeAdmin",
  async (makeAdminData, { rejectWithValue }) => {
    const isId = makeAdminData._id ? makeAdminData._id : "";
    const isEmail = makeAdminData._email ? makeAdminData._email : "";
    const tokenHeader = `Bearer ${localStorage.getItem("token")}`;
    const response = await axios
      .post(
        process.env.REACT_APP_GRAPHQL_API_ENDPOINT,
        {
          query: `mutation{ makeAdmin(
            userFindInput: {
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
      return response.data.data.makeAdmin;
    }
    return rejectWithValue(response);
  }
);

export const makeModerator = createAsyncThunk(
  "org/makeModerator",
  async (makeModeratorData, { rejectWithValue }) => {
    const isId = makeModeratorData._id ? makeModeratorData._id : "";
    const isEmail = makeModeratorData._email ? makeModeratorData._email : "";
    const tokenHeader = `Bearer ${localStorage.getItem("token")}`;
    const response = await axios
      .post(
        process.env.REACT_APP_GRAPHQL_API_ENDPOINT,
        {
          query: `mutation{ makeModerator(
            userFindInput: {
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
      return response.data.data.makeModerator;
    }
    return rejectWithValue(response);
  }
);

export const removeAdmin = createAsyncThunk(
  "org/removeAdmin",
  async (removeAdminData, { rejectWithValue }) => {
    const isId = removeAdminData._id ? removeAdminData._id : "";
    const isEmail = removeAdminData._email ? removeAdminData._email : "";
    const tokenHeader = `Bearer ${localStorage.getItem("token")}`;
    const response = await axios
      .post(
        process.env.REACT_APP_GRAPHQL_API_ENDPOINT,
        {
          query: `mutation{ removeAdmin(
            userFindInput: {
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
      return response.data.data.removeAdmin;
    }
    return rejectWithValue(response);
  }
);

export const removeModerator = createAsyncThunk(
  "org/removeModerator",
  async (removeModeratorData, { rejectWithValue }) => {
    const isId = removeModeratorData._id ? removeModeratorData._id : "";
    const isEmail = removeModeratorData._email ? removeModeratorData._email : "";
    const tokenHeader = `Bearer ${localStorage.getItem("token")}`;
    const response = await axios
      .post(
        process.env.REACT_APP_GRAPHQL_API_ENDPOINT,
        {
          query: `mutation{ removeModerator(
            userFindInput: {
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
      return response.data.data.removeModerator;
    }
    return rejectWithValue(response);
  }
);

export const orgSlice = createSlice({
  name: "org",
  initialState: {
    get: {
      org: {},
      error: "",
    },
    create: {
      result: "",
      error: "",
    },
    update: {
      isCompleted: true,
      error: "",
    },
    orgData: {
      admins: [],
      moderators: [],
    },
    changeAccess: {
      isCompleted: true,
    },
  },
  reducers: {},
  extraReducers: {
    [getOrg.fulfilled]: (state, action) => {
      state.get.org = action.payload;
      state.get.error = "";
    },
    [getOrg.rejected]: (state, action) => {
      state.get.org = {};
      state.get.error = action.payload;
    },
    [createOrg.fulfilled]: (state, action) => {
      state.create.result = action.payload;
      state.create.error = "";
    },
    [createOrg.rejected]: (state, action) => {
      state.create.result = {};
      state.create.error = action.payload;
    },
    [updateOrg.fulfilled]: (state, action) => {
      state.get.org = action.payload;
      state.update.error = "";
      state.update.isCompleted = true;
    },
    [updateOrg.pending]: (state, action) => {
      state.update.isCompleted = false;
    },
    [updateOrg.rejected]: (state, action) => {
      state.update.error = action.payload;
      state.update.isCompleted = false;
    },
    [toggleMaintenanceMode.fulfilled]: (state, action) => {
      state.get.org = action.payload;
    },
    [getAdminsModerators.fulfilled]: (state, action) => {
      state.orgData.admins = action.payload.admins;
      state.orgData.moderators = action.payload.moderators;
    },
    [makeAdmin.fulfilled]: (state, action) => {
      state.changeAccess.isCompleted = true;
    },
    [makeAdmin.pending]: (state, action) => {
      state.changeAccess.isCompleted = false;
    },
    [makeAdmin.rejected]: (state, action) => {
      state.changeAccess.isCompleted = false;
    },
    [makeModerator.fulfilled]: (state, action) => {
      state.changeAccess.isCompleted = true;
    },
    [makeModerator.pending]: (state, action) => {
      state.changeAccess.isCompleted = false;
    },
    [makeModerator.rejected]: (state, action) => {
      state.changeAccess.isCompleted = false;
    },
    [removeAdmin.fulfilled]: (state, action) => {
      state.changeAccess.isCompleted = true;
    },
    [removeAdmin.pending]: (state, action) => {
      state.changeAccess.isCompleted = false;
    },
    [removeAdmin.rejected]: (state, action) => {
      state.changeAccess.isCompleted = false;
    },
    [removeModerator.fulfilled]: (state, action) => {
      state.changeAccess.isCompleted = true;
    },
    [removeModerator.pending]: (state, action) => {
      state.changeAccess.isCompleted = false;
    },
    [removeModerator.rejected]: (state, action) => {
      state.changeAccess.isCompleted = false;
    },
  },
});

export default orgSlice.reducer;
