import React, { useState } from "react";
import ContentWrapper from "../../../components/ContentWrapper";
import SwitchTabs from "../../../components/SwitchTabs";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/Carousel";

const Popular = () => {

  const totalTabs = ["Movies", "TV Shows"];

  const [endPoint, setEndPoint] = useState("movie");
  const { data, loading} = useFetch(`/${endPoint}/popular`)

  const onTabChange = (index) => {
    totalTabs[index] === 'TV Shows' ? setEndPoint("tv") : setEndPoint("movie")
  };

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">What's Popular</span>
        <SwitchTabs onTabChange={onTabChange} data={totalTabs} />
      </ContentWrapper>
      <Carousel  data={data?.results} loading={loading} endPoint={endPoint}/>
    </div>
  );
};

export default Popular;
