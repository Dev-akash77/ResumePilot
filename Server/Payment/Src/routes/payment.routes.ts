import { Router } from 'express';
import { payment, verifyPayment } from '../controller/payment.controller';


const route  = Router();

route.post("/payment",payment);
route.post("/payment/verify",verifyPayment);

export const paymentRoutes = route;
