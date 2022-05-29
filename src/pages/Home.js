import styled from "styled-components";
import {motion} from "framer-motion";
import bergen from "../images/bergen.jpg"
import Heading from "../components/Heading";
import {
    textAnimation,
    textAnimation2,
    container,
    container2,
    imageAnimation,
    pageTransition
} from "../animation/animation";
import Arrow from "../components/Arrow";
import {Link} from "react-router-dom";

const Home = () => {
    return (
        <motion.div className="container" variants={pageTransition} initial="hidden" animate="show">
            <HeadingHeroWrapper>
                <HeadingHero>
                    <Heading><span className="holidaze-color">holidaze</span> better way to stay</Heading>
                </HeadingHero>

                <div className="wrapper">
                    <motion.div variants={container2} initial="hidden" animate="show" className="hero-text">
                        <motion.p variants={textAnimation2}>Slip your body and mind</motion.p>
                        <motion.p variants={textAnimation2}>into the spirit of Bergen.</motion.p>
                        <motion.p variants={textAnimation2}>A marine space to treat yourself</motion.p>
                        <motion.p variants={textAnimation2}>and find your balance.</motion.p>
                    </motion.div>
                    <motion.div variants={container} initial="hidden" animate="show" className="slicer-wrapper">
                        <div className="heading-hero-slice">
                            <motion.h2 variants={textAnimation}>find
                            </motion.h2>
                        </div>
                        <div className="heading-hero-slice">
                            <motion.h2 variants={textAnimation}>your
                            </motion.h2>
                        </div>
                        <div className="heading-hero-slice">
                            <motion.h2 variants={textAnimation}>hotel
                            </motion.h2>
                            <Link to="/hotels">
                                <Arrow/>
                            </Link>
                        </div>
                    </motion.div>
                </div>
                <Image>
                    <motion.img variants={imageAnimation} initial="hidden" animate="show" src={bergen} alt="bergen"/>
                </Image>
            </HeadingHeroWrapper>
        </motion.div>
    );
};

export default Home;

const HeadingHeroWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 90vh;
  @media (max-width: 768px) {
    display: block;
    height: auto;
    position: relative;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    top: 50%;
    position: absolute;
    @media (max-width: 768px) {
      top: 90vw;
    }

    .heading-hero-slice:last-child {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .hero-text {
      margin-bottom: 35px;
      font-size: 18px;
      color: #a9a955;
      @media (max-width: 768px) {
        font-size: 15px;
      }
    }
  }
`;


const HeadingHero = styled.div`
  flex: 1;
  height: 80%;
  h1 {
    font-size: clamp(20px, 4vw, 78px);
  }
  .holidaze-color {
    color: #e6b022;
  }

  .heading-hero-slice {
    overflow: hidden;
    background-color: #fff;
    padding-top: 20px;
  }
`;

const Image = styled.div`
  flex: 1;
  overflow: hidden;
  object-fit: cover;
  height: 80%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

