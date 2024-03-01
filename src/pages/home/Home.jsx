import React from 'react'
import './style.scss'
import Banner from './homeBanner/Banner'
import Trending from './tranding/Trending'
const Home = () => {
  return (
    <div className='homePage'>
      <Banner />
      <Trending />
      {/* <div style={{height: 1000}}></div> */}
    </div>
  )
}

export default Home