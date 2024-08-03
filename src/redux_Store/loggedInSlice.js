import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoggedIn: false,
  user: null,
  theme: "Device theme",
  country: "India",
  language: "English",
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
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    setCountry: (state, action) => {
      state.country = action.payload;
    },
  },
});
export const { setIsLoggedIn, setUser, setCountry, setLanguage, setTheme } =
  loggedInSlice.actions;
export default loggedInSlice.reducer;
