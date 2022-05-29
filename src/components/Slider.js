import styled from "styled-components";
import images from "../images";
import '@splidejs/splide/css';
import {Splide, SplideSlide} from '@splidejs/react-splide';

const Slider = () => {
    return (
        <div>
            <div className="wrapper">
                <Splide  options={{
                    gap: "2vw",
                }}>
                    {images.map((item, index) => {
                        return (
                            <SplideSlide key={index} >
                                <Card>
                                    <img src={item} alt={item}/>
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
  margin-top: 120px;
  @media (max-width: 768px) {
    height: 450px;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    @media (max-width: 768px) {
      width: auto;
      padding: 0;
    }
  }
`;