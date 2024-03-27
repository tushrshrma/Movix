import Carousel from "../../components/Carousel"
import useFetch from "../../hooks/useFetch"

const Similar = ({ mediaType, id }) => {

    const {data, loading} = useFetch(`/${mediaType}/${id}/similar`)

    const title = mediaType ==="tv" ? "Similar Tv Shows" : "Similar Movies"
    
    return(
          <Carousel
          data={data?.results}
          loading={loading}
          title={title}
          endPoint={mediaType}
          />
    )
}

export default Similar