import React from 'react'
import ThankyouPopUp from '../components/ThankyouPopUp'

function ThankYou() {
  return (
    <div className=" inset-0 z-[1000] bg-black flex items-center justify-center p-4 py-50">
    <div className="relative bg-[#111] rounded-2xl max-w-2xl w-full text-center py-10 px-6 md:px-10 shadow-lg text-white">

      {/* Close Button */}
      {/* <button
        onClick={onClose}
        className="absolute top-[-60px] left-1/2 transform -translate-x-1/2 bg-[#ED510C] w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold cursor-pointer"
      >
        ×
      </button> */}

      {/* Thank You Heading */}
      <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r flex items-center from-[#ff6a00] to-[#ff2e00] mb-6 justify-center">
        THANK Y
        {/* <span
          className="inline-block bg-[url('https://ik.imagekit.io/8mbzq2hdl/digicots/wolf.gif')] 
                     bg-no-repeat bg-center bg-contain w-[45px] h-[45px] align-middle mx-1"
        ></span> */}
        <img src="https://ik.imagekit.io/8mbzq2hdl/digicots/wolf.gif" className="bg-no-repeat bg-center bg-contain w-[35px] md:w-[50px] h-[35px] md:h-[50px] align-middle mx-1" alt="" />
        U
      </h1>

      {/* Description */}
      <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-6">
      We have received your response. <br /> Our DigiCare Team will get back to you within the next 72 hours. <br /> Adios✨    
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
  )
}

export default ThankYou
