import Slider from "react-slick";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
const CommentSection = () => {
  const axiosInstance = useAxios();

  const { data: comments = [] } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: async () => {
      const res = await axiosInstance.get("/feedback");
      return res.data;
    },
  });

  return (
    <div className="px-4 py-10 w-full bg-base-100 mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        What Our Students Say
      </h2>

      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {comments.map((comment, index) => (
          <SwiperSlide key={index}>
            <div
              className="bg-base-100 p-6 shadow-md text-center h-[220px] flex flex-col relative"
              title={comment.description}
            >
              <img
                src={comment.image}
                alt={comment.name}
                className="w-16 h-16 rounded-full mx-auto object-cover"
              />
              <h3
                className="text-lg font-semibold truncate"
                title={comment.name}
              >
                {comment.name}
              </h3>
              <p
                className="text-sm mb-1 truncate"
                title={`Class: ${comment.title}`}
              >
                {comment.title}
              </p>
              <p
                className="text-sm italic overflow-hidden text-ellipsis line-clamp-3"
                title={comment.description}
              >
                "{comment.description}"
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CommentSection;
