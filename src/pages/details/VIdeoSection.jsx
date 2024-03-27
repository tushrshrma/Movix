import React, { useRef, useState } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import "./VideoSection.scss";
import ContentWrapper from "../../components/ContentWrapper";
import { PlayIcon } from "./Playbtn";
import VideoPopup from "../../components/VideoPopup";
import { LazyLoadImg as Img } from "../../components/LazyLoadImg";

const VideosSection = ({ data, loading }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const videoContainer = useRef();

  const navigation = (dir) => {
    const container = videoContainer.current;

    const scrollAmount =
      dir === "right"
        ? container.scrollLeft + container.offsetWidth
        : container.scrollLeft - container.offsetWidth;

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };
  const loadingSkeleton = () => {
    return (
      <div className="skItem">
        <div className="thumb skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };

  const handleVideoPlay = (id) => {
    setShow(true);
    setVideoId(id);
  };

  return (
    <div className="videosSection">
      <ContentWrapper>
        <div className="sectionHeading">Official Videos</div>
        {!loading ? (
          <>
            {data?.length > 4 &&
            <BsFillArrowLeftCircleFill
            onClick={() => navigation("left")}
            className="carouselLeftNav arrow"
          />}
            <div ref={videoContainer} className="videos">
              {data?.map((video) => {
                return (
                  <div
                    key={video.id}
                    onClick={() => handleVideoPlay(video.key)}
                    className="videoItem"
                  >
                    <div className="videoThumbnail">
                      <Img
                        src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                      ></Img>
                      <PlayIcon />
                    </div>
                    <div className="videoTitle">{video.name}</div>
                  </div>
                );
              })}
            </div>
            {data?.length > 4 && <BsFillArrowRightCircleFill
              onClick={() => navigation("right")}
              className="carouselRightNav arrow"
            />}
          </>
        ) : (
          <div className="videoSkeleton">
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
          </div>
        )}
      </ContentWrapper>
      <VideoPopup
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </div>
  );
};

export default VideosSection;
