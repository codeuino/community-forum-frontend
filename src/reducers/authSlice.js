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
        token
        isFirstAdmin
        isAdmin
        isModerator
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

export const getCurrentUser = createAsyncThunk(
  "auth/getUser",
  async (currentUserData, { rejectWithValue }) => {
  const token = localStorage.getItem("token");
    if (token) {
      try {
        const userData = jwt_decode(token);
        if (userData._id) {
          const response = await axios
            .post(process.env.REACT_APP_GRAPHQL_API_ENDPOINT, {
              query: `query{ getCurrentUser(
                _id: "${userData._id}"
                token: "${token}"
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
              token
              isFirstAdmin
              isAdmin
              isModerator
              }}`,
            })
            .catch((error) => {
              if (error.response) {
                return error.response.data.errors[0].message;
              }
            });
          if (response.data != undefined) {
            return response.data.data.getCurrentUser;
          }
          return rejectWithValue(response);
        }
      } catch (err) {
        return rejectWithValue(err);
      }
    }
    return rejectWithValue("");
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
            token
            isFirstAdmin
            isAdmin
            isModerator
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
    [getCurrentUser.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.currentUser = action.payload;
      state.error = "";
    },
    [getCurrentUser.rejected]: (state, action) => {
      localStorage.removeItem("token");
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

export const { logout } = authSlice.actions;
export default authSlice.reducer;