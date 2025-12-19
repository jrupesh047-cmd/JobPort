import Job from "../models/job.model.js";
import asyncHandler from '../utils/asyncHandler.js';
// Created the job by employer only using the role base access
export const createJob = asyncHandler(async (req, res) => {
  const { title, description, location, company, category, jobType, salary } =
    req.body;

  if (!title || !description || !location || !company || !category) {
    return res.status(400).json({
      success: false,
      message: "All required fields must be filled",
    });
  }

  const job = await Job.create({
    title,
    description,
    location,
    company,
    category,
    jobType,
    salary,
    createdBy: req.user._id,
  });

  return res.status(201).json({
    success: true,
    job,
  });
});

export const getAllJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find()
    .populate("createdBy", "name email")
    .sort({ createdAt: -1 });

  return res.status(200).json({
    success: true,
    jobs,
  });
});

// getting the job by id 
export const getJobById = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id).populate(
    "createdBy",
    "name email"
  );

  if (!job) {
    return res.status(404).json({
      success: false,
      message: "Job not found",
    });
  }

  return res.status(200).json({
    success: true,
    job,
  });
});

//update data by the employer only 
export const updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    return res.status(404).json({
      success: false,
      message: "Job not found",
    });
  }

  // Checking the Job is created by the same employer only or not 
  if (job.createdBy.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: "Not authorized to update this job",
    });
  }
// Checking which filled is updated or not 
  const { title, description, location, company, category, jobType, salary } =
    req.body;

  job.title = title ?? job.title;
  job.description = description ?? job.description;
  job.location = location ?? job.location;
  job.company = company ?? job.company;
  job.category = category ?? job.category;
  job.jobType = jobType ?? job.jobType;
  job.salary = salary ?? job.salary;

  await job.save();

  return res.status(200).json({
    success: true,
    job,
  });
});

// same thing doing here just clearing the data from teh db based on the ownership check
export const deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    return res.status(404).json({
      success: false,
      message: "Job not found",
    });
  }

  if (job.createdBy.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: "Not authorized to delete this job",
    });
  }

  await job.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Job deleted successfully",
  });
});
