import React, { useEffect } from 'react';
import Header from '../components/Header';
import HeroSlider from '../sections/insights/HeroSlider';
import BlogList from '../sections/insights/BlogList';
import TopicList from '../sections/insights/TopicList';
import Loading from '../components/Loading'; // Adjust path as needed
// import { withLoading } from '../components/Loading'; // Adjust path as needed

function Insights() {
  useEffect(() => {
    window.scrollTo(0, 0);
    console.log('Insights mounted, scroll position:', window.scrollY);
    console.log('Current route:', window.location.pathname);

    return () => {
      console.log('Insights unmounting');
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
  const loadSliderResources = async () => {
    return new Promise((resolve) => {
      console.log('Simulating slider resource loading...');
      reportProgress(50);
      resolve(true);
    });
  };

  const loadOtherResources = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Simulating BlogList and TopicList resource loading...');
        reportProgress(100);
        resolve(true);
      }, 500);
    });
  };

  try {
    console.log('Starting loadInsightsResources');
    await loadSliderResources();
    await loadOtherResources();
    console.log('loadInsightsResources completed');
  } catch (error) {
    console.error('Error in loadInsightsResources:', error);
    reportProgress(100);
  }
};

// Wrap Insights with withLoading and memoize
// export default withLoading(React.memo(Insights), loadInsightsResources);
export default Insights;