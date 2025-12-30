import express from "express";
import "dotenv/config";
import logger from "./config/logger.config";
import { pg_onnection } from "./config/db.config";
import { paymentRoutes } from "./routes/payment.routes";
import { connectRabbitMQ } from "./config/rabitmq.config";
import { EXCHANGES } from "./constant/rabitmq.constant";


const app = express();
const PORT = Number(process.env.PORT)||4005;

// ! COMMON MIDDLEWARE
app.use(express.json());

// ! DEFINE ALL CONFIG FN
pg_onnection();

// ! RABITMQ
(async()=>{
  await connectRabbitMQ(EXCHANGES.PAYMENT);
})()
 
// ! DEFINE ROUTES
app.use("/payment",paymentRoutes);

// ! START THE SERVER ON PORT 4005
app.listen(PORT, () => {
  logger.info(`server listening on port ${PORT} : {Payment Service}`);
});
