import { configureStore } from "@reduxjs/toolkit";
import windowSizeSlice from "./windowSizeSlice";

export const store = configureStore({
  reducer: {
    windowSize: windowSizeSlice,
  },
});
