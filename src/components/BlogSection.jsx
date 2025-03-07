import { Link } from "react-router-dom";
import BlogModal from "./BlogModal";
import { useState } from "react";

export default function BlogSection() {
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
      id: "1",
      title: "This is a very long heading with lots of words...",
      author: "Aishwary Sinha",
      date: "Jan 25, 2025",
      readTime: "2 Min Read",
      img: "blog/topic-4.png",
      imgArr: [
        "blog-post1.png",
        "blog-post2.png",
        "blog-post3.png",
        "blog-post4.png",
        "blog-post5.png",
        "blog-post6.png",
        "blog-post7.png",
        "blog-post8.png",
        "blog-post9.png",
        "blog-post0.png"
      ]
    },
    {
      id: "2",
      title: "This is a very long heading with lots of words...",
      author: "Aishwary Sinha",
      date: "Jan 25, 2025",
      readTime: "2 Min Read",
      img: "blog/topic-4.png",
      imgArr: [
        "blog-post1.png",
        "blog-post2.png",
        "blog-post3.png",
        "blog-post4.png",
        "blog-post5.png",
        "blog-post6.png",
        "blog-post7.png",
        "blog-post8.png",
        "blog-post9.png",
        "blog-post0.png"
      ]
    },
    {
      id: "",
      title: "This is a very long heading with lots of words...",
      author: "Aishwary Sinha",
      date: "Jan 25, 2025",
      readTime: "2 Min Read",
      img: "blog/topic-4.png",
      imgArr: [
        "blog-post1.png",
        "blog-post2.png",
        "blog-post3.png",
        "blog-post4.png",
        "blog-post5.png",
        "blog-post6.png",
        "blog-post7.png",
        "blog-post8.png",
        "blog-post9.png",
        "blog-post0.png"
      ]
    },
    {
      id: "",
      title: "This is a very long heading with lots of words...",
      author: "Aishwary Sinha",
      date: "Jan 25, 2025",
      readTime: "2 Min Read",
      img: "blog/topic-4.png",
      imgArr: [
        "blog-post1.png",
        "blog-post2.png",
        "blog-post3.png",
        "blog-post4.png",
        "blog-post5.png",
        "blog-post6.png",
        "blog-post7.png",
        "blog-post8.png",
        "blog-post9.png",
        "blog-post0.png"
      ]
    }
  ];

  return (
    <section className=" text-white py-12 px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* left Side - Featured Post */}
        <div className="relative md:order-2 ">
          <img
            src="blog/featured-post.png"
            alt="Featured Post"
            className="w-full h-80 md:h-full object-cover rounded-lg"
          />
          <div className="absolute bottom-0 left-0 w-full p-6 rounded-b-lg">
            <h3 className="font-bold text-xl text-white mb-4">
              Leading heading of the Latest Post
            </h3>
            <div className="flex text-sm text-gray-300 mt-1 space-x-7">
              <span className="font-bold text-white">Aishwary Sinha</span>
              <span>Jan 25, 2025</span>
              <span>2 Min Read</span>
            </div>
          </div>
        </div>
        {/* right Side - Blog List */}
        <div className="md:order-1">
          {/* <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Changes in the <br /> Marketing Landscape
            </h2> */}

          <div className="space-y-6 ">
            {posts.map((post, index) => (
              <div
                key={index}
                className="border-t border-gray-600 border-dotted pt-5 md:pt-10 md:pb-5"
                onClick={() => openModal(post)}
              >
                <Link>
                  <h3 className="text-lg md:text-2xl font-bold font-inter text-white hover:text-[#DF782B] mb-2 md:mb-5">
                    {post.title}
                  </h3>
                  <div className="flex text-sm text-gray-400 mt-1 space-x-3">
                    <span className="font-bold text-white">{post.author}</span>
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        
      </div>

      {/* Modal */}
      <BlogModal isOpen={isOpen} onClose={closeModal} post={selectedPost} />
    </section>
  );
}
