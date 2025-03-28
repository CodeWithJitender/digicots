import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useRef } from "react";

export default function BlogModal({ isOpen, onClose, post }) {
  if (!isOpen || !post) return null;
  const layoutRef = useRef(null);
  const imgRef = useRef([]);
  let speed = 0;
  let lastDeltaY = 0;

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

    const handleWheel = (event) => {
      let delta = event.deltaY * 0.00005; // Adjust intensity based on scroll speed
      speed += delta;
      speed = Math.max(0.11, Math.min(0.91, speed)); // Keep speed within range -0.4 to 0.6
      console.log(speed);
      gsap.to(tl, { progress: `${speed}`, ease: "linear" });
      // lastDeltaY = event.deltaY;
    };

    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const posts = [
    {
      title: "This is a very long heading with lots of words...",
      author: "Aishwary Sinha",
      date: "Jan 25, 2025",
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
      ], // Replace with actual images
    },
    {
      title: "This is a very long heading with lots of words...",
      author: "Aishwary Sinha",
      date: "Jan 25, 2025",
      img: "blog/topic-3.png",
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
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-[10000] bg-black bg-opacity-80 flex justify-center items-end ">
      <motion.div
        ref={layoutRef}
        initial={{ opacity: 0, scale: 1.3, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, scale: 1.3, filter: "blur(10px)" }}
        transition={{ duration: 0.7, ease: "easeInOut" }} // Added duration and easing
        className="bg-gray-900 text-white rounded-xl w-full h-[100vh] shadow-lg overflow-hidden"
      >
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left - Large Image */}
          <div className="relative hidden md:block h-[100vh] max-h-[100vh]">
            <img
              src={post.img}
              alt="Blog Image"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent"></div>
            <div className="absolute bottom-0 left-0 p-10">
              <h2 className="text-5xl font-bold mb-5">{post.title}</h2>
              <p className="text-gray-300 text-sm">
                <span className="me-5 font-bold">{post.author}</span>
                {/* <span><i className="fal fa-calendar"></i> {post.author}</span> */}
                <span>
                  <i className="fal fa-calendar"></i> {post.date}
                </span>
              </p>
            </div>
          </div>

          {/* Right - Scrolling Text Content */}
          <div className="p-6  flex flex-col space-y-1">
            {/* Header Actions */}
            <div className="flex justify-between items-center px-6 py-4">
              <div className="flex space-x-3">
                <button className="bg-gray-700 px-4 py-2 rounded-full text-sm flex items-center gap-2 hover:bg-gray-600">
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
                <img src="cross.png" className="max-w-10" alt="" />
              </button>
            </div>
            <div className="w-full h-[100%] flex justify-center items-center">
              <div className="blogmodal-img max-w-[650px] w-full h-full ">
                <div className="relative w-full h-full">
                  {post.imgArr.map((img, i) => (
                    <img
                      key={i}
                      ref={(el) => (imgRef.current[i] = el)}
                      src={img}
                      className=" overflow-hidden absolute scale-[1.1] w-[300px] md:w-[400px] -translate-x-1/2 top-0 left-[200%] h-[80vh] object-cover rounded-lg "
                      style={{ left: i == 0 && "50%", scale: i == 0 && 1 }}
                      alt=""
                    />
                  ))}
                  <div
                    ref={(el) => (imgRef.current[post.imgArr.length] = el)}
                    className="flex w-full items-center top-[50vh] -translate-y-1/2 justify-center gap-6 absolute -translate-x-1/2 left-[200%]"
                  >
                    {posts.map((post, index) => (
                      <div
                        key={index}
                        className="relative group cursor-pointer"
                        onClick={() => openModal(post)}
                      >
                        {/* Image */}
                        <div className="overflow-hidden rounded-lg transition-all duration-1000 ">
                          <img
                            src={post.img}
                            alt="Blog Post"
                            className="w-full object-cover rounded-lg transition-all duration-1000 group-hover:scale-120"
                          />
                        </div>

                        {/* Text Content */}
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
      </motion.div>
    </div>
  );
}
