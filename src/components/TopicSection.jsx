import { useState } from "react";
import BlogModal from "./BlogModal";

export default function TopicSection() {
    const [selectedPost, setSelectedPost] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
  
    const openModal = (post) => {
      setSelectedPost(post);
      setIsOpen(true);
    };
  
    const closeModal = () => {
      setIsOpen(false);
      setSelectedPost(null);
    };


  const posts = [
    {
      title: "This is a very long heading with lots of words...",
      author: "Aishwary Sinha",
      date: "Jan 25, 2025",
      img: "blog/topic-4.png",
      imgArr:['blog-post1.png', 'blog-post2.png', 'blog-post3.png', 'blog-post4.png', 'blog-post5.png', 'blog-post6.png', 'blog-post7.png', 'blog-post8.png','blog-post9.png', 'blog-post0.png'] // Replace with actual images
    },
    {
      title: "This is a very long heading with lots of words...",
      author: "Aishwary Sinha",
      date: "Jan 25, 2025",
      img: "blog/topic-3.png",
      imgArr:['blog-post1.png', 'blog-post2.png', 'blog-post3.png', 'blog-post4.png', 'blog-post5.png', 'blog-post6.png', 'blog-post7.png', 'blog-post8.png','blog-post9.png', 'blog-post0.png']
    },
    {
      title: "This is a very long heading with lots of words...",
      author: "Aishwary Sinha",
      date: "Jan 25, 2025",
      img: "blog/topic-2.png",
      imgArr:['blog-post1.png', 'blog-post2.png', 'blog-post3.png', 'blog-post4.png', 'blog-post5.png', 'blog-post6.png', 'blog-post7.png', 'blog-post8.png','blog-post9.png', 'blog-post0.png']
    },
    {
      title: "This is a very long heading with lots of words...",
      author: "Aishwary Sinha",
      date: "Jan 25, 2025",
      img: "blog/topic-1.png",
      imgArr:['blog-post1.png', 'blog-post2.png', 'blog-post3.png', 'blog-post4.png', 'blog-post5.png', 'blog-post6.png', 'blog-post7.png', 'blog-post8.png','blog-post9.png', 'blog-post0.png']
    }
  ];

  return (
    <section className=" text-white  px-6 ">
      <div className="max-w-7xl mx-auto">
        {/* Header Section
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl md:text-4xl font-bold">Topic</h2>
            <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold flex items-center hover:bg-gray-300 transition">
              See All <span className="ml-2">↗</span>
            </button>
          </div> */}

        {/* Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {posts.map((post, index) => (
            <div key={index} className="relative group cursor-pointer" onClick={() => openModal(post)}>
              {/* Image */}
              <img
                src={post.img}
                alt="Blog Post"
                className="w-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
              />

              {/* Text Content */}
              <div className="mt-3">
                <h3 className="text-xl font-bold mb-5">{post.title}</h3>
                <div className="flex text-sm text-[#A9A9A9] mt-1 space-x-3">
                  <span className="font-bold">{post.author}</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <BlogModal isOpen={isOpen} onClose={closeModal} post={selectedPost} />
    </section>
  );
}
