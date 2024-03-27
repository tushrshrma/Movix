import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import "./DetailsBanner.scss";
import ContentWrapper from "../../components/ContentWrapper.jsx";
import useFetch from "../../hooks/useFetch.jsx";
import Genres from "../../components/Genres.jsx";
import CircleRating from "../../components/CircleRating.jsx";
import {LazyLoadImg as Img} from "../../components/LazyLoadImg.jsx";
import PosterFallback from "../../assets/no-poster.png";
import { PlayIcon } from "./Playbtn.jsx";
import VideoPopup from "../../components/VideoPopup";

const DetailsBanner = ({ videos, crew }) => {

    const director = crew?.filter(person => person.job === "Director")
    const writer = crew?.filter(person => person.job === "Writer" || person.job === "Story"|| person.job === "Screenplay")
    const trailer = videos?.results?.filter(video => video.type ==="Trailer")

    const {mediaType , id} = useParams()
    const {data , loading} = useFetch(`/${mediaType}/${id}`)
    const { url } = useSelector(store => store.Home)
    const _genres = data?.genres?.map(item => item.id)
    const [show, setShow] = useState(false)
    const [videoId, setVideoId] = useState(null)

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    const handlePlayTrailer = () => {
        trailer.map(video => setVideoId(video.key))
        setShow(true)
    }

    return (
        <div className="detailsBanner">
            {!loading ? (
                <>
                {
                  !!data && (
                    <>
                    <div className="backdrop-img">
                        <Img src={url.backdrop + data.backdrop_path}></Img>
                    </div>
                    <div className="opacity-layer"></div>
                    <ContentWrapper>
                        <div className="content">
                            <div className="left">
                            {data.poster_path ? <Img className="posterImg" src={url.poster + data.poster_path}/> : <Img className="posterImg" src={PosterFallback}/>}
                            </div>
                            <div className="right">
                                <div className="title">{data.title || data.name} ({dayjs(data.release_date).format('YYYY')})</div>
                                <div className="subtitle">{data.tagline}</div>
                                <Genres data={_genres}></Genres>
                                <div className="row">
                                    <CircleRating rating={data.vote_average.toFixed(1)}></CircleRating>
                                    <div className="playbtn" onClick={handlePlayTrailer}>
                                    <PlayIcon/>
                                    <span className="text">Watch Trailer</span>
                                    </div>
                                </div>
                                <div className="overview">
                                    <div className="heading">Description :</div>
                                    <div className="description">{data.overview}</div>
                                </div>
                                <div className="info">
                                    <div className="infoItem">
                                        <span className="text bold">Status: </span>
                                        <span className="text">{data.status}</span>
                                    </div>
                                    <div className="infoItem">
                                        <span className="text bold">Release Date: </span>
                                        <span className="text">{dayjs(data.release_date).format('MMM D, YYYY')}</span>
                                    </div>
                                    <div className="infoItem">
                                        <span className="text bold">Runtime: </span>
                                        <span className="text">{toHoursAndMinutes(data.runtime)}</span>
                                    </div>
                                </div>
                                {director?.length > 0 && (
                                    <div className="info">
                                       <span className="text bold">Director: </span> 
                                       <span className="text">{director.map((d , i) => (
                                        <span key={i}>{d.name}{director?.length-1 !== i && ", "}</span>
                                       ))}</span>
                                </div>
                                )
                                }{data?.created_by?.length > 0 && (
                                    <div className="info">
                                        <span className="text bold">Creator: </span>
                                        <span className="text">{data?.created_by?.map((c, i) => (
                                            <span key={i}>{c.name}{data?.created_by?.length-1 !== i && ", "}</span>
                                        ))}</span>
                                    </div>
                                )}{writer?.length > 0 && (
                                    <div className="info">
                                        <span className="text bold">Writer: </span>
                                        <span className="text">{writer?.map((w, i) => (
                                            <span key={i}>{w.name}{writer?.length-1 !== i && ", "}</span>
                                        ))}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <VideoPopup show={show} setShow={setShow} videoId={videoId} setVideoId={setVideoId}/>
                    </ContentWrapper>
                    </>
                  )
                }
                </>
            ) : (
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    );
};

export default DetailsBanner;