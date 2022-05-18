import styled from "styled-components";
import images from "../images";
import '@splidejs/splide/css';
import {Splide, SplideSlide} from '@splidejs/react-splide';
// import {useParams} from "react-router-dom";
// import {BASE_URL} from "../constants/api";
// import {useFetch} from "../hooks/useFetch";

console.log(images)
const Slider = () => {

    // const {id} = useParams();
    // const hotelURL = `wp/v2/hotel/${id}`;
    // const url = `${BASE_URL}${hotelURL}`;
    // const {data: data} = useFetch(url);
    // console.log(data)

    return (
        <div>
            <div className="wrapper">
                <Splide  options={{
                    // rewind: true,
                    gap: "2vw",

                }}>
                    {images.map((item, index) => {
                        return (
                            <SplideSlide key={index} >
                                <Card>
                                    <img src={item} alt={item}/>
                                    console.log(alt);

                                </Card>
                            </SplideSlide>
                        )
                    })}

                </Splide>
            </div>
        </div>
    );
};

export default Slider;

const Card = styled.div`
  height: clamp(500px, 27vw, 430px);
  height: clamp(600px, 27vw, 430px);
  //width: 50%;
  margin-top: 120px;
  @media (max-width: 768px) {
    height: 450px;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    //padding: 30px;
    @media (max-width: 768px) {
      width: auto;
      padding: 0;
    }
    
  }
`;