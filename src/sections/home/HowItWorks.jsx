import React from 'react';
import MainHeading from '../../components/MainHeading';

function HowItWorks() {
  const data = [
    {
      h1: 'STEP 1',
      h2: 'Smell the Wind',
      p: 'Your vision becomes our obsession.',
      img: 'wolf-face.png',
      h_color: '#2A2A2A',
      bg_Color: '#F3A265'
    },
    {
      h1: 'STEP 2',
      h2: 'Sharpen the Claws',
      p: 'Our instinct is your advantage.',
      img: 'wolf-face.png',
      h_color: '#F3A265',
      bg_Color: '#2A2A2A'
    },
    {
      h1: 'STEP 3',
      h2: 'Set the Pack in Motion',
      p: 'This isn’t execution. This is a movement.',
      img: 'wolf-face.png',
      h_color: '#F3A265',
      bg_Color: '#515151'
    },
    {
      h1: 'STEP 4',
      h2: 'Guard the Territory',
      p: 'Survival is only the beginning. Domination is the goal.',
      img: 'wolf-face.png',
      h_color: '#2A2A2A',
      bg_Color: '#F3A265'
    }
  ];

  return (
    <section className="how-it-works" style={{ backgroundImage: "url('how-it-works.png')" }}>
      <div className="container-xxl">
      <MainHeading heading="HOW IT WORKS"  pera="We specialize in personalized and conversational marketing, crafting tailored experiences for every business." cl={'text-center'} tColor={'text-white'} />
      
      <div className="wolf-card-container grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5 mt-20">
        {data.map((dataChild, index) => (
          <div className="wolf-card p-4 rounded-2xl shadow-lg border-8 border-[#FFFFFF4D]" style={{ background: dataChild.bg_Color }} key={index}>
            <div className="wolf-img mb-4">
              <img src={dataChild.img} alt="Wolf Icon" className=" mx-auto w-full" />
            </div>
            <div className="wolf-text grid gap-1">
              <h6 className="font-bold" style={{ color: dataChild.h_color,fontSize: "clamp(8px, 20vw, 11px)" }}>{dataChild.h1}</h6>
              <h4 className="font-semibold text-white" style={{ fontSize: "clamp(16px, 20vw, 24px)" }}>{dataChild.h2}</h4>
              <p className=" text-[#EAEAEA]" style={{ fontSize: "clamp(10px, 20vw, 14px)" }}>{dataChild.p}</p>
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}

export default HowItWorks;
