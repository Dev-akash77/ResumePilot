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
  experince: {
    title: "",
    role: "",
    start: "",
    end: "",
    location: "",
    points: [],
  },
  projects: [
    {
      count: 1,
      name: "",
      about: "",
      start: "",
      end: "",
      points: [""],
      techStack: "",
      live: "",
      github: "",
    },
  ],
  openDialog: false,
  nextSection: true,
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
    // * ONCHANGE RESUME EXPERIENCE FROM DATA
    // ! ==========================================================================
    experienceChange: (state, action) => {
      const { name, value } = action.payload;
      state.experince[name] = value;
    },
    // ! ==========================================================================

    // * ONCHANGE RESUME EXPERIENCE BULLET DATA
    // ! ==========================================================================
    experienceBulletChange: (state, action) => {
      state.experince.points = action.payload;
    },
    // ! ==========================================================================

    // ? ==========================================================================

    // ! ==========================================================================
    // * TOOGLE DIALOG BOX
    // ! ==========================================================================
    toogleDialogBox: (state) => {
      state.openDialog = !state.openDialog;
    },

    setNextSection: (state, action) => {
      state.nextSection = action.payload;
    },

    // ? ==========================================================================

    // ! ==========================================================================
    // * Added Projects
    // ! ==========================================================================
    addedProjects: (state) => {
      state.projects.push({
        count: state.projects.length + 1,
        name: "",
        about: "",
        start: "",
        end: "",
        points: [""],
        techStack: "",
        live: "",
        github: "",
      });
    },

    // ! REMOVE PROJECTS
    removeProjects: (state, action) => {
      const index = action.payload;
      state.projects.splice(index, 1);
    },
    // ! POINTS
    updateProjectPoints: (state, action) => {
      const { index, points } = action.payload;
      if (state.projects[index]) {
        state.projects[index].points = points;
      }
    },

    // ! UPDATE PROJECT DATA
    updateProject:(state,action)=>{
      const {index,key,value} = action.payload;
      if (state.projects[index]) {
        state.projects[index][key] = value;
      }
    },

    // ? ==========================================================================

    // ! ==========================================================================
    // * SET HEADER DATA FETCH FROM BACKEND
    // ! ==========================================================================
    seHeaderData: (state, action) => {
      state.header = { ...state.header, ...action.payload };
    },

    // ? ==========================================================================

    // ! ==========================================================================
    // * SET SUMMARY DATA FETCH FROM BACKEND
    // ! ==========================================================================
    setSummaryData: (state, action) => {
      state.summary = action.payload;
    },

    // ? ==========================================================================

    // ! ==========================================================================
    // * SET EDUCATION DATA FETCH FROM BACKEND
    // ! ==========================================================================
    setEducationData: (state, action) => {
      state.education = { ...state.education, ...action.payload };
    },

    // ? ==========================================================================

    // ! ==========================================================================
    // * SET SKILL DATA FETCH FROM BACKEND
    // ! ==========================================================================
    setSkillsData: (state, action) => {
      state.skills = { ...state.skills, ...action.payload };
    },

    // ? ==========================================================================

    // ? ==========================================================================

    // ! ==========================================================================
    // * SET EXPERIENCE DATA FETCH FROM BACKEND
    // ! ==========================================================================
    setExperienceData: (state, action) => {
      state.experince = { ...state.experince, ...action.payload };
    },

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
  experienceChange,
  experienceBulletChange,
  toogleDialogBox,
  setNextSection,
  addedProjects,
  removeProjects,
  updateProjectPoints,
  updateProject,
  // ! SET RESUME DATA
  seHeaderData,
  setSummaryData,
  setEducationData,
  setSkillsData,
  setExperienceData,
} = resumeSlice.actions;

export const resumeSlices = resumeSlice.reducer;
