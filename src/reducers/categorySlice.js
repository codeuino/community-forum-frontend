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

export const archiveCategory = createAsyncThunk(
  "category/archive",
  async (archiveCategoryData, { rejectWithValue }) => {
    const tokenHeader = `Bearer ${localStorage.getItem("token")}`;
    const response = await axios
      .post(
        process.env.REACT_APP_GRAPHQL_API_ENDPOINT,
        {
          query: `mutation{ archiveCategory(
            categoryFindInput: {
              _id: "${archiveCategoryData._id}"
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
      return response.data.data.archiveCategory;
    }
    return rejectWithValue(response);
  }
);

export const unarchiveCategory = createAsyncThunk(
  "category/unarchive",
  async (archiveCategoryData, { rejectWithValue }) => {
    const tokenHeader = `Bearer ${localStorage.getItem("token")}`;
    const response = await axios
      .post(
        process.env.REACT_APP_GRAPHQL_API_ENDPOINT,
        {
          query: `mutation{ unarchiveCategory(
            categoryFindInput: {
              _id: "${archiveCategoryData._id}"
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
      return response.data.data.unarchiveCategory;
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
            isBlocked
            isRemoved
          }
          isArchived
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

export const getCategory = createAsyncThunk(
  "category/getCurrent",
  async (getCategoryData, { rejectWithValue }) => {
    const response = await axios
      .post(
        process.env.REACT_APP_GRAPHQL_API_ENDPOINT,
        {
          query: `query{ getCategory(
            categoryFindInput: {
              _id: "${getCategoryData._id}"
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
            isBlocked
            isRemoved
          }
          isArchived
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
      return response.data.data.getCategory;
    }
    return rejectWithValue(response);
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    add: {
      isCompleted: true,
      error: "",
    },
    update: {
      isCompleted: true,
      error: "",
    },
    archive: {
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
    getCurrent: {
      category: {},
      error: "",
    },
  },
  reducers: {
    clearCurrentCategory: (state) => {
      state.getCurrent.category = {};
      state.getCurrent.error = "";
    },
  },
  extraReducers: {
    [addCategory.fulfilled]: (state, action) => {
      state.add.isCompleted = true;
      state.add.error = "";
    },
    [addCategory.pending]: (state, action) => {
      state.add.isCompleted = false;
    },
    [addCategory.rejected]: (state, action) => {
      state.add.isCompleted = false;
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
    [archiveCategory.fulfilled]: (state, action) => {
      state.archive.isCompleted = true;
      state.archive.error = "";
    },
    [archiveCategory.pending]: (state, action) => {
      state.archive.isCompleted = false;
    },
    [archiveCategory.rejected]: (state, action) => {
      state.archive.error = action.payload;
      state.archive.isCompleted = false;
    },
    [unarchiveCategory.fulfilled]: (state, action) => {
      state.archive.isCompleted = true;
      state.archive.error = "";
    },
    [unarchiveCategory.pending]: (state, action) => {
      state.archive.isCompleted = false;
    },
    [unarchiveCategory.rejected]: (state, action) => {
      state.archive.error = action.payload;
      state.archive.isCompleted = false;
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
    [getCategory.fulfilled]: (state, action) => {
      state.getCurrent.category = action.payload;
      state.getCurrent.error = "";
    },
    [getCategory.rejected]: (state, action) => {
      state.getCurrent.category = {};
      state.getCurrent.error = action.payload;
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

export const { clearCurrentCategory } = categorySlice.actions;
export default categorySlice.reducer;
