import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import HeroSlider from '../sections/insights/HeroSlider';
import BlogList from '../sections/insights/BlogList';
import TopicList from '../sections/insights/TopicList';
import Loading, { LoadingContext } from '../components/Loading'; // Adjust path as needed
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

  const { loadingContext } = useContext(LoadingContext);
  
    const [componentLoaded, setComponentLoaded] = useState({
      heroSlider: false,
      blogList: false,
      topicList: false,
    });
  
    useEffect(() => {
      if (
        componentLoaded.heroSlider &&
        componentLoaded.blogList &&
        componentLoaded.topicList
      ) {
        setTimeout(() => {
          // All components have loaded
          console.log("All components have loaded");
          loadingContext.setIsLoading(false); // Set loading to false
          console.log(loadingContext);
        }, 500);
      }
      console.log(componentLoaded);
      console.log(loadingContext);
    }, [componentLoaded, loadingContext]);


  return (
    <div className="bg-[#242424]">
      <HeroSlider setComponentLoaded={setComponentLoaded} />
      <BlogList setComponentLoaded={setComponentLoaded} />
      <TopicList setComponentLoaded={setComponentLoaded} />
    </div>
  );
}

// Wrap Insights with withLoading and memoize
// export default withLoading(React.memo(Insights), loadInsightsResources);
export default Insights;