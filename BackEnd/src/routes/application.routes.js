import express from "express";
import {
  applyToJob,
  getApplicantsForJob,
  getMyApplications,
} from "../controllers/application.controller.js";
import authMiddleware from "../middlewares/auth.middlware.js";
import role from "../middlewares/roleBased.middlware.js";

const router = express.Router();

// Job seeker applies
router.post(
  "/apply/:jobId",
  authMiddleware,
  role("jobseeker"),
  applyToJob
);

// Employer views applicants
router.get(
  "/job/:jobId",
  authMiddleware,
  role("employer"),
  getApplicantsForJob
);

// Job seeker dashboard
router.get(
  "/me",
  authMiddleware,
  role("jobseeker"),
  getMyApplications
);

export default router;
