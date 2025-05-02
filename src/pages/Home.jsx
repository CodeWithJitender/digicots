import React, { Suspense, useEffect, useState } from "react";
import Hero from "../sections/home/Hero";
import homeHero from "../assets/home-hero.png";
import HowItWorks from "../sections/home/HowItWorks";
import Solutions from "../sections/home/Solutions";
import OurWork from "../sections/home/OurWork";
import Insights from "../sections/home/Insights";
import OurJourney from "../sections/home/OurJourney";
import Header from "../components/Header";
import Faq from "../sections/home/Faq";
import KeywordsSection from "../sections/home/KeywordsSection";
import Testimonials from "../sections/home/Testimonials";
import ReelCanvas from "../animation/canvas/ReelCanvas";
import HomeHeroCanvas from "../animation/canvas/HomeHeroCanvas";
import Loading from "../components/Loading";
import ContentSlider from "../sections/home/ContentSlider";
import { withLoading } from "../components/Loading"; // Adjust path as needed

function Home() {
  useEffect(() => {
    // Reset scroll position to top on mount
    window.scrollTo(0, 0);
    
    // Debug: Log scroll position after mount
    console.log("Home mounted, scroll position:", window.scrollY);

    // Optional scroll or other side-effect cleanups
    return () => {
      // Clean up all ScrollTriggers on unmount (failsafe)
      if (window?.ScrollTrigger?.getAll) {
        const triggers = window.ScrollTrigger.getAll();
        console.log("Cleaning up ScrollTriggers:", triggers.length);
        triggers.forEach((trigger) => trigger.kill());
      }
    };
  }, []);

  return (
    <div>
      <div className="main contain-paint">
        <Suspense fallback={<Loading />}>
          <HomeHeroCanvas />
        </Suspense>
        <HowItWorks />
        <ContentSlider />
        <OurWork />
        <Insights />
        <OurJourney />
        <Testimonials />
        <Faq />
      </div>
    </div>
  );
}

// Resource Loading for Home
const loadHomeResources = async (reportProgress) => {
  // Load homeHero image
  const loadHeroImage = async () => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = homeHero;
      img.onload = () => {
        // Report 50% progress after loading homeHero
        reportProgress(50);
        resolve(true);
      };
      img.onerror = (error) => {
        // Log error for debugging
        console.warn("Failed to load homeHero image:", error);
        // Continue with 50% progress
        reportProgress(50);
        resolve(false);
      };
    });
  };

  // Placeholder for other section resources (HowItWorks, ContentSlider, etc.)
  const loadOtherResources = async () => {
    // Assuming other sections have lightweight or no resources
    // Replace with actual resource loading logic if needed
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate instant or lightweight loading (50–100%)
        reportProgress(100);
        resolve(true);
      }, 100); // Minimal delay for smooth progress transition
    });
  };

  try {
    // Load homeHero image (0–50%)
    await loadHeroImage();
    // Load other resources (50–100%)
    await loadOtherResources();
  } catch (error) {
    // Log any unexpected errors during resource loading
    console.error("Error in loadHomeResources:", error);
    // Ensure progress reaches 100% even on error
    reportProgress(100);
  }
};

// Wrap Home with withLoading 
export default withLoading(Home, loadHomeResources);