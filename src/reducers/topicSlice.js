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

export const updateTopic = createAsyncThunk(
  "topic/update",
  async (updateTopicData, { rejectWithValue }) => {
    const tokenHeader = `Bearer ${localStorage.getItem("token")}`;
    const response = await axios
      .post(
        process.env.REACT_APP_GRAPHQL_API_ENDPOINT,
        {
          query: `mutation{ updateTopic(
            topicInput: {
              _id: "${updateTopicData._id}"
              name: "${updateTopicData.name}"
              description: "${updateTopicData.description}"
              tagString: "${updateTopicData.tagString}"
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
      return response.data.data.updateTopic;
    }
    return rejectWithValue(response);
  }
);

export const archiveTopic = createAsyncThunk(
  "topic/archive",
  async (archiveTopicData, { rejectWithValue }) => {
    const tokenHeader = `Bearer ${localStorage.getItem("token")}`;
    const response = await axios
      .post(
        process.env.REACT_APP_GRAPHQL_API_ENDPOINT,
        {
          query: `mutation{ archiveTopic(
            topicFindInput: {
              _id: "${archiveTopicData._id}"
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
      return response.data.data.archiveTopic;
    }
    return rejectWithValue(response);
  }
);

export const unarchiveTopic = createAsyncThunk(
  "topic/unarchive",
  async (unarchiveTopicData, { rejectWithValue }) => {
    const tokenHeader = `Bearer ${localStorage.getItem("token")}`;
    const response = await axios
      .post(
        process.env.REACT_APP_GRAPHQL_API_ENDPOINT,
        {
          query: `mutation{ unarchiveTopic(
            topicFindInput: {
              _id: "${unarchiveTopicData._id}"
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
      return response.data.data.unarchiveTopic;
    }
    return rejectWithValue(response);
  }
);

export const deleteTopic = createAsyncThunk(
  "topic/delete",
  async (deleteTopicData, { rejectWithValue }) => {
    const tokenHeader = `Bearer ${localStorage.getItem("token")}`;
    const response = await axios
      .post(
        process.env.REACT_APP_GRAPHQL_API_ENDPOINT,
        {
          query: `mutation{ deleteTopic(
            topicFindInput: {
              _id: "${deleteTopicData._id}"
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
      return response.data.data.deleteTopic;
    }
    return rejectWithValue(response);
  }
);

export const getCategoryTopics = createAsyncThunk(
  "topic/getCategoryTopics",
  async (getTopicData, { rejectWithValue }) => {
    const tokenHeader = `Bearer ${localStorage.getItem("token")}`;
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
          isSelfArchived
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
      return response.data.data.getCategoryTopics;
    }
    return rejectWithValue(response);
  }
);

export const getTopic = createAsyncThunk(
  "topic/getCurrent",
  async (getTopicData, { rejectWithValue }) => {
    const tokenHeader = `Bearer ${localStorage.getItem("token")}`;
    const response = await axios
      .post(
        process.env.REACT_APP_GRAPHQL_API_ENDPOINT,
        {
          query: `query{ getTopic(
            topicFindInput: {
              _id: "${getTopicData._id}"
            }
          ) {
            topic {
              _id
              name
              description
              tags {
                _id
                name
                hexColorCode
              }
              tagString
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
              isSelfArchived
              createdAt
              updatedAt
            }
            announcements {
              _id
              userId
              description
              createdAt
            }
            pinnedMessages {
              _id
              userId
              description
              createdAt
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
      return response.data.data.getTopic;
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
    getCurrent: {
      topic: {},
      error: "",
    },
  },
  reducers: {
    clearCurrentTopic: (state) => {
      state.getCurrent.topic = {};
      state.getCurrent.error = "";
    },
  },
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
    [updateTopic.fulfilled]: (state, action) => {
      state.update.isCompleted = true;
      state.update.error = "";
    },
    [updateTopic.pending]: (state, action) => {
      state.update.isCompleted = false;
    },
    [updateTopic.rejected]: (state, action) => {
      state.update.error = action.payload;
      state.update.isCompleted = false;
    },
    [archiveTopic.fulfilled]: (state, action) => {
      state.archive.isCompleted = true;
      state.archive.error = "";
    },
    [archiveTopic.pending]: (state, action) => {
      state.archive.isCompleted = false;
    },
    [archiveTopic.rejected]: (state, action) => {
      state.archive.error = action.payload;
      state.archive.isCompleted = false;
    },
    [unarchiveTopic.fulfilled]: (state, action) => {
      state.archive.isCompleted = true;
      state.archive.error = "";
    },
    [unarchiveTopic.pending]: (state, action) => {
      state.archive.isCompleted = false;
    },
    [unarchiveTopic.rejected]: (state, action) => {
      state.archive.error = action.payload;
      state.archive.isCompleted = false;
    },
    [deleteTopic.fulfilled]: (state, action) => {
      state.delete.isCompleted = true;
    },
    [deleteTopic.pending]: (state, action) => {
      state.delete.isCompleted = false;
    },
    [deleteTopic.rejected]: (state, action) => {
      state.delete.isCompleted = false;
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
    [getTopic.fulfilled]: (state, action) => {
      const topic = action.payload.topic;
      topic.announcements = action.payload.announcements;
      topic.pinnedMessages = action.payload.pinnedMessages;
      state.getCurrent.topic = topic;
      state.getCurrent.error = "";
    },
    [getTopic.rejected]: (state, action) => {
      state.getCurrent.topic = {};
      state.getCurrent.error = action.payload;
    },
  },
});

export const { clearCurrentTopic } = topicSlice.actions;
export default topicSlice.reducer;
