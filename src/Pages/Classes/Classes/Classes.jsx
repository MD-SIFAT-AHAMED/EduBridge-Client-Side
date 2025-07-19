import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Shared/LoadingSpinner/LoadingSpinner";
import useAxios from "../../../Hooks/useAxios";
import { Link } from "react-router";

const AllClasses = () => {
  const axiosInstance = useAxios();
  const { data: approvedClasses = [], isLoading } = useQuery({
    queryKey: ["approvedClasses"],
    queryFn: async () => {
      const res = await axiosInstance.get("/classes/approved");
      return res.data;
    },
  });

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
                  <button className="btn w-full btn-primary">Enroll</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllClasses;
