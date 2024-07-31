import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoggedIn: false,
};
export const loggedInSlice = createSlice({
  name: "loggedStatus",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});
export const { isLoggedIn } = loggedInSlice.actions;
export default loggedInSlice.reducer;
