import React from 'react'
import MainHeading from './MainHeading'
import { Link } from 'react-router-dom'


function HeadingWithLink({head, per, linkh, link}) {
  return (
    <div className='flex items-center justify-center md:justify-between'>
        <div className="left"><MainHeading heading={head} pera={per} cl={'text-center md:text-start'} tColor={'text-black'} /></div>
        <div className="right hidden lg:block"><Link to={link} className='flex text-4xl font-semibold items-center'>{linkh} <i className="fal fa-arrow-up rotate-45 text-[#DF782B] ml-3"></i></Link></div>
    </div>
  )
}

export default HeadingWithLink