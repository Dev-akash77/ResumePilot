import { authModel } from "./../Model/auth.model.js";
import bcrypt from "bcrypt";
import logger from "../Config/logger.config.js";
import { generateToken } from "./../Service/jwt.service.js";
import { clearCookie, setCookie } from "../Utils/cookies.utils.js";

//! Manual Register Controller
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //! Validate input
    if (!name || !email || !password) {
      logger.error("Missing Field in Register");
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const lowerEmail = email.trim().toLowerCase();

    //! Check if user already exists
    const existUser = await authModel.findOne({ email: lowerEmail });
    if (existUser) {
      logger.error("Email already registered");
      return res
        .status(400)
        .json({ success: false, message: "Email already registered" });
    }

    //! check password is strong
    if (password.length < 6) {
      logger.error("Weak password");
      return res
        .status(400)
        .json({ success: false, message: "Add a strong password" });
    }

    //! Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //! Save AuthData in Database
    const authData = new authModel({
      name: name,
      password: hashedPassword,
      email: lowerEmail,
    });
    await authData.save();

    //! Generate JWT Token
    const payload = { name, email: lowerEmail, id: authData._id };
    const token = generateToken(payload);

    //! Set token in cookies (HTTP-only)
    setCookie(res, token);

    logger.info(`New user registered: ${lowerEmail}`);

    return res
      .status(201)
      .json({ success: true, message: "User registered successfully", token });
  } catch (error) {
    logger.error(`Register error: ${error.message}`);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ! Manual Login Controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //! Validate input
    if (!email || !password) {
      logger.error("Missing Fields in Login");
      return res
        .status(400)
        .json({ success: false, message: "All Fields Are Required" });
    }

    //! Check if user exists
    const existingAuthData = await authModel.findOne({ email });

    if (!existingAuthData) {
      logger.warn(`Login Failed: User with email ${email} not found`);
      return res
        .status(404)
        .json({ success: false, message: "Invalid Credentials" });
    }

    //! Compare password
    const isMatch = await bcrypt.compare(password, existingAuthData.password);
    if (!isMatch) {
      logger.warn("Login Failed: Incorrect Password");
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credentials" });
    }

    //! Generate Token
    const payload = {
      name: existingAuthData.name,
      email: email,
      id: existingAuthData._id,
    };
    const token = generateToken(payload);

    //! Set Cookies
    setCookie(res, token);

    //! Success
    logger.info(`Login Success: ${email}`);
    return res.status(200).json({
      success: true,
      message: "Login Successful",
      token: token,
    });
  } catch (error) {
    logger.error(`Login error: ${error.message}`);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server error" });
  }
};

// ! Logout Controller
export const logout = async (req, res) => {
  try {
    clearCookie(res);
    //! Success
    logger.info("User logged out");

    return res.status(200).json({
      success: true,
      message: "Logout Successful",
    });
  } catch (error) {
    logger.error(`Logout error: ${error.message}`);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server error" });
  }
};

// ! Check User Is Authenticated OR Not
export const isAuthenticate = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User authenticated",
      user: req.user,
    });
  } catch (error) {
    logger.error(`isAuthenticate error: ${error.message}`);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server error" });
  }
};
