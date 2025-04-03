import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import transporter from "../Config/nodemailer.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.json({ success: false, message: "Something went wrong" });
  }

  try {
    const Existuser = await userModel.findOne({ email });

    if (Existuser) {
      res.json({ success: false, message: "User Already Exists" });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const user = new userModel({
      name,
      email,
      password: hashpassword,
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      const secure = process.env.NODE_ENV === "production"; // Only set secure to true in production
      maxAge: 1 * 24 * 60 * 60 * 1000,
      sameSite: "none", 
    });

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to AuthZone",
      text: `Welcome to the AuthZone website, Your account has been created successfully with email id: ${email}`,
    };

    await transporter.sendMail(mailOptions);

    return res.json({ success: true });
  }  catch (error) {
    console.error("Error during registration:", error.message);
    return res.json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false, message: "email or password is wrong" });
  }

  try {
    const existuser = await userModel.findOne({ email: email });

    if (!existuser) {
      return res.json({ success: false, message: "user is not registered" });
    }

    if (!existuser.password) {
      return res.json({ success: false, message: "user password is missing" });
    }

    const check = await bcrypt.compare(password, existuser.password);

    if (!check) {
      return res.json({
        success: false,
        message: "email or password is wrong",
      });
    }

    const token = jwt.sign({ id: existuser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      const secure = process.env.NODE_ENV === "production"; // Only set secure to true in production
      maxAge: 1 * 24 * 60 * 60 * 1000,
      sameSite: "none", 
    });

    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1 * 24 * 60 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const sendverifyotp = async (req, res) => {
  try {
    const { userId } = req.body;

    let user = await userModel.findById(userId);

    if (user.isAccountverified) {
      return res.json({ success: false, message: "Account Already Verified" });
    }

    let otp = String(Math.floor(100000 + Math.random() * 900000));
    user.verifyotp = otp;
    user.verifyotpexpiresAt = Date.now() * 24 * 60 * 60 * 1000;

    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Account Verification OTP",
      text: `Welcome to the AuthZone website, this is your otp: ${otp}`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "OTP is sent on Email" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//verify email usingthe otp
export const verifyemail = async (req, res) => {
  const { userId, otp } = req.body;

  if (!userId || !otp) {
    res.json({ success: false, message: "Details are missing" });
  }

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      res.json({ success: false, message: "User not Found" });
    }

    if (user.verifyotp === "" || user.verifyotp !== otp) {
      res.json({ success: false, message: "Invalid OTP" });
    }

    if (user.verifyotpexpiresAt < Date.now()) {
      res.json({ success: false, message: "Time out" });
    }

    user.isAccountverified = true;
    user.verifyotp = "";
    user.verifyotpexpiresAt = 0;
    await user.save();

    return res.json({ success: true, message: "Email Verified successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// check if user is Authenticated
export const isAuthenticated = async (req, res) => {
  try {
    return res.json({ success: true, message: "User is Authenticated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// For sending otp for password reset
export const sendresetOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.json({ success: false, message: "Email is required" });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not registered" });
    }

    let otp = String(Math.floor(100000 + Math.random() * 900000));
    user.resetOtp = otp;
    user.resetOtpExpiresAt = Date.now() * 24 * 60 * 60 * 1000;

    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Password Reset OTP",
      text: `Welcome to the AuthZone website, this is your otp for password reset: ${otp}`,
    };

    await transporter.sendMail(mailOptions);

    return res.json({ success: true, message: "OTP sent to Email" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// to reset the user password
export const resetPassword = async (req, res) => {
  const { email, otp, newpassword } = req.body;

  if (!email || !otp || !newpassword) {
    return res.json({
      success: false,
      message: "Required Credentials are not provided",
    });
  }
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User is not registered" });
    }

    if (user.resetOtp === "" || user.resetOtp !== otp) {
      return res.json({ success: false, message: "Otp is not valid" });
    }

    if (user.resetOtpExpiresAt < Date.now()) {
      res.json({ success: false, message: "Time out" });
    }

    let hashed = await bcrypt.hash(newpassword, 10);

    user.resetPassword = hashed;
    user.resetOtp = "";
    user.resetOtpExpiresAt = 0;

    await user.save();

    res.json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
