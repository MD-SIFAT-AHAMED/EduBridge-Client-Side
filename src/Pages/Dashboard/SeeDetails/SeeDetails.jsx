import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import { FaPlus } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";
// adjust path as needed

const SeeDetails = () => {
  const { classId } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();
  const assignmentModalRef = useRef();
  
  // Get total enrollment count
  const { data: enrollCount = 0 } = useQuery({
    queryKey: ["enrollmentCount", classId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/enrollments/class/count/${classId}`);
      return res.data.totalEnrolled;
    },
  });

  // Get total assignments added by teacher
  const { data: assignmentCount = 0 } = useQuery({
    queryKey: ["assignmentCount", classId],
    queryFn: async () => {
        const res = await axiosSecure.get(`/assignment/class/count/${classId}`);
        return res.data.count;
    },
  });

  // Get total assignment submissions
  const { data: submissionCount = 0 } = useQuery({
    queryKey: ["submissionCount", classId],
    queryFn: async () => {
        const res = await axiosSecure.get(`/assigmnet/submission/count/${classId}`);
        return res.data.count;
    },
  });

  // Mutation for creating assignment
  const { mutateAsync: createAssignment } = useMutation({
    mutationFn: async (data) => {

      const res = await axiosSecure.post("/assignment/create", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["assignmentCount", classId]);
      toast.success("Assignment Added");
      assignmentModalRef.current.close();
      reset();
    },
    onError: () => {
      toast.success("Failed to add assignment");
    },
  });

  const onSubmit = (data) => {
    createAssignment({ ...data, classId, createAt: user?.email });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Class Progress</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 text-white ">
        <div className="card bg-indigo-500 shadow-md ">
          <div className="card-body text-center">
            <h2 className="text-xl font-semibold">Total Enrollments</h2>
            <p className="text-3xl font-semibold t">{enrollCount}</p>
          </div>
        </div>

        <div className="card bg-blue-400 shadow-md ">
          <div className="card-body text-center">
            <h2 className="text-xl font-semibold">Total Assignments</h2>
            <p className="text-3xl font-semibold">{assignmentCount}</p>
          </div>
        </div>

        <div className="card bg-cyan-500 shadow-md ">
          <div className="card-body text-center">
            <h2 className="text-xl font-semibold">Total Submissions</h2>
            <p className="text-3xl font-semibold ">{submissionCount}</p>
          </div>
        </div>
      </div>

      {/* Assignment Section Coming Next... */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Class Assignments</h2>
        <button
          className=" flex items-center bg-green-600 px-4 py-3 rounded-2xl text-white gap-2"
          onClick={() => assignmentModalRef.current.showModal()}
        >
          <FaPlus />
          Create
        </button>
      </div>

      {/* Modal */}
      <dialog ref={assignmentModalRef} className="modal">
        <div className="modal-box max-w-2xl">
          <h3 className="font-bold text-lg mb-4">Add Assignment</h3>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 **:focus:outline-none"
          >
            <div>
              <label className="label">Assignment Title</label>
              <input
                type="text"
                {...register("title", { required: true })}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">Assignment Deadline</label>
              <input
                type="date"
                {...register("deadline", { required: true })}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">Assignment Description</label>
              <textarea
                {...register("description", { required: true })}
                className="textarea textarea-bordered w-full"
              />
            </div>

            <div className="modal-action">
              <button type="submit" className="btn text-white bg-green-600">
                Add Assignment
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => assignmentModalRef.current.close()}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default SeeDetails;
