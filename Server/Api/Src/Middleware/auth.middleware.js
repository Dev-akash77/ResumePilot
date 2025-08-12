import jwt from "jsonwebtoken";
import logger from './../Config/logger.config.js';

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      logger.warn("Unauthorized: No token provided");
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Please login first",
      });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const { email, id, name } = decode;

    req.user = { email, name, authId: id };
    
    next();
  } catch (error) {
    logger.error(`Auth Middleware Error: ${error.message}`);
    return res.status(401).json({
      success: false,
      message: "Expired token",
    });
  }
};
