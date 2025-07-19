import { useQuery } from "@tanstack/react-query";
import { FaUsers, FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import women from "../../../assets/partnerLogo/woman-attending-online-class.jpg";
import useAxios from "../../../Hooks/useAxios";

const WebsiteStats = () => {

  const axiosInstance = useAxios(); 

  // Fetch all stats from server
  const { data: stats = {} } = useQuery({
    queryKey: ["website-stats"],
    queryFn: async () => {
      const res = await axiosInstance.get("/stats/overview");
      return res.data;
    },
  });

  return (
    <div className="grid grid-cols-1 bg-base-100 lg:grid-cols-2 gap-8 items-center px-4 py-10">
      {/* Left: Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Users */}
        <div className="card bg-base-100 shadow-md text-center">
          <div className="card-body items-center">
            <FaUsers className="text-3xl text-blue-400" />
            <h2 className="text-xl font-bold">Users</h2>
            <p className="text-2xl">{stats.totalUsers || 0}</p>
          </div>
        </div>

        {/* Total Classes */}
        <div className="card bg-base-100 shadow-md text-center">
          <div className="card-body items-center">
            <FaChalkboardTeacher className="text-3xl text-success" />
            <h2 className="text-xl font-bold"> Classes</h2>
            <p className="text-2xl">{stats.totalClasses || 0}</p>
          </div>
        </div>

        {/* Total Enrollments */}
        <div className="card bg-base-100 shadow-md text-center">
          <div className="card-body items-center">
            <FaUserGraduate className="text-3xl text-warning" />
            <h2 className="text-xl font-bold">Enrollments</h2>
            <p className="text-2xl">{stats.totalEnrollments || 0}</p>
          </div>
        </div>
      </div>

      {/* Right: Image */}
      <div className="flex justify-center">
        <img
          src={women}
          alt="Website Illustration"
          className="w-full lg:h-64 object-cover lg:max-w-full rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default WebsiteStats;
