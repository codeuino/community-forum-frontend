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
          createdBy {
            _id
            name {
              firstName
              lastName
            }
          }
          topics
          createdAt
          updatedAt
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

export const updateCategory = createAsyncThunk(
  "category/update",
  async (updateCategoryData, { rejectWithValue }) => {
    const tokenHeader = `Bearer ${localStorage.getItem("token")}`;
    const response = await axios
      .post(
        process.env.REACT_APP_GRAPHQL_API_ENDPOINT,
        {
          query: `mutation{ updateCategory(
            categoryInput: {
              _id: "${updateCategoryData._id}"
              name: "${updateCategoryData.name}"
              description: "${updateCategoryData.description}"
            }
        ) {
          _id
          name
          description
          createdBy {
            _id
            name {
              firstName
              lastName
            }
          }
          topics
          createdAt
          updatedAt
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
      return response.data.data.updateCategory;
    }
    return rejectWithValue(response);
  }
);

export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (deleteCategoryData, { rejectWithValue }) => {
    const tokenHeader = `Bearer ${localStorage.getItem("token")}`;
    const response = await axios
      .post(
        process.env.REACT_APP_GRAPHQL_API_ENDPOINT,
        {
          query: `mutation{ deleteCategory(
            categoryFindInput: {
              _id: "${deleteCategoryData._id}"
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
      return response.data.data.deleteCategory;
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
          createdBy {
            _id
            name {
              firstName
              lastName
            }
          }
          topics
          createdAt
          updatedAt
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
    update: {
      isCompleted: true,
      error: "",
    },
    delete: {
      isCompleted: true,
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
    [updateCategory.fulfilled]: (state, action) => {
      state.update.isCompleted = true;
      state.update.error = "";
    },
    [updateCategory.pending]: (state, action) => {
      state.update.isCompleted = false;
    },
    [updateCategory.rejected]: (state, action) => {
      state.update.error = action.payload;
      state.update.isCompleted = false;
    },
    [deleteCategory.fulfilled]: (state, action) => {
      state.delete.isCompleted = true;
    },
    [deleteCategory.pending]: (state, action) => {
      state.delete.isCompleted = false;
    },
    [deleteCategory.rejected]: (state, action) => {
      state.delete.isCompleted = false;
    },
    [getAllCategories.fulfilled]: (state, action) => {
      state.getAll.categories = action.payload;
      state.getAll.error = "";
    },
    [getAllCategories.rejected]: (state, action) => {
      state.getAll.categories = {};
      state.getAll.error = action.payload;
    },
  },
});

export default categorySlice.reducer;
