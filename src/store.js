import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import userReducer from "./reducers/userSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});