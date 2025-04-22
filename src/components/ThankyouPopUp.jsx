import React, { useEffect, useRef } from "react";

export default function ThankyouPopUp({ popActive, onClose }) {
  const popupRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    }

    if (popActive) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popActive, onClose]);

  if (!popActive) return null;

  return (
    <div className="fixed inset-0 z-[1000] bg-black/70 flex items-center justify-center px-4">
      <div
        ref={popupRef}
        className="relative bg-[#111] rounded-2xl max-w-2xl w-full text-center py-10 px-6 md:px-10 shadow-lg text-white"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-[-50px] cursor-pointer left-1/2 transform -translate-x-1/2 bg-[#ED510C] w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
        >
          ×
        </button>

        {/* Heading */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#ff6a00] to-[#ff2e00] mb-6 md:flex justify-center items-center">
       <span>   THANK Y</span>
          <span
            className="inline-block bg-[url('https://ik.imagekit.io/8mbzq2hdl/digicots/wolf.gif')] 
                       bg-no-repeat bg-center bg-contain w-[55px] h-[55px] align-middle mx-1"
          ></span>
          <span>U </span>
        </h1>

        {/* Description */}
        <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-6">
          Laoreet habitasse blandit vehicula amet efficitur. Neque elementum arcu non,
          maecenas augue aliquam facilisis. Lacus porta tincidunt lobortis magnis dui purus.
          Mus hendrerit aenean tellus auctor eget in natoque.
        </p>

        {/* Follow Us */}
        <div className="mt-6">
          <p className="text-[#ED510C] font-semibold mb-4">Follow us on:</p>
          <div className="flex justify-center space-x-4 text-xl">
            <a href="#" className="hover:text-[#ED510C]">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="hover:text-[#ED510C]">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="hover:text-[#ED510C]">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
