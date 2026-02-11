import cors from "cors";
import express from "express";
import "dotenv/config";
import logger from './Src/Config/logger.config.js';
import { connectRabbitMQ, consumeEvent } from "./Src/Config/rabitmq.config.js";
import { EXCHANGES, ROUTING_KEYS } from './Src/Constant/rabitmq.constant.js';
import { profileCreate, ubdateCradit, updateResumeCount, verifyProfile } from "./Src/Event/profile.event.js";
import { mongo_connection } from './Src/Config/db.config.js';
import { profileRoutes } from "./Src/Routes/profile.routes.js";
import { redisConnection } from "./Src/Config/redis.config.js";


const app = express(); 
const PORT = process.env.PORT; 

// ! config and connection fn
mongo_connection();
redisConnection(); 
    
  
//! rabitmq connection and consume event
(async () => {
  await connectRabbitMQ(EXCHANGES.PROFILE);
  await consumeEvent(EXCHANGES.PROFILE,ROUTING_KEYS.PROFILE.CREATE,profileCreate);
  await consumeEvent(EXCHANGES.PROFILE,ROUTING_KEYS.PROFILE.VERIFY,verifyProfile);
  await consumeEvent(EXCHANGES.PROFILE,ROUTING_KEYS.PROFILE.UPDATE_USER_RESUME_CREATION,updateResumeCount);
  await consumeEvent(EXCHANGES.PROFILE,ROUTING_KEYS.PROFILE.ADDED_CRADIT,ubdateCradit);
})();
 
//! Common Middleware 
app.use(express.json());

app.use( 
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);


app.use("/profile",profileRoutes)


app.listen(PORT, () => {
  logger.info(`server listening on port ${PORT} : {Profile Service}`);
});
   