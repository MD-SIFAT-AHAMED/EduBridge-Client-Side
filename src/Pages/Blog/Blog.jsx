import React from "react";

const Blog = () => {
  // Fake blog data
  const blogs = [
    {
      id: 1,
      title: "Top 5 Tips to Learn Online Effectively",
      excerpt:
        "Online learning can be challenging. Here are five tips to improve your focus and retention while studying online.",
      author: "Jane Doe",
      date: "Aug 18, 2025",
    },
    {
      id: 2,
      title: "How Teachers Can Sell Courses on EduBridge",
      excerpt:
        "Learn how to create and sell your courses on EduBridge and reach students worldwide effortlessly.",
      author: "John Smith",
      date: "Aug 15, 2025",
    },
    {
      id: 3,
      title: "The Future of Online Education in 2025",
      excerpt:
        "Explore trends and predictions for the online education industry and what it means for students and teachers.",
      author: "Emily Johnson",
      date: "Aug 10, 2025",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <h1 className="text-4xl font-bold text-center text-primary">EduBridge Blog</h1>
      <p className="text-center text-lg">
        Insights, tips, and news about online learning and teaching
      </p>

      {/* Blog list */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog.id} className="card bg-base-200 shadow rounded-2xl p-6 flex flex-col">
            <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
            <p className="mb-4 flex-grow">{blog.excerpt}</p>
            <div className="text-sm mt-auto">
              <span>By {blog.author}</span> | <span>{blog.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
