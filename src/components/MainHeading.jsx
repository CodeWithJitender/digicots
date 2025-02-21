import React from 'react'

function MainHeading({heading, pera, cl, tColor}) {
  return (
    <div className="">
    <div className={`main-heading max-w-3xl m-auto ${cl}`}>
        <h2 className={`${tColor} font-bold font-inter mb-4`} style={{fontSize:"clamp(20px, 20vw, 48px)"}}>{heading ? heading : " "}</h2>
        <p className={`text-[14px] ${tColor} font-normal font-inter`}>{pera ? pera : " "}</p>
    </div>
    </div>
  )
}

export default MainHeading