import React from "react";
import Member from "../../components/Member";

function MeetThePack() {
  const teamMembers = [
    { name: "John Doe", designation: "Developer", image: "Person-1.png" },
    { name: "Jane Doe", designation: "Designer", image: "/Person-2.png" },
    { name: "Mark Smith", designation: "Manager", image: "/Person-3.png", },
    // { name: "Emily Clark", designation: "Marketing", image: "/Person-4.png" },
    // { name: "Michael Lee", designation: "Sales", image: "/Person-6.png" },
    // { name: "Chris Evans", designation: "HR", image: "/Person-5.png" },
    // { name: "Sarah Johnson", designation: "Support", image: "/Person-7.png" }
  ];

  return (
    <section className="meet-the-pack">
      <div className="container-xxl">
        <div className="meet-container grid grid-cols-4 justify-center align-middle items-center  bg-[url('meet-bg.png')] bg-cover bg-no-repeat pt-20">
           {teamMembers.map((member)=>(
            <Member member={member} />
           ))} 
        </div>
      </div>
    </section>
  );
}

export default MeetThePack;
