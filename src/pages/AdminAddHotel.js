import useAxios from "../hooks/useAxios";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import styled from "styled-components";
import MediaDropdown from "../components/MediaDropdown";

const schema = yup.object().shape({
    title: yup.string().required().min(1),
    content: yup.string().required().min(1),
    price: yup.number().required().min(1),
});

const AdminAddHotel = () => {

    const http = useAxios();
    const {register, handleSubmit, formState: {errors}, reset} = useForm({
        resolver: yupResolver(schema)
    });


    async function onSubmit(data){

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
            reset();
        } catch (error) {
            console.log("error", error);
        }
    }

    return (
        <div>
            <StyledForm onSubmit={handleSubmit(onSubmit)}>
                <input {...register("title")} placeholder="hotel"/>
                <ErrorMsg>{errors.title?.title}</ErrorMsg>
                <input {...register("price")} placeholder="price"/>
                <ErrorMsg>{errors.price?.price}</ErrorMsg>
                <textarea {...register("content")} placeholder="content"/>
                <ErrorMsg>{errors.content?.content}</ErrorMsg>
                <MediaDropdown register={register}/>
                <input className="btn" type="submit" value="Submit"/>
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

// const Modal = styled.h3`
//   background-color: #fff;
//   position: absolute;
//   text-align: center;
//   top: 20%;
//   font-size: 14px;
//   box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
//   padding: 2%;
// `;