import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

 const authMiddleware = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Access token required",
    });
  }

  const token = authHeader.split(" ")[1];

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Invalid or expired access token",
    });
  }

  const user = await User.findById(decoded.id);
  if (!user) {
    return res.status(403).json({
      success: false,
      message: "User not found",
    });
  }

  req.user = user;
  next();
});
export default authMiddleware;
