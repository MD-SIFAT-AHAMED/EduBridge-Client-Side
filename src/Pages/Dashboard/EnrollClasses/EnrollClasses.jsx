import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import LoadingSpinner from "../../Shared/LoadingSpinner/LoadingSpinner";
import { Link } from "react-router";
import Pagination from "../../../Component/Pagination/Pagination";
import { useState } from "react";

const EnrollClasses = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data = {}, isLoading } = useQuery({
    queryKey: ["enrolledClasses", currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/enroll/classes/${user?.email}?page=${currentPage}&limit=${itemsPerPage}`
      );
      return res.data;
    },
  });
  const enrolledClasses = data.enrollData || [];
  const total = data.total || 0;

  const totalPages = Math.ceil(total / itemsPerPage);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="px-4 md:px-10 py-6">
      <h2 className="text-2xl font-bold mb-6">My Enrolled Classes</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrolledClasses.map((cls) => (
          <div className="bg-base-100 shadow-md p-4 rounded-lg space-y-1 flex flex-col justify-between">
            <img
              src={cls.image}
              alt={cls.title}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3
              className="text-xl font-semibold capitalize truncate"
              title={cls.title}
            >
              {cls.title}
            </h3>
            <p className="text-sm">
              {" "}
              <strong>Instructor:</strong> {cls.teacher}
            </p>
            <Link to={`/dashboard/enrolled-classes-details/${cls.classId}`}>
              <button className="btn btn-primary mt-2 btn-sm w-full">
                Continue
              </button>
            </Link>
          </div>
        ))}
      </div>
      {/* pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default EnrollClasses;
