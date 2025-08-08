import { model, Schema } from "mongoose";

const AuthSchema = new Schema(
  {
    name: { type: String, required: true },
    password: { type: String, default: "" },
    email: { type: String, required: true, unique: true },
    provider: {
      type: String,
      enum: ["google", "manual", "github"],
      default: "manual",
    },
    avatar: { type: String, default: "" },
    userId: { type: String, default: "" }, //! pass via rabitmq
    googleId: { type: String, default: "" },
    githubId: { type: String, default: "" },
    isVerified: { type: Boolean, default: false },
    lastLogin: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["active", "suspend", "ban"],
      default: "active",
    },
    otp: { type: String, default: "" },
    otpExp: { type: Date, default: Date.now },
  },
  { timestamps: true }
); 

export const authModel = model("Auth", AuthSchema);
