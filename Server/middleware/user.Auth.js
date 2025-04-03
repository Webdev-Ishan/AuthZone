import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  if (!req.cookies.token) {
    console.log("Cookies:", req.cookies);
console.log("Received Token:", req.cookies.token);

    return res.json({ success: false, message: "Not Authorized my friend " });
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
    return res.json({ success: false, message: error.message });
  }
};

export default userAuth;
