import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import TextAnimation1 from "../../animation/text/TextAnimation1";

const ContactForm = () => {
  const [activeTab, setActiveTab] = useState("dominance");
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle input changes dynamically
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // // Handle form submission
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setMessage("");

  //   try {
  //     const response = await fetch("https://your-api-endpoint.com/submit", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ ...formData, type: activeTab }),
  //     });

  //     if (!response.ok) throw new Error("Failed to submit. Try again!");

  //     setMessage("✅ Form submitted successfully!");
  //     setFormData({});
  //   } catch (error) {
  //     setMessage("❌ Error: " + error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const imgRef = useRef(null);
  const contactRef = useRef(null);
  const tabRef = useRef([]);
  const tabPRef = useRef(null);
  const formRef = useRef(null);
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(imgRef.current, {
      duration: 1,
      opacity: 0,
      x: -200,
      ease: "power4.inOut",
    })
    .from(contactRef.current,{
      duration: 1,
      opacity: 0,
      y: 200,
      ease: "power4.inOut",
    })
    .from(tabPRef.current,{
      duration: 1,
      opacity: 0,
      x: 200,
      ease: "power4.inOut",
    })
    .from(formRef.current,{
      duration: 1,
      opacity: 0,
      x: 200,
      ease: "power4.inOut",
    })
  }, []);

  const indicatorRef = useRef(null);

  // Handle Tab Switching Animation
  useEffect(() => {
    const activeIndex = ["dominance", "help", "pack"].indexOf(activeTab);
    if (tabRef.current[activeIndex]) {
      const { offsetLeft, offsetWidth } = tabRef.current[activeIndex];
      gsap.to(indicatorRef.current, {
        x: offsetLeft,
        width: offsetWidth,
        duration: 0.5,
        ease: "power3.out",
      });
    }
  }, [activeTab,window.innerWidth]);


  return (
    <div className="bg-[#1a1a1a] overflow-hidden min-h-screen flex flex-col-reverse  md:flex-row items-center justify-center md:px-6 lg:px-20 py-12">
      {/* Left Section - Fox Image & Addresses */}
      <div className="w-full md:w-1/2 flex flex-col items-start">
        <img
          ref={imgRef}
          src="lets-talk.png"
          alt="Fox"
          className="w-full max-w-md hidden md:block"
        />
        <div ref={contactRef} className="mt-8 text-white grid grid-cols-2 items-center justify-items-center gap-6 w-full">
          {[
            {
              country: "India",
              address: "14, Near Mahavir Pharmacy, Diu",
              phone: "+91 9876 812 3791",
              addLink: "https://www.google.com/",
              phoneLink: "+91 9876 812 3791",
            },
            {
              country: "USA",
              address: "47 W 13th St, New York, NY 10011",
              phone: "(+1) 230-528-5548",
              addLink: "https://www.google.com/",
              phoneLink: "(+1) 230-528-5548",
            },
            {
              country: "Singapore",
              address: "8 Temasek Boulevard, Suntec Tower 3",
              phone: "(+65) 528-5548",
              addLink: "https://www.google.com/",
              phoneLink: "(+65) 528-5548",
            },
            {
              country: "Canada",
              address: "201 James St N, Hamilton, Ontario",
              phone: "(905) 528-5548",
              addLink: "https://www.google.com/",
              phoneLink: "(905) 528-5548",
            },
          ].map((item, index) => (
            <div key={index} className="max-w-[200px]">
              <h3 className="text-2xl mb-3 font-black font-inter">
                {item.country}
              </h3>
              <div className="h-[100px] lg:h-[60px] flex flex-col justify-between">
                <p>
                  {" "}
                  <a
                    href={item.addLink}
                    target="_blank"
                    className="text-white font-inter"
                  >
                    {item.address}
                  </a>
                </p>
                <p>
                  {" "}
                  <a
                    href={`tel:${item.phoneLink}`}
                    target="_blank"
                    className="text-white font-inter"
                  >
                    {item.phone}
                  </a>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section - Multi-Tab Form */}
      <div className="w-full md:w-1/2 bg-[#1a1a1a] px-8 py-8">
        <img
          src="lets-talk.png"
          alt="Fox"
          className="w-full max-w-md block mb-4 md:hidden"
        />

        <h1 className="text-white text-center md:text-start text-4xl sm:text-7xl md:text-8xl font-bold ">
          <TextAnimation1>
          Let's Talk
          </TextAnimation1>
        </h1>

        {/* Tabs */}
        {/* <div ref={tabRef} className="flex flex-wrap justify-center  md:justify-between mt-4 bg-[#FFFFFF33] rounded-md p-3">
          {[
            { id: "dominance", label: "Let’s Talk Dominance!" },
            { id: "help", label: "Howl for Help" },
            { id: "pack", label: "Join the Pack!" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-md font-semibold ${
                activeTab === tab.id
                  ? "bg-orange-500 text-white"
                  : " text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div> */}

<div ref={tabPRef} className="relative flex justify-center md:justify-between mt-4 bg-[#FFFFFF33] rounded-md p-3">
        {/* Indicator */}
        <div
          ref={indicatorRef}
          className="absolute left-0 xl:h-[66%] md:h-[76%] h-[66%] bg-orange-500 rounded-md transition-all duration-300"
        ></div>

        {["dominance", "help", "pack"].map((tab, index) => (
          <button
            key={tab}
            ref={(el) => (tabRef.current[index] = el)}
            onClick={() => setActiveTab(tab)}
            className={`relative px-4 py-2 cursor-pointer rounded-md font-semibold text-white z-10`}
          >
            {tab === "dominance" ? "Let’s Talk Dominance!" :
              tab === "help" ? "Howl for Help" :
                "Join the Pack!"}
          </button>
        ))}
      </div>

        {/* Form Fields - Different for Each Tab */}
        <form  className="mt-6 space-y-4" action="https://formsubmit.co/jitender@digicots.com" method="POST">
        {/* <form className="grid grid-cols-1 md:grid-cols-2 gap-4" > */}
            <input type="hidden" name="_captcha" value="false"/>
            <input type="hidden" name="_template" value="table"/>
            <input type="hidden" name="_next" value="http://localhost:5173/thankyou"/>
          {/* Let’s Talk Dominance */}
          {activeTab === "dominance" && (
            <>
              <input
                name="Full_Name"
                type="text"
                placeholder="Full Name"
                // onChange={handleChange}
                className="w-full bg-[#3A3A3A] font-inter text-white p-3 rounded-md focus:outline-none"
              />
              <div className="flex space-x-2">
                <select
                  name="Country_Code"
                  // onChange={handleChange}
                  className="bg-[#3A3A3A] font-inter text-white p-3 rounded-md"
                >
                  <option>+1</option>
                  <option>+91</option>
                  <option>+65</option>
                </select>
                <input
                  name="Contact_Number"
                  type="text"
                  placeholder="Contact Number"
                  // onChange={handleChange}
                  className="flex-1 bg-[#3A3A3A] font-inter text-white p-3 rounded-md focus:outline-none"
                />
              </div>
              <input
                name="Email"
                type="email"
                placeholder="Email Address"
                // onChange={handleChange}
                className="w-full bg-[#3A3A3A] font-inter text-white p-3 rounded-md focus:outline-none"
              />
              <select className="w-full bg-[#3A3A3A] text-white p-3 rounded-md focus:outline-none pe-2.5">
                <option>Purpose</option>
                <option>Business Inquiry</option>
                <option>Collaboration</option>
              </select>
              <textarea
                name="Additional_Info"
                placeholder="Additional Information"
                rows="5"
                // onChange={handleChange}
                className="w-full bg-[#3A3A3A] font-inter text-white p-3 rounded-md focus:outline-none"
              />
            </>
          )}

          {/* Howl for Help */}
          {activeTab === "help" && (
            <>
              <input
                name="Full_Name"
                type="text"
                placeholder="Full Name"
                // onChange={handleChange}
                className="w-full bg-[#3A3A3A] font-inter text-white p-3 rounded-md focus:outline-none"
              />
              <input
                name="Phone"
                type="text"
                placeholder="Phone"
                // onChange={handleChange}
                className="w-full bg-[#3A3A3A] font-inter text-white p-3 rounded-md focus:outline-none"
              />
              <input
                name="Email"
                type="email"
                placeholder="Email"
                // onChange={handleChange}
                className="w-full bg-[#3A3A3A] font-inter text-white p-3 rounded-md focus:outline-none"
              />
              <textarea
                name="Message"
                placeholder="Message"
                // onChange={handleChange}
                className="w-full bg-[#3A3A3A] font-inter text-white p-3 rounded-md focus:outline-none"
              />
            </>
          )}

          {/* Join the Pack */}
          {activeTab === "pack" && (
            <>
              <input
                name="First_Name"
                type="text"
                placeholder="First Name"
                // onChange={handleChange}
                className="w-full bg-[#3A3A3A] font-inter text-white p-3 rounded-md focus:outline-none"
              />
              <input
                name="Last_Name"
                type="text"
                placeholder="Last Name"
                // onChange={handleChange}
                className="w-full bg-[#3A3A3A] font-inter text-white p-3 rounded-md focus:outline-none"
              />
              <input
                name="Phone"
                type="text"
                placeholder="Phone"
                // onChange={handleChange}
                className="w-full bg-[#3A3A3A] font-inter text-white p-3 rounded-md focus:outline-none"
              />
              <input
                name="Email"
                type="email"
                placeholder="Email"
                // onChange={handleChange}
                className="w-full bg-[#3A3A3A] font-inter text-white p-3 rounded-md focus:outline-none"
              />
              <textarea
                name="Message"
                placeholder="Message"
                // onChange={handleChange}
                className="w-full bg-[#3A3A3A] font-inter text-white p-3 rounded-md focus:outline-none"
              />
            </>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-md font-semibold hover:bg-orange-600"
            disabled={loading}
          >
            {loading
              ? "Submitting..."
              : activeTab === "dominance"
              ? "Let’s talk about dominance"
              : activeTab === "help"
              ? "Request Help"
              : "Join the Pack"}
          </button>
        </form>

        {/* Success/Error Message */}
        {message && <p className="mt-4 text-white">{message}</p>}
      </div>
    </div>
  );
};

export default ContactForm;
