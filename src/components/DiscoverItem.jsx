import React from 'react'
import { Link } from 'react-router-dom'

function DiscoverItem({title, pera, icon, link}) {
  return (
    <div className='discover-item  hover:bg-[#52525233] rounded-3xl transition'>
        <Link to={link} className='flex items-center gap-3 p-5'>
        <div className="discover-icon max-w-20"><img src={icon} className='w-full' alt="" /></div>
        <div className="discover-text">
            <h4 className='font-bold text-white text-2xl font-inter'>{title}</h4>
            <p className='font-normal text-white text-[14px] font-inter'>{pera}</p>
        </div>
        </Link>
    </div>
  )
}

export default DiscoverItem