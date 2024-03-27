import React from 'react'
import useFetch from '../../hooks/useFetch'
import DetailsBanner from './DetailsBanner'
import { useParams } from 'react-router-dom'
import Cast from '../../components/Cast'
import VideosSection from './VIdeoSection'
import Recommendation from './Recommendation'
import Similar from './Similar'

const Details = () => {

  const{ mediaType, id } = useParams()
  const { data , loading} = useFetch(`/${mediaType}/${id}/videos`)
  const {data: credits , loading: error} = useFetch(`/${mediaType}/${id}/credits`)

  return (
    <>
    <DetailsBanner videos={data} crew={credits?.crew}/>
    <Cast data={credits?.cast} loading={error}/>
    <VideosSection data={data?.results} loading={loading}/>
    <Similar mediaType={mediaType} id={id}/>
    <Recommendation mediaType={mediaType} id={id}/>
    </>
  )
}

export default Details