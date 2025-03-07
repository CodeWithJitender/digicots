import React from 'react'
import Header from '../components/Header'
import HeroSlider from '../sections/insights/HeroSlider'
import BlogList from '../sections/insights/BlogList'
import TopicList from '../sections/insights/TopicList'

function Insights() {
  return (
    <div className='bg-[#242424]'>
      <Header/>
      <HeroSlider/>
      <BlogList/>
      <TopicList/>
    </div>
  )
}

export default Insights