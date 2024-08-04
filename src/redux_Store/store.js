import { configureStore } from "@reduxjs/toolkit";
import windowSizeSlice from "./windowSizeSlice";
import loggedInSlice from "./loggedInSlice";
import viewLaterVideoSlice from "./viewLaterVideoSlice";
export const store = configureStore({
  reducer: {
    windowSize: windowSizeSlice,
    loggedStatus: loggedInSlice,
    viewLater: viewLaterVideoSlice,
  },
});
