import express from "express";
import {
  googleOAuthController,
  register,
  githubOAuthController,
  login,
  logout,
  isAuthenticate,
} from "./../Controller/auth.controller.js";
import passport from "passport";
import { authMiddleware } from "../Middleware/auth.middleware.js";
import { rateLimitMiddleware } from "../Middleware/ratelimit.middleware.js";

const router = express.Router();

//! Manual Register & Login
router.post("/register",rateLimitMiddleware, register);
router.post("/login", rateLimitMiddleware,login);

//! OAuth 2.0 @[Google]
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL}/auth`,
  }),
  googleOAuthController
);

//! OAuth 2.0 @[Github]
router.get(
  "/github",
  passport.authenticate("github", {
    scope: ["user:email"],
    session: false,
  })
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL}/auth`,
  }),
  githubOAuthController
);

//! Logout
router.post("/logout", logout);

// ! Check User Is Authenticated OR Not
router.get("/status", authMiddleware, isAuthenticate);

export const authRouter = router;
