
import express from 'express';
import { createResume, resumeEducation, resumeHeader, resumeSkills, resumeSummary } from '../controller/creation.controller.js';

const router = express.Router();

router.post("/", createResume);
router.post("/header", resumeHeader);
router.post("/summary", resumeSummary);
router.post("/education", resumeEducation);
router.post("/skills", resumeSkills);

export const creationRoutes = router;