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
};

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    // *  ONCHANGE RESUME HEADER FROM DATA
    headerOnChange: (state, action) => {
      const { name, value } = action.payload;
      state.header[name] = value;
    },
  },
});

export const { headerOnChange } = resumeSlice.actions;

export const resumeSlices = resumeSlice.reducer;
