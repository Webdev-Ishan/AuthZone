import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  if (!req.cookies.token) {
    res.json({ success: false, message: "Not Authorized login again" });
  }

  try {
    const tokenDecode = jwt.verify(req.cookies.token, process.env.JWT_SECRET);

    if (tokenDecode.id) {
      req.body.userId = tokenDecode.id;
    } else {
      return res.json({
        success: false,
        message: "Not Authorized login again",
      });
    }

    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export default userAuth;
