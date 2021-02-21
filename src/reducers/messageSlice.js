import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTopicChats = createAsyncThunk(
  "message/getTopicChats",
  async (getTopicChatsData, { rejectWithValue }) => {
    const tokenHeader = `Bearer ${localStorage.getItem("token")}`;
    const response = await axios
      .post(
        process.env.REACT_APP_GRAPHQL_API_ENDPOINT,
        {
          query: `query{ getTopicChats(
            topicFindInput: {
              _id: "${getTopicChatsData._id}",
            }
          ) {
          _id
          userId
          user {
            name {
              firstName
              lastName
            }
          }
          description
          parentTopic
          replyTo
          likes
          isPinned
          isAnnounced
          isTasked
          createdAt
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
      return response.data.data.getTopicChats;
    }
    return rejectWithValue(response);
  }
);

export const turnAnnouncement = createAsyncThunk(
  "message/makeAnnouncement",
  async (turnAnnouncementData, { rejectWithValue }) => {
    const tokenHeader = `Bearer ${localStorage.getItem("token")}`;
    const response = await axios
      .post(
        process.env.REACT_APP_GRAPHQL_API_ENDPOINT,
        {
          query: `mutation{ announceMessage(
            messageFindInput: {
              _id: "${turnAnnouncementData._id}",
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
      return response.data.data.announceMessage;
    }
    return rejectWithValue(response);
  }
);

export const removeAnnouncement = createAsyncThunk(
  "message/removeAnnouncement",
  async (removeAnnouncementData, { rejectWithValue }) => {
    const tokenHeader = `Bearer ${localStorage.getItem("token")}`;
    const response = await axios
      .post(
        process.env.REACT_APP_GRAPHQL_API_ENDPOINT,
        {
          query: `mutation{ removeAnnouncement(
            messageFindInput: {
              _id: "${removeAnnouncementData._id}",
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
      return response.data.data.removeAnnouncement;
    }
    return rejectWithValue(response);
  }
);

export const deleteMessage = createAsyncThunk(
  "message/delete",
  async (deleteMessageData, { rejectWithValue }) => {
    const tokenHeader = `Bearer ${localStorage.getItem("token")}`;
    const response = await axios
      .post(
        process.env.REACT_APP_GRAPHQL_API_ENDPOINT,
        {
          query: `mutation{ deleteMessage(
            messageFindInput: {
              _id: "${deleteMessageData._id}",
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
      return response.data.data.deleteMessage;
    }
    return rejectWithValue(response);
  }
);

export const messageSlice = createSlice({
  name: "message",
  initialState: {
    get: {
      chats: {},
      error: "",
    },
    delete: {
      isCompleted: true,
    },
    toggleAnnouncement: {
      isCompleted: true,
      error: "",
    },
  },
  reducers: {
    addMessage: (state, action) => {
      if (state.get.chats[action.payload.parentTopic] === undefined) {
        let newMessageArray = [];
        newMessageArray.push(action.payload);
        state.get.chats[action.payload.parentTopic] = newMessageArray;
      } else {
        state.get.chats[action.payload.parentTopic].push(action.payload);
      }
    },
    clearCurrentChats: (state, action) => {
      delete state.get.chats[action.payload._id];
    },
  },
  extraReducers: {
    [getTopicChats.fulfilled]: (state, action) => {
      if (action.payload.length != 0) {
        state.get.chats[action.payload[0].parentTopic] = action.payload;
      }
      state.get.error = "";
    },
    [getTopicChats.rejected]: (state, action) => {
      state.get.error = action.payload;
    },
    [deleteMessage.fulfilled]: (state, action) => {
      state.delete.isCompleted = true;
    },
    [deleteMessage.pending]: (state, action) => {
      state.delete.isCompleted = false;
    },
    [deleteMessage.rejected]: (state, action) => {
      state.delete.isCompleted = false;
    },
    [turnAnnouncement.fulfilled]: (state, action) => {
      state.toggleAnnouncement.isCompleted = true;
      state.toggleAnnouncement.error = "";
    },
    [turnAnnouncement.pending]: (state, action) => {
      state.toggleAnnouncement.isCompleted = false;
    },
    [turnAnnouncement.rejected]: (state, action) => {
      state.toggleAnnouncement.isCompleted = false;
      state.toggleAnnouncement.error = action.payload;
    },
    [removeAnnouncement.fulfilled]: (state, action) => {
      state.toggleAnnouncement.isCompleted = true;
      state.toggleAnnouncement.error = "";
    },
    [removeAnnouncement.pending]: (state, action) => {
      state.toggleAnnouncement.isCompleted = false;
    },
    [removeAnnouncement.rejected]: (state, action) => {
      state.toggleAnnouncement.isCompleted = false;
      state.toggleAnnouncement.error = action.payload;
    },
  },
});

export const { addMessage, clearCurrentChats } = messageSlice.actions;
export default messageSlice.reducer;
