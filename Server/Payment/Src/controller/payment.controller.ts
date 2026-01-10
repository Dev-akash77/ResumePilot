import { Request, Response } from "express";
import logger from "../config/logger.config";
import Razorpay from "razorpay";
import { publishEvent } from "../config/rabitmq.config";
import { EXCHANGES, ROUTING_KEYS } from "../constant/rabitmq.constant";
import { database } from "../config/db.config";
import { payments } from "../database/schema";
import { eq } from "drizzle-orm";

// ! Creat Instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID as string,
  key_secret: process.env.RAZORPAY_SECRET as string,
});

export const payment = async (req: Request, res: Response) => { 
  try {
    const { amount } = req.body;
    const authId = req.header("x-auth-data");    

    if (!amount) {
      return res
        .status(400)
        .json({ success: false, message: "Valid amount is required" });
    }

    if (!authId) {
      return res
        .status(400)
        .json({ success: false, message: "User Not Found" });
    }

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: authId,
    });

    logger.info(`Razorpay order created: ${order.id}`);
    

    await database.insert(payments).values({
      auth_id:authId,
      payment_id:'PENDING',
      order_id:order.id,
      creditsPurchased: 0,
      amount:amount,
    })


    return res.status(201).json({
      success: true,
      message: "Payment order created",
      data: order,
    });
  } catch (error: any) {
    logger.error(`Error in payment controller: ${error.message}`);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const verifyPayment = async (req: Request, res: Response) => {
  try {
    const { razorpay_order_id, cradit } = req.body;
    const authId = req.header("x-auth-data");

    if (!razorpay_order_id || !cradit) {
      return res
        .status(400)
        .json({ success: false, message: "Something Went Wrong" });
    }

    const orderInfo = await razorpay.orders.fetch(razorpay_order_id);

    if (!orderInfo) {
      return res
        .status(400)
        .json({ success: false, message: "Order not verify" });
    }

    const eventPayload = {
      authId,
      cradit,
    };
    
    // ! PUBLISH EVENT
    await publishEvent(
      EXCHANGES.PROFILE,
      ROUTING_KEYS.PROFILE.ADDED_CRADIT,
      eventPayload
    );
  
    await database.update(payments).set({
      payment_id:razorpay_order_id,
      creditsPurchased:cradit,
      success:true,
      currency:orderInfo.currency
    }).where(eq(payments.order_id,razorpay_order_id));
    
    res
      .status(200)
      .json({ success: true, message: "Payment Successful", data: orderInfo });
  } catch (error: any) {
    logger.error(`Error in Verify payment controller: ${error.message}`);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
 