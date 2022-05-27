import { useState, useEffect } from "react";
import useAxios from "../hooks/useAxios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styled from "styled-components";
import MediaDropdown from "../components/MediaDropdown";

const schema = yup.object().shape({
    title: yup.string().required().min(5),
    content: yup.string().required().min(20),
    price: yup.number().positive().typeError("please enter price"),
    featured_media: yup.string().required("please select image")
});



const AdminAddHotel = () => {
    const http = useAxios();
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    });

    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => setShowModal(false), 3000);
        return () => clearTimeout(timer);
    }, [showModal]);

    async function onSubmit(data) {

        data.status = "publish";
        console.log(data);

        const addHotel = {
            title: data.title,
            content: data.content,
            status: "publish",
            featured_media: data.featured_media,
            fields: {
                price: data.price,
            }
        }

        try {
            const response = await http.post("/wp/v2/hotel?data", addHotel);
            console.log("response:", response.data);
            setShowModal(true);
            reset();
        } catch (error) {
            console.log("error", error);
        }
    }

    return (
        <div>
            {showModal && <Modal>HOTEL HAS BEEN ADDED</Modal>}
            <StyledForm onSubmit={handleSubmit(onSubmit)}>
                <input {...register("title")} placeholder="hotel" />
                <ErrorMsg>{errors.title?.message}</ErrorMsg>
                <input {...register("price")} placeholder="price" />
                <ErrorMsg>{errors.price?.message}</ErrorMsg>
                <textarea {...register("content")} placeholder="content" />
                <ErrorMsg>{errors.content?.message}</ErrorMsg>
                <MediaDropdown register={register} />
                <ErrorMsg>{errors.featured_media?.message}</ErrorMsg>
                <input className="btn" type="submit" value="Submit" />
            </StyledForm>
        </div>
    );
};

export default AdminAddHotel;


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
  top: 35%;
  font-size: 14px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
  padding: 2%;
`;