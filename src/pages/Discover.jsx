import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeroDiscover from "../sections/discover/HeroDiscover";
import AllService from "../sections/discover/AllService";
import { getPrevPath } from "../hook/useHistory";
// import { withLoading } from "../components/Loading"; // Adjust path as needed

function Discover() {
  const location = useLocation();

  useEffect(() => {
    const previousRoute = getPrevPath();
    if (previousRoute === "/") {
      // Removed window.location.reload() to prevent resetting LoadingProvider
      // If specific state reset is needed, handle it without a full reload
    }
  }, []);

  return (
    <div className="">
      <HeroDiscover />
      <AllService />
    </div>
  );
}

// Resource Loading for Discover
const loadDiscoverResources = async (reportProgress) => {
  // Simulate loading HeroDiscover resources (181 images)
  const loadHeroDiscoverResources = async () => {
    const frameCount = 181;
    const imageUrls = Array.from({ length: frameCount }, (_, i) =>
      `https://ik.imagekit.io/x5xessyka/digicots/moon_frame/M${i.toString().padStart(3, "0")}.avif`
    );
    let loadedImages = 0;

    const loadImage = (url) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false); // Continue even on error
      });
    };

    const promises = imageUrls.map(async (url) => {
      await loadImage(url);
      loadedImages += 1;
      // Report progress for HeroDiscover (0–50%)
      reportProgress((loadedImages / frameCount) * 50);
    });

    await Promise.all(promises);
  };

  // Placeholder for AllService resources (update based on AllService code)
  const loadAllServiceResources = async () => {
    // Assuming AllService has no resources or lightweight resources
    // Replace with actual resource loading logic if needed
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate instant or lightweight loading (50–100%)
        reportProgress(100);
        resolve(true);
      }, 100); // Minimal delay to ensure smooth progress transition
    });
  };

  // Load HeroDiscover resources (0–50%)
  await loadHeroDiscoverResources();
  // Load AllService resources (50–100%)
  await loadAllServiceResources();
};

// Wrap Discover with withLoading
// export default withLoading(Discover, loadDiscoverResources);
export default Discover;