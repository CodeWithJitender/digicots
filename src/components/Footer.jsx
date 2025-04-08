import React from "react";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Top Section - Join the Pack */}
        <div className="flex flex-col md:flex-row justify-between items-center  gap-10">
          {/* Left - Text */}
          <div className="md:w-[25%] text-center md:text-left">
            <h2 className="text-5xl sm:text-8xl font-inter font-bold leading-tight text-white">
              Join the Pack
            </h2>
            <p className="text-gray-400 mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore.
            </p>
          </div>

          {/* Right - Form */}
          <div className="md:w-[65%] w-full">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                className="bg-[#3A3A3A] text-[#737373] p-4 sm:p-5  rounded-[14px] w-full focus:outline-none"
              />
              <input
                type="text"
                placeholder="Company Name"
                className="bg-[#3A3A3A] text-[#737373] p-4 sm:p-5  rounded-[14px] w-full focus:outline-none"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="bg-[#3A3A3A] text-[#737373] p-4 sm:p-5  rounded-[14px] w-full focus:outline-none "
              />
              <div className="flex ">
                <select className="bg-[#3A3A3A] text-[#737373] p-4 sm:p-5  rounded-l-[14px] focus:outline-none">
                  <option value="+1">+1</option>
                  <option value="+91">+91</option>
                  <option value="+44">+44</option>
                </select>
                <input
                  type="text"
                  placeholder="Contact Number"
                  className="bg-[#3A3A3A] text-[#737373] p-4 sm:p-5  w-full rounded-r-[14px] focus:outline-none"
                />
              </div>
              <button className="md:col-span-2 bg-[#DF782B] hover:bg-orange-600 transition-all text-white font-bold p-4 sm:p-5 rounded-[14px] cursor-pointer">
                Let's Talk about the Future
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-12"></div>

        {/* Bottom Section - Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {/* Branding */}
          <div className="flex flex-col items-center md:items-start col-span-2 md:col-span-1">
            <h3 className="text-4xl font-bold text-[#DF782B]">DigiCots</h3>
            <div className="flex space-x-3 mt-4">
              <div className="w-8 h-8 bg-gray-800 rounded-md flex justify-center items-center">
                <a href="">
                  <i class="fab fa-facebook-f"></i>
                </a>
              </div>
              <div className="w-8 h-8 bg-gray-800 rounded-md flex justify-center items-center">
                <a href="">
                  <i class="fab fa-instagram"></i>
                </a>
              </div>
              <div className="w-8 h-8 bg-gray-800 rounded-md flex justify-center items-center">
                <a href="">
                  <i class="fab fa-linkedin-in"></i>
                </a>
              </div>
              <div className="w-8 h-8 bg-gray-800 rounded-md flex justify-center items-center">
                <a href="">
                  <i class="fab fa-twitter"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="sm:text-left sm:max-w-[250px]">
            <h4 className="text-lg font-semibold">India</h4>
            <p className="text-gray-400 mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore.
            </p>
            <p className="mt-2 font-semibold">+91 987 987 5632</p>
          </div>

          {/* Links */}
          <div className="flex sm:justify-end gap-10 sm:gap-20 text-center justify-around md:text-left">
            <div>
              <h4 className="font-semibold">Header</h4>
              <ul className="text-gray-400 mt-2 space-y-1">
                <li>
                  <a href="#" className="hover:text-white">
                    Links
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Links
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Links
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Links
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">Header</h4>
              <ul className="text-gray-400 mt-2 space-y-1">
                <li>
                  <a href="#" className="hover:text-white">
                    Links
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Links
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Links
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Links
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-12 text-gray-400  flex flex-col sm:flex-row justify-between align-middle">
          <div className="">
            <p className="text-center sm:text-start">
              Designed by{" "}
              <a href="#" className="text-[#DF782B]">
                Aishwary Sinha
              </a>
            </p>
          </div>
          <div className="text-center sm:text-end">
            <p className="mt-1">Auuuuu... Created Proudly in India</p>
            <p className="mt-1">Copywrite 2025 ©</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
