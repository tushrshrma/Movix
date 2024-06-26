import React from "react";
import ReactPlayer from "react-player/youtube";
import "./VideoPopup.scss";
import { IoCloseSharp } from "react-icons/io5";

const VideoPopup = ({ show, setShow, videoId, setVideoId }) => {
    const hidePopup = () => {
        setShow(false);
        setVideoId(null);
    };
    console.log(videoId)
    return (
        <div className={`videoPopup ${show ? "visible" : ""}`}>
            <div className={`opacityLayer`} onClick={hidePopup}></div>
            <div className="videoPlayer">
                <span className="closeBtn" onClick={hidePopup}>
                    <IoCloseSharp />
                </span>
                {show && videoId && (
                    <ReactPlayer
                        url={`https://www.youtube.com/watch?v=${videoId}`}
                        controls
                        width="100%"
                        height="100%"
                        playing={true}
                    />
                )}
            </div>
        </div>
    );
};

export default VideoPopup;