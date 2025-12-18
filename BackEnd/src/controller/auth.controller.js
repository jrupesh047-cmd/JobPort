import asynHandler from "../utils/asynHandler.js";
import User from "../models/user.model.js";
import { createAccessToken, createRefreshToken } from "../utils/jwt.js";
import jwt from "jsonwebtoken";

// Registre User Controller

export const registerUser = asynHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  // Checking the all field
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All filed is required",
    });
  }

  // Checking the Email Exist
  const emailExist = await User.findOne({ email });
  if (emailExist) {
    return res.status(400).json({
      success: false,
      message: "User Already Exist",
    });
  }

  // Creating the new User
  const newUser = await User.create({ name, email, password, role });

  return res.status(201).json({
    success: true,
    message: "User Register succesfully",
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    },
  });
});

// Creating the login

export const login = asynHandler(async (req, res) => {
  const { email, password } = req.body;

  // Checking Both Fileds is Filed
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "All Filled is Required",
    });
  }
  //Find user with this email

  const userExist = await User.findOne({ email });
  if (!userExist) {
    return res.status(401).json({
      success: false,
      message: "The User Not Found",
    });
  }

  //Compare password
  const isMatch = await userExist.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: "Invalid Credintial",
    });
  }

  // Creating the Token and Storing in the db

  const accessToken = createAccessToken({ id: userExist._id });

  const refreshToken = createRefreshToken({ id: userExist._id });
  userExist.refreshToken = refreshToken;
  await userExist.save();

  return res.status(200).json({
    success: true,
    message: "User Login .....",
    accessToken,
    refreshToken,
    user: {
      id: userExist._id,
      name: userExist.name,
      email: userExist.email,
      role: userExist.role,
    },
  });
});

//Verifying RefreshToken

export const verifyToken = asynHandler(async (req, res) => {
  const clientToken = req.body.refreshToken;

  //Checking the token is there
  if (!clientToken) {
    return res.status(401).json({
      success: false,
      message: "Refresh Token Required",
    });
  }

  // verifing the token using jwt verify
  try {
    jwt.verify(clientToken, process.env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Invalid or expired refresh token",
    });
  }
  const user = await User.findOne({ refreshToken: clientToken });
  if (!user) {
    return res.status(403).json({
      success: false,
      message: "Invalid or expired refresh token",
    });
  }
  const accessToken = createAccessToken({ id: user._id });
  const refreshToken = createRefreshToken({ id: user._id });
  user.refreshToken = refreshToken;
  await user.save();
  return res.status(200).json({
    success: true,
    message: "New access token generated",
    accessToken,
    refreshToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

// LogOut Controller
export const logout = asynHandler(async (req, res) => {
  const clientToken = req.body.refreshToken;
  // Checking User Token is Exist or User Exist
  if (!clientToken) {
    return res.status(401).json({
      success: false,
      message: "Refresh Token is Required",
    });
  }
  // Finding the refreshToken in the DB
  const user = await User.findOne({ refreshToken: clientToken });

  if (!user) {
    return res.status(200).json({
      success: true,
      message: "Logout Success",
    });
  }

  //Removing the refreshToken from the DB

  user.refreshToken = null;

  await user.save();

  return res.status(200).json({
    success: true,
    message: "User Logout Successfully",
  });
});

// getMe
export const getMe = asynHandler(async (req, res) => {
  const userId = req.user;
  const user = await User.findById(userId.id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "user not Found",
    });
  }

  return res.status(200).json({
    
    success: true,
    message: "User Found",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});
