import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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
      secure: process.env.NODE_ENV === "production",
      maxAge: 1 * 24 * 60 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: error.message });
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
      return res.json({ success: false, message: "email or password is wrong" });
    }

    const token = jwt.sign({ id: existuser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1 * 24 * 60 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};



export const logout = async (req, res) => {
  try {
    res.cookie("token", "", {
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
