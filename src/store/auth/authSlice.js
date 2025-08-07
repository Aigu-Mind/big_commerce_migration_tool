import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: "",
  refreshToken: "",
  isLogin: false,
  user: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,

  reducers: {
    saveLoginUserData(state, action) {
      state.user = action.payload?.user;
      state.isLogin = true;
      state.accessToken = action.payload?.token;
      state.refreshToken = action?.payload?.refreshToken;
    },
    updateUserData(state, action) {
      state.user = action.payload;
    },
    signOutRequest(state) {
      state.accessToken = "";
      state.refreshToken = "";
      state.isLogin = false;
      state.user = null;
    },
    updateJWTTokens(state, action) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
  },
});

export const {
  saveLoginUserData,
  signOutRequest,
  updateUserData,
  updateJWTTokens,
} = authSlice.actions;

export default authSlice.reducer;