import React from 'react'
import Hero from './Hero/Hero'
import Trending from './Trending/Trending'

const Home = () => {
  return (
    <div>
      <Hero />
      <Trending />
      <div style={{height : 1200}}></div>
    </div>
  )
}

export default Home