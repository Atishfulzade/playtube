import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoggedIn: false,
  user: null,
};
export const loggedInSlice = createSlice({
  name: "loggedStatus",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});
export const { setIsLoggedIn, setUser } = loggedInSlice.actions;
export default loggedInSlice.reducer;
