import logger from "./../Config/logger.config.js";
import { authModel } from "./../Model/auth.model.js";

export const updaProfileId = async (data) => {
  try {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      logger.warn("updaProfileId: No data received");
      return;
    }
    const { authId, profileId } = data;

    await authModel.updateOne({ _id: authId }, { userId: profileId });

    logger.info(`Auth user ${authId} updated with userId ${profileId}`);
  } catch (error) {
    logger.error("Error in updateProfileId:", error.message || error);
  }
};
 