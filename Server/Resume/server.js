import cors from "cors";
import express from "express";
import "dotenv/config";
import logger from './Src/Config/logger.config.js';


const app = express();
const PORT = process.env.PORT; 

// ! config and connection fn
  
 
//! rabitmq connection and consume event

//! Common Middleware
app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);



app.listen(PORT, () => {
  logger.info(`server listening on port ${PORT} : {Resume Service}`);
});
   