import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import LoadingSpinner from "../../Shared/LoadingSpinner/LoadingSpinner";
import { Link } from "react-router";

const EnrollClasses = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: enrolledClasses = [], isLoading } = useQuery({
    queryKey: ["enrolledClasses"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/enroll/classes/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="px-4 md:px-10 py-6">
      <h2 className="text-2xl font-bold mb-6">My Enrolled Classes</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrolledClasses.map((cls) => (
          <div
            key={cls._id}
            className="card shadow-xl bg-white  rounded-xl overflow-hidden"
          >
            <figure>
              <img
                src={cls.image}
                alt={cls.title}
                className="w-full h-48 object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-xl">{cls.title}</h2>
              <p className="text-gray-600">Instructor: {cls.teacher}</p>
              <Link to={`/dashboard/enrolled-classes-details/${cls.classId}`}>
                <button className="btn btn-primary btn-sm w-full">
                  Continue
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnrollClasses;
