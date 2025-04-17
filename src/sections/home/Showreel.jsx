import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

function Showreel({ opacity }) {
  const reelCoverRef = useRef(null);
  const reelVideoRef = useRef(null);
  const reelTextRef = useRef(null);
  const videoElementRef = useRef(null);
  const replayRef = useRef(null);
  const closeButtonRef = useRef(null); // Ref for close button

  useEffect(() => {
    const handleClick = () => {
      if (videoElementRef.current) {
        videoElementRef.current.play();
      }

      gsap.to([reelCoverRef.current, replayRef.current], {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          reelCoverRef.current.style.display = "none";
          replayRef.current.style.display = "none";
        },
      });

      gsap.to(reelVideoRef.current, {
        opacity: 1,
        duration: 0.5,
        onStart: () => {
          reelVideoRef.current.style.display = "block";
        },
      });
    };

    const handleReplayClick = () => {
      if (videoElementRef.current) {
        videoElementRef.current.currentTime = 0;
        videoElementRef.current.play();
      }

      gsap.to(replayRef.current, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          replayRef.current.style.display = "none";
        },
      });

      gsap.to([reelVideoRef.current, videoElementRef.current], {
        opacity: 1,
        duration: 0.5,
        onStart: () => {
          reelVideoRef.current.style.display = "block";
          videoElementRef.current.style.display = "block";
        },
      });
    };

    const handleVideoEnd = () => {
      gsap.to(videoElementRef.current, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          videoElementRef.current.style.display = "none";
        },
      });

      gsap.to(replayRef.current, {
        opacity: 1,
        duration: 0.5,
        onStart: () => {
          replayRef.current.style.display = "flex";
        },
      });
    };

    const handleCloseClick = () => {
      if (videoElementRef.current) {
        videoElementRef.current.pause();
        videoElementRef.current.currentTime = 0; // Reset video
      }

      // Fade out video and replay
      gsap.to([reelVideoRef.current, replayRef.current], {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          reelVideoRef.current.style.display = "none";
          replayRef.current.style.display = "none";
        },
      });

      // Fade in reel-cover
      gsap.to(reelCoverRef.current, {
        opacity: 1,
        duration: 0.5,
        onStart: () => {
          reelCoverRef.current.style.display = "flex";
        },
      });
    };

    const textElement = reelTextRef.current;
    const videoElement = videoElementRef.current;
    const replayElement = replayRef.current;
    const closeElement = closeButtonRef.current;

    if (textElement) {
      textElement.addEventListener("click", handleClick);
    }
    if (videoElement) {
      videoElement.addEventListener("ended", handleVideoEnd);
    }
    if (replayElement) {
      replayElement.addEventListener("click", handleReplayClick);
    }
    if (closeElement) {
      closeElement.addEventListener("click", handleCloseClick);
    }

    if (opacity === 1) {
      gsap.set(reelCoverRef.current, { opacity: 1, display: "flex" });
      gsap.set(reelVideoRef.current, { opacity: 0, display: "none" });
      gsap.set(replayRef.current, { opacity: 0, display: "none" });
    } else {
      gsap.set(reelCoverRef.current, { opacity: 0, display: "none" });
      gsap.set(reelVideoRef.current, { opacity: 1, display: "block" });
      gsap.set(replayRef.current, { opacity: 0, display: "none" });
    }

    return () => {
      if (textElement) {
        textElement.removeEventListener("click", handleClick);
      }
      if (videoElement) {
        videoElement.removeEventListener("ended", handleVideoEnd);
      }
      if (replayElement) {
        replayElement.removeEventListener("click", handleReplayClick);
      }
      if (closeElement) {
        closeElement.removeEventListener("click", handleCloseClick);
      }
    };
  }, [opacity]);

  return (
    <section
      className="showreel absolute left-0 top-0 h-full w-full"
      style={{ opacity, display: opacity === 1 ? "initial" : "none" }}
    >
      <div
        ref={reelCoverRef}
        style={{ background: "transparent" }}
        className="reel-cover absolute top-0 left-0 w-full h-full flex justify-center items-center bg-cover bg-center z-10"
      >
        <div
          ref={reelTextRef}
          style={{ fontSize: "clamp(30px, 5vw, 150px)" }}
          className="reel-text flex items-center gap-3 font-inter font-bold text-white cursor-pointer"
        >
          <span>PLAY</span>
          <img src="reelplay.png" alt="" />
          <span>REEL</span>
        </div>
      </div>
      <div
        ref={reelVideoRef}
        className="reel-video opacity-0 hidden h-full w-full relative z-[2]"
      >
        <video
          src="showreels.mp4"
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
        />
        <div className="h-full w-full backdrop-blur-2xl absolute top-0 bg-zinc-800/[.1]" />
        <video
          ref={videoElementRef}
          src="showreels.mp4"
          className="w-full h-full object-cover absolute top-0"
          controls
        />
        <button
          ref={closeButtonRef}
          className="absolute top-20 right-20 text-white text-2xl font-bold bg-zinc-800/[.5] rounded-full w-10 h-10 flex items-center justify-center cursor-pointer z-20"
        >
          &times;
        </button>
      </div>
      <div
        ref={replayRef}
        style={{ background: "transparent", opacity: 0, display: "none" }}
        className="replay absolute top-0 left-0 w-full h-full flex justify-center items-center bg-cover bg-center z-10"
      >
        <div
          style={{ fontSize: "clamp(30px, 5vw, 150px)" }}
          className="replay-text flex items-center gap-3 font-inter font-bold text-white cursor-pointer"
        >
          <span>REPLAY</span>
          <img src="https://ik.imagekit.io/8mbzq2hdl/digicots/reelplay.png?updatedAt=1744631790579" alt="" />
          <span>REEL</span>
        </div>
      </div>
    </section>
  );
}

export default Showreel;
