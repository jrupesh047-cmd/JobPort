import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useStore } from "../store";
import api from "../api/axios";

function JobSeekerDashboard() {
  const currentUser = useStore((state) => state.currentUser);

  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await api.get("/applications/me");
        setApplications(res.data.applications);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (!currentUser || currentUser.role !== "jobseeker") {
    return <p className="text-center text-red-600">Access denied</p>;
  }

  // ===== STATS =====
  const total = applications.length;
  const applied = applications.filter((a) => a.status === "applied").length;
  const accepted = applications.filter((a) => a.status === "accepted").length;
  const rejected = applications.filter((a) => a.status === "rejected").length;

  // ===== CHART DATA =====
  const chartData = applications.reduce((acc: any[], app) => {
    const week = `Week ${Math.ceil(new Date(app.createdAt).getDate() / 7)}`;
    const found = acc.find((a) => a.week === week);
    found ? found.applications++ : acc.push({ week, applications: 1 });
    return acc;
  }, []);

  return (
    <div className="text-gray-900">
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Job Seeker Dashboard</h1>
        <p className="text-gray-500">Welcome back, {currentUser.name}</p>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">
        <StatCard title="Total Applications" value={total} color="text-blue-600" />
        <StatCard title="Applied" value={applied} color="text-yellow-600" />
        <StatCard title="Accepted" value={accepted} color="text-green-600" />
        <StatCard title="Rejected" value={rejected} color="text-red-600" />
      </div>

      {/* CHART */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-14">
        <h2 className="text-xl font-bold mb-4">Application Activity</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="applications"
                stroke="#2563EB"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100">
        <h2 className="text-xl font-bold px-6 py-4 border-b border-gray-100">
          Application History
        </h2>

        {loading ? (
          <p className="p-6">Loading applications...</p>
        ) : applications.length === 0 ? (
          <p className="p-6">No applications yet.</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-6 py-4 text-left">Job</th>
                <th className="px-6 py-4 text-left">Company</th>
                <th className="px-6 py-4 text-left">Applied On</th>
                <th className="px-6 py-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {applications.map((app) => (
                <tr key={app._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">{app.job.title}</td>
                  <td className="px-6 py-4">{app.job.company}</td>
                  <td className="px-6 py-4">
                    {new Date(app.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={app.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default JobSeekerDashboard;

/* ===== UI COMPONENTS ===== */

const StatCard = ({ title, value, color }: any) => (
  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
    <p className="text-sm text-gray-500 mb-1">{title}</p>
    <h2 className={`text-3xl font-bold ${color}`}>{value}</h2>
  </div>
);

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
