import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";
import { useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { FaFileAlt, FaStar } from "react-icons/fa";
import Rating from "react-rating";
import useAuth from "../../../Hooks/useAuth";
import Pagination from "../../../Component/Pagination/Pagination";
import LoadingSpinner from "../../Shared/LoadingSpinner/LoadingSpinner";

const EnrollClassDetails = () => {
  const { id } = useParams(); // classId from route
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [rating, setRating] = useState(0);

  const [inputValues, setInputValues] = useState({}); // key: assignmentId, value: submissionLink

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch assignments for this class
  const { data = {}, isLoading } = useQuery({
    queryKey: ["class-assignments", id, currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/assignments/${id}?page=${currentPage}&limit=${itemsPerPage}`
      );
      return res.data;
    },
  });
  const assignments = data.assingmentDeatils || [];
  const totalCount = data.totalCount || 0;
  const title = data?.enroll?.title;

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  // Mutation for submitting assignment
  const { mutateAsync: submitAssignment, isPending } = useMutation({
    mutationFn: async (formData) => {
      const res = await axiosSecure.post("/assignment-submission", formData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["class-assignments", id]);
      toast.success("Assignment submitted!");
    },
    onError: () => {
      toast.error("Failed to submit assignment.");
    },
  });

  const handleInputChange = (assignmentId, value) => {
    setInputValues((prev) => ({
      ...prev,
      [assignmentId]: value,
    }));
  };

  const handleSubmitAssignment = async (e, assignmentId) => {
    e.preventDefault();
    const submissionLink = inputValues[assignmentId];

    if (!submissionLink) {
      toast.error("Submission link is required.");
      return;
    }

    const submissionData = {
      submissionLink,
      assignmentId,
      classId: id,
      submittedAt: new Date(),
    };

    await submitAssignment(submissionData);

    // Clear input after submission
    setInputValues((prev) => ({
      ...prev,
      [assignmentId]: "",
    }));
  };

  const { mutateAsync: submitFeedback } = useMutation({
    mutationFn: async (feedbackData) => {
       console.log(feedbackData);
      const res = await axiosSecure.post("/feedback", feedbackData);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Feedback Submit");
    },
    onError: () => {
      toast.error("Failed to submit feedback.");
    },
  });

  const onSubmitFeedback = async (data) => {
    const feedbackData = {
      ...data,
      rating,
      classId: id,
      title: title,
      name: user?.displayName,
      image: user?.photoURL,
    };

    await submitFeedback(feedbackData);
    reset();
    setIsOpen(false);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <button
        className="btn btn-outline btn-primary flex items-center gap-2 my-5"
        onClick={() => setIsOpen(true)}
      >
        <FaFileAlt />
        Teaching Evaluation Report
      </button>

      <h2 className="text-2xl font-bold mb-4">Assignment Details</h2>

      {assignments.length === 0 ? (
        <p>No assignments available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>No</th>
                <th>Title</th>
                <th>Description</th>
                <th>Deadline</th>
                <th>Submission</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment, index) => (
                <tr key={assignment._id}>
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td>{assignment.title}</td>
                  <td>{assignment.description}</td>
                  <td>{new Date(assignment.deadline).toLocaleDateString()}</td>
                  <td>
                    <form
                      onSubmit={(e) =>
                        handleSubmitAssignment(e, assignment._id)
                      }
                      className="flex items-center gap-2"
                    >
                      <input
                        type="text"
                        placeholder="Document Link"
                        value={inputValues[assignment._id] || ""}
                        onChange={(e) =>
                          handleInputChange(assignment._id, e.target.value)
                        }
                        className="input input-bordered focus:outline-none input-sm w-[120px] md:w-full max-w-xs"
                      />
                      <button
                        type="submit"
                        className="btn btn-sm btn-primary"
                        disabled={isPending}
                      >
                        Submit
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />

      {/* feeback Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-white/70 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-lg space-y-4">
            <h2 className="text-xl font-semibold text-center">
              Teaching Evaluation
            </h2>

            <form
              onSubmit={handleSubmit(onSubmitFeedback)}
              className="space-y-4"
            >
              {/* Description Field */}
              <textarea
                {...register("description", { required: true })}
                className="textarea textarea-bordered w-full"
                placeholder="Write your feedback..."
              ></textarea>

              {/* Rating Component */}
              <div className="flex items-center gap-3">
                <span className="font-medium">Rating:</span>
                <Rating
                  initialRating={rating}
                  emptySymbol={<FaStar size={20} className="text-gray-400" />}
                  fullSymbol={<FaStar size={20} className="text-yellow-500" />}
                  onChange={(rate) => setRating(rate)}
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  className="btn btn-sm btn-outline"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-sm btn-primary">
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnrollClassDetails;
