import Heading from "../components/Heading";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import AdminPanel from "./AdminPanel";
import styled from "styled-components";

const Admin = () => {
    const [auth, setAuth] = useContext(AuthContext);
    const navigate = useNavigate();

    function logout() {
        setAuth(null)
        navigate("/");
    }

    return (
        <div className="container">
            <Wrapper>
                <HeadingWrapper>
                    <Heading>Admin</Heading>
                </HeadingWrapper>
                <div className="button-wrapper">
                    <button className="btn" onClick={() => logout()}>Logout</button>
                </div>
            </Wrapper>
            <AdminPanel />
        </div>
    );
};

export default Admin;

const HeadingWrapper = styled.div`
    h1 {
        padding: clamp(20px, 1.3vw, 30px) 0;
        font-size: clamp(20px, 4vw, 58px);
    }
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;