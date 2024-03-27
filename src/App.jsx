import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SearchResult from "./pages/SearchResult/SearchResult.jsx";
import Home from "./pages/home/Home";
import Explore from "./pages/explore/Explore";
import Details from "./pages/details/Details";
import PageNotFound from "./pages/PageNotFound";
import { useDispatch } from "react-redux";
import fetchDataFromApi from "./utils/api.js";
import { getApiConfiguration } from "./store/HomeSlice.js";
import { getGeners } from "./store/HomeSlice.js";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getImageSizes();
    getGenres();
  },[]);

  const getImageSizes = async() => {
   await fetchDataFromApi("/configuration").then((res) => {
      const url = {
        backdrop: res?.images?.base_url + "original",
        poster: res?.images?.base_url + "original",
        profile: res?.images?.base_url + "original",
      };
      dispatch(getApiConfiguration(url));
    });
  };

  const getGenres = async () => {
    const endPoints = ["movie", "tv"];
    let promises = [];
    let genresList = {}

    endPoints.forEach((item) => {
      promises.push(fetchDataFromApi(`/genre/${item}/list`));
    });

    let data = await Promise.all(promises);

    data.map(({ genres }) => {
      return genres.map(item => genresList[item.id] = item)
    })

    dispatch(getGeners(genresList))
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};
export default App;
