import React from "react";
import { FaCheckCircle, FaClock } from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const OverviewTeacher = () => {
  // Fake data (replace with API later)
  const approvedClasses = 12;
  const pendingClasses = 5;

  // Chart data
  const chartData = [
    { name: "Approved", value: approvedClasses },
    { name: "Pending", value: pendingClasses },
  ];

  const COLORS = ["#22c55e", "#facc15"]; // green, yellow

  return (
    <div className="p-6 space-y-8">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="stat bg-base-200 shadow rounded-2xl">
          <div className="stat-figure text-green-500 text-3xl">
            <FaCheckCircle />
          </div>
          <div className="stat-title">Approved Classes</div>
          <div className="stat-value">{approvedClasses}</div>
        </div>

        <div className="stat bg-base-200 shadow rounded-2xl">
          <div className="stat-figure text-yellow-500 text-3xl">
            <FaClock />
          </div>
          <div className="stat-title">Pending Classes</div>
          <div className="stat-value">{pendingClasses}</div>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="card bg-base-200 shadow rounded-2xl p-6">
        <h2 className="card-title mb-4">Class Approval Status</h2>
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
                innerRadius={70} // makes it donut
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

export default OverviewTeacher;
