import React, { useState } from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchTab from '../../../components/switchTab/SwitchTab'
import useFetch from '../../../components/hooks/useFetch';
import Carousel from '../../../components/carousel/Carousel';

const Trending = () => {

    const [endPoint, setEndPoint] = useState("day");
    const {data, loading} = useFetch(`/trending/all/${endPoint}`)
    console.log(data);
    const onTabChange = (tab) =>{
        setEndPoint(tab === "Day" ? "day" : "week");
    }

  return (
    <div className='carouselSection'>
        <ContentWrapper>

            <span className='carosuelTitle'>Trending</span>
            <SwitchTab data={["Day", "Week"]} onTabChange={onTabChange }/>
        </ContentWrapper>
        {data && <Carousel data={data?.results} loading={loading}/>}
        
    </div>
  )
}

export default Trending