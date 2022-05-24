import Heading from "../components/Heading";
import { useFetch } from "../hooks/useFetch";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import { BASE_URL } from "../constants/api";
import { motion } from "framer-motion";
import { pageTransition } from "../animation/animation";
import { ReactComponent as Spinner } from "../images/spinner.svg";

const Hotels = () => {

    const [searchHotel, setSearchHotel] = useState("");
    const hotelsURL = `wp/v2/hotel/?_embed&include&per_page=99`;
    const url = `${BASE_URL}${hotelsURL}`;
    const { data: hotels, loading, error } = useFetch(url);
    console.log(hotels)
    return (
        <motion.div className="container" variants={pageTransition} initial="hidden" animate="show">
            <HeadingWrapper>
                <Heading>Hotels in our town</Heading>
                <input type="text" placeholder="find your hotel" onChange={(e) => {
                    setSearchHotel(e.target.value)
                }} />
            </HeadingWrapper>
            <HotelsContainer>
                {loading && <Spinner />}
                {error && <div className="error-message">An error occurred</div>}
                {hotels && hotels.filter((item) => {
                    if (searchHotel === "") {
                        return item;
                    } else if (item.title.rendered.toLowerCase().includes(searchHotel.toLowerCase())) {
                        return item;
                    }
                    return false
                }).map((hotel) => (
                    <div key={hotel.id}>
                        <div className="hotel-wrapper">
                            <div className="img-wrapper">
                                <img src={hotel._embedded["wp:featuredmedia"][0].source_url} alt={hotel.slug} />
                            </div>
                            {/*<p dangerouslySetInnerHTML={{__html: hotel.content.rendered}}></p>*/}
                            <div className="content-wrapper">
                                <h3>{hotel.title.rendered}</h3>
                                <div className="bottom-content">
                                    <p className="text-price">Price: {hotel.acf.price}$ / per night</p>
                                    <Link className="more-link" to={`/hotel/${hotel.id}`}>More</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
                }
            </HotelsContainer>
        </motion.div>
    );
};

export default Hotels;

const HeadingWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: clamp(20px, 1.3vw, 30px) 0 clamp(20px, 1.3vw, 30px);

  h1 {
   font-size: clamp(20px, 2vw, 58px);
  }

  input {
      display: flex;
      align-self: center;
      max-height: 20px;
      padding: 20px
  }
`;

const HotelsContainer = styled.div`
  display: grid;
  //grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 30px;
  grid-gap: 60px;
  //gap: 5vw;


  .hotel-wrapper {
    //width: 100%;
    //height: 100%;
    height: clamp(420px, 25vw, 400px);
    border: 2px solid #f2efeb;
    background-color: #f2efeb;

    .img-wrapper {
      height: 350px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;

    }

    .content-wrapper {
      //padding: 10px;
      margin-top: 10px;
      padding: 0 8px;
    }

    .bottom-content {
      display: flex;
      justify-content: space-between;
      margin-top: 8px;
      .text-price {
        font-size: 12px;
      }
      .more-link{
        transition: 0.3s;
        &:hover {
            color: #e6b022;
        }
      }
    }
  }

`;


