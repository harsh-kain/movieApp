import React from 'react'
import './style.scss'
import Banner from './homeBanner/Banner'
import Trending from './tranding/Trending'
import Popular from './popular/Popular'
import TopRated from './topRated/TopRated'
const Home = () => {
  return (
    <div className='homePage'>
      <Banner />
      <Trending />
      <Popular />
      <TopRated />
      {/* <div style={{height: 1000}}></div> */}
    </div>
  )
}

export default Home