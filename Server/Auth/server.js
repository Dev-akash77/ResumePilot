import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import "dotenv/config";
import { mongo_connection } from "./Src/Config/mongo.config.js";
import logger from "./Src/Config/logger.config.js";
import { authRouter } from "./Src/Routes/auh.routes.js";
import { otpVerifyRouter } from "./Src/Routes/otpVerification.routes.js";
import { redisConnection } from "./Src/Config/redis.config.js";
import { connectRabbitMQ, consumeEvent } from "./Src/Config/rabitmq.config.js";
import { EXCHANGES, ROUTING_KEYS } from "./Src/Constant/rabitmq.constant.js";
import { updaProfileId } from "./Src/Event/update.event.js";

const app = express();  
const PORT = process.env.PORT;

// ! config and connection fn 
mongo_connection();
redisConnection();
(async () => {
  await connectRabbitMQ(EXCHANGES.AUTH);
  await consumeEvent(EXCHANGES.AUTH,ROUTING_KEYS.AUTH.UPDATE_USER_ID,updaProfileId)
})();

//! Common Middleware
app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);  

// ! router implement

// ? authentication
app.use("/auth", authRouter);

// ? otp verifyer
app.use("/auth",otpVerifyRouter)

app.listen(PORT, () => {
  logger.info(`server listening on port ${PORT}, : {Auth Service}`);
});
   