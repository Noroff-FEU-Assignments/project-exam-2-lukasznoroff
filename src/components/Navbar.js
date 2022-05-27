import {Link, NavLink} from "react-router-dom";
import {useState} from "react";
import styled from "styled-components";
import {ReactComponent as Logo} from "../images/holidaze-logo.svg";


const Navbar = () => {
    const [hamburger, setHamburger] = useState(false);
    return (
        <StyledNavbar>
            <Link to="/">
                <Logo/>
            </Link>
            <StyledNav>
                <StyledUl hamburger={hamburger} onClick={() => setHamburger(false)}>
                    <NavLink to="/">
                        <li className="nav-link">Home</li>
                    </NavLink>
                    <NavLink to="hotels">
                        <li className="nav-link">Hotels</li>
                    </NavLink>
                    <NavLink to="contact">
                        <li className="nav-link">Contact</li>
                    </NavLink>
                    <NavLink to="login">
                        <li className="nav-link">Login</li>
                    </NavLink>
                </StyledUl>
                <StyledHamburger onClick={() => setHamburger(!hamburger)}>
                    <i className={hamburger ? "fas fa-times" : "fas fa-bars"}/>
                </StyledHamburger>
            </StyledNav>
        </StyledNavbar>
    );
};

export default Navbar;

const StyledNavbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90vw;
  min-height: 10vh;
  margin: 0 auto;
  color: #000;
  border-bottom: 1px solid #000;
  @media (max-width: 768px) {
  }

  h1 {
    font-size: 30px;
  }

  svg {
    width: 60%;
    height: 60%;
  }
`;

const StyledNav = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 75%;
  @media (max-width: 768px) {
    width: 100%;
  }

  a {
    border: 1px solid transparent;
  }

  a.active {
    border-radius: 4px;
    border: 1px solid #e6b022;;
    color: #e6b022;
    @media (max-width: 768px) {
      background-color: transparent;
      display: none;
    }
  }
`;


const StyledUl = styled.ul`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 75%;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: 2;
    position: absolute;
    background-color: #f9f8f6;
    top: 8vh;
    width: 100%;
    height: 100%;
    transition: transform 0.5s ease-in-out;
    transform: ${({hamburger}) => hamburger ? "translateX(5%)" : "translateX(-100%)"};
  }

  .nav-link {
    padding: 5px 10px;
    transition: 0.3s ease-in-out;
    border: 1px solid transparent;
    @media (max-width: 768px) {
      padding-bottom: 30px;
      margin: 20px;
    }

    &:hover {
      color: #e6b022;
    }
  }
`;

const StyledHamburger = styled.button`
  display: none;
  @media (max-width: 768px) {
    display: block;
    border: none;
    background-color: #f9f8f6;
  }

  .fas {
    font-size: 25px;
    color: #000;
  }
`;