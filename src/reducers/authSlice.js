import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import axios from "axios";

export const login = createAsyncThunk(
  'auth/login', 
  async (loginData, { rejectWithValue }) => {
  const response = await axios
    .post(
      process.env.REACT_APP_GRAPHQL_API_ENDPOINT,
      {
        query: `query{ login(
          email: "${loginData.email}"
          password: "${loginData.password}"
        ) {
        _id
        name {
          firstName
          lastName
        }
        token
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
  if(response.data != undefined) {
    localStorage.setItem("token", response.data.data.login.token);
    return response.data.data.login;
  }
  return rejectWithValue(response)
});

export const signup = createAsyncThunk(
  "auth/signup",
  async (signupData, { rejectWithValue }) => {
    const response = await axios
      .post(
        process.env.REACT_APP_GRAPHQL_API_ENDPOINT,
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
            name {
              firstName
              lastName
            }
            token
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
      localStorage.setItem("token", response.data.data.createUser.token);
      return response.data.data.createUser;
    }
    return rejectWithValue(response);
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    currentUser: {},
    error: "",
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.isLoggedIn = false;
      state.currentUser = {};
      state.error = "";
    },
    getCurrentUser: (state) => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const userData = jwt_decode(token);
          state.isLoggedIn = true;
          state.currentUser = {
            _id: userData.id,
            name: userData.name,
            token,
          }
        } catch (err) {
          console.log(err);
          throw err;
        }
      }
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.currentUser = action.payload;
      state.error = "";
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.currentUser = {};
      state.error = action.payload;
    },
    [signup.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.currentUser = action.payload;
      state.error = "";
    },
    [signup.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.currentUser = {};
      state.error = action.payload;
    },
  },
});

export const { logout, getCurrentUser } = authSlice.actions;
export default authSlice.reducer;