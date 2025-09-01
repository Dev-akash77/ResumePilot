import express from "express";
import "dotenv/config";
import cors from "cors";
import { authRoutes } from "./Src/Routes/auth.routes.js";
import logger from "./Src/Config/logger.config.js";
import { profileRoutes } from "./Src/Routes/profile.route.js";
import cookieParser from "cookie-parser";

const app = express();

// ! SERVER PORT
const PORT = process.env.PORT;

//! CROS SETUP
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }) 
);  
app.use(cookieParser()); 

// ! PROXY ROUTES STUP
app.use(authRoutes);
app.use(profileRoutes);

app.listen(PORT, () => {
  logger.info(`server listening on port ${PORT}, : {Api Gateway Service}`);
});
