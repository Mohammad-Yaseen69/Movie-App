import React from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import DetailsBanner from './DetailsBanner/DetailsBanner.jsx'

const Details = () => {

  const { id, type } = useParams()
  const { data, loading } = useFetch(`${type}/${id}/videos`)
  const { data: crew } = useFetch(`${type}/${id}/credits`)
  
  return (
    <div>
      <DetailsBanner
        crew={crew?.crew}
        cast={crew?.cast}
        video={data?.results}
      />
    </div>
  )
}

export default Details