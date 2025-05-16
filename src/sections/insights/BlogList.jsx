import React, { useEffect } from 'react'
import BlogSection from '../../components/BlogSection'
import BlogHeading from '../../components/BlogHeading'
import BlogModal from '../../components/BlogModal'

function BlogList({setComponentLoaded}) {

  useEffect(()=>{
    setComponentLoaded((prevState) => ({
      ...prevState,
      blogList: true,
    }))
  },[setComponentLoaded])

  return (
    <div className='container-xxl'>
      <div className="bg-[#191919] rounded-2xl">
      <BlogHeading heading={'Changes in the Marketing Landscape'} link={'/see-all'} linkText={'See All'} />
      <BlogSection />
      </div>
      
    </div>
  )
}

export default BlogList