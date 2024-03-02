import React from 'react'
import './style.scss'
import { useParams } from 'react-router-dom'
import useFetch from '../../components/hooks/useFetch'

const Details = () => {

    const {mediaType, id} = useParams()
    const {data,loading} = useFetch(`${mediaType}/${id}`);

    
    
  return (

    <div>Details</div>
  )
}

export default Details