import React from 'react'
import './style.scss'
import { useParams } from 'react-router-dom'
import useFetch from '../../components/hooks/useFetch'
import DetailsBanner from './detailsBanner/DetailsBanner'
const Details = () => {

    const {mediaType, id} = useParams()

    const {data,loading} = useFetch(`/${mediaType}/${id}/videos`);

    const {data:credits, loading : creditsLoading} = useFetch(`/${mediaType}/${id}/credits`);

    console.log(data);

    return (

        <div>
            {data && <DetailsBanner video={data?.results[0]} crew={credits?.crew}/>} 
        </div>
    )
}

export default Details