import logger from "../Config/logger.config.js";
import { sendEmail } from "../Service/sendEmail.service.js";
import { welcomeTemplate } from "../Template/welcome.template.js";

export const welcomeNotification = async (data) => {
  try {
    if (!data) {
      return logger.warn("Welcome Email: No data received");
    }

    const { name, email } = data;

    const html = welcomeTemplate(name, process.env.CLIENT_URL);

    // ! sending email
    await sendEmail(email,"Welcome to ResumePilot","Your Ultimate Resume Creation App", html);

    logger.info(`Welcome email sent to ${email}`);
    
  } catch (error) {
    logger.error(`Welcome Email Error "${error}"`);
  }
};
