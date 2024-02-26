import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { Circle, Img, Genres, Wrapper, InfoItem, VideoPlayer } from '../../../Components'
import useFetch from "../../../hooks/useFetch";
import PosterFallback from "../../../assets/no-poster.png";
import "./style.scss";
import { PlayBtn } from "./PlayBtn";

const DetailsBanner = ({ video, crew, cast }) => {
    // Hooks
    const { id, type } = useParams()
    const { data, loading } = useFetch(`${type}/${id}`)
    const { url } = useSelector(state => state.homeSlice)
    const [show, setShow] = useState(false)
    const [videoId, setVideoId] = useState(null)

    // Array Filtrations
    const _genres = data?.genres?.map(genre => genre.id)
    const director = crew?.filter(c => c.job === "Director")
    const writer = crew?.filter(
        c => c.job === "Writer" ||
            c.job === "Screenplay" ||
            c.job === "Story" ||
            c.known_for_department === "Writing"
    )

    // Backdrop Url
    const backdrop_url = url?.backdrop ? url?.backdrop + data?.backdrop_path :
        "http://image.tmdb.org/t/p/original" + data?.backdrop_path;


    // Method
    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours > 0 ? `${hours}h` : ""} ${minutes > 0 ? ` ${minutes}m` : ""}`;
    };


    return (
        <div className="detailsBanner">
            {!loading ? (
                <>
                    {data && (
                        <>
                            <div className="backdrop-img">
                                <Img src={backdrop_url} />
                                <div className="opacity-layer"></div>
                            </div>
                            <Wrapper>
                                <div className="content">
                                    <div className="left">
                                        {data.poster_path ?
                                            (<>
                                                <Img className="posterImg" src={url.backdrop + data.poster_path} />
                                            </>) :
                                            (<>
                                                <Img className="posterImg" src={PosterFallback} />
                                            </>)}
                                    </div>
                                    <div className="right">
                                        <div className="title">
                                            {data.title || data.name} ({dayjs(data.release_date || data.first_air_date).format("YYYY")})
                                        </div>
                                        <div className="subtitle">
                                            {data.tagline}
                                        </div>
                                        <Genres data={_genres} />

                                        <div className="row ratings">
                                            <Circle rating={data?.vote_average?.toFixed(1)} />
                                            <div onClick={() => {
                                                setShow(true)
                                                setVideoId(video?.key)
                                            }} className="playbtn">
                                                <PlayBtn />
                                                <span className="text">Watch Trailor</span>
                                            </div>
                                        </div>

                                        <div className="overview">
                                            <div className="heading">Overview</div>
                                            <div className="description">{data.overview}</div>
                                        </div>

                                        <div className="info">
                                            <InfoItem data={data?.status} text={"Status"} />


                                            <InfoItem
                                                data={data?.release_date || data?.first_air_date}
                                                text={"Release Date"}
                                                method={(date) => dayjs(date).format("MMM D,YYYY")}
                                            />
                                            <InfoItem
                                                data={data?.runtime}
                                                method={(time) => toHoursAndMinutes(time)}
                                                text={"Runtime"}
                                            />

                                            {data?.episode_run_time?.length > 0 && <InfoItem
                                                data={data?.episode_run_time}
                                                method={(time) => toHoursAndMinutes(time[0])}
                                                text={"Episode Run Time"}
                                            />}
                                        </div>

                                        {director?.length > 0 &&
                                            <div className="info">
                                                <InfoItem
                                                    text={"Director"}
                                                    data={director}
                                                    method={(data) => data.slice(0, 6).map(d => d.name).join(", ")}
                                                />
                                            </div>
                                        }

                                        {writer?.length > 0 &&
                                            <div className="info">
                                                <InfoItem
                                                    text={"Writer"}
                                                    data={writer}
                                                    method={(data) => data.slice(0, 6).map(d => d.name).join(", ")}
                                                />

                                            </div>
                                        }

                                        {data?.created_by?.length > 0 &&
                                            <div className="info">
                                                <InfoItem
                                                    text={"Creator"}
                                                    data={data?.created_by}
                                                    method={(data) => data.slice(0, 6).map(d => d.name).join(", ")}
                                                />
                                            </div>
                                        }
                                    </div>
                                </div>
                                <VideoPlayer
                                    setShow={setShow}
                                    show={show}
                                    setVideoId={setVideoId}
                                    videoId={videoId}
                                />
                            </Wrapper>
                        </>
                    )}
                </>
            ) : (
                <div className="detailsBannerSkeleton">
                    <Wrapper>
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
                    </Wrapper>
                </div>
            )}
        </div>
    );
};

export default DetailsBanner;