import {useContext, useState} from "react";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import {useNavigate} from "react-router-dom";
import Heading from "../components/Heading";
import styled from "styled-components";
import {pageTransition} from "../animation/animation";
import {motion} from "framer-motion";

const url = "https://blog-lukas.lukaswebdeveloper.com/wp-json/jwt-auth/v1/token";

const schema = yup.object().shape({
    username: yup.string().required("Please enter your username"),
    password: yup.string().required("Please enter your password"),
});

export default function From() {
    const {register, handleSubmit, formState: {errors}, reset} = useForm({
        resolver: yupResolver(schema)
    });
    const [modal, setModal] = useState(false);
    const [auth, setAuth] = useContext(AuthContext);
    const navigate = useNavigate();

    async function onSubmit(data) {
        setModal(false);
        console.log(data);
        reset();
        try {
            const response = await axios.post(url, data);
            console.log("response", response.data);
            setAuth(response.data);
            navigate("/admin");
        } catch (error) {
            console.log("error", error);
            setModal(true);
        }
    }

    return (
        <motion.div className="container" variants={pageTransition} initial="hidden" animate="show">
            <Heading>Login</Heading>
            <FormWrapper>
                {modal && <Modal>The username or password is incorrect</Modal>}
                <StyledForm onSubmit={handleSubmit(onSubmit)}>
                    <input {...register("username")} placeholder="Username"/>
                    <ErrorMsg>{errors.username?.message}</ErrorMsg>
                    <input {...register("password")} placeholder="Password"/>
                    <ErrorMsg>{errors.password?.message}</ErrorMsg>
                    <input className="btn" type="submit" value="Submit"/>
                </StyledForm>
            </FormWrapper>
        </motion.div>
    );
}


const FormWrapper = styled.div`
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`;

const StyledForm = styled.form`
  display: block;
  height: 350px;
  max-width: 400px;
  background-color: #fff;
  padding: clamp(20px, 8vw, 60px);

  > input {
    display: block;
    width: 200px;
    margin-bottom: 5px;
    padding: 5px;

    &:last-child {
      margin-bottom: 0;
      width: 30%;
      cursor: pointer;
    }
  }
`;

const ErrorMsg = styled.p`
  color: #f50404;
  display: inline-block;
  margin-bottom: 20px;
  font-size: 12px;
`;

const Modal = styled.h3`
  background-color: #fff;
  position: absolute;
  text-align: center;
  top: 20%;
  font-size: 14px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
  padding: 2%;
`;