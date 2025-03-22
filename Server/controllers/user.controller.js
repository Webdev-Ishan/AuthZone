import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import transporter from "../Config/nodemailer.js";

export const getUserdata = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User is not registered" });
    }

    res.json({
      success: true,
      userData: {
        name: user.name,
        isAccountverified: user.isAccountverified,
      },
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
