import React from 'react'
import BlogSection from '../../components/BlogSection'
import BlogHeading from '../../components/BlogHeading'
import TopicSection from '../../components/TopicSection'

function TopicList({setComponentLoaded}) {
  return (
    <div className='container-xxl'>
            <BlogHeading heading={'Advancements in A.I. & Tech'} size={''} link={'/see-all'} linkText={'See All'} />
            <TopicSection setComponentLoaded={setComponentLoaded} />
    </div>
  )
}

export default TopicList