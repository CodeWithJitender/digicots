import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import TextAnimation1 from "../../animation/text/TextAnimation1";

const ContactForm = () => {
  const [activeTab, setActiveTab] = useState("dominance");
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const imgRef = useRef(null);
  const contactRef = useRef(null);
  const tabRef = useRef([]);
  const tabPRef = useRef(null);
  const formRef = useRef(null);
  const indicatorRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(imgRef.current, { duration: 1, opacity: 0, x: -200, ease: "power4.inOut" })
      .from(contactRef.current, { duration: 1, opacity: 0, y: 200, ease: "power4.inOut" })
      .from(tabPRef.current, { duration: 1, opacity: 0, x: 200, ease: "power4.inOut" })
      .from(formRef.current, { duration: 1, opacity: 0, x: 200, ease: "power4.inOut" });
  }, []);

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
  }, [activeTab]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    let requiredFields = [];

    if (activeTab === "dominance") {
      requiredFields = ["Full_Name", "Contact_Number", "Email"];
    } else if (activeTab === "help") {
      requiredFields = ["Full_Name", "Phone", "Email"];
    } else if (activeTab === "pack") {
      requiredFields = ["First_Name", "Last_Name", "Phone", "Email"];
    }

    for (const field of requiredFields) {
      if (!formData[field] || formData[field].trim() === "") {
        return `❌ Please fill out "${field.replace("_", " ")}"`;
      }
    }

    if (formData.Email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.Email)) {
      return "❌ Invalid email address";
    }

    const phone = formData.Contact_Number || formData.Phone;
    if (phone && !/^\d{10}$/.test(phone)) {
      return "❌ Phone number must be exactly 10 digits";
    }

    return null;
  };

  const handleSubmit = (e) => {
    const error = validateForm();
    if (error) {
      e.preventDefault();
      setMessage(error);
    } else {
      setMessage("✅ Submitting...");
    }
  };

  return (
    <div className="bg-[#1a1a1a] min-h-screen flex flex-col-reverse md:flex-row items-center justify-center md:px-6 lg:px-20 py-12 overflow-hidden">
      {/* Left side */}
      <div className="w-full md:w-1/2 flex flex-col items-start">
        <img ref={imgRef} src="lets-talk.png" alt="Fox" className="w-full max-w-md hidden md:block" />
        <div ref={contactRef} className="mt-8 text-white grid grid-cols-2 gap-6 w-full">
          {[
            { country: "India", address: "14, Near Mahavir Pharmacy, Diu", phone: "+91 9876 812 3791" },
            { country: "USA", address: "47 W 13th St, New York", phone: "(+1) 230-528-5548" },
            { country: "Singapore", address: "8 Temasek Boulevard", phone: "(+65) 528-5548" },
            { country: "Canada", address: "201 James St N, Hamilton", phone: "(905) 528-5548" },
          ].map((item, idx) => (
            <div key={idx} className="max-w-[200px]">
              <h3 className="text-2xl mb-3 font-black font-inter">{item.country}</h3>
              <div className="flex flex-col space-y-1">
                <a href="#" className="text-white font-inter">{item.address}</a>
                <a href={`tel:${item.phone}`} className="text-white font-inter">{item.phone}</a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right side */}
      <div className="w-full md:w-1/2 bg-[#1a1a1a] px-8 py-8">
        <img src="lets-talk.png" alt="Fox" className="w-full max-w-md block mb-4 md:hidden" />
        <h1 className="text-white text-center md:text-start text-4xl sm:text-7xl md:text-8xl font-bold">
          <TextAnimation1>Let's Talk</TextAnimation1>
        </h1>

        {/* Tabs */}
        <div ref={tabPRef} className="relative flex justify-center md:justify-between mt-4 bg-[#FFFFFF33] rounded-md p-3">
          <div ref={indicatorRef} className="absolute left-0 h-[66%] bg-orange-500 rounded-md transition-all duration-300"></div>
          {["dominance", "help", "pack"].map((tab, idx) => (
            <button
              key={tab}
              ref={(el) => (tabRef.current[idx] = el)}
              onClick={() => setActiveTab(tab)}
              className={`relative px-4 py-2 z-10 text-white font-semibold`}
            >
              {tab === "dominance" ? "Let’s Talk Dominance!" : tab === "help" ? "Howl for Help" : "Join the Pack!"}
            </button>
          ))}
        </div>

        {/* Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          action="https://formsubmit.co/jitender@digicots.com"
          className="mt-6 space-y-4"
          method="POST"
        >
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_next" value="http://localhost:5173/thankyou" />

          {/* Dominance Tab */}
          {activeTab === "dominance" && (
            <>
              <input name="Full_Name" placeholder="Full Name" onChange={handleChange} className="w-full bg-[#3A3A3A] text-white p-3 rounded-md" />
              <input name="Contact_Number" placeholder="Contact Number" onChange={handleChange} className="w-full bg-[#3A3A3A] text-white p-3 rounded-md" />
              <input name="Email" type="email" placeholder="Email" onChange={handleChange} className="w-full bg-[#3A3A3A] text-white p-3 rounded-md" />
              <select name="Purpose" onChange={handleChange} className="w-full bg-[#3A3A3A] text-white p-3 rounded-md">
                <option>Purpose</option><option>Business Inquiry</option><option>Collaboration</option>
              </select>
              <textarea name="Additional_Info" placeholder="Additional Info" rows="4" onChange={handleChange} className="w-full bg-[#3A3A3A] text-white p-3 rounded-md" />
            </>
          )}

          {/* Help Tab */}
          {activeTab === "help" && (
            <>
              <input name="Full_Name" placeholder="Full Name" onChange={handleChange} className="w-full bg-[#3A3A3A] text-white p-3 rounded-md" />
              <input name="Phone" placeholder="Phone" onChange={handleChange} className="w-full bg-[#3A3A3A] text-white p-3 rounded-md" />
              <input name="Email" type="email" placeholder="Email" onChange={handleChange} className="w-full bg-[#3A3A3A] text-white p-3 rounded-md" />
              <textarea name="Message" placeholder="Message" onChange={handleChange} className="w-full bg-[#3A3A3A] text-white p-3 rounded-md" />
            </>
          )}

          {/* Pack Tab */}
          {activeTab === "pack" && (
            <>
              <input name="First_Name" placeholder="First Name" onChange={handleChange} className="w-full bg-[#3A3A3A] text-white p-3 rounded-md" />
              <input name="Last_Name" placeholder="Last Name" onChange={handleChange} className="w-full bg-[#3A3A3A] text-white p-3 rounded-md" />
              <input name="Phone" placeholder="Phone" onChange={handleChange} className="w-full bg-[#3A3A3A] text-white p-3 rounded-md" />
              <input name="Email" type="email" placeholder="Email" onChange={handleChange} className="w-full bg-[#3A3A3A] text-white p-3 rounded-md" />
              <textarea name="Message" placeholder="Message" onChange={handleChange} className="w-full bg-[#3A3A3A] text-white p-3 rounded-md" />
            </>
          )}

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md font-semibold"
            disabled={loading}
          >
            {loading ? "Submitting..." : activeTab === "dominance" ? "Let’s talk about dominance" : activeTab === "help" ? "Request Help" : "Join the Pack"}
          </button>

          {message && <p className="text-sm mt-2 text-white">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
