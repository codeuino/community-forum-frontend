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
              tagString: "${addTopicData.tagString}"
              parentCategory: "${addTopicData.parentCategory}"
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
      isCompleted: true,
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
      state.add.isCompleted = true;
      state.add.error = "";
    },
    [addTopic.pending]: (state, action) => {
      state.add.isCompleted = false;
    },
    [addTopic.rejected]: (state, action) => {
      state.add.isCompleted = false;
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