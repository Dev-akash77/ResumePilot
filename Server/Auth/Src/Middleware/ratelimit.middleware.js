// Src/Middleware/ratelimit.middleware.js
import { RateLimiterRedis } from "rate-limiter-flexible";
import logger from "../Config/logger.config.js";
import { redis } from "../Config/redis.config.js";

let rateLimiter;

export const rateLimitMiddleware = async (req, res, next) => {
  try {
    if (!rateLimiter) {
      if (!redis) throw new Error("Redis is not initialized");

      rateLimiter = new RateLimiterRedis({
        storeClient: redis,
        keyPrefix: "middleware",
        points: 15, // max requests
        duration: 300, // per 5 minutes
        blockDuration: 60, // block for 1 minute
      });
    }

    await rateLimiter.consume(req.ip);
    next();
  } catch (err) {
    if (
      err instanceof Error &&
      err.message.includes("Redis is not initialized")
    ) {
      logger.error("Rate limiter failed: Redis not ready");
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }

    logger.warn(`Rate limit exceeded: IP ${req.ip} on ${req.originalUrl}`);
    res.status(429).json({
      success: false,
      message: "Too many requests try again later",
    });
  }
};
