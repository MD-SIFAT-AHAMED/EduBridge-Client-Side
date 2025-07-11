import { FaCertificate, FaClock, FaUsers, FaHeadset } from "react-icons/fa";

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: <FaCertificate className="text-4xl text-primary" />,
      title: "Certified Courses",
      desc: "Get professional certificates after completing each course.",
    },
    {
      icon: <FaClock className="text-4xl text-primary" />,
      title: "Flexible Learning",
      desc: "Learn at your own pace anytime, from any device.",
    },
    {
      icon: <FaUsers className="text-4xl text-primary" />,
      title: "Expert Instructors",
      desc: "Our instructors are industry leaders and passionate educators.",
    },
    {
      icon: <FaHeadset className="text-4xl text-primary" />,
      title: "24/7 Support",
      desc: "Need help? Our support team is always here for you.",
    },
  ];

  return (
    <section className="bg-white py-16 px-4 md:px-10">
      <h2 className="text-3xl font-bold text-center mb-10">
        Why Choose EduBridge?
      </h2>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {reasons.map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md text-center"
          >
            <div className="flex justify-center mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
