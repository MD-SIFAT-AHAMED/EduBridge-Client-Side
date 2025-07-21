import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Shared/LoadingSpinner/LoadingSpinner";
import useAxios from "../../../Hooks/useAxios";
import { Link } from "react-router";
import Pagination from "../../../Component/Pagination/Pagination";
import { useState } from "react";
import useUserRole from "../../../Hooks/useUserRole";

const AllClasses = () => {
  const axiosInstance = useAxios();
  const [currentPage, setCurrentPage] = useState(1);
  const { role } = useUserRole();
  const itemsPerPage = 10;

  const { data = {}, isLoading } = useQuery({
    queryKey: ["approvedClasses", currentPage],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/classes/approved?page=${currentPage}&limit=${itemsPerPage}`
      );
      return res.data;
    },
  });

  const approvedClasses = data.result || [];
  const totalCount = data.total || 0;

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  if (isLoading) return <LoadingSpinner />;

  return (
    <section className="px-4 py-10">
      <h2 className="text-2xl font-bold mb-6 text-center">
        All Available Classes
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {approvedClasses.map((cls) => (
          <div key={cls._id} className="card bg-base-100 shadow-xl">
            <figure>
              <img
                src={cls.image}
                alt={cls.title}
                className="w-full h-48 object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{cls.title}</h2>
              <p>
                <strong>Instructor:</strong> {cls.name}
              </p>
              <p>
                <strong>Price:</strong> ${cls.price}
              </p>
              <p>{cls.description?.slice(0, 100)}...</p>
              <p>
                <strong>Total Enrolled:</strong> {cls.totalEnrolled}
              </p>

              <div>
                <Link to={`/classes-details/${cls._id}`}>
                  <button className="btn w-full btn-primary">
                    {role === "admin" || role === "teacher"
                      ? "Details"
                      : "Enroll"}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </section>
  );
};

export default AllClasses;
