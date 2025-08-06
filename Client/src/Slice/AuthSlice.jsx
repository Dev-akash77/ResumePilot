import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  formData: { name: "", email: "", password: "" },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //* check is authenticate
    isAuthenticate: (state, action) => {
      state.isAuthenticated = true;
    },

    //* update form data
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },

    //* reset form data
    resetFormData: (state) => {
      state.formData = { name: "", email: "", password: "" };
    },

    //* Registered
    regesterAuth: (state) => {
      state.isAuthenticated = true;
      state.formData = { name: "", email: "", password: "" };
    },

    //* Login
    LoginAuth: (state) => {
      state.isAuthenticated = true;
      state.formData = { name: "", email: "", password: "" };
    },

    //* Logout
    LogoutAuth: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const {
  isAuthenticate,
  updateFormData,
  resetFormData,
  regesterAuth,
  LoginAuth,
  LogoutAuth,
} = authSlice.actions;

export const authSlices = authSlice.reducer;
