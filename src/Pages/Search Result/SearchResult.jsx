import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import noResults from '../../assets/no-results.png'
import { Wrapper, Loader, Img, MovieCard } from '../../Components'
import './Styles.scss'
import { fetchData } from '../../utils/api'
import InfiniteScroll from 'react-infinite-scroll-component'
import PosterFallback from '../../assets/no-poster.png'

const SearchResult = () => {
  const { query } = useParams()
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [totalPages , setTotalPages] = useState(0)

  const getInitialData = async () => {
    try {
      setLoading(true)
      const res = await fetchData(`search/multi`, { query, page })
      setData(res?.results)
      setTotalPages(res?.total_pages)
      setPage(prev => prev + 1)
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  }

  const getNextPageData = async () => {
    setLoading(true)
    const res = await fetchData(`search/multi`, { query, page })
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
    setPage(0)
    getInitialData()
  }, [query])

  console.log(data);

  return (
    <div className='searchResultsPage'>
      {loading ? <Loader initial={true} /> :
        <Wrapper>
          {data?.length > 0 ?
            <>
              <div className="pageTitle">
                {`Search ${data?.total_results > 1 ? "Results" : "Result"} for "${query}"`}
              </div>
              <InfiniteScroll
                className='content'
                dataLength={data?.length || []}
                next={getNextPageData}
                hasMore={page <= totalPages}
                loader={<Loader initial={false}/>}
              >
                {data?.map((item) => (
                  <>
                    <MovieCard key={item.id} mediaType={item.media_type} data={item} fromSearch={true} />
                  </>
                ))}
              </InfiniteScroll>
            </>
            :
            <span className="resultNotFound">
              Sorry, Result Not Found ...
            </span>
          }
        </Wrapper>
      }
    </div>
  )
}

export default SearchResult