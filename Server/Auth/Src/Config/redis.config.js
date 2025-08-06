import Redis from "ioredis";
import logger from "./logger.config.js";

export let redis;

export const redisConnection = async () => {
  try {
    const redisOptions = {
      maxRetriesPerRequest: 20,
      tls: {},
    };

    redis = new Redis(process.env.REDIS_URI, redisOptions);

    //! REDIS CONNECTED SUCCESSFULLY
    redis.on("connect", () => {
      const { host, port } = redis.options;
      logger.info(`Redis Connected: ${host}:${port}`);
    });

    //! REDIS CONNECION CLOSE
    redis.on("close", () => {
      logger.warn("Redis Connection Close");
    });

    //! REDIS CONNECTION ERROR
    redis.on("error", (err) => {
      logger.error("Redis Connection Error:", err);
    });
  } catch (error) {
    logger.error("Redis connection error:", error);
  }
};
