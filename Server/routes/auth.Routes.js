import express from "express";
const authRouter = express.Router();
import {
  register,
  login,
  logout,
  verifyemail,
  sendverifyotp,
  isAuthenticated,
  sendresetOtp,
  resetPassword,
} from "../controllers/auth.controller.js";
import userAuth from "../middleware/user.Auth.js";

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/send-verify-otp", userAuth, sendverifyotp);
authRouter.post("/verify-account", userAuth, verifyemail);
authRouter.get("/is-Auth", userAuth, isAuthenticated);
authRouter.post("/send-reset-otp", sendresetOtp);
authRouter.post("/reset-password", resetPassword);
export default authRouter;
