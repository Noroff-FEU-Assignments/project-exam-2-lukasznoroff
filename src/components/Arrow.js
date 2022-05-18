import {svgArrow} from "../animation/animation";
import {motion} from "framer-motion";
import styled from "styled-components";

const Arrow = () => {
    return (
        <AnimArrow>
            <motion.svg variants={svgArrow} width="48px" height="48px" viewBox="0 0 48 48" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="48" fill="white" fillOpacity="0.01"/>
                <motion.path initial={{pathLength: 0, pathOffset: 1}} animate={{pathLength: 1, pathOffset: 0}}
                             transition={{duration: 7}} d="M41.9999 24H5.99992" stroke="#e6b022" strokeWidth="4"
                             strokeLinecap="round" strokeLinejoin="round"/>
                <motion.path initial={{pathLength: 0, pathOffset: 1}} animate={{pathLength: 1, pathOffset: 0}}
                             transition={{duration: 5}} d="M30 12L42 24L30 36" stroke="#e6b022" strokeWidth="4"
                             strokeLinecap="round"
                             strokeLinejoin="round"/>
            </motion.svg>
        </AnimArrow>
    );
};

export default Arrow;

const AnimArrow = styled.div`
  transition: all ease-in-out .5s;

  &:hover {
    transform: scale(1.1) translateX(5px);
  }
`;