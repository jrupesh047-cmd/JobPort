import express from "express";
import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
} from "../controllers/job.controller.js";

import authMiddleware from '../middlewares/auth.middlware.js';
import role from '../middlewares/roleBased.middlware.js'
const router = express.Router();

// Public routes
router.get("/", getAllJobs);
router.get("/:id", getJobById);

// Protected routes (Employer only)
router.post("/", authMiddleware, role("employer"), createJob);
router.put("/:id", authMiddleware, role("employer"), updateJob);
router.delete("/:id", authMiddleware, role("employer"), deleteJob);

export default router;

