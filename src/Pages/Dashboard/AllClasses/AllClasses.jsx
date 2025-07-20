import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/LoadingSpinner/LoadingSpinner";
import { Link } from "react-router";
import Pagination from "../../../Component/Pagination/Pagination";
import { useState } from "react";

const AllClasses = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Get all classes (only approved & pending)
  const { data = {}, isLoading } = useQuery({
    queryKey: ["allClasses", currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/classes?page=${currentPage}&limit=${itemsPerPage}`
      );
      return res.data;
    },
  });

  const classes = data.classes || [];
  const total = data.total || 0;
  const totalPages = Math.ceil(total / itemsPerPage);

  //  Mutation for status update (approve/reject)
  const statusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      return await axiosSecure.patch(`/classes/status/${id}`, { status });
    },
    onSuccess: (data, variables) => {
      const { status } = variables;
      queryClient.invalidateQueries(["allClasses"]);
      toast.success(`${status} successfuly`);
    },
    onError: () => toast.error("Failed to update status"),
  });

  const handleStatusChange = (id, status) => {
    statusMutation.mutate({ id, status });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">Manage All Classes</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>No</th>
              <th>Image</th>
              <th>Title</th>
              <th>Email</th>
              <th>Short Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {classes.map((cls, inx) => (
              <tr key={cls._id}>
                <td>{(currentPage - 1) * itemsPerPage + inx + 1}</td>
                <td>
                  <img
                    src={cls.image}
                    alt={cls.title}
                    className="w-12 h-10 object-cover rounded"
                  />
                </td>
                <td>{cls.title}</td>
                <td>{cls.email}</td>
                <td className="max-w-xs truncate">{cls.description}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded font-semibold ${
                      cls.status === "approved"
                        ? "bg-green-400"
                        : "bg-amber-400"
                    }`}
                  >
                    {cls.status}
                  </span>
                </td>
                <td className=" flex mt-2 md:mt-0 flex-row gap-2">
                  {/* Approve Button */}
                  <button
                    className="btn btn-sm btn-success"
                    disabled={cls.status === "approved"}
                    onClick={() => handleStatusChange(cls._id, "approved")}
                  >
                    Approve
                  </button>

                  {/* Reject Button */}
                  <button
                    className="btn btn-sm btn-error"
                    disabled={cls.status === "rejected"}
                    onClick={() => handleStatusChange(cls._id, "rejected")}
                  >
                    Reject
                  </button>

                  {/* Progress Button (enabled only if approved) */}
                  <button
                    className="btn btn-sm btn-info"
                    disabled={cls.status !== "approved"}
                  >
                    <Link to={`/dashboard/class-progress/${cls._id}`}>
                      Progress
                    </Link>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={(prev) => setCurrentPage(prev)}
      />
    </div>
  );
};

export default AllClasses;
