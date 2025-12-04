import express from "express";
import {
  createResume,
  getAllResume,
  resumeEducation,
  resumeExperince,
  resumeHeader,
  resumeSkills,
  resumeSummary,
  updateProjects,
} from "../controller/creation.controller.js";

const router = express.Router();

// ! GET ALL RESUME
router.get("/", getAllResume);

// ! Create Resume
router.post("/", createResume);
router.post("/header", resumeHeader);
router.post("/summary", resumeSummary);
router.post("/education", resumeEducation);
router.post("/skills", resumeSkills);
router.post("/experince", resumeExperince);
router.post("/project", updateProjects);

export const creationRoutes = router;
