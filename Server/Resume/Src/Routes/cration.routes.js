
import express from 'express';
import { createResume, resumeHeader, resumeSummary } from '../controller/creation.controller.js';

const router = express.Router();


router.post("/", createResume);
router.post("/header", resumeHeader);
router.post("/summary", resumeSummary);

export const creationRoutes = router;