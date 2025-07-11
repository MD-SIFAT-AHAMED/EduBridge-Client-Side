import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; //
import banner1 from "../../../assets/BannerImg/banner1.jpg";
import banner3 from "../../../assets/BannerImg/banner3.jpg";

const Banner = () => {
  return (
    <div>
      <Carousel
        autoPlay={true}
        showThumbs={false}
        infiniteLoop={true}
        showStatus={false}
        showArrows={false}
      >
        <div className="relative w-full ">
          <img
            src={banner1}
            alt="Banner"
            className="w-full h-auto object-cover"
          />

          <div className="absolute inset-0 flex flex-col lg:items-start justify-center bg-black/40 text-white p-10">
            <h3 className="text-lg md:text-4xl font-bold mb-2">
              Unlock Your Potential <br /> Learn Anytime, Anywhere
            </h3>
            <p className="text-sm md:text-lg text-gray-300">
              Start your journey to success with expert-led courses designed
              just for you.
            </p>
          </div>
        </div>
        <div className="relative w-full">
          <img
            src={banner3}
            alt="Banner"
            className="w-full h-auto object-cover"
          />

          <div className="absolute inset-0 flex flex-col lg:items-start justify-center bg-black/40 text-white p-10">
            <h3 className="text-lg md:text-4xl font-bold mb-2">
              Share Your Knowledge
              <br /> Inspire the World
            </h3>
            <p className="text-sm md:text-lg text-gray-300">
              Turn your expertise into income by teaching what you love.
            </p>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
