import React from "react";
import HeadingWithLink from "../../components/HeadingWithLink";
import WolfCard from "../../components/WolfCards";

function HowWeWork() {
  const cardList = [
    {
      id: 1,
      step: "STEP 1",
      heading: "Hunt the Weak (Identify & Attack)",
      pera: "We identify weak points and strike with precision.",
      list: [
        "Analyze competition weaknesses.",
        "Target the most vulnerable spots.",
        "Strike with a tailored strategy."
      ],
      quoat: "Only the strongest survive.",
      bgColor: "bg-gray-900",
      textColor: "text-white",
      img: "/wolf-face.png",
    },
    {
      id: 2,
      step: "STEP 2",
      heading: "Mark the Territory (Establish & Expand)",
      pera: "We solidify our presence and dominate the market.",
      list: [
        "Build a strong brand foundation.",
        "Expand into new digital landscapes.",
        "Dominate through consistency."
      ],
      quoat: "Claim what’s yours and make it unshakable.",
      bgColor: "bg-gray-700",
      textColor: "text-white",
      img: "/wolf-face.png",
    },
    {
      id: 3,
      step: "STEP 3",
      heading: "Lead the Pack (Innovate & Inspire)",
      pera: "We don’t follow trends, we create them.",
      list: [
        "Innovate with cutting-edge strategies.",
        "Set the industry standard.",
        "Inspire others to follow your lead."
      ],
      quoat: "A true leader runs with the pack but leads from the front.",
      bgColor: "bg-orange-500",
      textColor: "text-white",
      img: "/wolf-face.png",
    },
    {
      id: 4,
      step: "STEP 4",
      heading: "Guard the Territory (Optimize & Dominate)",
      pera: "Paranoid. Protective. Ferocious. Always keeping an eye for sudden changes and threats",
      list: [
        "We track each metric, knowing exactly when to strike again.",
        "We strike out weak spots and double down on our maniac side.",
        "We ensure your brand remains at the peak."
      ],
      quoat: "Survival is only the beginning. Domination is the goal.",
      bgColor: "bg-orange-700",
      textColor: "text-white",
      img: "/wolf-face.png",
    }
  ];

  return (
    <section className="how-we-work py-10">
      <div className="container mx-auto px-4">
        {/* Heading Section */}
        <HeadingWithLink head="HOW WE WORK?!" link="/contact" linkh="Contact Us" />

        {/* Grid Layout for Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {cardList.map((card) => (
            // <WolfCard key={card.id} {...card} />
            // <WolfCard  />
            <WolfCard key={card.id} {...card}/>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowWeWork;
