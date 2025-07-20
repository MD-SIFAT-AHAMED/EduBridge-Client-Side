import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Pagination from "../../../Component/Pagination/Pagination";
import { useState } from "react";
import LoadingSpinner from "../../Shared/LoadingSpinner/LoadingSpinner";

const TeacherRequest = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data = {}, isPending } = useQuery({
    queryKey: ["teacherRequests", currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/teacher-requests?page=${currentPage}&limit=${itemsPerPage}`
      );
      return res.data;
    },
  });
  const requests = data.teachers || [];
  const total = data.total || 0;

  const totalPages = Math.ceil(total / itemsPerPage);

  const statusMutation = useMutation({
    mutationFn: async ({ email, status }) => {
      const res = await axiosSecure.patch(`/teacher/status/${email}`, {
        status,
      });
      return res.data;
    },
    onSuccess: (data, variables) => {
      if (data.success === true) {
        if (variables.status === "teacher") {
          toast.success("Appication Approve sucessfully");
        } else if (variables.status === "rejected") {
          toast.error("Application Reject successfully");
        }
        queryClient.invalidateQueries(["teacherRequests"]);
      }
    },
  });

  if (isPending) return <LoadingSpinner />;

  return (
    <section className="p-6 bg-base-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 ">Teacher Requests</h2>

      <div className="overflow-x-auto rounded-xl shadow">
        <table className="table table-zebra w-full">
          {/* Table Head */}
          <thead className="bg-base-200">
            <tr>
              <th>No</th>
              <th>Image</th>
              <th>Name</th>
              <th>Experience</th>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {requests?.map((req, index) => (
              <tr key={req._id}>
                <td>{index + 1}</td>
                <td>
                  <div>
                    <div className="w-12 rounded-full">
                      <img src={req.photo} alt="profile" />
                    </div>
                  </div>
                </td>
                <td className="capitalize">{req.name}</td>
                <td className="capitalize">{req.experience}</td>
                <td className="capitalize">{req.title}</td>
                <td>{req.category}</td>
                <td>
                  <span
                    className={`capitalize text-gray-900 font-medium ${
                      req.status === "pending"
                        ? "bg-amber-300 px-2 py-1 rounded"
                        : req.status === "teacher"
                        ? "bg-green-500 px-2 py-1 rounded"
                        : "bg-red-600 px-2 py-1 rounded"
                    }`}
                  >
                    {req.status}
                  </span>
                </td>
                <td className="space-x-2 flex mt-2 md:mt-0 space-y-1 *:text-gray-900">
                  <button
                    onClick={() =>
                      statusMutation.mutate({
                        email: req.email,
                        status: "teacher",
                      })
                    }
                    className="btn btn-sm btn-success"
                    disabled={req.status === "teacher"}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() =>
                      statusMutation.mutate({
                        email: req.email,
                        status: "rejected",
                      })
                    }
                    className="btn btn-sm btn-error"
                    disabled={req.status === "rejected"}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
            {requests?.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-8 text-gray-400">
                  No teacher applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* pagination */}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={(prev) => setCurrentPage(prev)}
      />
    </section>
  );
};

export default TeacherRequest;
