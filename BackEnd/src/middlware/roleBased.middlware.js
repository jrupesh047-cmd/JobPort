import asyncHandler from "../utils/asynHandler.js";
const role = (...roles) =>
  asyncHandler(async (req, res, next) => {
    const userRole = req.user.role;

    if (
     ! roles.includes(userRole)
    ) {
      return res.status(403).json({
        success: false,
        messaged: "Access Denied",

      });
    }
    next();
  });
export default role;
