import Carousel from "../../components/Carousel"
import useFetch from "../../hooks/useFetch"

const Recommendation = ({ mediaType, id }) => {

    const {data, loading} = useFetch(`/${mediaType}/${id}/recommendations`)
    
    return(
          <Carousel
          data={data?.results}
          loading={loading}
          title={'Recommendations'}
          endPoint={mediaType}
          />
    )
}

export default Recommendation