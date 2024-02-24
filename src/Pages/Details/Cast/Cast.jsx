import React from "react";
import { useSelector } from "react-redux";
import "./Style.scss";
import { Wrapper, Img } from '../../../Components'
import avatar from "../../../assets/avatar.png";

const Cast = ({ data, loading }) => {
    const { url } = useSelector((state) => state.homeSlice);


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
            <Wrapper>
                <div className="sectionHeading">Top Cast</div>
                {!loading ? (
                    <div className="listItems">
                        {data?.map((c, i) => {
                            const profile_url = url?.profile ? url?.profile + c?.profile_path :
                                "http://image.tmdb.org/t/p/original" + c?.profile_path;
                            const isProfileAvailable = profile_url == "http://image.tmdb.org/t/p/originalundefined" ? avatar : profile_url
                            return (
                                <div key={i} className="listItem">
                                    <div className="profileImg">
                                        <Img src={isProfileAvailable} />
                                    </div>
                                    <div className="name">{c.name}</div>
                                    <div className="character">{c.character}</div>
                                </div>
                            )
                        })}
                    </div>
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
            </Wrapper>
        </div>
    );
};

export default Cast;