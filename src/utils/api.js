import axios from 'axios';

const BASE_URL = "https://api.themoviedb.org/3"

// const TMDB_TOKEN = String(import.meta.env.VITE_APP_TMDB_TOKEN);

const headers = {
    Authorization : "bearer " + "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NjU5MGM5MTFlNTA0ZTU5OWZiOTA3YmFlN2Q0ODBhOSIsInN1YiI6IjY1ZDg2MTE5NDBkMGZlMDE4NWExMDI3ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WVvuDuw_0ty1XDVg6hYFrA2DsRU9-gzms9nF35BgkAk",
};

const fetchDataFromApi =  async(url,params) =>{
    try {
        const {data} = await axios.get(BASE_URL+url,{
            headers,
            params
        })
        return data;
    } catch (error) {
        console.log(error)
        return error;
    }
}

export default fetchDataFromApi;