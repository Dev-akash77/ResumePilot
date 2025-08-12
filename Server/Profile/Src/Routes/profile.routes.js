import { Router } from "express";
import { profileData } from './../Controller/profile.controller.js';

const router  = Router();

// ! Profile data routes
router.get("/",profileData)


export const profileRoutes = router;