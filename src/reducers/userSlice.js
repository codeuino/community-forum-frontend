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
    const tokenHeader = `Bearer ${localStorage.getItem("token")}`;
    const response = await axios
      .post(
        process.env.REACT_APP_GRAPHQL_API_ENDPOINT,
        {
          query: `mutation{ removeUser(userFindInput: {
            _id: ${userRemoveData._id ? "${userRemoveData._id}" : null}
            email: ${userRemoveData._email ? "${userRemoveData._email}" : null}
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
      return response.data.data.removeUser;
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
    remove: {
      isCompleted: true,
    },
  },
  reducers: {},
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
    [removeUser.fulfilled]: (state, action) => {
      state.remove.isCompleted = true;
      localStorage.removeItem("token");
    },
    [removeUser.pending]: (state, action) => {
      state.remove.isCompleted = false;
    },
    [removeUser.rejected]: (state, action) => {
      state.remove.isCompleted = false;
    },
  },
});

export default userSlice.reducer;
