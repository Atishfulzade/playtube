import { configureStore } from "@reduxjs/toolkit";
import windowSizeSlice from "./windowSizeSlice";
import loggedInSlice from "./loggedInSlice";
export const store = configureStore({
  reducer: {
    windowSize: windowSizeSlice,
    loggedStatus: loggedInSlice,
  },
});
