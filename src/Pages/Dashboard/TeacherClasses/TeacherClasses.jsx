import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import Pagination from "../../../Component/Pagination/Pagination";

const TeacherClasses = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [selectedClass, setSelectedClass] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch teacher's own classes
  const { data = {}, isLoading } = useQuery({
    queryKey: ["teacherClasses", user?.email, currentPage],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/classes/teacher/${user.email}?page=${currentPage}&limit=${itemsPerPage}`
      );
      return res.data;
    },
  });

  const myClasses = data.result || [];
  const total = data.total || 0;

  const totalPages = Math.ceil(total / itemsPerPage);

  // Update Mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, updatedData }) => {
      const res = await axiosSecure.put(`/classes/${id}`, updatedData);
      return res.data;
    },
    onSuccess: () => {
      setSelectedClass(null);
      toast.success("Class updated successfully");
      queryClient.invalidateQueries(["teacherClasses"]);
    },
    onError: () => toast.error("Update failed"),
  });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`/classes/${id}`);
    },
    onSuccess: () => {
      setDeleteId(null);
      toast.success("Class deleted successfully");
      queryClient.invalidateQueries(["teacherClasses"]);
    },
    onError: () => toast.error("Failed to delete class"),
  });

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedData = {
      title: form.title.value,
      price: parseFloat(form.price.value),
      description: form.description.value,
    };
    updateMutation.mutate({ id: selectedClass._id, updatedData });
  };

  const handleDelete = () => {
    deleteMutation.mutate(deleteId);
  };

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  return (
    <section className="px-4 py-10 min-h-screen bg-base-200">
      <h2 className="text-2xl font-bold mb-6 text-center">My Classes</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myClasses.map((cls) => (
          <div key={cls._id} className="card bg-base-100 shadow">
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
                <strong>Name:</strong> {cls.name}
              </p>
              <p>
                <strong>Email:</strong> {cls.email}
              </p>
              <p>
                <strong>Price:</strong> ${cls.price}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`px-2 py-1 font-semibold rounded capitalize ${
                    cls.status === "approved"
                      ? "text-green-400 "
                      : cls.status === "rejected"
                      ? "text-red-600 "
                      : cls.status === "pending"
                      ? "text-yellow-400 "
                      : ""
                  }`}
                >
                  {cls.status}
                </span>
              </p>
              <p>{cls.description?.slice(0, 100)}...</p>

              <div className="card-actions mt-4  justify-between">
                <button
                  onClick={() => setSelectedClass(cls)}
                  className="btn btn-sm text-white bg-orange-700"
                >
                  Update
                </button>
                <button
                  onClick={() => setDeleteId(cls._id)}
                  className="btn btn-sm text-white bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => navigate(`/dashboard/see-details/${cls._id}`)}
                  disabled={cls.status !== "approved"}
                  className="btn btn-sm text-white btn-info"
                >
                  See Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-10">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(prev) => setCurrentPage(prev)}
        />
      </div>

      {/* Update Modal */}
      {selectedClass && (
        <dialog id="update_modal" className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Update Class</h3>
            <form
              onSubmit={handleUpdateSubmit}
              className="space-y-4 mt-4 **:focus:outline-none"
            >
              <input
                type="text"
                name="title"
                defaultValue={selectedClass.title}
                className="input input-bordered w-full"
              />
              <input
                type="number"
                name="price"
                defaultValue={selectedClass.price}
                className="input input-bordered w-full"
              />
              <textarea
                name="description"
                defaultValue={selectedClass.description}
                className="textarea textarea-bordered w-full"
              ></textarea>
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedClass(null)}
                  className="btn"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <dialog id="delete_modal" className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirm Delete</h3>
            <p>Are you sure you want to delete this class?</p>
            <div className="modal-action">
              <button
                onClick={handleDelete}
                className="btn bg-red-600 text-white"
              >
                Yes, Delete
              </button>
              <button onClick={() => setDeleteId(null)} className="btn">
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}
    </section>
  );
};

export default TeacherClasses;
