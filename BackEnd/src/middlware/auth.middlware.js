import User from "../models/user.model.js";
import asyncHandler from "../utils/asynHandler.js";
import jwt from "jsonwebtoken";
const authMiddlewear = asyncHandler(async (req, res, next) => {
  const accessTokenBefore = req.headers.authorization;
  

  if (!accessTokenBefore) {
    return res.status(401).json({
      success: false,
      message: "Access token required",
    });
  }
  const accessToken = accessTokenBefore.split(" ")[1];


  let decode;
  try {
    decode = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Invalid or expired access token",
    });
  }
 
  const user = await User.findById(decode.id);
  if (!user) {
    return res.status(403).json({
      success: false,
      message: "User Not Found",
    });
  }
  if (user) {
    req.user = user;
    next();
  }
});
export default authMiddlewear;
