import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ClassesDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: classData, isLoading } = useQuery({
    queryKey: ["classDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/classes/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  return (
    <section className="max-w-4xl mx-auto px-4 py-10">
      <div className="card bg-base-100 shadow-lg">
        <figure>
          <img
            src={classData.image}
            alt={classData.title}
            className="w-full h-80 object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-2xl">{classData.title}</h2>
          <p>
            <strong>Instructor:</strong> {classData.name}
          </p>
          <p>
            <strong>Email:</strong> {classData.email}
          </p>
          <p>
            <strong>Price:</strong> ${classData.price}
          </p>
          <p>
            <strong>Description:</strong> {classData.description}
          </p>
          <p>
            <strong>Total Enrolled:</strong> {classData.totalEnrolled || 0}
          </p>
          <button className="w-full btn btn-primary">${classData.price} | Pay Now</button>
        </div>
      </div>
    </section>
  );
};

export default ClassesDetails;
