import { verifyToken } from "../Service/jwt.service.js";

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

    const decode = verifyToken(token);
    req.user = decode;

    next();

  } catch (error) {
    logger.error(`Auth Middleware Error: ${error.message}`);
    return res.status(401).json({
      success: false,
      message: "Expired token",
    });
  }
};
