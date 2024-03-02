import React, { useState } from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchTab from '../../../components/switchTab/SwitchTab'
import useFetch from '../../../components/hooks/useFetch';
import Carousel from '../../../components/carousel/Carousel';

const Popular = () => {

    const [endPoint, setEndPoint] = useState("movie");
    const {data, loading} = useFetch(`/${endPoint}/popular`)
    const onTabChange = (tab) =>{
        setEndPoint(tab === "Movie" ? "movie" : "tv");
    }

  return (
    <div className='carouselSection'>
        <ContentWrapper>

            <span className='carosuelTitle'>What's Popular</span>
            <SwitchTab data={["Movie", "TV"]} onTabChange={onTabChange }/>
        </ContentWrapper>
        {data && <Carousel data={data?.results} loading={loading} endPoint={endPoint}/>}
        
    </div>
  )
}

export default Popular