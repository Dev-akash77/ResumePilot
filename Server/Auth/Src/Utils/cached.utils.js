import logger from "../Config/logger.config.js";
import { redis } from "../Config/redis.config.js";

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
