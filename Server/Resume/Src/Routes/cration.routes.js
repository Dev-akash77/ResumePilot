import express from "express";
import {
  createResume,
  deleteResume,
  resumeEducation,
  resumeExperince,
  resumeHeader,
  resumeSkills,
  resumeSummary,
  updateProjects,
} from "../controller/creation.controller.js";

const router = express.Router();


// ! Create Resume
router.post("/", createResume);
router.post("/header", resumeHeader);
router.post("/summary", resumeSummary);
router.post("/education", resumeEducation);
router.post("/skills", resumeSkills);
router.post("/experince", resumeExperince);
router.post("/project", updateProjects);

// ! Delete Resume
router.delete('/',deleteResume);

export const creationRoutes = router;
