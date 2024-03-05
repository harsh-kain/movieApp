import { useState,useEffect } from "react"
import {lazy, Suspense} from 'react'
import fetchDataFromApi from './utils/api'
import { useDispatch, useSelector } from "react-redux";
import { getApiConfiguration, getGenres } from "./store/homeSlice";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from "./pages/home/Home";
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
// import Detils from './pages/details/Details'
import Explore from './pages/explore/Explore'
import Error from './pages/404/Error'
import SearchResult from './pages/searchResult/SearchResult'

function App() {
    const dispatch = useDispatch();
    // const selector = useSelector();
    const {url} = useSelector((state) => state.home)

    useEffect(() =>{
        fetchApiConfig();
        genresCall();
    },[])

    const fetchApiConfig = () =>{
        fetchDataFromApi('/configuration')
        .then((res) =>{

            const url = {
                backdrop : res.images.secure_base_url + "original",
                poster : res.images.secure_base_url + "original",
                profile : res.images.secure_base_url + "original",
            }
            dispatch(getApiConfiguration(url));
        })
    }

    const genresCall = async ()=>{
        let promises = [];
        let endPoint = ["tv", "movie"];

        let allGenres = {};
        endPoint.forEach((url) =>{
            return promises.push(fetchDataFromApi(`/genre/${url}/list`))
        })
        const data = await Promise.all(promises);
        {data.map(({genres}) => {
            return genres.map((item) => (allGenres[item.id] = item))
        })}

        dispatch(getGenres(allGenres))
    }

    const Details = lazy(()=> import('./pages/details/Details'))
    // const SearchResult = lazy(()=> import('./pages/explore/Explore'))

  return (
    <BrowserRouter>
    <Header/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/:mediaType/:id" element={<Suspense fallback={"Laxy Loading "}><Details/></Suspense>}/>
            <Route path="/search/:query" element={<SearchResult/>}/>
            <Route path="/explore/:mediaType" element={<Explore/>}/>
            <Route path="*" element={<Error/>}/>
        </Routes>
    <Footer />
    </BrowserRouter>
  )
}


export default App
