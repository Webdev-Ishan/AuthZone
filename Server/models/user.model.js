import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  email: { type: String, required: true },
  verifyotp: { type: String, default: "" },
  verifyotpexpiresAt: { type: Number, default: 0 },
  isAccountverified: { type: Boolean, default: false },
  resetOtp: { type: String, default: "" },
  resetOtpExpiresAt: { type: Number, default: 0 },
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
