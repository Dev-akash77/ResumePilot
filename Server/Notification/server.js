import cors from "cors";
import express from "express";
import "dotenv/config";
import logger from "../Profile/Src/Config/logger.config.js";
import { connectRabbitMQ, consumeEvent } from "./Src/Config/rabitmq.config.js";
import { EXCHANGES, ROUTING_KEYS } from './Src/Constant/rabitmq.constant.js';
import { welcomeNotification } from "./Src/Events/welcome.event.js";
import { sendOtpverification } from "./Src/Events/sendOtp.events.js";

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
(async()=>{
  await connectRabbitMQ(EXCHANGES.NOTIFICATION);

  // ! consume welcomeNotification
  await consumeEvent(EXCHANGES.NOTIFICATION,ROUTING_KEYS.NOTIFICATION.WELCOME_EMAIL,welcomeNotification);
  await consumeEvent(EXCHANGES.NOTIFICATION,ROUTING_KEYS.NOTIFICATION.VERIFICATION_EMAIL,sendOtpverification);
})()

app.listen(PORT, () => {
  logger.info(`server listening on port ${PORT} : {Notification Service}`);
});