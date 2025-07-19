import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ClassProgress = () => {
  const { classId } = useParams();
  const axiosSecure = useAxiosSecure();
  
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
      const res = await axiosSecure.get(
        `/assigmnet/submission/count/${classId}`
      );
      return res.data.count;
    },
  });
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
    </div>
  );
};

export default ClassProgress;
