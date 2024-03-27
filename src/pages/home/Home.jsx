import React from 'react'
import './Home.scss'
import HeroBanner from './HeroBanner'
import Trending from './Trending/Trending'
import Popular from './Popular/Popular'
import TopRated from './TopRated/TopRated'

const Home = () => {
  return (
    <>
    <HeroBanner/>
    <Trending/>
    <Popular/>
    <TopRated/>
    </>
  )
}

export default Home