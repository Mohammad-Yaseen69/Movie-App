import React from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Genres, Img, Circle } from '..'
import PosterFallback from "../../assets/no-poster.png";
import "./style.scss";

const MovieCard = ({ data, fromSearch, mediaType }) => {
    const { url } = useSelector((state) => state.homeSlice);
    const navigate = useNavigate();
    const posterUrl = data?.poster_path
        ? url?.poster + data?.poster_path
        : PosterFallback;
    return (
        <div
            className="movieCard"
            onClick={() =>
                navigate(`/${data?.media_type || mediaType}/${data?.id}`)
            }
        >
            <div className="posterBlock">
                <Img className="posterImg" src={posterUrl || url?.profile + data?.profile_path} />
                {!fromSearch && data?.media_type !== "person" && (
                    <React.Fragment>
                        <Circle rating={data?.vote_average?.toFixed(1)} />
                        <Genres data={data?.genre_ids?.slice(0, 2)} />
                    </React.Fragment>
                )}
            </div>
            <div className="textBlock">
                <span className="title">{data?.title || data?.name}</span>
                <span className="date">
                    {dayjs(data?.release_date || data?.first_air_date || data?.birthday).format("MMM D, YYYY")}
                </span>
            </div>
        </div>
    );
};

export default MovieCard;