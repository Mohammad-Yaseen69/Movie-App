import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs, { Dayjs } from "dayjs";
import { Wrapper, Img, Circle, Genres } from '../'
import PosterFallback from "../../assets/no-poster.png";
import "./style.scss";

const Carousel = ({ data, loading, type , title}) => {
    const carouselContainer = useRef();
    const { url } = useSelector(state => state.homeSlice)
    const { genres } = useSelector(state => state.homeSlice)
    const navigate = useNavigate()

    const navigation = (dir) => {
        const container = carouselContainer.current;

        const scrollAmount =
            dir === "left" ?
                container.scrollLeft - (container.offsetWidth + 20)
                : container.scrollLeft + (container.offsetWidth + 20);

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth"
        })
    }

    const skItem = () => (
        <div className="skeletonItem">
            <div className="posterBlock skeleton"></div>
            <div className="textBlock">
                <span className="title skeleton"></span>
                <span className="date skeleton"></span>
            </div>
        </div>
    )

    return (
        <div className="carousel">
            <Wrapper>
                {title && <div className="carouselTitle">{title}</div>}
                <BsFillArrowLeftCircleFill
                    className="arrow carouselLeftNav"
                    cursor="pointer"
                    onClick={() => navigation("left")}
                />

                <BsFillArrowRightCircleFill
                    className="arrow carouselRightNav"
                    cursor={'pointer'}
                    onClick={() => navigation("right")}
                />
                {!loading ? (
                    <div ref={carouselContainer} className="carouselItems">
                        {data?.map((item) => {
                            const posterUrl = item?.poster_path ? url.poster + item?.poster_path : PosterFallback

                            return (
                                <div key={item?.id} className="carouselItem">
                                    <div onClick={() => navigate(`/${item.media_type || type}/${item.id}`)} className="posterBlock" >
                                        <Img src={posterUrl} />
                                        <Circle rating={item.vote_average.toFixed(1)} />
                                        <Genres data={item?.genre_ids.slice(0, 2)} />
                                    </div>
                                    <div className="textBlock">
                                        <span className="title">{item.title || item.name}</span>
                                        <span className="date">
                                            {dayjs(item.release_date || item.first_air_date).format("MMM/D/YYYY")}
                                        </span>
                                    </div>
                                    <span className="circleRating"></span>
                                </div>
                            )
                        })}
                    </div>) :
                    (
                        <div className="loadingSkeleton">
                            {skItem()}
                            {skItem()}
                            {skItem()}
                            {skItem()}
                            {skItem()}
                            {skItem()}
                        </div>
                    )}
            </Wrapper>
        </div >
    )
}

export default Carousel