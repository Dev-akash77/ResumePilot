import cors from "cors";
import express from "express";
import "dotenv/config";
import { connectRabbitMQ, consumeEvent } from "./Src/Config/rabitmq.config.js";
import { EXCHANGES, ROUTING_KEYS } from './Src/Constant/rabitmq.constant.js';
import { welcomeNotification } from "./Src/Events/welcome.event.js";
import { sendOtpverification } from "./Src/Events/sendOtp.events.js";
import logger from "./Src/Config/logger.config.js";

const app = express();
const PORT = process.env.PORT;


//! Common Middleware
app.use(express.json()); 

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })  
); 
 
//! rabitmq connection and consume event
(async () => {
  try {
    await connectRabbitMQ(EXCHANGES.NOTIFICATION);
    
    // Consumers
    await consumeEvent(EXCHANGES.NOTIFICATION, ROUTING_KEYS.NOTIFICATION.WELCOME_EMAIL, welcomeNotification);
    await consumeEvent(EXCHANGES.NOTIFICATION, ROUTING_KEYS.NOTIFICATION.VERIFICATION_EMAIL, sendOtpverification);
    
    logger.info("✅ Notification Service connected to RabbitMQ");
  } catch (error) {
    logger.error("❌ Failed to start RabbitMQ Consumers:", error);
    process.exit(1); // Docker restart karega
  }
})();

app.listen(PORT, () => {
  logger.info(`server listening on port ${PORT} : {Notification Service}`);
});