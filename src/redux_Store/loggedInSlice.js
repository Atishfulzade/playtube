import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoggedIn: false,
  user: null,
};
export const loggedInSlice = createSlice({
  name: "authenticate",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setUser: (state, action) => {
      if (action.payload) {
        const { uid, email, displayName, photoURL } = action.payload;
        state.user = { uid, email, displayName, photoURL };
      } else {
        state.user = null;
      }
    },
  },
});
export const { setIsLoggedIn, setUser } = loggedInSlice.actions;
export default loggedInSlice.reducer;
