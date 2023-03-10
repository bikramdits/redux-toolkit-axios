import { createSlice } from "@reduxjs/toolkit";
import { getShortOrg, getUser } from "./authAsyncActions";

export const ROLES_ENUM = Object.freeze({
  SUPERADMIN: "SuperAdmin",
  ADMIN: "Admin",
  EMPLOYEE: "Employee",
  DONOR: "Donor",
  SEEKER: "Seeker",
});

const initialState = {
  user: null,
  shortOrg: null,
  loading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
    },
  },

  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.

  extraReducers: (builder) => {
    builder
      .addCase(getShortOrg.pending, (state) => {
        state.loading = true;
      })
      .addCase(getShortOrg.fulfilled, (state, { payload: { data } }) => {
        state.shortOrg = data;
        localStorage.setItem("organisationId", data.organisationId);
        state.loading = false;
      })
      .addCase(getShortOrg.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, { payload: { data } }) => {
        state.user = data;
        state.loading = false;
        storage.setToken(data.token);
      })
      .addCase(getUser.rejected, (state) => {
        state.loading = false;
        storage.removeToken();
        localStorage.removeItem("roleName");
        window.location.href = window.location.origin;
      });
  },
});

export const { logoutUser } = authSlice.actions;

export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
