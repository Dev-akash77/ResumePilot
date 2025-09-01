import logger from "../Config/logger.config.js";
import { sendEmail } from "../Service/sendEmail.service.js";
import { accountVerificationTemplate } from './../Template/verification.templete.js';

export const sendOtpverification = async (data) => {
  try {
    if (!data) {
      return logger.warn("OTP Verification Email: No data received");
    }

    const { name, otp,email } = data;

    const html = accountVerificationTemplate(name, otp);

    // ! sending email
    await sendEmail(email,"Verify Your Account - ResumePilot","Your 6-Digit OTP for Account Verification", html);

    logger.info(`OTP Verification email sent to ${email}`);
    
  } catch (error) {
    logger.error(`OTP Verification Email Error "${error}"`);
  }
};
