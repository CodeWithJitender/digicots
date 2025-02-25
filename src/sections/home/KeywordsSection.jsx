import React from "react";

function KeywordsSection() {
  return (
    <div className="bg-white py-4 overflow-hidden">
      <div className="whitespace-nowrap animate-marquee flex items-center gap-6 text-black font-bold text-xl md:text-3xl">
        <span>Creativity</span>
        <span className="text-[#DF782B]">•</span>
        <span>Authenticity</span>
        <span className="text-[#DF782B]">•</span>
        <span>Growth</span>
        <span className="text-[#DF782B]">•</span>
        <span>Emotion</span>
        {/* Duplicate for smooth loop */}
        <span>Creativity</span>
        <span className="text-[#DF782B]">•</span>
        <span>Authenticity</span>
        <span className="text-[#DF782B]">•</span>
        <span>Growth</span>
        <span className="text-[#DF782B]">•</span>
        <span>Emotion</span>
      </div>
    </div>
  );
}

export default KeywordsSection;
