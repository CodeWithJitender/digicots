import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useRef } from "react";
import MainHeading from "./MainHeading";

export default function BlogModal({ isOpen, onClose, post }) {
  if (!isOpen || !post) return null;
  const layoutRef = useRef(null);
  const imgRef = useRef([]);
  let speed = 0;
  let lastTouchY = 0; // To track the last touch position
  let isTouching = false; // To track if a touch is active

  useGSAP(() => {
    const tl = gsap.timeline({ paused: true });

    tl.to(
      imgRef.current,
      {
        left: "50%",
        ease: "power1.inOut",
        duration: 40,
        stagger: 40,
        scale: 1,
      },
      "a"
    )
      .to(
        imgRef.current,
        {
          ease: "power1.inOut",
          left: "45%",
          delay: 40,
          duration: 40,
          stagger: 40,
        },
        "a"
      )
      .to(
        imgRef.current,
        {
          ease: "power1.inOut",
          scale: 0.8,
          opacity: 0,
          delay: 55,
          duration: 40,
          stagger: 40,
        },
        "a"
      );

    // Wheel event for desktop
    const handleWheel = (event) => {
      let delta = event.deltaY * 0.00005;
      speed += delta;
      speed = Math.max(0.11, Math.min(0.91, speed));
      gsap.to(tl, { progress: `${speed}`, ease: "linear" });
    };

    // Touch events for mobile
    const handleTouchStart = (event) => {
      isTouching = true;
      lastTouchY = event.touches[0].clientY; // Record initial touch position
    };

    const handleTouchMove = (event) => {
      if (!isTouching) return;
      const currentTouchY = event.touches[0].clientY;
      let delta = (lastTouchY - currentTouchY) * 0.0005; // Adjust sensitivity for touch
      speed += delta;
      speed = Math.max(0.11, Math.min(0.91, speed)); // Clamp speed between 0.11 and 0.91
      gsap.to(tl, { progress: `${speed}`, ease: "linear" });
      lastTouchY = currentTouchY; // Update last touch position
    };

    const handleTouchEnd = () => {
      isTouching = false; // Reset touch state
    };

    // Add event listeners
    window.addEventListener("wheel", handleWheel);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    // Cleanup event listeners
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  const posts = [
    {
      title: "Local SEO for Healthcare",
      author: "Admin",
      date: "Jan 25, 2025",
      img: "https://digicots.com/images/featured-post-4.png",
      imgArr: [
        "https://digicots.com/images/blog/internal/1.webp",
        "https://digicots.com/images/blog/internal/2.webp",
        "https://digicots.com/images/blog/internal/3.webp",
        "https://digicots.com/images/blog/internal/4.webp",
        "https://digicots.com/images/blog/internal/5.webp",
        "https://digicots.com/images/blog/internal/6.webp",
        "https://digicots.com/images/blog/internal/7.webp",
        "https://digicots.com/images/blog/internal/8.webp",
        "https://digicots.com/images/blog/internal/9.webp",
      ],
    },
    {
      title: "Local SEO for Healthcare",
      author: "Admin",
      date: "Jan 25, 2025",
      img: "https://digicots.com/images/featured-post-3.png",
      imgArr: [
        "https://digicots.com/images/blog/internal/1.webp",
        "https://digicots.com/images/blog/internal/2.webp",
        "https://digicots.com/images/blog/internal/3.webp",
        "https://digicots.com/images/blog/internal/4.webp",
        "https://digicots.com/images/blog/internal/5.webp",
        "https://digicots.com/images/blog/internal/6.webp",
        "https://digicots.com/images/blog/internal/7.webp",
        "https://digicots.com/images/blog/internal/8.webp",
        "https://digicots.com/images/blog/internal/9.webp",
      ],
    },
  ];

  console.log(post.imgArr)

  return (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-[10000] bg-black bg-opacity-80 flex justify-center items-end"
    >
      <motion.div
        data-lenis-prevent
        ref={layoutRef}
        initial={{ opacity: 0, scale: 1.3, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, scale: 1.3, filter: "blur(10px)" }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="bg-gray-900 text-white rounded-xl w-full h-[100vh] shadow-lg overflow-hidden"
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative hidden md:block h-[100vh] max-h-[100vh]">
            <img
              src={post.img}
              alt="Blog Image"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent"></div>
            <div className="absolute bottom-0 left-0 p-10">
              <h2 className="text-5xl font-bold mb-5 audiowide-regular">{post.title}</h2>
              <p className="text-gray-300 text-sm raleway">
                <span className="me-5 font-bold raleway">{post.author}</span>
                <span >
                  <i className="fal fa-calendar"></i> {post.date}
                </span>
              </p>
            </div>
          </div>

          <div className="p-6 flex flex-col space-y-1">
            <div className="flex justify-between items-center px-6 py-4">
              <div className="flex space-x-3">
                <button className="bg-gray-700 px-4 py-2 rounded-full text-sm flex items-center gap-2 hover:bg-gray-600 raleway"
                onClick={() => {
                  if (navigator.share) {
                    navigator
                      .share({
                        title: post.title,
                        text: "Check out this blog post!",
                        url: window.location.href, // or provide a specific post URL if available
                      })
                      .then(() => console.log("Shared successfully!"))
                      .catch((err) => console.error("Share failed:", err));
                  } else {
                    alert("Sharing is not supported on this device.");
                  }
                }}>
                  <i className="fal fa-share-alt"></i> <span>Share</span>
                </button>
              </div>
              <button
                type="button"
                onClick={() => {
                  gsap.to(layoutRef.current, {
                    opacity: 0,
                    scale: 0.9,
                    filter: "blur(10px)",
                    onComplete: () => {
                      onClose();
                    },
                  });
                }}
                className="text-xl cursor-pointer relative z-[9]"
              >
                <img src="https://digicots.com/images/close.png" className="max-w-10" alt="" />
              </button>
            </div>
            <div className="w-full h-[100vh] flex justify-center items-center">
              <div className="blogmodal-img max-w-[650px] w-full h-full">
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  {post.imgArr.map((img, i) => (
                    <img
                      key={i}
                      ref={(el) => (imgRef.current[i] = el)}
                      src={img}
                      className="overflow-hidden absolute scale-[1.1] w-[90vw] md:w-[400px] -translate-x-1/2 top-0 left-[200%] h-[75vh] md:[80vh] object-contain rounded-2xl"
                      style={{ left: i === 0 && "50%", scale: i === 0 && 1 }}
                      alt=""
                    />
                  ))}
                  <div
                    ref={(el) => (imgRef.current[post.imgArr.length] = el)}
                    className="flex w-full flex-col items-center top-[40vh] gap-6 -translate-y-1/2 absolute -translate-x-1/2 left-[200%]"
                  >
                    <h2 className="text-3xl font-bold">Explore more</h2>
                    <div className="flex w-full gap-6">
                      {posts.map((post, index) => (
                        <div
                          key={index}
                          className="relative group cursor-pointer"
                          onClick={() => openModal(post)}
                        >
                          <div className="overflow-hidden rounded-lg transition-all duration-1000">
                            <img
                              src={post.img}
                              alt="Blog Post"
                              className="w-full object-cover rounded-lg transition-all duration-1000 group-hover:scale-120"
                            />
                          </div>
                          <div className="mt-3">
                            <h3 className="text-xl font-bold mb-5">
                              {post.title}
                            </h3>
                            <div className="flex text-sm text-[#A9A9A9] mt-1 space-x-3">
                              <span className="font-bold">{post.author}</span>
                              <span>{post.date}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}