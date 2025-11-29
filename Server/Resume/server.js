import cors from "cors";
import express from "express";
import "dotenv/config";
import logger from './Src/Config/logger.config.js';
import { mongo_connection } from "./Src/Config/db.config.js";
import { creationRoutes } from "./Src/Routes/cration.routes.js";
import { connectRabbitMQ } from "./Src/Config/rabitmq.config.js";
import { EXCHANGES } from "./Src/Constant/rabitmq.constant.js";
import { redisConnection } from "./Src/Config/redis.config.js";
import { readRoutes } from "./Src/Routes/read.routes.js";


const app = express();
const PORT = process.env.PORT; 

// ! config and connection fn
mongo_connection();
redisConnection();
(async()=>{
  await connectRabbitMQ(EXCHANGES.RESUME);
})()
 
//! rabitmq connection and consume event

//! Common Middleware
app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);


app.use("/resume",creationRoutes);
app.use("/resume",readRoutes);




app.listen(PORT, () => {
  logger.info(`server listening on port ${PORT} : {Resume Service}`);
});
   