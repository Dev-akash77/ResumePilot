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
    location: "",
    start: "",
    end: "",
    cgpa: "",
  },
  skills: {
    technical: [],
    tools: [],
  },
  openDialog: false,
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

    // ? ==========================================================================

    // ! ==========================================================================
    // *  RESUME SKILL ADDED DELETED \\ TECHNICAL OR TOOLS //
    // ! ==========================================================================
    // * ADD TECHNICAL SKILL
    technicalSkillAdd: (state, action) => {
      const { technical } = action.payload;
      state.skills.technical.push(technical);
    },
    // * REMOVE TECHNICAL SKILLS
    technicalSkillRemove: (state, action) => {
      const { id } = action.payload;
      state.skills.technical.splice(id, 1);
    },
    // *ADD TOOLS SKILL
    toolsSkillAdd: (state, action) => {
      const { tools } = action.payload;
      state.skills.tools.push(tools);
    },
    // * REMOVE TECHNICAL SKILLS
    toolsSkillRemove: (state, action) => {
      const { id } = action.payload;
      state.skills.tools.splice(id, 1);
    },
    // ! ==========================================================================

    // ? ==========================================================================

    // ! ==========================================================================
    // * TOOGLE DIALOG BOX
    // ! ==========================================================================
    toogleDialogBox:(state)=>{
      state.openDialog = !state.openDialog;
    }

     // ? ==========================================================================

  },
});

export const {
  headerOnChange,
  summaryChange,
  educationChange,
  technicalSkillAdd,
  toolsSkillAdd,
  toolsSkillRemove,
  technicalSkillRemove,
  toogleDialogBox
} = resumeSlice.actions;

export const resumeSlices = resumeSlice.reducer;
