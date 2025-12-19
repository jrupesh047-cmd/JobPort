import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapPin, Building2, Briefcase } from "lucide-react";
import { useStore } from "../store";
import api from "../api/axios";

function JobDetails() {
  const { id } = useParams();
  const isDarkMode = useStore((state) => state.isDarkMode);
  const currentUser = useStore((state) => state.currentUser);

  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/jobs/${id}`);
        setJob(res.data.job);
      } catch (error) {
        console.error("Failed to fetch job");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleApply = async () => {
    if (!currentUser) {
      setMessage("Please login to apply for this job");
      return;
    }

    if (currentUser.role !== "jobseeker") {
      setMessage("Only job seekers can apply for jobs");
      return;
    }

    try {
      setApplying(true);
      await api.post(`/applications/apply/${id}`);
      setMessage("Applied successfully");
    } catch (error: any) {
      setMessage(
        error.response?.data?.message || "Failed to apply"
      );
    } finally {
      setApplying(false);
    }
  };

  if (loading) return <p>Loading job details...</p>;
  if (!job) return <p>Job not found</p>;

  return (
    <div
      className={`max-w-4xl mx-auto ${
        isDarkMode ? "text-white" : "text-gray-900"
      }`}
    >
      <div
        className={`p-8 rounded-lg shadow ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h1 className="text-3xl font-bold mb-4">{job.title}</h1>

        <div className="flex items-center text-gray-500 mb-4">
          <Building2 className="w-5 h-5 mr-2" />
          <span className="mr-4">{job.company}</span>
          <MapPin className="w-5 h-5 mr-2" />
          <span>{job.location}</span>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <span className="px-4 py-1 bg-blue-100 text-blue-800 rounded-full">
            {job.category}
          </span>
          <span className="px-4 py-1 bg-green-100 text-green-800 rounded-full">
            {job.jobType}
          </span>
          <span className="px-4 py-1 bg-purple-100 text-purple-800 rounded-full">
            {job.salary}
          </span>
        </div>

        <h2 className="text-xl font-semibold mb-2">Job Description</h2>
        <p className="mb-6">{job.description}</p>

        <div className="flex items-center text-gray-500 mb-6">
          <Briefcase className="w-5 h-5 mr-2" />
          <span>
            Posted on{" "}
            {new Date(job.createdAt).toLocaleDateString()}
          </span>
        </div>

        {message && (
          <div className="mb-4 text-blue-600">{message}</div>
        )}

        {currentUser?.role === "jobseeker" && (
          <button
            onClick={handleApply}
            disabled={applying}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {applying ? "Applying..." : "Apply Now"}
          </button>
        )}
      </div>
    </div>
  );
}

export default JobDetails;
