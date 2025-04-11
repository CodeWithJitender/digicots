import React, {useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom'

function DiscoverItem({title, pera, icon, link}) {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
  return (
    <div className='discover-item  hover:bg-[#52525233] rounded-3xl transition'>
        <Link to={`/discover#${link}`} className='flex items-center gap-3 p-3 md:py-5'>
        <div className="discover-icon max-w-30"><img src={icon} className='w-full' alt="" /></div>
        <div className="discover-text">
            <h4 className='font-bold text-white text-[20px] sm:text-2xl font-inter'>{title}</h4>
            <p className='font-normal text-white text-[14px] font-inter '>{pera}</p>
        </div>
        </Link>
    </div>
  )
}

export default DiscoverItem