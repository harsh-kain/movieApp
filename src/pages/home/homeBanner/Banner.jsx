import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import './style.scss'
import useFetch from '../../../components/hooks/useFetch';
import { useSelector } from 'react-redux';
import Img from '../../../components/lazyLoadImage/Img'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'

const Banner = () => {
    const [background, setBackground] = useState("");
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const { url } = useSelector((state) => state.home)
    const { data, loading } = useFetch("/movie/upcoming")
    useEffect(() => {
        const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
        {url.backdrop === undefined ? (setBackground("https://image.tmdb.org/t/p/original/meyhnvssZOPPjud4F1CjOb4snET.jpg")) : (setBackground(bg))};

    }, [data])


    const searchQueryHandler = (e) => {
        if (e.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`)
        }
    }
    const searchQuery = () => {
        if (query.length > 0) {
            navigate(`/search/${query}`)
        }
    }

    return (
        <div className='heroBanner'>
            {!loading && <div className="backdrop_img">
                <Img src={background} />
            </div>}

            <div className="opacity_layer"></div>

            <ContentWrapper>


                <div className="heroBannerContent">
                    <span className="title">Welcome</span>
                    <span className="subTitle">Millions of Movies, TV shows and people to discover.
                        Explore Now </span>
                </div>

                <div className="searchInput">
                    <input type="text" name="" id="" placeholder='Search for Movies and TV shows....' onKeyUp={searchQueryHandler} onChange={(e) => setQuery(e.target.value)} />

                    <button onClick={searchQuery}>Search</button>
                </div>
            </ContentWrapper>
        </div>
    )
}

export default Banner;
