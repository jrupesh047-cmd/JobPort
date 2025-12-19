import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Briefcase, Users, Building2 } from "lucide-react";
import { useStore } from "../store";
import api from "../api/axios";

function Home() {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const currentUser = useStore((state) => state.currentUser);

  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get("/jobs");
        setJobs(res.data.jobs.slice(0, 5)); // show latest 5
      } catch (error) {
        console.error("Failed to load jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className={`${isDarkMode ? "text-white" : "text-gray-900"}`}>
      {/* ================= HERO SECTION ================= */}
      <section className="py-20 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Find Jobs. Hire Talent. Grow Faster.
        </h1>
        <p className="text-xl max-w-2xl mx-auto mb-10">
          A modern job portal where job seekers find opportunities and
          employers discover the right talent.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            to="/jobs"
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg hover:bg-blue-700 transition"
          >
            Browse Jobs
          </Link>

          {!currentUser ? (
            <>
              <Link
                to="/login"
                className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg hover:bg-gray-700 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-gray-500 text-white px-8 py-4 rounded-lg text-lg hover:bg-gray-600 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <Link
              to={`/${currentUser.role}/dashboard`}
              className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg hover:bg-green-700 transition"
            >
              Go to Dashboard
            </Link>
          )}
        </div>
      </section>

   
      <section
        className={`py-16 ${
          isDarkMode ? "bg-gray-800" : "bg-gray-100"
        }`}
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div>
            <Briefcase className="w-12 h-12 mx-auto text-blue-600 mb-4" />
            <h3 className="text-3xl font-bold">{jobs.length}+</h3>
            <p className="text-gray-500">Active Jobs</p>
          </div>

          <div>
            <Users className="w-12 h-12 mx-auto text-blue-600 mb-4" />
            <h3 className="text-3xl font-bold">100+</h3>
            <p className="text-gray-500">Job Seekers</p>
          </div>

          <div>
            <Building2 className="w-12 h-12 mx-auto text-blue-600 mb-4" />
            <h3 className="text-3xl font-bold">50+</h3>
            <p className="text-gray-500">Companies</p>
          </div>
        </div>
      </section>

      <section className="py-20 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Latest Jobs</h2>
          <Link
            to="/jobs"
            className="text-blue-600 hover:underline"
          >
            View all jobs →
          </Link>
        </div>

        {loading ? (
          <p>Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p>No jobs available.</p>
        ) : (
          <div className="grid gap-6">
            {jobs.map((job) => (
              <div
                key={job._id}
                className={`p-6 rounded-lg shadow ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-semibold">
                      {job.title}
                    </h3>
                    <p className="text-gray-500">
                      {job.company} • {job.location}
                    </p>
                  </div>
                  <Link
                    to={`/jobs/${job._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
