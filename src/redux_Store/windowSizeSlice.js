import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isMobile: false,
};
export const windowSizeSlice = createSlice({
  name: "windowSize",
  initialState,
  reducers: {
    setIsMobile: (state, action) => {
      state.isMobile = action.payload;
    },
  },
});

export const { setIsMobile } = windowSizeSlice.actions;

export default windowSizeSlice.reducer;
