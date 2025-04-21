import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ScrollTrigger from "gsap/ScrollTrigger";
import BlogModal from "./BlogModal";

export default function BlogSection() {
  const posts = [
    {
      id: "1",
      title: "This is a very long heading with lots of words...",
      author: "Aishwary Sinha",
      date: "Jan 25, 2025",
      readTime: "2 Min Read",
      img: "https://ik.imagekit.io/x5xessyka/digicots/public/blog/topic-1.png",
      imgArr: [
        "https://ik.imagekit.io/x5xessyka/digicots/public/blog-post1.png",
        "https://ik.imagekit.io/x5xessyka/digicots/public/blog-post2.png",
        "https://ik.imagekit.io/x5xessyka/digicots/public/blog-post3.png",
        "https://ik.imagekit.io/x5xessyka/digicots/public/blog-post4.png",
        "https://ik.imagekit.io/x5xessyka/digicots/public/blog-post5.png",
        "https://ik.imagekit.io/x5xessyka/digicots/public/blog-post6.png",
        "https://ik.imagekit.io/x5xessyka/digicots/public/blog-post7.png",
        "https://ik.imagekit.io/x5xessyka/digicots/public/blog-post8.png",
        "https://ik.imagekit.io/x5xessyka/digicots/public/blog-post9.png",
      ], // Replace with actual images
    },
    {
      id: "2",
      title: "This is a very long heading with lots of words...",
      author: "Aishwary Sinha",
      date: "Jan 25, 2025",
      readTime: "2 Min Read",
      img: "https://ik.imagekit.io/x5xessyka/digicots/public/blog/topic-2.png",
      imgArr: [
        "https://ik.imagekit.io/x5xessyka/digicots/public/blog-post1.png",
        "https://ik.imagekit.io/x5xessyka/digicots/public/blog-post2.png",
        "https://ik.imagekit.io/x5xessyka/digicots/public/blog-post3.png",
        "https://ik.imagekit.io/x5xessyka/digicots/public/blog-post4.png",
        "https://ik.imagekit.io/x5xessyka/digicots/public/blog-post5.png",
        "https://ik.imagekit.io/x5xessyka/digicots/public/blog-post6.png",
        "https://ik.imagekit.io/x5xessyka/digicots/public/blog-post7.png",
        "https://ik.imagekit.io/x5xessyka/digicots/public/blog-post8.png",
        "https://ik.imagekit.io/x5xessyka/digicots/public/blog-post9.png",
      ], // Replace with actual images
    },
    {
      id: "",
      title: "This is a very long heading with lots of words...",
      author: "Aishwary Sinha",
      date: "Jan 25, 2025",
      readTime: "2 Min Read",
      img: "https://ik.imagekit.io/x5xessyka/digicots/public/blog/topic-3.png",
      imgArr: [
        "https://ik.imagekit.io/x5xessyka/digicots/public/blog-post1.png",
        "https://ik.imagekit.io/x5xessyka/digicots/public/blog-post2.png",
        "https://ik.imagekit.io/x5xessyka/digicots/public/blog-post3.png",
        "https://ik.imagekit.io/x5xessyka/digicots/public/blog-post4.png",
        "https://ik.imagekit.io/x5xessyka/digicots/public/blog-post5.png",
        "https://ik.imagekit.io/x5xessyka/digicots/public/blog-post6.png",
        "https://ik.imagekit.io/x5xessyka/digicots/public/blog-post7.png",
        "https://ik.imagekit.io/x5xessyka/digicots/public/blog-post8.png",
        "https://ik.imagekit.io/x5xessyka/digicots/public/blog-post9.png",
      ], // Replace with actual images
    },
    {
      id: "",
      title: "This is a very long heading with lots of words...",
      author: "Aishwary Sinha",
      date: "Jan 25, 2025",
      readTime: "2 Min Read",
      img: "https://ik.imagekit.io/x5xessyka/digicots/public/blog/topic-4.png",
      imgArr: [
        "https://ik.imagekit.io/x5xessyka/digicots/public/blog-post1.png",
        "https://ik.imagekit.io/x5xessyka/digicots/public/blog-post2.png",
        "https://ik.imagekit.io/x5xessyka/digicots/public/blog-post3.png",
        "https://ik.imagekit.io/x5xessyka/digicots/public/blog-post4.png",
        "https://ik.imagekit.io/x5xessyka/digicots/public/blog-post5.png",
        "https://ik.imagekit.io/x5xessyka/digicots/public/blog-post6.png",
        "https://ik.imagekit.io/x5xessyka/digicots/public/blog-post7.png",
        "https://ik.imagekit.io/x5xessyka/digicots/public/blog-post8.png",
        "https://ik.imagekit.io/x5xessyka/digicots/public/blog-post9.png",
      ], // Replace with actual images
    },
    {
      id: "",
      title: "This is a very long heading with lots of words...",
      author: "Aishwary Sinha",
      date: "Jan 25, 2025",
      readTime: "2 Min Read",
      img: "https://ik.imagekit.io/x5xessyka/digicots/public/blog/featured-post.png",
      imgArr: [
        "https://ik.imagekit.io/x5xessyka/digicots/public/blog-post1.png",
        "https://ik.imagekit.io/x5xessyka/digicots/public/blog-post2.png",
        "https://ik.imagekit.io/x5xessyka/digicots/public/blog-post3.png",
        "https://ik.imagekit.io/x5xessyka/digicots/public/blog-post4.png",
        "https://ik.imagekit.io/x5xessyka/digicots/public/blog-post5.png",
        "https://ik.imagekit.io/x5xessyka/digicots/public/blog-post6.png",
        "https://ik.imagekit.io/x5xessyka/digicots/public/blog-post7.png",
        "https://ik.imagekit.io/x5xessyka/digicots/public/blog-post8.png",
        "https://ik.imagekit.io/x5xessyka/digicots/public/blog-post9.png",
      ], // Replace with actual images
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const openModal = (post) => {
    setSelectedPost(post);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedPost(null);
  };

  const hoverDivRef = useRef([]);
  const [isHovered, setisHovered] = useState(-1);
  const [selectedPost, setSelectedPost] = useState(null);
  const [imgSrc, setimgSrc] = useState(posts[0].img);

  useEffect(() => {
    let timeout;
    const handleMouseEnter = (event, i) => {
      // event.target.style.backgroundColor = "lightblue";
      clearTimeout(timeout);
      setimgSrc(posts[i].img);
      setisHovered(i);
      gsap.to(hoverDivRef.current[i].querySelector(".post-title"), {
        color: "#DF782B",
      });
    };

    const handleMouseLeave = (event, i) => {
      // event.target.style.backgroundColor = "white";
      timeout = setTimeout(() => {
        gsap.to(imgDivref.current, {
          opacity: 0,
          scale: 0.8,
          filter: "blur(4px)",
          duration: 0.5,
          onComplete: () => {
            setisHovered(-1);
          },
        });
      }, 500);
      gsap.to(hoverDivRef.current[i].querySelector(".post-title"), {
        color: "white",
      });
    };

    // Loop through all refs and add event listeners
    hoverDivRef.current.forEach((div, i) => {
      if (div) {
        div.addEventListener("mousemove", (e) => handleMouseEnter(e, i));
        div.addEventListener("mouseleave", (e) => handleMouseLeave(e, i));
      }
    });

    // Cleanup function to remove event listeners
    return () => {
      hoverDivRef.current.forEach((div) => {
        if (div) {
          div.removeEventListener("mouseenter", handleMouseEnter);
          div.removeEventListener("mouseleave", handleMouseLeave);
        }
      });
    };
  }, [hoverDivRef.current]);

  const imgDivref = useRef(null);
  const imgRef = useRef(null);

  useGSAP(() => {
    if (!imgDivref.current) return;
    gsap.fromTo(
      imgDivref.current,
      {
        duration: 0.5,
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
        top: isHovered * 20 + -10 + "%",
      }
    );
  }, [isHovered]);

  useGSAP(() => {
    gsap.fromTo(
      imgRef.current,
      {
        duration: 1,
        // opacity: 0,
        filter: "blur(4px)",
        scale: 1.3,
        ease: "power1.inOut",
        transformOrigin: "center",
      },
      {
        opacity: 1,
        filter: "blur(0px)",
        scale: 1,
      }
    );
  }, [imgSrc]);

  const mainImgRef = useRef(null);

  gsap.registerPlugin(ScrollTrigger);
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: mainImgRef.current,
        start: "top 70%",
        end: "top 30%",
        scrub: true,
      },
    });
    tl.from(mainImgRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 1,
      filter: "blur(4px)",
      ease: "power1.inOut",
      transformOrigin: "center",
    });
  }, [mainImgRef.current]);

  return (
    <>
      <section ref={mainImgRef} className=" text-white py-12 px-6 md:px-12">
        <div className="max-w-6xl relative mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left Side - Blog List */}
          <div className="relative order-2 md:order-1">
            {/* <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Changes in the <br /> Marketing Landscape
            </h2> */}

            <div className="">
              {posts.map((post, index) => (
                <div
                  onClick={() => openModal(post)}
                  ref={(el) => (hoverDivRef.current[index] = el)}
                  key={index}
                  className=" hoverDiv border-t border-gray-600 border-dotted py-5 md:pt-10 md:pb-5"
                >
                  <Link>
                    <h3 className="post-title text-base md:text-2xl font-bold font-inter text-white hover:text-[] pb-2 md:pb-5">
                      {post.title}
                    </h3>
                    <div className="flex text-sm text-gray-400 mt-1 space-x-3">
                      <span className="font-bold text-white">
                        {post.author}
                      </span>
                      <span className="text-xs md:text-base">{post.date}</span>
                      <span className="text-xs md:text-base">
                        {post.readTime}
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {isHovered != -1 && (
            <div
              ref={imgDivref}
              className="absolute top-[-10%] left-1/2 -translate-x-1/2  overflow-hidden h-[255px] w-[210px] z-[2] rounded-lg pointer-events-none "
            >
              <img
                ref={imgRef}
                className="h-full w-full object-cover"
                src={imgSrc}
                alt=""
              />
            </div>
          )}

          {/* Right Side - Featured Post */}
          <div
            onClick={() => openModal(posts[posts.length - 1])}
            className="relative order-1 cursor-pointer"
          >
            <img
              src={posts[posts.length - 1].img}
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
        </div>
      </section>
      <BlogModal isOpen={isOpen} onClose={closeModal} post={selectedPost} />
    </>
  );
}

// #DF782B
