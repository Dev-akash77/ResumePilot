import { model, Schema } from "mongoose";

const PrfoileSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: {
      type: String,
      default: "",
    },
    authId: { type: String, required: true },
    cradit: { type: Number, default: 20 },
    resume: [],
    role: { type: String, enum: ["admin", "user"], default: "user" },
    lastActivity: { type: Date, default: Date.now },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const profileModel = model("Profile", PrfoileSchema);
