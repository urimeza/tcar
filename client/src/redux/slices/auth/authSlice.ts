import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthState } from "../../../types/auth";
import {
  loginThunk,
  logoutAuthThunk,
  refreshAuth,
  signUpThunk,
} from "./thunks";

const initialState: AuthState = {
  accessToken: "",
  user: {
    status: "unknown",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (_, action: PayloadAction<AuthState>) => action.payload,
    logout: (state) => {
      state.user.status = "guest";
      state.accessToken = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.fulfilled, (_, action) => action.payload);
    builder.addCase(signUpThunk.fulfilled, (_, action) => action.payload);
    builder.addCase(logoutAuthThunk.fulfilled, (state) => {
      state.user.status = "guest";
    });
    builder.addCase(refreshAuth.fulfilled, (_, action) => action.payload);
    builder.addCase(refreshAuth.rejected, (state) => {
      state.user.status = "guest";
    });
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
