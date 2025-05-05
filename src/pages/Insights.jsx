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

// Wrap Insights with withLoading and memoize
// export default withLoading(React.memo(Insights), loadInsightsResources);
export default Insights;