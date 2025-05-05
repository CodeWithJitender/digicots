import React, { useEffect } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import Hero from "../sections/about/Hero";
import HowWeWork from "../sections/about/HowWeWork";
import WhyChooseUs from "../sections/about/WhyChooseUs";
import OurVision from "../sections/about/OurVision";
import MeetThePack from "../sections/about/MeetThePack";
// import Loading from "../components/Loading";
// import { withLoading } from "../components/Loading"; // Adjust path as needed

function About() {
  const location = useLocation(); // Get current location object

  useEffect(() => {
    // Reset scroll position to top on mount
    window.scrollTo(0, 0);

    // Debug: Log scroll position and component mount
    console.log("About mounted, scroll position:", window.scrollY);
    console.log("Current route:", window.location.pathname);
    console.log("Location key:", location.key);

    // Debug: Monitor navigation events
    const handlePopState = () => {
      console.log("Popstate event, navigated to:", window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);

    // Cleanup on unmount
    return () => {
      console.log("About unmounting");
      window.removeEventListener("popstate", handlePopState);
    };
  }, []); // Empty dependency array to run only on mount/unmount

  return (
    <>
      <div> {/* Removed key={location.key} to prevent unexpected unmounts */}
        <Hero />
        {/* <MeetThePack /> */}
        <HowWeWork />
        <WhyChooseUs />
        <OurVision />
      </div>
    </>
  );
}

export default About;