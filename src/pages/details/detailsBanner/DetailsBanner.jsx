import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.scss";
import "../../home/homeBanner/style.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Genres from "../../../components/genres/Genres";
import useFetch from "../../../components/hooks/useFetch.jsx";
import CircleRating from "../../../components/circleRating.jsx/CircleRating.jsx";
import Img from "../../../components/lazyLoadImage/Img.jsx";
import PosterFallback from "../../../assets/no-poster.png";
import dayjs from "dayjs";
import { PlayIcon } from "../PlayBtn.jsx";
import VideoPopup from "../../../components/videoPopup/VideoPopup.jsx";
const DetailsBanner = ({ video, crew }) => {
    const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}`);
    const { url } = useSelector((state) => state.home);

    const _genres = data?.genres?.map((g) => g.id);

    const director = crew?.filter((f) => f.job === "Director");

    const writer = crew?.filter(
        (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
    );
    
    const [show, setShow] = useState(false)
    const [videoId, setVideoId] = useState(null)
    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    return (
        <ContentWrapper>

            <div className="detailsBanner">
                {!loading ? (
                    <>
                        {!!data && (
                            <React.Fragment>
                                <div>
                                    <div className="backdrop-img">
                                        <Img src={url.backdrop + data.backdrop_path} />
                                    </div>
                                    <div className="opacity_layer"></div>
                                    <div className="content">
                                        <div className="left">
                                            {data.poster_path ? (
                                                <Img
                                                    src={url.backdrop + data.backdrop_path}
                                                    className="posterImg"
                                                />
                                            ) : (
                                                <Img src={PosterFallback} />
                                            )}
                                        </div>
                                        <div className="right">
                                            <div className="title">
                                                {`${data.name || data.title} (${dayjs(
                                                    data?.release_date
                                                ).format("YYYY")})`}
                                            </div>

                                            <div className="subtitle">{data.tagline}</div>

                                            <Genres data={_genres} />

                                            <div className="row">
                                                <CircleRating rating={data.vote_average.toFixed(1)} />
                                                <div className="playbtn" onClick={() => {
                                                        setShow(true)
                                                        setVideoId(video.key);
                                                    }}>
                                                    <PlayIcon />
                                                    <span className="text">Watch Trailer</span>
                                                </div>
                                            </div>

                                            <div className="overview">
                                                <div className="heading">Overview</div>
                                                <div className="description">{data.overview}</div>
                                            </div>

                                            <div className="info">
                                                {data.status && (
                                                    <div className="infoItem">
                                                        <span className="text bold">Status:</span>
                                                        <div className="text">{data.status}</div>
                                                    </div>
                                                )}

                                                {data.release_date && (
                                                    <div className="infoItem">
                                                        <span className="text bold">Release Date:</span>
                                                        <div className="text">
                                                            {dayjs(data.release_date).format("MMM D, YYYY")}
                                                        </div>
                                                    </div>
                                                )}

                                                {data.runtime && (
                                                    <div className="infoItem">
                                                        <span className="text bold">Runtime:</span>
                                                        <div className="text">
                                                            {toHoursAndMinutes(data.runtime)}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {director?.length > 0 && (
                                                <div className="info">
                                                    <div className="text bold">Director :</div>

                                                    <div className="text">
                                                        {director.map((d, i) => (
                                                            <span key={i}>{d.name}{director.length - 1 !== i && ", "} </span>


                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {writer?.length > 0 && (
                                                <div className="info">
                                                    <div className="text bold">Writer :</div>

                                                    <div className="text">
                                                        {writer.map((d, i) => (
                                                            <span key={i}>{d.name}{writer.length - 1 !== i && ", "} </span>


                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {data?.created_by?.length > 0 && (
                                                <div className="info">
                                                    <div className="text bold">Creator :</div>

                                                    <div className="text">
                                                        {
                                                            data?.created_by?.map((d, i) => (
                                                                <span key={i}>
                                                                    {d.name}
                                                                    {data?.created_by.length - 1 !== i && ", "}
                                                                </span>
                                                            ))}
                                                    </div>
                                                </div>
                                            )}

                                        </div>
                                    </div>
                                </div>
                                <VideoPopup 
                                    show={show}
                                    setShow={setShow}
                                    videoId={videoId}
                                    setVideoId={setVideoId}
                                />
                            </React.Fragment>
                        )}
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
        </ContentWrapper>

    );
};

export default DetailsBanner;
