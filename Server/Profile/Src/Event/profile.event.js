import logger from "../Config/logger.config.js";
import { publishEvent } from "../Config/rabitmq.config.js";
import { EXCHANGES, ROUTING_KEYS } from "../Constant/rabitmq.constant.js";
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

    await deleteCached(authId);
    logger.info(`profile verified : ${result._id}`)
  } catch (error) {
    logger.error("Error in profile Verify:", error.message || error);
  }
};
