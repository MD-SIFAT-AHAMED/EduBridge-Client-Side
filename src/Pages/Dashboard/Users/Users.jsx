import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import LoadingSpinner from "../../Shared/LoadingSpinner/LoadingSpinner";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Users = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch all users (or filtered)
  const { data: users = [], isPending } = useQuery({
    queryKey: ["users", searchTerm],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?search=${searchTerm}`);
      return res.data;
    },
  });

  // Mutation to promote user
  const promoteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/users/make-admin/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("User promoted to admin");
      queryClient.invalidateQueries(["users"]);
      setSelectedUser(null); // close modal
    },
    onError: () => {
      toast.error("Failed to promote user");
    },
  });

  const handleConfirmMakeAdmin = () => {
    console.log(selectedUser._id);
    if (selectedUser?._id) {
      promoteMutation.mutate(selectedUser._id);
    }
  };
  if (isPending) return <LoadingSpinner />;
  
  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>

      {/* Search Bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search by name or email"
          className="input input-bordered w-full focus:outline-none max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* User Table */}
      <div className="overflow-x-auto rounded-xl shadow">
        <table className="table w-full table-zebra">
          <thead className="bg-base-200 text-sm text-gray-700">
            <tr>
              <th>No</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, idx) => (
              <tr key={user._id}>
                <td>{idx + 1}</td>
                <td>
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      <img src={user.photo} alt="User" />
                    </div>
                  </div>
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className="capitalize">{user.role || "user"}</td>
                <td>
                  {user.role === "admin" ? (
                    <button className="btn btn-sm btn-outline" disabled>
                      Already Admin
                    </button>
                  ) : (
                    <>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => setSelectedUser(user)}
                      >
                        Make Admin
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-gray-400 py-6">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Modal */}
      {selectedUser && (
        <dialog id="confirmModal" className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirm Admin Role</h3>
            <p className="py-4">
              Are you sure you want to promote{" "}
              <strong>{selectedUser.name}</strong> to Admin?
            </p>

            <div className="modal-action">
              <form method="dialog" className="space-x-3">
                <button
                  className="btn bg-green-400 text-gray-900"
                  onClick={handleConfirmMakeAdmin}
                  disabled={promoteMutation.isPending}
                >
                  {promoteMutation.isPending ? "Processing..." : "Yes, Confirm"}
                </button>
                <button
                  className="btn btn-outline"
                  onClick={() => setSelectedUser(null)}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </dialog>
      )}
    </section>
  );
};

export default Users;
