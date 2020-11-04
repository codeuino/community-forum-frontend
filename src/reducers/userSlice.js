import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const axios = require("axios");

export const signup = createAsyncThunk(
  "user/signup",
  async (signupData, { rejectWithValue }) => {
    const response = await axios
      .post(
        "http://localhost:8000/graphql", //update
        {
          query: `mutation{ createUser(userInput: {
            name: {
              firstName: "${signupData.name.firstName}"
              lastName: "${signupData.name.lastName}"
            }
            email: "${signupData.email}"
            password: "${signupData.password}"
            phone: "${signupData.phone}"
            info: {
              about: {
                shortDescription: "${signupData.info.about.shortDescription}"
              }
            }
          }
          ) {
            _id
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
        return response.data.data.createUser;
      }
    return rejectWithValue(response);
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    signup: {
      id: null,
      error: "",
    },
  },
  reducers: {},
  extraReducers: {
    [signup.fulfilled]: (state, action) => {
      state.signup.id = action.payload;
      state.signup.error = "";
    },
    [signup.rejected]: (state, action) => {
      state.signup.id = null;
      state.signup.error = action.payload;
    },
  },
});

export default userSlice.reducer;
