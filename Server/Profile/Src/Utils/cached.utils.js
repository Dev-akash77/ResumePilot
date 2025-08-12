import logger from "../Config/logger.config.js";
import { redis } from "../Config/redis.config.js";

export const setCached = async (key, value, ttl = 300) => {
  try {
    if (!key) {
      return logger.warn("setCached called without key");
    }

    if (value && typeof value.toObject === "function") {
      value = value.toObject();
    }
 
    await redis.set(key, JSON.stringify(value), "EX", ttl);

    logger.info(`Cache set for key: ${key} (TTL: ${ttl}s)`);
  } catch (error) {
    logger.error(`Error setting cache for key ${key}: ${error.message}`);
  }
};

export const getCached = async (key) => {
  try {
    if (!key) {
      return logger.warn("getCached called without key");
    }

    const data = await redis.get(key);


    return JSON.parse(data);
  } catch (error) {
    logger.error(`Error getting cache for key ${key}: ${error.message}`);
    return null;
  }
};

export const deleteCached = async (key) => {
  try {
    if (!key) {
      return logger.warn("deleteCached called without key");
    }

    const result = await redis.del(key);
    if (result === 1) {
      return logger.info(`Cache deleted for key: ${key}`);
    } else {
      return logger.warn(`Cache key not found for deletion: ${key}`);
    }
  } catch (error) {
    logger.error(`Error deleting cache for key ${key}: ${error.message}`);
  }
};
