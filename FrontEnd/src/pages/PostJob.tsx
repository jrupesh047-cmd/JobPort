import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";
import api from "../api/axios";

function PostJob() {
  const navigate = useNavigate();
  const isDarkMode = useStore((state) => state.isDarkMode);
  const currentUser = useStore((state) => state.currentUser);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    company: "",
    category: "",
    jobType: "Full Time",
    salary: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!currentUser || currentUser.role !== "employer") {
    return <p>Access denied</p>;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      await api.post("/jobs", formData);
      navigate("/employer/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`max-w-3xl mx-auto ${isDarkMode ? "text-white" : "text-gray-900"}`}>
      <h1 className="text-3xl font-bold mb-6">Post a New Job</h1>

      {error && <p className="mb-4 text-red-600">{error}</p>}

      <form
        onSubmit={handleSubmit}
        className={`${isDarkMode ? "bg-gray-800" : "bg-white"} p-8 rounded-lg shadow`}
      >
        {/* Title */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Job Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded"
          />
        </div>

        {/* Company */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Company</label>
          <input
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded"
          />
        </div>

        {/* Location */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Location</label>
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded"
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded"
          >
            <option value="">Select category</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Full Stack">Full Stack</option>
            <option value="Design">Design</option>
            <option value="Testing">Testing</option>
          </select>
        </div>

        {/* Job Type */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Job Type</label>
          <select
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          >
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
            <option value="Contract">Contract</option>
          </select>
        </div>

        {/* Salary */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Salary</label>
          <input
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="₹6–8 LPA / Not Disclosed"
            className="w-full p-3 border rounded"
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block mb-2 font-medium">Job Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={5}
            className="w-full p-3 border rounded"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Posting..." : "Post Job"}
        </button>
      </form>
    </div>
  );
}

export default PostJob;
