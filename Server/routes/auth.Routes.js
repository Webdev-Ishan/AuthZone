import express from "express";
const authRouter = express.Router();
import {
  register,
  login,
  logout,
  verifyemail,
  sendverifyotp,
  isAuthenticated,
} from "../controllers/auth.controller.js";
import userAuth from "../middleware/user.Auth.js";

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/send-verify-otp", userAuth, sendverifyotp);
authRouter.post("/verify-account", userAuth, verifyemail);
authRouter.post("/is-Auth", userAuth, isAuthenticated);

export default authRouter;
