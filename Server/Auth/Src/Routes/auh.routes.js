import express from "express";
import {
  register,
  login,
  logout,
  isAuthenticate,
} from "./../Controller/auth.controller.js";
import { authMiddleware } from "../Middleware/auth.middleware.js";
import { rateLimitMiddleware } from "../Middleware/ratelimit.middleware.js";

const router = express.Router();

//! Manual Register & Login
router.post("/register",rateLimitMiddleware, register);
router.post("/login", rateLimitMiddleware,login);

//! Logout
router.post("/logout", logout);

// ! Check User Is Authenticated OR Not
router.get("/status", authMiddleware, isAuthenticate);

export const authRouter = router;
