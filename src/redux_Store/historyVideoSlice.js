import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  history: [],
};

export const historyVideoSlice = createSlice({
  name: "historyVideo",
  initialState,
  reducers: {
    setHistoryVideo: (state, action) => {
      state.history.push(action.payload);
    },
    removeHistoryVideo: (state, action) => {
      state.history = state.history.filter(
        (track) => track.video.videoId !== action.payload
      );
    },
  },
});

export const { setHistoryVideo, removeHistoryVideo } =
  historyVideoSlice.actions;
export default historyVideoSlice.reducer;
