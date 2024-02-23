import React from 'react'
import Hero from './Hero/Hero'
import Trending from './Trending/Trending'
import Popular from './Popular/Popular'
import TopRated from './TopRated/TopRated'

const Home = () => {
  return (
    <div>
      <Hero />
      <Trending />
      <Popular />
      <TopRated />
    </div>
  )
}

export default Home