import mongoose from "mongoose";
import { OtpDocument } from "../types/interfaces";

const otpSchema = new mongoose.Schema<OtpDocument>({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  verified: { type: Boolean, default: false },
});

otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model("otp", otpSchema);
