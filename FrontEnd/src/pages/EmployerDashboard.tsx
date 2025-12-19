import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Link } from "react-router-dom";
import { useStore } from "../store";
import api from "../api/axios";

const COLORS = ["#2563EB", "#16A34A", "#F59E0B", "#EF4444"];

function EmployerDashboard() {
  const currentUser = useStore((state) => state.currentUser);
  const [jobs, setJobs] = useState<any[]>([]);

  // ================= FETCH JOBS =================
  const fetchJobs = async () => {
    const res = await api.get("/jobs");
    const employerJobs = res.data.jobs.filter(
      (job: any) => job.createdBy._id === currentUser?.id
    );
    setJobs(employerJobs);
  };

  useEffect(() => {
    if (currentUser?.role === "employer") fetchJobs();
  }, [currentUser]);

  if (!currentUser || currentUser.role !== "employer") {
    return <p className="text-center text-red-600">Access denied</p>;
  }

  // ================= STATS =================
  const totalJobs = jobs.length;

  // ================= CHART DATA =================
  const monthlyData = jobs.reduce((acc: any[], job) => {
    const month = new Date(job.createdAt).toLocaleString("default", {
      month: "short",
    });
    const found = acc.find((m) => m.month === month);
    found ? found.jobs++ : acc.push({ month, jobs: 1 });
    return acc;
  }, []);

  const categoryData = Object.values(
    jobs.reduce((acc: any, job) => {
      acc[job.category] = acc[job.category]
        ? { name: job.category, value: acc[job.category].value + 1 }
        : { name: job.category, value: 1 };
      return acc;
    }, {})
  );

  return (
    <div className="text-gray-900">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">Employer Dashboard</h1>

        <Link
          to="/employer/post-job"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
        >
          + Post Job
        </Link>
      </div>

      {/* KPI */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">
        <Card title="Active Jobs" value={totalJobs} color="text-blue-600" />
      </div>

      {/* CHARTS */}
      <div className="grid md:grid-cols-2 gap-10 mb-14">
        <ChartBox title="Monthly Job Posting">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="jobs" fill="#2563EB" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>

        <ChartBox title="Jobs by Category">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={categoryData} dataKey="value" nameKey="name" label outerRadius={90}>
                {categoryData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartBox>
      </div>

      {/* JOBS TABLE */}
      <Section title="Jobs Posted by You">
        <Table headers={["Title", "Category", "Location", "Actions"]}>
          {jobs.map((job) => (
            <tr key={job._id} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4">{job.title}</td>
              <td className="px-6 py-4">{job.category}</td>
              <td className="px-6 py-4">{job.location}</td>
              <td className="px-6 py-4 space-x-4">
                <Link
                  to={`/employer/jobs/${job._id}/applications`}
                  className="text-blue-600 hover:underline font-medium"
                >
                  View Applications
                </Link>
              </td>
            </tr>
          ))}
        </Table>
      </Section>
    </div>
  );
}

export default EmployerDashboard;

/* ================= COMMON UI ================= */

const Card = ({ title, value, color }: any) => (
  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
    <p className="text-sm text-gray-500 mb-1">{title}</p>
    <h2 className={`text-3xl font-bold ${color}`}>{value}</h2>
  </div>
);

const ChartBox = ({ title, children }: any) => (
  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 h-80">
    <h3 className="font-semibold text-lg mb-4">{title}</h3>
    {children}
  </div>
);

const Section = ({ title, children }: any) => (
  <div className="bg-white rounded-xl shadow-md border border-gray-100 mb-14">
    <h3 className="px-6 py-4 font-semibold text-lg border-b border-gray-100">
      {title}
    </h3>
    <div className="overflow-x-auto">{children}</div>
  </div>
);

const Table = ({ headers, children }: any) => (
  <table className="w-full">
    <thead>
      <tr className="border-b border-gray-200">
        {headers.map((h: string) => (
          <th key={h} className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
            {h}
          </th>
        ))}
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-100">{children}</tbody>
  </table>
);
