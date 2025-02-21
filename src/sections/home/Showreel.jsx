import React, { useEffect } from "react";
import $ from "jquery";

function Showreel() {
  useEffect(() => {
    $(".reel-text").on("click", function () {
      $(".reel-video video").get(0).play();
      $(".reel-cover").fadeOut();
    });

    $(".reel-video video").on("ended", function () {
      $(".reel-text span:first").text("RE-PLAY");
      $(".reel-cover").fadeIn();
    });

    // Cleanup event listeners on unmount
    return () => {
      $(".reel-text").off("click");
      $(".reel-video video").off("ended");
    };
  }, []);

  return (
    <section className="showreel relative">
      <div style={{ backgroundImage: "url('reel-cover.png')" }} className="reel-cover absolute top-0 left-0 w-full h-full flex justify-center items-center bg-cover bg-center z-10">
        <div style={{ fontSize: "clamp(30px, 5vw, 150px)" }} className="reel-text flex items-center gap-3 font-inter font-bold text-white cursor-pointer">
          <span>PLAY</span>
          <img style={{maxWidth:''}} src="reelplay.png" alt="" />
          <span>REEL</span>
        </div>
      </div>
      <div className="reel-video">
          <video src="showreels.mp4" className="w-full" controls>
          </video>
        </div>
    </section>
  );
}

export default Showreel;
