
import express from 'express';
import { createResume, getAllResume, resumeEducation, resumeHeader, resumeSkills, resumeSummary } from '../controller/creation.controller.js';

const router = express.Router();


// ! GET ALL RESUME
router.get("/",getAllResume);


// ! Create Resume
router.post("/", createResume);
router.post("/header", resumeHeader);
router.post("/summary", resumeSummary);
router.post("/education", resumeEducation);
router.post("/skills", resumeSkills);

export const creationRoutes = router;