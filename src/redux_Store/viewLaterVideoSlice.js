import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  playList: [],
};

export const viewLaterVideoSlice = createSlice({
  name: "viewLater",
  initialState,
  reducers: {
    addVideo: (state, action) => {
      state.playList.push(action.payload);
    },
    removeVideo: (state, action) => {
      state.playList = state.playList.filter(
        (track) => track.video.videoId !== action.payload
      );
    },
  },
});

export const { addVideo, removeVideo } = viewLaterVideoSlice.actions;
export default viewLaterVideoSlice.reducer;
