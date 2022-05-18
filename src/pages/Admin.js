import Heading from "../components/Heading";
import {useNavigate, useParams} from "react-router-dom";

import {useContext} from "react";
import AuthContext from "../context/AuthContext";
// import {BASE_URL} from "../constants/api";
// import {useFetch} from "../hooks/useFetch";

import AdminPanel from "./AdminPanel";


const Admin = () => {
    const [auth, setAuth] = useContext(AuthContext);
    const navigate = useNavigate();

    function logout() {
        setAuth(null)
        navigate("/");
    }

    return (
        <div className="container">
            <Heading>Admin</Heading>
            <button onClick={() => logout()}>Logout</button>
            <AdminPanel/>
        </div>
    );
};

export default Admin;