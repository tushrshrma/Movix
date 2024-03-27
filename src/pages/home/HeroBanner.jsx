import { React, useState, useRef, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useSelector } from "react-redux";
import {LazyLoadImg as Img} from "../../components/LazyLoadImg";
import ContentWrapper from "../../components/ContentWrapper";
import './HeroBanner.scss'

const HeroBanner = () => {
  const [bannerBackground, setBannerBackground] = useState("");
  const searchInput = useRef()
  const navigate = useNavigate()
  const { url } = useSelector(store => store.Home)
  const { data } = useFetch("/movie/popular")

  useEffect(() => {
    const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)].backdrop_path
    setBannerBackground(bg)
  })
  
  const handleSearchInput = (event) => {
    if(event.key === "Enter" && searchInput.current.value.trim() !== ""){
        navigate(`/search/${searchInput.current.value.trim()}`)
        searchInput.current.value = ""
    }
  }
  const handleSearchButton = () => {
    const inputVal = searchInput.current.value.trim()
    if(inputVal !== ""){
    navigate(`/search/${inputVal}`)
    searchInput.current.value = ""
    }
  }

  return (
    <div className="herobanner">
        <div className="backdrop-img">
            <Img className={"banner-image"} src={bannerBackground} />
        </div>
        <ContentWrapper>
      <div className="heroBannerContent">
        <span className="title">Welcome.</span>
        <span className="subTitle">
          Millions of movies, TV shows and people to discover. Explore now.
        </span>
        <div className="searchInput">
          <input type="text" ref={searchInput} onKeyUp={handleSearchInput} placeholder="Search for a movie or tv show...." />
          <button onClick={handleSearchButton}>Search</button>
        </div>
      </div>
      </ContentWrapper>
      <div className="opacity-layer"/>
      </div>
  );
};

export default HeroBanner;
