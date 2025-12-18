import asyncHandler from "../utils/asynHandler.js";
import User from "../models/user.model.js";
export const getAllUser = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password -refreshToken");
  if (!users.length) {
    return res.status(403).json({
      success: false,
      message: "Users Data is Not Available",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Users List Found",
    users,
  });
});

// Finding User by the UserId
export const getSingleUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId).select("-password -refreshToken");
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User Doesn't Exist",
    });
  }
  return res.status(200).json({
    success: true,
    message: "User Found",
    user,
  });
});

// update User
export const updateUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const { name, email, role } = req.body;
  const user = await User.findById(userId);
  const loginUser = req.user;
  // finding User Exist in the DB
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "The User Not Found",
    });
  }

  if (loginUser.id !== userId) {
    if (loginUser.role === "user") {
      return res.status(403).json({
        success: false,
        message: "Access Denied",
      });
    }
  }
});

// Delelte user by id
export const deleteUser = asyncHandler((req, res) => {});
