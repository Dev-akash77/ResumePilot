import logger from "../Config/logger.config.js";
import { publishEvent } from "../Config/rabitmq.config.js";
import { EXCHANGES, ROUTING_KEYS } from "../Constant/rabitmq.constant.js";
import { profileModel } from "../Model/profile.model.js";

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
