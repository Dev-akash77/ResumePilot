import { Router } from "express";
import { getUserCredit, profileData } from './../Controller/profile.controller.js';

const router  = Router();

// ! Profile data routes
router.get("/",profileData);

// ! Profile cradit
router.get("/credit/:authId", getUserCredit);


export const profileRoutes = router;