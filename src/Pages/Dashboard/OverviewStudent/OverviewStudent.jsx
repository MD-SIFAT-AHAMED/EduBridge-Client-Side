import React from "react";
import { FaBookOpen } from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const OverviewStudent = () => {
  // Fake data (replace with API later)
  const totalEnrollments = 8;

  // Example breakdown of enrolled classes by category
  const chartData = [{ name: "Enroll Class", value: 8 }];

  const COLORS = ["#3b82f6", "#22c55e", "#f97316", "#a855f7"];

  return (
    <div className="p-6 space-y-8">
      {/* Top Card */}
      <div className="stat bg-base-200 shadow rounded-2xl w-full md:w-1/3">
        <div className="stat-figure text-blue-500 text-3xl">
          <FaBookOpen />
        </div>
        <div className="stat-title">Enrolled Classes</div>
        <div className="stat-value">{totalEnrollments}</div>
      </div>

      {/* Pie Chart */}
      <div className="card bg-base-200 shadow rounded-2xl p-6">
        <h2 className="card-title mb-4">Enrollment Distribution</h2>
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
                innerRadius={70} // donut style
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

export default OverviewStudent;
