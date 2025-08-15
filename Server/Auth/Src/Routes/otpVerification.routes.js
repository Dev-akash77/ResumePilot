import { Router } from "express";
import { sendOtpVerification, verifyeUser } from "../Controller/otpVerification.controller.js";
import { authMiddleware } from './../Middleware/auth.middleware.js';
import { rateLimitMiddleware } from "../Middleware/ratelimit.middleware.js";

const router = Router();



// ! send OTP Routes
router.post("/otp/send",rateLimitMiddleware,authMiddleware,sendOtpVerification);
router.post("/otp/verify",rateLimitMiddleware,authMiddleware,verifyeUser);


export const otpVerifyRouter = router;