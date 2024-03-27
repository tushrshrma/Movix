import React, { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import ContentWrapper from "../components/ContentWrapper";
import { LazyLoadImg as Img } from "../components/LazyLoadImg";
import PosterFallback from "../assets/no-poster.png";
import CircleRating from "./CircleRating";
import "./Carousel.scss";
import Genres from "./Genres";

const Carousel = ({ data, loading, endPoint, title }) => {
  const carouselContainer = useRef();
  const { url } = useSelector((store) => store.Home);

  const navigate = useNavigate();

  const sklItem = () => {
    return (
      <div className="skeletonItem">
        <div className="skeleton posterBlock"></div>
        <div className="skeleton textBlock"></div>
        <div className="skeleton date"></div>
      </div>
    );
  };

  const navigation = (dir) => {
    let container = carouselContainer.current;

    const scrollAmount =
      dir === "right"
        ? container.scrollLeft + (container.offsetWidth + 20)
        : container.scrollLeft - (container.offsetWidth + 20);
    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="carousel">
      <BsFillArrowLeftCircleFill
          onClick={() => navigation("left")}
          className="carouselLeftNav arrow"
        />
      <ContentWrapper>
        <div className="carouselTitle">{title}</div>
        <div ref={carouselContainer} className="carouselItems">
          {!loading ? (
            data?.map((item) => {
              const imageUrl = item.poster_path
                ? url.poster + item.poster_path
                : PosterFallback;
              return (
                <div
                  key={item.id}
                  onClick={() =>
                    navigate(`/${item.media_type || endPoint}/${item.id}`)
                  }
                  className="carouselItem"
                >
                  <div className="posterBlock">
                    <Img src={imageUrl}></Img>
                    <CircleRating rating={item.vote_average.toFixed(1)} />
                    <Genres
                      data={
                        item.genre_ids.length <= 2
                          ? item.genre_ids
                          : item.genre_ids.slice(0, 2)
                      }
                    />
                  </div>
                  <div className="textBlock">
                    {item.title || item.name}
                    <div className="date">
                      {dayjs(item.release_date).format("MMM D, YYYY")}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="loadingSkeleton">
              {sklItem()}
              {sklItem()}
              {sklItem()}
              {sklItem()}
              {sklItem()}
              {sklItem()}
              {sklItem()}
            </div>
          )}
        </div>
      </ContentWrapper>
      <BsFillArrowRightCircleFill
          onClick={() => navigation("right")}
          className="carouselRightNav arrow"
        />
    </div>
  );
};

export default Carousel;
