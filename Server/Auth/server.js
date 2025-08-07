import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import passport from "passport";
import "dotenv/config";
import { passport_config } from "./Src/Config/passport.config.js";
import { mongo_connection } from "./Src/Config/mongo.config.js";
import logger from "./Src/Config/logger.config.js";
import { authRouter } from "./Src/Routes/auh.routes.js";
import { redisConnection } from "./Src/Config/redis.config.js";

app.set("trust proxy", 1);
const app = express();
const PORT = process.env.PORT;

// ! config and connection fn
passport_config();
mongo_connection();
redisConnection()

//! Common Middleware
app.use(cookieParser()); 
app.use(express.json());



app.use(
  cors({
    origin:process.env.CLIENT_URL,
    credentials: true,
  })
);

//! Initialize Passport
app.use(passport.initialize());


// ! router implement
app.use("/auth",authRouter)



app.listen(PORT, () => {
  logger.info(`server listening on port ${PORT}`);
});
