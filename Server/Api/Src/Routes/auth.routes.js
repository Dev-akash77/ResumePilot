import express from "express";


import { createProxyMiddleware } from "http-proxy-middleware";
import logger from "../Config/logger.config.js";

const router = express.Router();

router.use(
  "/auth",
  createProxyMiddleware({
    target: process.env.AUTH_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { "^/": "/auth/" },
    onError: (err, req, res) => {
      logger.error("Proxy Error", err);

      res.writeHead(500, {
        "Content-Type": "text/plain",
      });

      res.end("Something went wrong with proxy.");
    },
  })
);

export const authRoutes = router;
