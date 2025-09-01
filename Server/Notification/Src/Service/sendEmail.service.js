import logger from "../Config/logger.config.js";
import { transporter } from "./../Utils/nodeMailer.config.js";

export const sendEmail = async (to, subject, text, html = null) => {
  try {
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to,
      subject,
      text,
    };

    if (html) {
      mailOptions.html = html;
    }

   const info =  await transporter.sendMail(mailOptions);
   logger.info(`Email sent to ${to}: ${info.messageId}`);
    return info;
  } catch (error) {
    logger.error(`Error sending email:, "{${err}}"`);
  }
};
