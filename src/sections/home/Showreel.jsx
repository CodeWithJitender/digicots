import React, { useState } from "react";

function Showreel() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="showreel relative h-full w-full z-[10000]">
      {/* Cover Section */}
      <div
        style={{ backgroundImage: "url('https://ik.imagekit.io/8mbzq2hdl/digicots/reel-cover.png')" }}
        className="reel-cover absolute top-0 left-0 w-full h-full flex justify-center items-center bg-cover bg-center z-10"
      >
        <div
          style={{ fontSize: "clamp(30px, 5vw, 150px)" }}
          className="reel-text flex items-center gap-3 font-inter font-bold text-white cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <span>PLAY</span>
          <img src="https://ik.imagekit.io/8mbzq2hdl/digicots/reelplay.png" alt="Play Icon" />
          <span>REEL</span>
        </div>
      </div>

      {/* Video Popup */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
          {/* Close Button (outside the video) */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-5 right-5 text-white text-3xl bg-gray-800 p-2 rounded-full"
          >
            ✖
          </button>

          {/* Video Container */}
          <div className="relative w-full max-w-4xl p-5">
            <video src="https://ik.imagekit.io/8mbzq2hdl/digicots/showreel.mp4" className="w-full rounded-lg hidden md:block" controls autoPlay></video>
            <video src="https://ik.imagekit.io/8mbzq2hdl/digicots/showreel-mobile.mp4" className="w-full rounded-lg block md:hidden " controls autoPlay></video>
          </div>
        </div>
      )}
    </section>
  );
}

export default Showreel;
