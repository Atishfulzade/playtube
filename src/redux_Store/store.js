import { configureStore } from "@reduxjs/toolkit";
import windowSizeSlice from "./windowSizeSlice";
import loggedInSlice from "./loggedInSlice";
import viewLaterVideoSlice from "./viewLaterVideoSlice";
import likedVideoSlice from "./likedVideoSlice";
import historyVideoSlice from "./historyVideoSlice.js";
export const store = configureStore({
  reducer: {
    windowSize: windowSizeSlice,
    loggedStatus: loggedInSlice,
    viewLater: viewLaterVideoSlice,
    likedVideo: likedVideoSlice,
    historyVideo: historyVideoSlice,
  },
});
