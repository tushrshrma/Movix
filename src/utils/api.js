import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

const TMDB_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMWVhNGZiM2MwZmJkYWFiODIzNDE1ZTg1MmZiNTJmZSIsInN1YiI6IjY1ZjMzZjM0ZWVhMzRkMDEzMTEyNmRlMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XDu35oeVtnjEUqcYV8BatUKP8li-3paQ4dhFKtfp4xU';

const headers = {
    Authorization : "Bearer " + TMDB_TOKEN
}

const fetchDataFromApi = async (url, para = {}) => {
  try {
    let queryStr = ""
    if(Object.keys(para).length > 0){
      queryStr = `?${Object.entries(para).map(([key , value]) => `${key}=${value}`).join("&")}`
    }
    const { data } = await axios.get(BASE_URL + url + queryStr, { headers })
    return data
  } catch (error) {
    console.log(error);
    return error;
  }
}

export default fetchDataFromApi
