import userModel from "../models/user.model.js";

export const getUserdata = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId); // Extract user ID from req.body.userId

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
