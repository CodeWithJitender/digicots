import React, { useEffect, useState } from 'react';

const Loading = ({ onLoadingComplete, children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [scaleUp, setScaleUp] = useState(false);
  const [revealContent, setRevealContent] = useState(false);

  useEffect(() => {
    // Simulate loading completion after 3 seconds
    const timer = setTimeout(() => {
      setScaleUp(true); // Start scaling up the image
      setTimeout(() => {
        setRevealContent(true); // Start revealing homepage content
        setTimeout(() => {
          setIsLoading(false); // Hide loading screen
          onLoadingComplete(); // Callback to fully show homepage
        }, 1000); // Duration of content reveal
      }, 1000); // Duration of scale-up
    }, 2000); // Initial loading time

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <div className="h-screen w-full bg-black fixed z-[99999] flex items-center justify-center">
      {/* Homepage content with clip-path to reveal from center */}
      <div
        className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
          revealContent ? 'clip-path-full' : 'clip-path-small'
        }`}
      >
        {children}
      </div>
      {/* PNG image that scales up */}
      {isLoading && (
        <img
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-1000 ease-in-out z-10 ${
            scaleUp ? 'scale-[2] opacity-50' : 'scale-[0.5] opacity-100'
          }`}
          src="./logo.svg"
          alt="Loading"
        />
      )}
    </div>
  );
};

export default Loading;