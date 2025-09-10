import mongoose from "mongoose";
import logger from "./logger.config.js";

export const mongo_connection = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    logger.info(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    logger.error("mongo db connection error", error?.message || error);
    process.exit(1);
  }
};
