import React, { useEffect, useState } from "react";

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
          // setIsLoading(false); // Hide loading screen
          onLoadingComplete(); // Callback to fully show homepage
        }, 1000); // Duration of content reveal
      }, 1000); // Duration of scale-up
    }, 2000); // Initial loading time

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <div className=" loading h-screen w-full bg-black fixed z-[9999999] flex items-center justify-center">
      {/* Homepage content with clip-path to reveal from center */}
      <div
        className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
          revealContent ? "clip-path-full" : "clip-path-small"
        }`}
      >
        {children}
      </div>
      {/* PNG image that scales up */}
      {isLoading && (
         <svg
         width="800px"
         height="800px"
         viewBox="0 0 5.8208335 5.8208335"
         xmlns="http://www.w3.org/2000/svg"
       >
         <g transform="translate(0 -291.18)">
           <path
             transform="matrix(.26458 0 0 .26458 0 291.18)"
             d="M11 1v4a6 6 0 1 1 0 12v4h10V1z"
             style={{
               opacity: 1,
               vectorEffect: "none",
               fill: "#373737",
               fillOpacity: 1,
               stroke: "none",
               strokeWidth: 2,
               strokeLinecap: "butt",
               strokeLinejoin: "bevel",
               strokeMiterlimit: 4,
               strokeDasharray: "none",
               strokeDashoffset: 3.2,
               strokeOpacity: 1
             }}
           />
           <path
             d="M2.91 292.502a1.587 1.587 0 0 0-1.587 1.588 1.587 1.587 0 0 0 1.587 1.587z"
             style={{
               opacity: 1,
               vectorEffect: "none",
               fill: "#373737",
               fillOpacity: 1,
               stroke: "none",
               strokeWidth: 0.52916664,
               strokeLinecap: "butt",
               strokeLinejoin: "bevel",
               strokeMiterlimit: 4,
               strokeDasharray: "none",
               strokeDashoffset: 3.2,
               strokeOpacity: 1
             }}
           />
         </g>
       </svg>
      )}
    </div>
  );
};

export default Loading;
