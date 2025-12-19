import Application from "../models/application.model.js";
import Job from "../models/job.model.js";

// Job seeker applies to a job
export const applyToJob = async (req, res) => {
  const { jobId } = req.params;

  const job = await Job.findById(jobId);
  if (!job) {
    return res.status(404).json({ success: false, message: "Job not found" });
  }

  try {
    const application = await Application.create({
      job: jobId,
      applicant: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Applied successfully",
      application,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "You already applied for this job",
      });
    }
    throw err;
  }
};

// Employer views applicants for their job
export const getApplicantsForJob = async (req, res) => {
  const { jobId } = req.params;

  const job = await Job.findById(jobId);
  if (!job) {
    return res.status(404).json({ success: false, message: "Job not found" });
  }

  if (job.createdBy.toString() !== req.user._id.toString()) {
    return res.status(403).json({ success: false, message: "Not authorized" });
  }

  const applications = await Application.find({ job: jobId })
    .populate("applicant", "name email");

  res.json({ success: true, applications });
};

// Job seeker views their applications
export const getMyApplications = async (req, res) => {
  const applications = await Application.find({ applicant: req.user._id })
    .populate("job");

  res.json({ success: true, applications });
};
