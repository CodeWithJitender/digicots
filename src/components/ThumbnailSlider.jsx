import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useState } from "react";
import BlogModal from "./BlogModal";

const slides = [
  {
    image: "blog/blog-1.png",
    title: "Leading heading of the Latest Post",
    author: "Aishwary Sinha",
    date: "Jan 25, 2025",
    readTime: "2 Min Read",
    thumbnail: "blog/thumb-1.png",
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
    image: "blog/blog-1.png",
    title: "Another Amazing Post",
    author: "Jane Doe",
    date: "Feb 10, 2025",
    readTime: "3 Min Read",
    thumbnail: "blog/thumb-1.png",
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
    image: "blog/blog-1.png",
    title: "Leading heading of the Latest Post",
    author: "Aishwary Sinha",
    date: "Jan 25, 2025",
    readTime: "2 Min Read",
    thumbnail: "blog/thumb-1.png",
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
    image: "blog/blog-1.png",
    title: "Another Amazing Post",
    author: "Jane Doe",
    date: "Feb 10, 2025",
    readTime: "3 Min Read",
    thumbnail: "blog/thumb-1.png",
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
];

export default function ThumbnailSlider() {
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

  return (
    <section>
        <div className="container-xxl">
        <div className="relative w-full max-w-[1200px] mx-auto">
      {/* Swiper Slider */}
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        loop={true}
        // navigation
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        className="w-full rounded-lg overflow-hidden"
      >
        {slides.map((slide, index) => (
                
                <SwiperSlide key={index} className="relative"  >
                  <div className="" onClick={() => openModal(slide)}>

            {/* Background Image */}
            <div className="relative h-[500px] w-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Slide Content */}
            <div className="absolute bottom-6 left-6 flex flex-col justify-between items-start h-[90%] text-white">
              <button className="bg-[#DF782B] px-4 py-2 rounded-full text-sm font-bold">
                Featured
              </button>
             <div className="">
             <h2 className="text-2xl md:text-3xl font-bold mb-5">{slide.title}</h2>
              <div className="flex items-center text-sm mt-2 space-x-3">
                <span>{slide.author}</span>
                <span></span>
                <span><i class="fal fa-calendar"></i> {slide.date}</span>
                <span></span>
                <span><i class="fal fa-clock"></i> {slide.readTime}</span>
              </div>
             </div>
            </div>

            {/* Floating Thumbnail (Next Slide Preview) */}
            {index < slides.length - 1 && (
              <div className="absolute bottom-6 right-6 bg-gray-900/80 text-white p-3 rounded-lg  items-center space-x-3 hidden md:flex">
                <img
                  src={slides[index + 1].thumbnail}
                  alt="Next post"
                  className="w-20 h-14 object-cover rounded-md"
                />
                <div>
                  <span className="text-orange-400 text-xs">NEXT</span>
                  <h3 className="text-sm font-semibold">{slides[index + 1].title}</h3>
                </div>
              </div>
            )}
                  </div>

          </SwiperSlide>
        ))}
      </Swiper>

      {/* Progress Bar (Bottom Border) */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-700 overflow-hidden">
        <div className="h-full bg-orange-500 progress-bar"></div>
      </div>

      {/* Progress Bar Animation */}
      <style jsx>{`
        .progress-bar {
          width: 100%;
          height: 100%;
          transform: scaleX(0);
          transform-origin: left;
          animation: progressBar 4s linear infinite;
        }

        @keyframes progressBar {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
      `}</style>
    </div>
        </div>
        {/* Modal */}
              <BlogModal isOpen={isOpen} onClose={closeModal} post={selectedPost} />
    </section>
  );
}
