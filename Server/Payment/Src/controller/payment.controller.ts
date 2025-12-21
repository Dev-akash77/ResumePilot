import { Request, Response } from "express";
import logger from "../config/logger.config";
import Razorpay from "razorpay";

// ! Creat Instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID as string,
  key_secret: process.env.RAZORPAY_SECRET as string,
});

export const payment = async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;
    const authId = req.header("x-auth-data");

    if (!amount || amount.length < 0) {
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
