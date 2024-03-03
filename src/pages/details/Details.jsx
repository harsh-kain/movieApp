import React from 'react'
import './style.scss'
import { useParams } from 'react-router-dom'
import useFetch from '../../components/hooks/useFetch'
import DetailsBanner from './detailsBanner/DetailsBanner'
import Cast from './cast/Cast'
import VideosSection from './videosSection/VideoSection'
import Similar from './carousel/Similar'
import Recommendation from './carousel/Recommendation'
const Details = () => {

    const {mediaType, id} = useParams()

    const {data,loading} = useFetch(`/${mediaType}/${id}/videos`);

    const {data:credits, loading : creditsLoading} = useFetch(`/${mediaType}/${id}/credits`);

    console.log(data);

    return (

        <div>
            {data && <DetailsBanner video={data?.results[0]} crew={credits?.crew}/>} 
            {data && <Cast data={credits?.cast} loading={creditsLoading}/>}
            <VideosSection data={data} loading={loading}/>
            <Similar mediaType={mediaType} id={id}/>
            <Recommendation mediaType={mediaType} id={id}/>
        </div>
    )
}

export default Details