import React from "react";

function Member({ member }) {
  return (
    <div className="member-box relative ">
      <div className="member-img">
        <img src={member.image} alt={member.name} className="w-full transition-[.5s] contrast-50 hover:contrast-100" />
      </div>
      <div className="member-text absolute translate-[-50%] left-[50%] bg-[#DF782B] rounded-2xl p-2 text-center">
      <i className="fas fa-triangle absolute translate-y-[-20px] translate-x-[-50%] text-[#DF782B]"></i>
        <h4 className="text-2xl text-white font-bold">{member.name}</h4>
        <p className="text-sm text-white">({member.designation})</p>
      </div>
    </div>
  );
}

export default Member;
