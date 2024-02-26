import React from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import DetailsBanner from './DetailsBanner/DetailsBanner.jsx'
import Cast from './Cast/Cast.jsx'
import Videos from './Videos/Videos.jsx'
import Recommendation from './Carousels/Recommendation.jsx'
import Similar from './Carousels/Similar.jsx'

const Details = () => {

  const { id, type } = useParams()
  const { data, loading } = useFetch(`${type}/${id}/videos`)
  const { data: crew, loading: crewLoading } = useFetch(`${type}/${id}/credits`)

  return (
    <div>
      <DetailsBanner
        crew={crew?.crew}
        video={data?.results[0]}
      />
      <Cast data={crew?.cast} loading={crewLoading} />
      {type !== "person" &&
        <>
          <Videos data={data?.results} loading={loading} />
          <Similar mediaType={type} id={id} />
          <Recommendation mediaType={type} id={id} />
        </>
      }
    </div>
  )
}

export default Details