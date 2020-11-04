import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import userReducer from "./reducers/userSlice";
import orgReducer from "./reducers/orgSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    org: orgReducer,
  },
});