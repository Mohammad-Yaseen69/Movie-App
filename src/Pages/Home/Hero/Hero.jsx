import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Styles.scss'
import useFetch from '../../../hooks/useFetch';
import { Img, Wrapper } from '../../../Components/';

const Hero = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate()
  const [background, setBackground] = useState("")
  const { url } = useSelector(state => state.homeSlice)
  const { data, loading } = useFetch(`trending/all/day`)

  useEffect(() => {
    const rn = Number(Math.floor(Math.random() * data?.results?.length))

    if (!isNaN(rn)) {
      const bg =
        url?.backdrop ? url?.backdrop + data?.results[rn]?.backdrop_path :
          "http://image.tmdb.org/t/p/original" + data?.results[rn]?.backdrop_path;
      setBackground(bg)

    }
  }, [data])
  const searchQueryHandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query.trimEnd()}`)
    }
  }
  // console.log(background);



  return (
    <div className="heroBanner">
      {!loading && (
        <div className="backdrop-img">
          <Img src={background && background} />
        </div>
      )}

      <div className="opacity-layer"></div>
      <Wrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome.</span>
          <span className="subTitle">
            Millions of movies, TV shows and people to discover.
            Explore now.
          </span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for a movie or tv show...."
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
            />
            <button onClick={searchQueryHandler}>Search</button>
          </div>
        </div>
      </Wrapper>
    </div>
  )
}

export default Hero