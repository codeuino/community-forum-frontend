import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addTopic = createAsyncThunk(
  "topic/add",
  async (addTopicData, { rejectWithValue }) => {
    const tokenHeader = `Bearer ${localStorage.getItem("token")}`;
    const response = await axios
      .post(
        process.env.REACT_APP_GRAPHQL_API_ENDPOINT,
        {
          query: `mutation{ createTopic(
            topicInput: {
              name: "${addTopicData.name}"
              description: "${addTopicData.description}"
              parentCategory: "${addTopicData.parentCategory}"
            }
        ) {
          _id
          name
          description
          parentCategory
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
      return response.data.data.createTopic;
    }
    return rejectWithValue(response);
  }
);

export const getCategoryTopics = createAsyncThunk(
  "topic/get",
  async (getTopicData, { rejectWithValue }) => {
    const response = await axios
      .post(
        process.env.REACT_APP_GRAPHQL_API_ENDPOINT,
        {
          query: `query{ getCategoryTopics(
            categoryFindInput: {
              _id: "${getTopicData._id}",
            }
          ) {
          _id
          name
          description
          tags
          isArchived
          parentCategory
          chats
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
      return response.data.data.getCategoryTopics;
    }
    return rejectWithValue(response);
  }
);

export const topicSlice = createSlice({
  name: "topic",
  initialState: {
    add: {
      newTopic: {},
      error: "",
    },
    get: {
      topics: {},
      error: "",
    },
  },
  reducers: {},
  extraReducers: {
    [addTopic.fulfilled]: (state, action) => {
      state.add.newTopic = action.payload;
      state.add.error = "";
    },
    [addTopic.rejected]: (state, action) => {
      state.add.newTopic = {};
      state.add.error = action.payload;
    },
    [getCategoryTopics.fulfilled]: (state, action) => {
      if (action.payload.length != 0) {
        state.get.topics[action.payload[0].parentCategory] = action.payload;
      }
      state.get.error = "";
    },
    [getCategoryTopics.rejected]: (state, action) => {
      state.get.error = action.payload;
    },
  },
});

export default topicSlice.reducer;