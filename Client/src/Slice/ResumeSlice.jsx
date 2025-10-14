import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  header: {
    name: "",
    email: "",
    number: "",
    portfolio: "",
    github: "",
    linkedin: "",
  },
  summary: "",
  education: {
    college: "",
    degree: "",
    location:"",
    start: "",
    end: "",
    cgpa: "",
  },
};

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    // ! ==========================================================================
    // * ONCHANGE RESUME HEADER FROM DATA
    // ! ==========================================================================
    headerOnChange: (state, action) => {
      const { name, value } = action.payload;
      state.header[name] = value;
    },
    // ! ==========================================================================

    // ? ==========================================================================

    // ! ==========================================================================
    // * ONCHANGE RESUME SUMMARY FROM DATA
    // ! ==========================================================================
    summaryChange: (state, action) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
    // ! ==========================================================================

    // ? ==========================================================================

    // ! ==========================================================================
    // * ONCHANGE RESUME EDUCATION FROM DATA
    // ! ==========================================================================
    educationChange: (state, action) => {
      const { name, value } = action.payload;
      state.education[name] = value;
    },
    // ! ==========================================================================
  },
});

export const { headerOnChange, summaryChange , educationChange} = resumeSlice.actions;

export const resumeSlices = resumeSlice.reducer;
