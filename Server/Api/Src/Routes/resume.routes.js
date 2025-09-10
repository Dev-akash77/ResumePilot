import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import logger from "../Config/logger.config.js";
import { authMiddleware } from "../Middleware/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware)

router.use(
  "/resume",
  createProxyMiddleware({
    target: process.env.RESUME_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { "^/": "/resume/" },
    on: {
      proxyReq: (proxyReq, req, res) => {
        proxyReq.setHeader("x-auth-data", req.user?.authId);
      },

      error: (err, req, res) => {
        logger.error("Proxy Error", err);
        res.writeHead(500, {
          "Content-Type": "text/plain",
        });

        res.end("Something went wrong with proxy.");
      },
    },
  })
);

export const resumeRoutes = router;
