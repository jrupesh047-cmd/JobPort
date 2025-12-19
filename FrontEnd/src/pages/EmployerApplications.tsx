import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";

function EmployerApplications() {
  const { jobId } = useParams();
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await api.get(`/applications/job/${jobId}`);
        setApplications(res.data.applications);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [jobId]);

  return (
    <div className="text-gray-900">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Job Applications</h1>
        <Link
          to="/employer/dashboard"
          className="text-blue-600 font-medium hover:underline"
        >
          ← Back to Dashboard
        </Link>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-6 py-4 text-left">Applicant Name</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Applied Date</th>
              <th className="px-6 py-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={4} className="px-6 py-6 text-center">
                  Loading applications...
                </td>
              </tr>
            ) : applications.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-6 text-center">
                  No applications yet
                </td>
              </tr>
            ) : (
              applications.map((app) => (
                <tr key={app._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{app.applicant.name}</td>
                  <td className="px-6 py-4">{app.applicant.email}</td>
                  <td className="px-6 py-4">
                    {new Date(app.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={app.status} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployerApplications;

/* ===== STATUS BADGE ===== */
const StatusBadge = ({ status }: any) => (
  <span
    className={`px-3 py-1 rounded-full text-xs font-medium ${
      status === "accepted"
        ? "bg-green-100 text-green-700"
        : status === "applied"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-red-100 text-red-700"
    }`}
  >
    {status.toUpperCase()}
  </span>
);
