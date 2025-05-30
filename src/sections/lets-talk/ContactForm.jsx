import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import TextAnimation1 from "../../animation/text/TextAnimation1";
import ThankyouPopUp from "../../components/ThankyouPopUp";
// import { withLoading } from "../../components/Loading.jsx"; // Adjust path as needed

const ContactForm = () => {
  const initialForm = {
    Full_Name: "",
    Contact_Number: "",
    email: "",
    Purpose: "",
    Additional_Info: "",
    phone: "",
    message: "",
    First_Name: "",
    Last_Name: "",
  };

  const [activeTab, setActiveTab] = useState("dominance");
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [popActive, setPopActive] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const error = validateForm();
      if (error) {
        return setMessage(error);
      }

      const response = await fetch(
        "https://formsubmit.co/ajax/jitender@digicots.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      if (result) {
        setPopActive(true);
        setFormData(initialForm);
      }
      console.log("Success:", result);
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("❌ Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const imgRef = useRef(null);
  const contactRef = useRef(null);
  const tabRef = useRef([]);
  const tabPRef = useRef(null);
  const formRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from([contactRef.current, tabPRef.current, formRef.current], {
      duration: 1.1,
      opacity: 0,
      scale: 1.2,
      filter: "blur(10px)",
      ease: "power1.inOut",
    });
  }, []);

  const indicatorRef = useRef(null);

  useEffect(() => {
    const activeIndex = ["dominance", "help", "pack"].indexOf(activeTab);
    if (tabRef.current[activeIndex]) {
      const { offsetLeft, offsetWidth } = tabRef.current[activeIndex];
      gsap.to(indicatorRef.current, {
        x: offsetLeft,
        width: offsetWidth,
        duration: 0.1,
        ease: "power1.out",
      });
    }
  }, [activeTab]);

  const validateForm = () => {
    let requiredFields = [];

    if (activeTab === "dominance") {
      requiredFields = [
        "Full_Name",
        "Contact_Number",
        "email",
        "Additional_Info",
      ];
    } else if (activeTab === "help") {
      requiredFields = ["Full_Name", "phone", "email", "message"];
    } else if (activeTab === "pack") {
      requiredFields = ["First_Name", "Last_Name", "phone", "email", "message"];
    }

    for (const field of requiredFields) {
      if (!formData[field] || formData[field].trim() === "") {
        return `❌ Please fill out "${field.replace("_", " ")}"`;
      }
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return "❌ Invalid email address";
    }

    const phone = formData.Contact_Number || formData.phone;
    if (phone && !/^\d{10}$/.test(phone)) {
      return "❌ Phone number must be exactly 10 digits";
    }

    return null;
  };

  return (
    <div className="bg-[#1a1a1a] overflow-hidden min-h-screen flex flex-col-reverse md:flex-row items-center justify-center md:px-6 lg:px-20 py-12">
      <div className="w-full md:w-1/2 flex flex-col items-start">
        <div className="w-full scale-[1.1] max-w-md hidden md:block absolute top-[4%] left-0">
          <video
            className="w-full"
            src="breath.webm"
            autoPlay
            muted
            ref={(videoRef) => {
              if (videoRef) {
                videoRef.currentTime = 0;
                videoRef.play();
                videoRef.addEventListener("timeupdate", () => {
                  if (videoRef.currentTime >= 11) {
                    videoRef.currentTime = 0;
                    videoRef.play();
                  }
                });
              }
            }}
          ></video>
          <div className="w-full h-[10%] absolute bottom-0 bg-gradient-to-t from-[#1a1a1a] to-transparent"></div>
        </div>

        <div
          ref={contactRef}
          className="text-white md:mt-[50vh] grid grid-cols-2 items-center px-8 justify-items-center gap-6 w-full"
        >
          {[
            {
              country: "India",
              address: "B 73, Block B, Sector 57, Noida, Uttar Pradesh 201301",
              phone: "09871766739",
              addLink: "https://maps.app.goo.gl/aq6xbXispxRuJzqU8",
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
                  <a
                    href={item.addLink}
                    target="_blank"
                    className="text-white font-inter"
                  >
                    {item.address}
                  </a>
                </p>
                <p>
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

      <div className="w-full md:w-1/2 bg-[#1a1a1a] px-8 py-8">
        <div className="w-full md:hidden relative">
          <video
            className="w-full"
            src="./breathing/breath.webm"
            autoPlay
            loop
            muted
          ></video>
          <div className="w-full h-[10%] absolute bottom-0 bg-gradient-to-t from-[#1a1a1a] to-transparent"></div>
          <div className="w-[10%] h-full absolute top-0 left-0 bg-gradient-to-r from-[#1a1a1a] to-transparent"></div>
        </div>

        <h1 className="text-white overflow-hidden text-center md:text-start text-4xl sm:text-7xl md:text-8xl font-bold audiowide-regular">
          <h1>Let's Talk</h1>
        </h1>

        <div
          ref={tabPRef}
          className="relative flex justify-center md:justify-between mt-4 bg-[#FFFFFF33] rounded-md p-3 text-sm sm:text-xl"
        >
          <div
            ref={indicatorRef}
            className="absolute left-0 xl:h-[66%] h-[calc(100%_-_24px)] bg-[#ED510C] rounded-md transition-all duration-300"
          ></div>

          {["dominance", "help", "pack"].map((tab, index) => (
            <button
              key={tab}
              ref={(el) => (tabRef.current[index] = el)}
              onClick={() => setActiveTab(tab)}
              className={`relative px-4 py-2 cursor-pointer rounded-md font-semibold text-white z-10`}
            >
              {tab === "dominance"
                ? "Let’s Talk Dominance!"
                : tab === "help"
                ? "Howl for Help"
                : "Join the Pack!"}
            </button>
          ))}
        </div>

        <form
          className="mt-6 space-y-4 raleway"
          onSubmit={handleSubmit}
          action="https://formsubmit.co/Dominance@digicots.com"
          method="POST"
        >
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />
          {activeTab === "dominance" && (
            <>
              <input
                name="Full_Name"
                type="text"
                placeholder="Full Name"
                value={formData.Full_Name}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, Full_Name: e.target.value }))
                }
                className="w-full bg-[#3A3A3A] font-inter text-white p-3 rounded-md focus:outline-none raleway"
              />
              <div className="flex space-x-2">
                <input
                  name="Contact_Number"
                  type="text"
                  placeholder="Contact Number"
                  value={formData.Contact_Number}
                  onChange={(e) =>
                    setFormData((f) => ({
                      ...f,
                      Contact_Number: e.target.value,
                    }))
                  }
                  className="flex-1 bg-[#3A3A3A] font-inter text-white p-3 rounded-md focus:outline-none raleway"
                />
              </div>
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, email: e.target.value }))
                }
                className="w-full bg-[#3A3A3A] font-inter text-white p-3 rounded-md focus:outline-none raleway"
              />
              <select
                className="w-full bg-[#3A3A3A] text-white p-3 rounded-md focus:outline-none pe-2.5 raleway"
                name="Purpose"
                value={formData.Purpose}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, Purpose: e.target.value }))
                }
              >
                <option value="Purpose">Purpose</option>
                <option value="Business Inquiry">Business Inquiry</option>
                <option value="Collaboration">Collaboration</option>
              </select>
              <textarea
                name="Additional_Info"
                placeholder="Additional Information"
                rows="5"
                value={formData.Additional_Info}
                onChange={(e) =>
                  setFormData((f) => ({
                    ...f,
                    Additional_Info: e.target.value,
                  }))
                }
                className="w-full bg-[#3A3A3A] font-inter text-white p-3 rounded-md focus:outline-none raleway"
              />
            </>
          )}

          {activeTab === "help" && (
            <>
              <input
                name="Full_Name"
                type="text"
                placeholder="Full Name"
                value={formData.Full_Name}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, Full_Name: e.target.value }))
                }
                className="w-full bg-[#3A3A3A] font-inter text-white p-3 rounded-md focus:outline-none raleway"
              />
              <input
                name="phone"
                type="text"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, phone: e.target.value }))
                }
                className="w-full bg-[#3A3A3A] font-inter text-white p-3 rounded-md focus:outline-none raleway"
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, email: e.target.value }))
                }
                className="w-full bg-[#3A3A3A] font-inter text-white p-3 rounded-md focus:outline-none raleway"
              />
              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, message: e.target.value }))
                }
                className="w-full bg-[#3A3A3A] font-inter text-white p-3 rounded-md focus:outline-none raleway"
              />
            </>
          )}

          {activeTab === "pack" && (
            <>
              <input
                name="First_Name"
                type="text"
                placeholder="First Name"
                value={formData.First_Name}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, First_Name: e.target.value }))
                }
                className="w-full bg-[#3A3A3A] font-inter text-white p-3 rounded-md focus:outline-none raleway"
              />
              <input
                name="Last_Name"
                type="text"
                placeholder="Last Name"
                value={formData.Last_Name}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, Last_Name: e.target.value }))
                }
                className="w-full bg-[#3A3A3A] font-inter text-white p-3 rounded-md focus:outline-none raleway"
              />
              <input
                name="phone"
                type="text"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, phone: e.target.value }))
                }
                className="w-full bg-[#3A3A3A] font-inter text-white p-3 rounded-md focus:outline-none raleway"
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, email: e.target.value }))
                }
                className="w-full bg-[#3A3A3A] font-inter text-white p-3 rounded-md focus:outline-none raleway"
              />
              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, message: e.target.value }))
                }
                className="w-full bg-[#3A3A3A] font-inter text-white p-3 rounded-md focus:outline-none raleway"
              />
            </>
          )}

          <button
            type="submit"
            className="w-full p-4 font-bold rounded-[14px] relative items-center justify-center overflow-hidden bg-[#ED510C] text-white shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:rounded-[14px] before:bg-black before:duration-500 before:ease-out hover:before:h-56 hover:before:w-full hidden lg:flex cursor-pointer raleway"
            disabled={loading}
          >
            <div className="relative z-[11]">
              {loading
                ? "Submitting..."
                : activeTab === "dominance"
                ? "Let’s talk about dominance"
                : activeTab === "help"
                ? "Request Help"
                : "Join the Pack"}
            </div>
          </button>
        </form>

        {message && <p className="mt-4 text-white raleway">{message}</p>}
      </div>

      <ThankyouPopUp
        popActive={popActive}
        onClose={() => setPopActive(false)}
      />
    </div>
  );
};

export default ContactForm;