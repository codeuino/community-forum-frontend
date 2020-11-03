import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const axios = require("axios");

export const login = createAsyncThunk(
  'auth/login', 
  async (loginData, { rejectWithValue }) => {
  const response = await axios
    .post(
      "http://localhost:8000/graphql", //update
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
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;