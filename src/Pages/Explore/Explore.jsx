import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './Styles.scss'
import { useSelector } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'
import Select from 'react-select'
import { Wrapper, Loader, MovieCard } from '../../Components'
import { fetchData } from '../../utils/api'

let filters = {};

const sortbyData = [
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "vote_average.desc", label: "Rating Descending" },
  { value: "vote_average.asc", label: "Rating Ascending" },
  {
    value: "primary_release_date.desc",
    label: "Release Date Descending",
  },
  { value: "primary_release_date.asc", label: "Release Date Ascending" },
  { value: "original_title.asc", label: "Title (A-Z)" },
];


const Explore = () => {
  const { genres } = useSelector(state => state.homeSlice)
  const { type } = useParams()

  // States
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [genre, setGenre] = useState(null)
  const [sortby, setSortby] = useState(null)

  const fetchInitialData = async () => {
    setLoading(true)
    try {
      const res = await fetchData(`discover/${type}`)
      setData(res?.results)
      setTotalPages(res?.total_pages)
      setPage(prev => prev + 1)
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  }

  const fetchNextPageData = async () => {
    setLoading(true)
    const res = await fetchData(`discover/${type}`)
    if (data) {
      setData(prev => [...prev, ...res?.results])
      setLoading(false)
    }
    else {
      setData(res)
    }
    setPage(prev => prev + 1)
  }

  useEffect(() => {
    filters = {};
    setData(null);
    setPage(1);
    setSortby(null);
    setGenre(null);
    fetchInitialData();
  }, [type]);

  console.log(data);
  return (

    <div className='explorePage'>
      <Wrapper >
        <div className="pageHeader">
          <div className="pageTitle">
            Explore {type === "tv" ? "Tv Shows" : "Movies"}
          </div>
        </div>

        {loading ? <Loader initial={true} /> :
          <>
            {data?.length > 0 ? (
              <InfiniteScroll
                className="content"
                dataLength={data?.length || []}
                next={fetchNextPageData}
                hasMore={page <= totalPages}
                loader={<Loader />}
              >
                {data?.map((item, index) => {
                  if (item.media_type === "person") return;
                  return (
                    <MovieCard
                      key={index}
                      data={item}
                      mediaType={type}
                    />
                  );
                })}
              </InfiniteScroll>
            ) : (
              <span className="resultNotFound">
                Sorry, Results not found!
              </span>
            )}
          </>}

      </Wrapper>
    </div>

  )
}

export default Explore