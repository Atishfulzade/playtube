import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  likeList: [],
};

export const likedVideoSlice = createSlice({
  name: "likedVideo",
  initialState,
  reducers: {
    likeVideo: (state, action) => {
      state.likeList.push(action.payload);
    },
    removeLikedVideo: (state, action) => {
      state.likeList = state.likeList.filter(
        (track) => track.video.videoId !== action.payload
      );
    },
  },
});

export const { likeVideo, removeLikedVideo } = likedVideoSlice.actions;
export default likedVideoSlice.reducer;
