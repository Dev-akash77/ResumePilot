import { Router } from "express";
import { getSpeceficProfileResume, getUserCredit, profileData } from './../Controller/profile.controller.js';

const router  = Router();

// !specefic  Profile data routes
router.get("/",profileData);

// ! Profile cradit
router.get("/credit/:authId", getUserCredit);

router.get('/resume',getSpeceficProfileResume)


export const profileRoutes = router;