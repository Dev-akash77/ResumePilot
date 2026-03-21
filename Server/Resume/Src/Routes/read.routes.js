
import express from 'express';
import { getAllResume, getPerticularResume } from '../controller/read.controller.js';

const router = express.Router();

// ! GET ALL RESUME
router.get("/", getAllResume);

// ! GET ALL RESUME
router.get("/:id",getPerticularResume);



export const readRoutes = router;