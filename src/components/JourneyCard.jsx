import React from "react";

function JourneyCard({ head, pera, bg, img, status, onMouseMove,ref }) {
  return (
    <div ref={ref} className={`jou-card ${status}  ${status ==="active" ? "z-2" :""} relative`} onMouseMove={onMouseMove}>
      <div className={status === "active" ? "jou-card-inner relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" : ""}>
        <div className="jou-img">
          <img src={status === "active" ? img : bg} alt="" />
        </div>
        <div className={status === "active" ? "block absolute bottom-2.5 bg-white rounded-2xl mx-2.5 p-3" : "hidden"}>
          <h5 className="font-bold mb-3 font-inter">{head}</h5>
          <p>{pera}</p>
        </div>
      </div>
    </div>
  );
}

export default JourneyCard;
