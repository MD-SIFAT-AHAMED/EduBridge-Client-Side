import {
  FaUserPlus,
  FaChalkboardTeacher,
  FaGraduationCap,
} from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUserPlus className="text-4xl text-primary" />,
      title: "Create Account",
      description: "Sign up as a student or instructor to get started.",
    },
    {
      icon: <FaChalkboardTeacher className="text-4xl text-primary" />,
      title: "Choose or Upload Courses",
      description: "Browse top-rated classes or share your expertise.",
    },
    {
      icon: <FaGraduationCap className="text-4xl text-primary" />,
      title: "Start Learning / Teaching",
      description: "Join live classes or create engaging content.",
    },
  ];

  return (
    <section 
    
    className="py-14 px-4 md:px-10">
      <h2 className="text-3xl font-bold text-center mb-10">
        How EduBridge Works
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <div
           data-aos="zoom-in-up"
            key={index}
            className="card bg-base-100 p-6 text-center shadow-md"
          >
            <div className="mb-4 flex justify-center">{step.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className=" text-sm">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
