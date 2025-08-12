import { Router } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { authMiddleware } from "./../Middleware/auth.middleware.js";
import logger from "../Config/logger.config.js";

const router = Router();

router.use(authMiddleware);

router.use(
  "/profile",
  createProxyMiddleware({
    target: process.env.PROFILE_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { "^/": "/profile/" },
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

export const profileRoutes = router;
