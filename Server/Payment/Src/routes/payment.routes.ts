import { Router } from 'express';
import { payment } from '../controller/payment.controller';


const route  = Router();

route.post("/payment",payment);

export const paymentRoutes = route;
