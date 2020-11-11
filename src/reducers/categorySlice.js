import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addCategory = createAsyncThunk(
  "category/add",
  async (addCategoryData, { rejectWithValue }) => {
    const tokenHeader = `Bearer ${localStorage.getItem("token")}`;
    const response = await axios
      .post(
        process.env.REACT_APP_GRAPHQL_API_ENDPOINT,
        {
          query: `mutation{ createCategory(
            categoryInput: {
              name: "${addCategoryData.name}"
              description: "${addCategoryData.description}"
            }
        ) {
          _id
          name
          description
          createdBy
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
      return response.data.data.createCategory;
    }
    return rejectWithValue(response);
  }
);

export const getAllCategories = createAsyncThunk(
  "category/getAll",
  async (getAllCategoriesData, { rejectWithValue }) => {
    const response = await axios
      .post(
        process.env.REACT_APP_GRAPHQL_API_ENDPOINT,
        {
          query: `query{ categories {
          _id
          name
          description
          createdBy
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
      return response.data.data.categories;
    }
    return rejectWithValue(response);
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    add: {
      newCategory: {},
      error: "",
    },
    getAll: {
      categories: {},
      error: "",
    },
  },
  reducers: {},
  extraReducers: {
    [addCategory.fulfilled]: (state, action) => {
      state.add.newCategory = action.payload;
      state.add.error = "";
    },
    [addCategory.rejected]: (state, action) => {
      state.add.newCategory = {};
      state.add.error = action.payload;
    },
    [getAllCategories.fulfilled]: (state, action) => {
      if (Object.keys(state.getAll.categories).length != Object.keys(action.payload).length) {
        state.getAll.categories = action.payload;
      }
      state.getAll.error = "";
    },
    [getAllCategories.rejected]: (state, action) => {
      state.getAll.categories = {};
      state.getAll.error = action.payload;
    },
  },
});

export default categorySlice.reducer;
