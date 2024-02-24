import React, { useState } from "react";
import "./style.scss"; 
// import { PlayIcon } from "../playIcon";
import { Wrapper, Img, VideoPlayer } from '../../../Components'
import { PlayBtn } from "../DetailsBanner/PlayBtn";


const VideosSection = ({ data, loading }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };
console.log(data);
    return (
        <div className="videosSection">
            <Wrapper>
                <div className="sectionHeading">Official Videos</div>
                {!loading ? (
                    <div className="videos">
                        {data?.map((v, i) => (
                            <div key={i} className="videoItem">
                                <div onClick={() => {
                                    setShow(true)
                                    setVideoId(v.key)
                                }} className="videoThumbnail">
                                    <Img src={`https://img.youtube.com/vi/${v.key}/mqdefault.jpg`}/>
                                    <PlayBtn />
                                </div>
                                <div className="videoTitle">
                                    {v.name}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="videoSkeleton">
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                    </div>
                )}
            </Wrapper>
            <VideoPlayer
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
            />
        </div>
    );
};

export default VideosSection;
