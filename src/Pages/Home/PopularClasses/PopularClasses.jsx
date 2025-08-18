import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FaUsers } from "react-icons/fa";
import useAxios from "../../../Hooks/useAxios";
import { Link } from "react-router";
import useUserRole from "../../../Hooks/useUserRole";

const PopularClasses = () => {
  const axiosInstance = useAxios();
  const { role } = useUserRole();
  const { data: classes = [], isLoading } = useQuery({
    queryKey: ["popularClasses"],
    queryFn: async () => {
      const res = await axiosInstance.get("/popular-classes");
      return res.data;
    },
  });

  if (isLoading) return <span className="loading loading-spinner"></span>;

  return (
    <section className="py-12 px-4 w-full bg-base-100 mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Popular Classes</h2>

      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {classes.map((cls) => (
          <SwiperSlide key={cls._id}>
            <div className="bg-base-100 shadow-md p-4 rounded-lg space-y-1 flex flex-col justify-between">
              <img
                src={cls.image}
                alt={cls.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3
                className="text-xl font-semibold capitalize truncate"
                title={cls.title}
              >
                {cls.title}
              </h3>
              <p className="text-sm ">
                <strong>Instructor:</strong> {cls.name}
              </p>
              <p className="text-sm ">
                <strong>Price:</strong> ${cls.price}
              </p>
              <p className="text-sm mb-2">{cls.description}</p>
              <p className="flex items-center text-sm font-medium rounded-xl">
                <FaUsers className="mr-1" />
                {cls.totalEnrolled} Enrolled
              </p>
              <Link to={`/classes-details/${cls._id}`}>
                <button className="btn w-full mt-2 btn-primary">
                  {role === "admin" || role === "teacher"
                    ? "Details"
                    : "Enroll"}
                </button>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default PopularClasses;
