import logger from "../Config/logger.config.js";
import { publishEvent } from "../Config/rabitmq.config.js";
import { EXCHANGES, ROUTING_KEYS } from "../Constant/rabitmq.constant.js";
import { REDIS_KEYS } from "../Constant/redis.constant.js";
import { deleteCached } from "../Utils/cached.utils.js";
import { authModel } from "./../Model/auth.model.js";
import bcrypt from "bcrypt";

// ! Send OTP For User Verification 6 digit otp
export const sendOtpVerification = async (req, res) => {
  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const { authId,name,email } = req.user;

    const result = await authModel.findById(authId);

    if (!result) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      logger.error("User not found");
      return 0;
    }
    const hashedOtp = await bcrypt.hash(otp, 10);
    result.otp = hashedOtp;
    result.otpExp = new Date(Date.now() + 5 * 60 * 1000);
    await result.save();

    await deleteCached(REDIS_KEYS.PROFILE_BY_AUTHID(authId));
    await publishEvent(EXCHANGES.NOTIFICATION,ROUTING_KEYS.NOTIFICATION.VERIFICATION_EMAIL,{
      email,
      name,
      otp
    })
    res.status(200).json({
      success: true,
      message: "OTP sent to your email",
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
    logger.error(`Send OTP Error :  ${error.message || error}`);
  }
};

// ! verified User
export const verifyeUser = async (req, res) => {
  try {
    let { otp } = req.body;
    const { authId } = req.user;
    otp = otp.toString().trim();

    if (!otp) {
      logger.error("OTP Not Found");
      return res.status(400).json({ success: false, message: "OTP Not Found" });
    }

    const result = await authModel.findById(authId);

    if (!result) {
      logger.error("User not found");
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (!result.otp || !result.otpExp) {
      logger.error("OTP not found for this user");
      return res.status(400).json({ success: false, message: "OTP not found" });
    }

    //! Check expiry
    if (Date.now() > result.otpExp.getTime()) {
      logger.error("OTP expired");
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    //! Check match
    const isMatchOtp = await bcrypt.compare(otp, result.otp);

    if (!isMatchOtp) {
      logger.error("Invalid OTP");
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    await publishEvent(EXCHANGES.PROFILE, ROUTING_KEYS.PROFILE.VERIFY, {
      authId,
      otp,
    });

    //! Mark as verified & clear OTP
    result.isVerified = true;
    result.otp = null;
    result.otpExp = null;
    await result.save();

    await deleteCached(REDIS_KEYS.PROFILE_BY_AUTHID(authId));

    res.status(200).json({
      success: true,
      message: "User verified successfully",
    });
  } catch (error) {
    logger.error("verified User Error : ", error.message || error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
