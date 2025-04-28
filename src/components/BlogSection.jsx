import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import BlogModal from "./BlogModal";
import PropTypes from "prop-types";

gsap.registerPlugin(ScrollTrigger);

const POSTS = [
  {
    id: "1",
    title: "Local SEO for Healthcare",
    author: "Admin",
    date: "April 22, 2025",
    img: "https://ik.imagekit.io/x5xessyka/digicots/public/blog/topic-1.png",
    imgArr: Array(9)
      .fill()
      .map(
        (_, i) =>
          `https://ik.imagekit.io/x5xessyka/digicots/public/blog-post${
            i + 1
          }.png`
      ),
  },
  {
    id: "2",
    title: "Local SEO for Healthcare",
    author: "Admin",
    date: "April 22, 2025",
    readTime: "2 Min Read",
    img: "https://ik.imagekit.io/x5xessyka/digicots/public/blog/topic-2.png",
    imgArr: Array(9)
      .fill()
      .map(
        (_, i) =>
          `https://ik.imagekit.io/x5xessyka/digicots/public/blog-post${
            i + 1
          }.png`
      ),
  },
  {
    id: "3",
    title: "Local SEO for Healthcare",
    author: "Admin",
    date: "April 22, 2025",
    readTime: "2 Min Read",
    img: "https://ik.imagekit.io/x5xessyka/digicots/public/blog/topic-3.png",
    imgArr: Array(9)
      .fill()
      .map(
        (_, i) =>
          `https://ik.imagekit.io/x5xessyka/digicots/public/blog-post${
            i + 1
          }.png`
      ),
  },
  {
    id: "4",
    title: "Local SEO for Healthcare",
    author: "Admin",
    date: "April 22, 2025",
    readTime: "2 Min Read",
    img: "https://ik.imagekit.io/x5xessyka/digicots/public/blog/topic-4.png",
    imgArr: Array(9)
      .fill()
      .map(
        (_, i) =>
          `https://ik.imagekit.io/x5xessyka/digicots/public/blog-post${
            i + 1
          }.png`
      ),
  },
  {
    id: "5",
    title: "Local SEO for Healthcare",
    author: "Admin",
    date: "April 22, 2025",
    readTime: "2 Min Read",
    img: "https://ik.imagekit.io/x5xessyka/digicots/public/blog/featured-post.png",
    imgArr: Array(9)
      .fill()
      .map(
        (_, i) =>
          `https://ik.imagekit.io/x5xessyka/digicots/public/blog-post${
            i + 1
          }.png`
      ),
  },
];

export default function BlogSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [currentImg, setCurrentImg] = useState(POSTS[0].img);

  const hoverDivRefs = useRef([]);
  const imgDivRef = useRef(null);
  const imgRef = useRef(null);
  const mainImgRef = useRef(null);

  const openModal = (post) => {
    setSelectedPost(post);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedPost(null);
  };

  useEffect(() => {
    let timeout;
    const handleMouseEnter = (index) => {
      clearTimeout(timeout);
      setCurrentImg(POSTS[index].img);
      setHoveredIndex(index);
      gsap.to(hoverDivRefs.current[index].querySelector(".post-title"), {
        color: "#DF782B",
      });
    };

    const handleMouseLeave = (index) => {
      timeout = setTimeout(() => {
        gsap.to(imgDivRef.current, {
          opacity: 0,
          scale: 0.8,
          filter: "blur(4px)",
          duration: 0.5,
          onComplete: () => setHoveredIndex(-1),
        });
      }, 500);
      gsap.to(hoverDivRefs.current[index].querySelector(".post-title"), {
        color: "white",
      });
    };

    hoverDivRefs.current.forEach((div, index) => {
      if (div) {
        div.addEventListener("mousemove", () => handleMouseEnter(index));
        div.addEventListener("mouseleave", () => handleMouseLeave(index));
      }
    });

    return () => {
      hoverDivRefs.current.forEach((div) => {
        if (div) {
          div.removeEventListener("mousemove", handleMouseEnter);
          div.removeEventListener("mouseleave", handleMouseLeave);
        }
      });
      clearTimeout(timeout);
    };
  }, []);

  useGSAP(() => {
    if (!imgDivRef.current) return;
    gsap.fromTo(
      imgDivRef.current,
      {
        opacity: 0,
        filter: "blur(4px)",
        scale: 0.9,
        ease: "power1.inOut",
        transformOrigin: "center",
      },
      {
        opacity: 1,
        filter: "blur(0px)",
        scale: 1,
        top: hoveredIndex * 20 - 10 + "%",
        duration: 0.5,
      }
    );
  }, [hoveredIndex]);

  useGSAP(() => {
    if (!imgRef.current) return;
    gsap.fromTo(
      imgRef.current,
      {
        filter: "blur(4px)",
        scale: 1.3,
        ease: "power1.inOut",
        transformOrigin: "center",
      },
      {
        opacity: 1,
        filter: "blur(0px)",
        scale: 1,
        duration: 1,
      }
    );
  }, [currentImg]);

  useGSAP(() => {
    if (!mainImgRef.current) return;
    gsap
      .timeline({
        scrollTrigger: {
          trigger: mainImgRef.current,
          start: "top 70%",
          end: "top 30%",
          scrub: true,
        },
      })
      .from(mainImgRef.current, {
        opacity: 0,
        scale: 0.9,
        filter: "blur(4px)",
        ease: "power1.inOut",
        transformOrigin: "center",
        duration: 1,
      });
  }, []);

  return (
    <>
      <section ref={mainImgRef} className="text-white py-12 px-6 md:px-12">
        <div className="max-w-6xl relative mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="relative order-2 md:order-1">
            {POSTS.slice(0, -1).map((post, index) => (
              <div
                key={post.id}
                ref={(el) => (hoverDivRefs.current[index] = el)}
                onClick={() => openModal(post)}
                className="border-t border-gray-600 border-dotted py-5 md:pt-10 md:pb-5 cursor-pointer"
              >
                <Link to="#">
                  <h3 className="post-title text-base md:text-2xl font-bold font-inter text-white pb-2 md:pb-5">
                    {post.title}
                  </h3>
                  <div className="flex text-sm text-gray-400 mt-1 space-x-3">
                    <span className="font-bold text-white">{post.author}</span>
                    <span className="text-xs md:text-base">{post.date}</span>
                    {post.readTime && (
                      <span className="text-xs md:text-base">
                        {post.readTime}
                      </span>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {hoveredIndex !== -1 && (
            <div
              ref={imgDivRef}
              className="absolute top-[-10%] left-1/2 -translate-x-1/2 overflow-hidden h-[255px] w-[210px] z-[2] rounded-lg pointer-events-none"
            >
              <img
                ref={imgRef}
                className="h-full w-full object-cover"
                src={currentImg}
                alt={POSTS[hoveredIndex].title}
              />
            </div>
          )}

          <div
            onClick={() => openModal(POSTS[POSTS.length - 1])}
            className="relative order-1 cursor-pointer"
          >
            <img
              src={POSTS[POSTS.length - 1].img}
              alt="Featured Post"
              className="w-full h-80 md:h-full object-cover rounded-lg"
            />
            <div className="absolute bottom-0 left-0 w-full p-6 rounded-b-lg">
              <h3 className="font-bold text-xl text-white mb-4">
                Leading heading of the Latest Post
              </h3>
              <div className="flex text-sm text-gray-300 mt-1 space-x-7">
                <span className="font-bold text-white">Admin</span>
                <span>April 22, 2025</span>
                <span>2 Min Read</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <BlogModal isOpen={isOpen} onClose={closeModal} post={selectedPost} />
    </>
  );
}

BlogModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  post: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    date: PropTypes.string,
    readTime: PropTypes.string,
    img: PropTypes.string,
    imgArr: PropTypes.arrayOf(PropTypes.string),
  }),
};
