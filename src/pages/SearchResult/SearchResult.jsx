import {React, useEffect, useRef, useState} from 'react'
import { useParams } from 'react-router-dom'
import './style.scss'
import InfiniteScroll from 'react-infinite-scroll-component'
import fetchDataFromApi from '../../utils/api'
import Spinner from '../../components/LoadingSpinner'
import ContentWrapper from '../../components/ContentWrapper'
import MovieCard from "../../components/Card"
import noResults from '../../assets/noResults.png'

const SearchResult = () => {

  const { query } = useParams()
  const [ data, setData ] = useState(null)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)

  useEffect(() => {
    setPage(1)
    setData(null)
    fetchInitialData()
  }, [query])

  const fetchInitialData = () => {
    setLoading(true)
    fetchDataFromApi(`/search/multi?query=${query}&page=${page}`).then((res) => {
      setData(res);
      setPage((prev) => prev + 1);
      setLoading(false);
  });
  }

  const fetchNextPageData = () => {
    setLoading(true)
    fetchDataFromApi(`/search/multi?query=${query}&page=${page}`).then((res) => {
      if (data?.results) {
          setData({
              ...data,
              results: [...data?.results, ...res.results],
          });
      } else {
          setData(res);
      }
      setPage((prev) => prev + 1);
      setLoading(false)
  });
  }

  return (
    <div className="searchResultsPage">
      {loading && <Spinner initial={true}/>}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
            <div className="pageTitle">{`Search ${data.total_results > 1 ? "results" : "result"} for '${query}'`}</div>
            <InfiniteScroll
                                className="content"
                                dataLength={data?.results?.length || []}
                                next={fetchNextPageData}
                                hasMore={page <= data?.total_pages}
                                loader={<Spinner />}
                            >
                                {data?.results?.map((item, index) => {
                                    if (item.media_type === "person") return;
                                    return (
                                        <MovieCard
                                            key={index}
                                            data={item}
                                            fromSearch={true}
                                        />
                                    );
                                })}
                            </InfiniteScroll>
             </>
          ) : (
            <>
            <span className='resultNotFound'>Sorry, Results Not Found.</span>
            <img className='image' src={`${noResults}`} alt="" />
            </>
          )}  
        </ContentWrapper>
      )}
    </div>
  )
}

export default SearchResult