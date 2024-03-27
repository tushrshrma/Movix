import React, { useState } from "react";
import ContentWrapper from "../../../components/ContentWrapper";
import SwitchTabs from "../../../components/SwitchTabs";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/Carousel";

const TopRated = () => {

  const totalTabs = ["Movies", "TV Shows"];

  const [endPoint, setEndPoint] = useState("movie");
  const { data, loading} = useFetch(`/${endPoint}/top_rated`)

  const onTabChange = (index) => {
    totalTabs[index] === 'TV Shows' ? setEndPoint("tv") : setEndPoint("movie")
  };

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Top Rated</span>
        <SwitchTabs onTabChange={onTabChange} data={totalTabs} />
      </ContentWrapper>
      <Carousel  data={data?.results} loading={loading} endPoint={endPoint}/>
    </div>
  );
};

export default TopRated;
