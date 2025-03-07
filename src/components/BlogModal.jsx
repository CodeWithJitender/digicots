import { motion } from "framer-motion";

export default function BlogModal({ isOpen, onClose, post }) {
  if (!isOpen || !post) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-end z-[100]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-gray-900 text-white rounded-xl w-full h-[100vh] shadow-lg overflow-hidden"
      >
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left - Large Image */}
          <div className="relative h-[100vh] max-h-[100vh] hidden md:block">
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
                {/* <span><i class="fal fa-calendar"></i> {post.author}</span> */}
                <span><i class="fal fa-calendar"></i> {post.date}</span>
              </p>
            </div>
          </div>

          {/* Right - Scrolling Text Content */}
          <div className="p-6 flex flex-col space-y-6 h-[100vh]">
            {/* Header Actions */}
            <div className="flex justify-between items-center px-6 py-4">
              <div className="flex space-x-3">
                <button className="bg-gray-700 px-4 py-2 rounded-full text-sm flex items-center gap-2 hover:bg-gray-600">
                  <i class="fal fa-share-alt"></i> <span>Share</span>
                </button>
              </div>
              <button onClick={onClose} className="text-xl cursor-pointer">
                <img src="cross.png" className="max-w-10" alt="" />
              </button>
            </div>
            <div className="w-full h-full flex justify-center items-center">
            <div className="blogmodal-img max-w-[650px]  overflow-x-scroll ">
                <div className="grid grid-cols-10 w-[3000px] sm:w-[5000px] gap-4 lg:gap-8 pb-5">
                {post.imgArr.map((imgi)=>(
                <img src={imgi} className="w-full max-w-[350px] sm:max-w-[500px] rounded-2xl " alt="" />
                ))}
                </div>  
            </div>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}
