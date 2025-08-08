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

//! For O Auth 2.0 Google
export const googleOAuthController = async (req, res) => {
  try {
    const profile = req.user;

    const email = profile.emails?.[0]?.value.toLowerCase();
    const avatar = profile.photos?.[0]?.value;

    if (!email) {
      logger.error("No Email Found In Google Profile");
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }

    let authData = await authModel.findOne({ email });

    if (authData && authData.provider !== "google") {
      logger.warn(`Email already registered via ${authData.provider}`);
      return res.redirect(
        `${process.env.CLIENT_URL}/auth?error=provider_mismatch&registered_provider=${authData.provider}&message=Provider Mismatch`
      );
    }

    //! Create new user
    if (!authData) {
      authData = await authModel.create({
        name: profile.displayName,
        email,
        avatar,
        googleId: profile.id,
        isVerified: true,
        provider: "google",
      });
    }

    //! Generate token etc. (same as manual registration)
    const payload = {
      name: authData.name,
      email: authData.email,
      id: authData._id,
    };

    const token = generateToken(payload);
    if (token) {
      res.cookie("token", token, {
        httpOnly: true,
        secure: true, // force true in production
        sameSite: "none", // important for cross-origin
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
    }
    logger.info(`User Registerd via Google With this Email: ${authData.email}`);

    return res.redirect(`${process.env.CLIENT_URL}`);
  } catch (error) {
    logger.error(`Google OAuth Controller error: ${error.message}`);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

//! For O Auth 2.0 Google
export const githubOAuthController = async (req, res) => {
  try {
    const profile = req.user;

    //! Extract email safely
    const accessToken = profile.accessToken;

    let email = null;
    const avatar = profile.photos?.[0]?.value;
    const name = profile.displayName || profile.username || "GitHub User";

    //! Request user's emails with the access token
    const emailResponse = await fetch("https://api.github.com/user/emails", {
      headers: {
        Authorization: `token ${accessToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (emailResponse?.ok) {
      const emails = await emailResponse?.json();

      //! Find primary and verified email
      const primaryEmail = emails?.find((e) => e.primary && e.verified);
      if (primaryEmail) {
        email = primaryEmail.email.toLowerCase();
      }
    }

    if (!email) {
      logger.error("No Email Found In Github Profile");
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }

    let authData = await authModel.findOne({ email });

    if (authData && authData.provider !== "github") {
      logger.warn(
        `Email already registered with provider: ${authData.provider}`
      );
      return res.redirect(
        `${process.env.CLIENT_URL}/auth?error=provider_mismatch&registered_provider=${authData.provider}&message=Provider Mismatch`
      );
    }

    //! Create new user
    if (!authData) {
      authData = await authModel.create({
        name: name,
        email,
        avatar,
        githubId: profile.id,
        isVerified: true,
        provider: "github",
      });
    }

    //! Generate token etc. (same as manual registration)
    const payload = {
      name: authData.name,
      email: authData.email,
      id: authData._id,
    };

    const token = generateToken(payload);
    setCookie(res, token);
    logger.info(`User Registerd via Github With this Email: ${authData.email}`);

    return res.redirect(`${process.env.CLIENT_URL}`);
  } catch (error) {
    logger.error(`Github OAuth Controller error: ${error.message}`);
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

    //! Check if registered manually
    if (existingAuthData && existingAuthData.provider !== "manual") {
      logger.warn(
        `Login Failed: Email ${email} already registered with ${existingAuthData.provider}`
      );
      return res.status(400).json({
        success: false,
        message: `Login with ${existingAuthData.provider} only`,
      });
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
