import logger from "../Config/logger.config.js";
import { publishEvent } from "../Config/rabitmq.config.js";
import { EXCHANGES, ROUTING_KEYS } from "../Constant/rabitmq.constant.js";
import { REDIS_KEYS } from "../Constant/redis.constant.js";
import { profileModel } from "../Model/profile.model.js";
import { deleteCached } from "../Utils/cached.utils.js";

export const profileCreate = async (data) => {
  try {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      logger.warn("profileCreate: No data received");
      return;
    }

    const { name, email, lastLogin, _id } = data;
    const authId = _id.toString();

    const profileData = await profileModel.create({
      name,
      email,
      authId,
      lastActivity: lastLogin || new Date(),
    });

    // ! publish event to auth service to update user_profolie id
    await publishEvent(EXCHANGES.AUTH, ROUTING_KEYS.AUTH.UPDATE_USER_ID, {
      authId: authId,
      profileId: profileData._id.toString(),
    });

    logger.info(`Profile created for authId: ${authId}`);
  } catch (error) {
    logger.error("Error in profileCreate:", error.message || error);
  }
};

export const verifyProfile = async (data) => {
  try {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      logger.warn("profile Verify: No data received");
      return;
    }

    const { authId, otp } = data;

    if (!authId || !otp) {
      return logger.warn("profile Verify: No data received");
    }

    const result = await profileModel.findOne({ authId });

    if (!result) {
      return logger.error("User not found");
    }

    result.isVerified = true;
    await result.save();

    await deleteCached(REDIS_KEYS.PROFILE_BY_AUTHID(authId));
    logger.info(`profile verified : ${result._id}`);
  } catch (error) {
    logger.error("Error in profile Verify:", error.message || error);
  }
};

export const updateResumeCount = async (data) => {
  try {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      logger.warn("profile update resume count: No data received");
      return;
    }

    const { creator, resumeId } = data;
    const user = await profileModel.findOne({ authId: creator });

    if (!user || (Array.isArray(user) && user.length === 0)) {
      return logger.warn(`user not find in resumecount profile event`);
    }

    user.cradit = (user.cradit ?? 0) - 5;

    user.resume.push(resumeId);

    await user.save();
    await deleteCached(REDIS_KEYS.PROFILE_BY_AUTHID(authId));

    logger.info("Credit deducted & resume added successfully");
  } catch (error) {
    logger.error(
      "Error in profile update resume count:",
      error.message || error
    );
  }
};

export const ubdateCradit = async (data) => {
  try {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      logger.warn("Cradit Added : No data received");
      return;
    }

    const { authId, cradit } = data;

    if (!authId || !cradit) {
      return logger.warn("Cradit Added : No data received");
    }
    // ! atomic credit increment
    const updatedProfile = await profileModel.findOneAndUpdate(
      { authId },
      { $inc: { cradit } },
      { new: true }
    );

    if (!updatedProfile) {
      logger.warn(`Credit update failed: user not found (${authId})`);
      return;
    }

    await deleteCached(REDIS_KEYS.PROFILE_BY_AUTHID(authId));

    logger.info(
      `Credit added successfully | user=${authId} | +${cradit} | total=${updatedProfile.cradit}`
    );
  } catch (error) {
    logger.error("Error in Cradit Added ubdateCradit", error.message || error);
  }
};
