
import express from 'express';
import { getPerticularResume } from '../controller/read.controller.js';

const router = express.Router();


// ! GET ALL RESUME
router.get("/:id",getPerticularResume);

export const readRoutes = router;