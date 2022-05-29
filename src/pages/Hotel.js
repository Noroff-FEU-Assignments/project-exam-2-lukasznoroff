import {useParams} from "react-router-dom";
import {useFetch} from "../hooks/useFetch";
import {Link} from "react-router-dom";
import {BASE_URL} from "../constants/api";
import styled from "styled-components";
import {motion} from "framer-motion";
import {pageTransition} from "../animation/animation";
import Slider from "../components/Slider"
import Heading from "../components/Heading";
import DataRange from "../components/DataRange";
import {ReactComponent as Spinner} from "../images/spinner.svg";

const Hotel = () => {

    const {id} = useParams();
    const hotelURL = `wp/v2/hotel/${id}?_embed`;
    const url = `${BASE_URL}${hotelURL}`;
    const {data: hotel, loading, error} = useFetch(url);

    return (
        <motion.div className="container" variants={pageTransition} initial="hidden" animate="show">
            <div className="hotel-container">
                {loading && <Spinner/>}
                {error && <div className="error-message">An error occurred</div>}
                {hotel && (
                    <>
                        <ColsWrapper>
                            <div className="col-left col">
                                <Heading>Hotel</Heading>
                                <h2>{hotel.title.rendered}</h2>
                                <p dangerouslySetInnerHTML={{__html: hotel.content.rendered}}></p>
                            </div>
                            <div className="col-right col">
                                <img src={hotel._embedded["wp:featuredmedia"][0].source_url} alt={hotel.slug}/>
                            </div>
                        </ColsWrapper>
                        <SliderWrapper>
                            <Slider/>
                            <div className="room-info-wrapper">
                                <div className="room">
                                    <h3>ROOM</h3>
                                    <p>This room is suitable for single use.
                                        A compact and minimal design create the
                                        perfect
                                        environment for a good night’s sleep.
                                        In your room, enjoy a hot cup of tea with a movie on cable.
                                    </p>
                                </div>
                                <div className="service">
                                    <h3>Features:</h3>
                                    <p>24 square meters</p>
                                    <p>Bed size : 1800 × 2010</p>
                                    <p>Coffee machine</p>
                                    <p>Shower room</p>
                                    <p>Work desk</p>
                                    <p>Tablet PC</p>
                                    <p>Free Wi-Fi</p>
                                    <p>TV channels</p>
                                    <p>Video streaming</p>
                                </div>
                                <div className="section-info-text">
                                    <p>
                                        * If you have any questions or would like to receive further information, please
                                        send
                                        us an email and we’d be delighted to help you.
                                    </p>
                                    <div className="contact-wrapper">
                                        <Link to="/contact">
                                            <li className="contact-link">Contact</li>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </SliderWrapper>
                        <DataRange/>
                    </>
                )}
            </div>
        </motion.div>
    );
};

export default Hotel;

const ColsWrapper = styled.div`
  display: flex;
  height: 70vh;
  justify-content: space-between;
  @media (max-width: 768px) {
    display: block;
    height: auto;
  }

  .col {
    flex: 0 0 50%;
    margin-top: clamp(30px, 3vw, 80px)
  }

  .col-right {
    position: relative;

    &:before {
      content: "";
      background-color: rgba(11, 6, 6, 0.71);
      width: 100%;
      height: 100%;
      position: absolute;
      opacity: 0.3;
      width: 100%;
      filter: blur(30px) saturate(100%);
      left: 51%;
      bottom: 49%;
      transform: translate(-50%, 50%);
      width: 100%;
      height: 100%;
      filter: drop-shadow(46px 44px 44px #5d4f29) invert(10%);
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: grayscale(50%);
    }
  }

  .col-left {
    padding: 0 clamp(30px, 3vw, 80px) 0 0;
    p {
      line-height: 1.6;
    }
    h2 {
      margin-bottom: clamp(20px, 2vw, 60px);
    }
  }
`;

const SliderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    display: block;
    width: 100%;
  }

  .room-info-wrapper {
    margin-top: 120px;
    flex: 0 0 50%;
    padding-left: clamp(30px, 3vw, 80px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .room {
      h3 {
        margin-bottom: 10px;
      }
      p {
        line-height: 1.5;
      }
    }

    .service {
      display: flex;
      flex-direction: column;
      margin-top: 20px;
      h3 {
        margin-bottom: 10px;
      }
      p {
        width: clamp(250px, 2vw, 160px);
        padding: 10px 0;
      }
    }
    
    .section-info-text {
      p {
        font-size: 14px;
      }
    }

    .contact-wrapper {
      display: flex;

      .contact-link {
        margin-top: 10px;
        padding: 5px;
        transition: 0.3s;
        border: 1px solid #000;
        &:hover {
          color: #e6b022;
          border: 1px solid #e6b022;
        }
      }
    }
  }
`;

