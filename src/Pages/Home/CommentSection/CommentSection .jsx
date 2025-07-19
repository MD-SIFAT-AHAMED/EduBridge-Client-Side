import Slider from "react-slick";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";

const CommentSection = () => {
  const axiosInstance = useAxios();

  const { data: comments = [] } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: async () => {
      const res = await axiosInstance.get("/feedback");
      return res.data;
    },
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="px-4 py-10 w-full bg-base-100 mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        What Our Students Say
      </h2>

      <Slider {...settings}>
        {comments.map((comment, index) => (
          <div key={index}>
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
                className="text-sm text-gray-500 mb-1 truncate"
                title={`Class: ${comment.title}`}
              >
                {comment.title}
              </p>
              <p
                className="text-sm text-gray-700 italic overflow-hidden text-ellipsis line-clamp-3"
                title={comment.description}
              >
                "{comment.description}"
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CommentSection;
