import React from 'react'
import Hero from './Hero/Hero'
import Trending from './Trending/Trending'
import Popular from './Popular/Popular'

const Home = () => {
  return (
    <div>
      <Hero />
      <Trending />
      <Popular />
      <div style={{height : 1200}}></div>
    </div>
  )
}

export default Home