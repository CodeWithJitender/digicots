import React from 'react'

function MainHeading({heading, pera, cl}) {
  return (
    <div className="">
    <div className={`main-heading max-w-3xl m-auto`}>
        <h2 className='text-5xl text-white font-bold mb-5'>{heading ? heading : " "}</h2>
        <p className='text-[14px] text-white font-normal mb-5'>{pera ? pera : " "}</p>
    </div>
    </div>
  )
}

export default MainHeading