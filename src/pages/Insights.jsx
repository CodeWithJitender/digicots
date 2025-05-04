import React, { useEffect } from 'react';
import Header from '../components/Header';
import HeroSlider from '../sections/insights/HeroSlider';
import BlogList from '../sections/insights/BlogList';
import TopicList from '../sections/insights/TopicList';
import Loading from '../components/Loading'; // Adjust path as needed
import { withLoading } from '../components/Loading'; // Adjust path as needed

function Insights() {
  useEffect(() => {
    // Reset scroll position to top on mount
    window.scrollTo(0, 0);

    // Debug: Log scroll position and component mount
    console.log('Insights mounted, scroll position:', window.scrollY);
    console.log('Current route:', window.location.pathname);

    // Debug: Monitor navigation events
    const handlePopState = () => {
      console.log('Navigation occurred to:', window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);

    // Cleanup on unmount
    return () => {
      console.log('Insights unmounting');
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <div className="bg-[#242424]">
      <HeroSlider />
      <BlogList />
      <TopicList />
    </div>
  );
}

// Resource Loading for Insights
const loadInsightsResources = async (reportProgress) => {
  // Placeholder for HeroSlider images
  const loadSliderResources = async () => {
    return new Promise((resolve) => {
      // Simulate loading of images for HeroSlider (0–50%)
      // Replace with actual image loading logic if HeroSlider uses specific assets
      const img = new Image();
      img.src = '/placeholder-slider-image.png'; // Replace with actual image path
      img.onload = () => {
        console.log('Slider image loaded');
        reportProgress(50);
        resolve(true);
      };
      img.onerror = (error) => {
        console.warn('Failed to load slider image:', error);
        reportProgress(50);
        resolve(false);
      };
    });
  };

  // Placeholder for BlogList and TopicList resources
  const loadOtherResources = async () => {
    return new Promise((resolve) => {
      // Simulate loading of assets for BlogList and TopicList (50–100%)
      // Replace with actual resource loading logic if needed (e.g., blog thumbnails)
      setTimeout(() => {
        console.log('BlogList and TopicList resources loaded');
        reportProgress(100);
        resolve(true);
      }, 100); // Minimal delay for smooth progress transition
    });
  };

  try {
    // Debug: Log start of resource loading
    console.log('Starting loadInsightsResources');
    // Load slider resources (0–50%)
    await loadSliderResources();
    // Load other resources (50–100%)
    await loadOtherResources();
    console.log('loadInsightsResources completed');
  } catch (error) {
    // Log any unexpected errors during resource loading
    console.error('Error in loadInsightsResources:', error);
    // Ensure progress reaches 100% even on error
    reportProgress(100);
  }
};

// Wrap Insights with withLoading and memoize
export default withLoading(React.memo(Insights), loadInsightsResources);