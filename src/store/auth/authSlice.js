import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: "",
  refreshToken: "",
  isLogin: false,
  userName: null,
  userEmail: null,
  storeHash: "",
  user: null
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,

  reducers: {
    saveLoginUserData(state, action) {
      state.userName = action.payload?.userName;
      state.userEmail = action.payload?.email;
      state.accessToken = action.payload?.token;
      state.isLogin = true;
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
      state.storeHash = "";
    },
    updateJWTTokens(state, action) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    setStoreHash(state, action) {
      state.storeHash = action.payload;
    },
  },
});

export const {
  saveLoginUserData,
  signOutRequest,
  updateUserData,
  updateJWTTokens,
  setStoreHash,
} = authSlice.actions;

export default authSlice.reducer;