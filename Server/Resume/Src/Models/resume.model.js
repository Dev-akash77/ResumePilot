import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  color: { type: String, default: "#2563eb" },
  name: { type: String, default: "" },
  number: { type: String, default: "0000000000" },
  email: { type: String, default: "" },
  portfolio: { type: String, default: "" },
  github: { type: String, default: "" },
  linkedin: { type: String, default: "" },
  summary: { type: String, default: "" },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auth",
    required: true,
  },
  //   education
  education: [
    {
      college: { type: String, default: "" },
      degree: { type: String, default: "" },
      location: { type: String, default: "" },
      start: { type: Date, default: null },
      end: { type: Date, default: null },
      cgpa: { type: String, default: "" },
    },
  ],
  // skills
  skills: {
    technical: { type: [String], default: [] },
    tools: { type: [String], default: [] },
  },
  //   experiences
  experience: [
    {
      title: { type: String, default: "" },
      role: { type: String, default: "" },
      start: { type: Date, default: null },
      end: { type: Date, default: null },
      location: { type: String, default: "" },
      points: { type: [String], default: [] },
    },
  ],
  //   projects
  projects: [
    {
      name: { type: String, default: "" },
      about: { type: String, default: "" },
      start: { type: Date, default: null },
      end: { type: Date, default: null },
      points: { type: [String], default: [] },
      techStack: { type: [String], default: [] },
      live: { type: String, default: "" },
      github: { type: String, default: "" },
    },
  ],
});

export const resumeModel = mongoose.model("Resume", ResumeSchema);
