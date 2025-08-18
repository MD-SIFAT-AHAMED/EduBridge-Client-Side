import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxios from "../../../Hooks/useAxios";
import { FaUsers, FaBook, FaClipboardList } from "react-icons/fa";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const OverviewAdmin = () => {
  const axiosInstance = useAxios();

  // Fetch all stats from server
  const { data: stats = {} } = useQuery({
    queryKey: ["website-stats"],
    queryFn: async () => {
      const res = await axiosInstance.get("/stats/overview");
      return res.data;
    },
  });

 
  const chartData = [
    { name: "Users", value: stats.totalUsers || 0 },
    { name: "Classes", value: stats.totalClasses || 0 },
    { name: "Enrollments", value: stats.totalEnrollments || 0 },
  ];
  // Colors for each section
  const COLORS = ["#3b82f6", "#22c55e", "#a855f7"];
  return (
    <div className="p-6 space-y-8">
      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="stat bg-base-200 shadow rounded-2xl">
          <div className="stat-figure text-blue-500 text-3xl">
            <FaUsers />
          </div>
          <div className="stat-title">Total Users</div>
          <div className="stat-value">{stats.totalUsers || 0}</div>
        </div>

        <div className="stat bg-base-200 shadow rounded-2xl">
          <div className="stat-figure text-green-500 text-3xl">
            <FaBook />
          </div>
          <div className="stat-title">Total Classes</div>
          <div className="stat-value">{stats.totalClasses || 0}</div>
        </div>

        <div className="stat bg-base-200 shadow rounded-2xl">
          <div className="stat-figure text-purple-500 text-3xl">
            <FaClipboardList />
          </div>
          <div className="stat-title">Total Enrollments</div>
          <div className="stat-value">{stats.totalEnrollments || 0}</div>
        </div>
      </div>

      {/* Round Chart */}
      <div className="card bg-base-200 shadow rounded-2xl p-6">
        <h2 className="card-title mb-4">Overview Chart</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                innerRadius={70} // 👈 makes it a donut chart
                fill="#8884d8"
                label
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default OverviewAdmin;
