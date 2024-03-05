import React from 'react'
import './style.scss'
import Banner from './homeBanner/Banner'
import Trending from './tranding/Trending'
import Popular from './popular/Popular'
import TopRated from './topRated/TopRated'
const Home = () => {
  return (
      // <h1>Home page</h1>
    <div className='homePage'>
      <Banner />
      <Trending />
      <Popular />
      <TopRated />
    </div>
  )
}

export default Home