import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import userReducer from "./reducers/userSlice";
import orgReducer from "./reducers/orgSlice";
import categoryReducer from "./reducers/categorySlice";
import topicReducer from "./reducers/topicSlice";
import tagReducer from "./reducers/tagSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    org: orgReducer,
    category: categoryReducer,
    topic: topicReducer,
    tag: tagReducer,
  },
});
