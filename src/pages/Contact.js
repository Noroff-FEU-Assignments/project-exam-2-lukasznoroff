import styled from "styled-components";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import useAxios from "../hooks/useAxios";
import {useEffect, useState} from "react";
import Heading from "../components/Heading";
import {pageTransition} from "../animation/animation";
import {motion} from "framer-motion";

const schema = yup.object().shape({
    name: yup.string().required().min(3),
    surname: yup.string().required().min(4),
    email: yup.string().email().required(),
    message: yup.string().required().min(20)
});

export default function From() {
    const http = useAxios();
    const {register, handleSubmit, formState: {errors}, reset} = useForm({
        resolver: yupResolver(schema)
    });

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowModal(false), 3000);
        return () => clearTimeout(timer);
    }, [showModal]);

    async function onSubmit(data){
        data.status = "publish";

        const message = {
            title: data.title,
            content: data.content,
            status: "publish",
            fields: {
                name: data.name,
                surname: data.surname,
                email: data.email,
                message: data.message
            }
        }
        console.log(message)

        try {
            const response = await http.post("/wp/v2/message?data", message);
            console.log("response:", response.data);
            if (response.data) {
                setShowModal(true);
                reset();
            }
        } catch (error) {
            console.log("error", error);
        }
    }

    return (
        <motion.div className="container" variants={pageTransition} initial="hidden" animate="show">
            <HeadingWrapper>
                <Heading>Contact</Heading>
            </HeadingWrapper>
            <FormWrapper>
                {showModal && <Modal>Your message has been send</Modal>}
                <StyledForm onSubmit={handleSubmit(onSubmit)}>
                    <input {...register("name")} placeholder="name"/>
                    <ErrorMsg>{errors.name?.message}</ErrorMsg>
                    <input {...register("surname")} placeholder="surname"/>
                    <ErrorMsg>{errors.surname?.message}</ErrorMsg>
                    <input {...register("email")} placeholder="email"/>
                    <ErrorMsg>{errors.email?.message}</ErrorMsg>
                    <textarea {...register("message")} placeholder="message"/>
                    <ErrorMsg>{errors.message?.message}</ErrorMsg>
                    <input className="btn" type="submit" value="Submit"/>
                </StyledForm>
            </FormWrapper>
        </motion.div>
    );
}

const HeadingWrapper = styled.div`
    h1 {
        padding: clamp(20px, 1.3vw, 30px) 0;
        font-size: clamp(20px, 4vw, 58px);
    }
`;

const FormWrapper = styled.div`
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`;

const StyledForm = styled.form`
  display: block;
  height: 450px;
  max-width: 400px;
  background-color: #fff;
  padding: clamp(20px, 8vw, 60px);
  > input, select, textarea {
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
  input[type="submit"] {
    margin-top: 20px;
  }
`;

const ErrorMsg = styled.p`
  color: #f50404;
  display: inline-block;
  margin-bottom: 20px;
  font-size: 12px;
`;

const Modal = styled.div`
  background-color: #fff;
  position: absolute;
  text-align: center;
  top: 20%;
  font-size: 14px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
  padding: 2%;
`;