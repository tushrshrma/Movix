import React, { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useSelector } from "react-redux";
import "./Cast.scss";
import ContentWrapper from "./ContentWrapper";
import { LazyLoadImg as Img } from "./LazyLoadImg";
import avatar from "../assets/avatar.png";

const Cast = ({ data, loading }) => {
  const { url } = useSelector((state) => state.Home);
  const castContainer = useRef();

  const navigation = (dir) => {
      let container = castContainer.current
      const scrollAmount = dir === "left" ? container.scrollLeft - (container.offsetWidth) : container.scrollLeft + (container.offsetWidth)

      container.scrollTo({
        left : scrollAmount,
        behavior: "smooth"
      })
  };

  const skeleton = () => {
    return (
      <div className="skItem">
        <div className="circle skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };
  return (
    <div className="castSection">
      <ContentWrapper>
        <div className="sectionHeading">Top Cast</div>
        {!loading ? (
          <>
          <BsFillArrowLeftCircleFill
              onClick={() => navigation("left")}
              className="carouselLeftNav arrow"
            />
            <div ref={castContainer} className="listItems">
              {data?.map((item) => {
                const imgUrl = item.profile_path
                  ? url.profile + item.profile_path
                  : avatar;
                return (
                  <div key={item.id} className="listItem">
                    <div className="profileImg">
                      <Img src={imgUrl} />
                    </div>
                    <div className="name">{item.name}</div>
                    <div className="character">{item.character}</div>
                  </div>
                );
              })}
            </div>
            <BsFillArrowRightCircleFill
              onClick={() => navigation("right")}
              className="carouselRightNav arrow"
            />
          </>
        ) : (
          <div className="castSkeleton">
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Cast;
