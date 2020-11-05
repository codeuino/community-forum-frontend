import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const axios = require("axios");

export const createOrg = createAsyncThunk(
  "org/create",
  async (orgCreateData, { rejectWithValue }) => {
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
          }}`,
        },
        {
          headers: {
            "Content-Type": "application/json",
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
    error: "",
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
  },
});

export default orgSlice.reducer;
