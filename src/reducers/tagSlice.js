import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const tagSearch = createAsyncThunk(
  "tag/search",
  async (tagSearchData, { rejectWithValue }) => {
    const tokenHeader = `Bearer ${localStorage.getItem("token")}`;
    const response = await axios
      .post(
        process.env.REACT_APP_GRAPHQL_API_ENDPOINT,
        {
          query: `query{ getTagTopics(tagFindInput: {
            _id: "${tagSearchData._id}"
          }
          ) {
          _id
          name
          hexColorCode
          topics {
            _id
            name
            description
            tags {
              _id
              name
              hexColorCode
            }
            isArchived
            parentCategory
            chats
            createdBy {
              _id
              name {
                firstName
                lastName
              }
            }
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
      return response.data.data.getTagTopics;
    }
    return rejectWithValue(response);
  }
);

export const tagSlice = createSlice({
  name: "tag",
  initialState: {
    search: {
      tag: {},
      topics: [],
      isCompleted: true,
    },
  },
  reducers: {},
  extraReducers: {
    [tagSearch.fulfilled]: (state, action) => {
      state.search.tag = {
        _id: action.payload._id,
        name: action.payload.name,
        hexColorCode: action.payload.hexColorCode,
      };
      state.search.topics = action.payload.topics;
      state.search.isCompleted = true;
    },
    [tagSearch.pending]: (state, action) => {
      state.search.isCompleted = false;
    },
    [tagSearch.rejected]: (state, action) => {
      state.search.isCompleted = false;
    },
  },
});

export default tagSlice.reducer;