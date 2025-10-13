import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  formData: { name: "", email: "", password: "" },
  openOtpBox:false,
  otp:"",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //* check is authenticate
    isAuthenticate: (state) => {
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

    //*  open otp dilauge box
    openOtp:(state)=>{
      state.openOtpBox = true;
    },

    //*  close otp dilauge box
    closeOtp:(state)=>{
      state.openOtpBox = false;
    },

    //* Update otp
    updateOtp:(state,action)=>{
      state.otp = action.payload;
    },

    //* reset otp
    resetOtp:(state)=>{
      state.otp = "";
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
  openOtp,
  closeOtp,
  updateOtp,
  resetOtp
} = authSlice.actions;

export const authSlices = authSlice.reducer;
