import React, { useState } from "react";
import ContentWrapper from "../../../components/ContentWrapper";
import SwitchTabs from "../../../components/SwitchTabs";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/Carousel";

const Trending = () => {

  const totalTabs = ["Day", "Week"];

  const [endPoint, setEndPoint] = useState("day");
  const { data, loading} = useFetch(`/trending/all/${endPoint}`);

  const onTabChange = (index) => {
    setEndPoint(totalTabs[index].toLowerCase());
  };

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Trending</span>
        <SwitchTabs onTabChange={onTabChange} data={totalTabs} />
      </ContentWrapper>
      <Carousel  data={data?.results} loading={loading}/>
    </div>
  );
};

export default Trending;
