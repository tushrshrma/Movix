import React from "react";
import { useSelector } from "react-redux";
import "./Genres.scss";

const Genres = ({ data }) => {
  const { geners } = useSelector((store) => store.Home);

  return (
    <div className="genres">
      {data?.map((item) => {
        if(!geners[item])  return 
        return <div key={item} className="genre">{geners[item]?.name}</div>
      })}
    </div>
  );
};

export default Genres;
