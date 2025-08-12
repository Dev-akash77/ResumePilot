import { profileModel } from "./../Model/profile.model.js";
import logger from "./../Config/logger.config.js";
import { REDIS_KEYS } from "../Constant/redis.constant.js";
import { getCached, setCached } from "../Utils/cached.utils.js";

//! Get profile data by authId from header
export const profileData = async (req, res) => {
  try {
    const authId = req.header("x-auth-data");

    if (!authId) {
      logger.warn("Missing x-auth-data header");
      return res.status(400).json({
        success: false,
        message: "Authentication token missing",
      });
    }
 
    const cacheKey = REDIS_KEYS.PROFILE_BY_AUTHID(authId);
    const cachedProfile = await getCached(cacheKey);
    
    
    if (cachedProfile) {
      logger.info(`Profile served from cache for authId: ${authId}`);
      return res.status(200).json({
        success: true,
        data: cachedProfile,
        cache: true,
      });
    }


    const profile = await profileModel.findOne({ authId });
    
    if (!profile) {
      logger.error(`No profile found for authId: ${authId}`);
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    await setCached(cacheKey, profile, 300);
    logger.info(`Profile fetched from DB and cached for authId: ${authId}`);
 
    return res.status(200).json({
      success: true,
      data: profile,
      cache: false,
    });

  } catch (error) {
    logger.error(`Error fetching profile: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
