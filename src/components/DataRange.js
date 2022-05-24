import {useState, useEffect} from "react";
import useAxios from "../hooks/useAxios";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import styled from "styled-components";
import Modal from "./Modal";

const schema = yup.object().shape({
    name: yup.string().required("Please enter your name").min(3),
    surname: yup.string().required("Please enter your surname").min(4),
    email: yup.string().email().required("Email is a required field"),
    phone: yup.number().positive().typeError("Please enter your phone number").required(),
    startDate: yup.date(),
    endDate: yup.date(),
    numGuests: yup.number().typeError("Please select number of guests").required()
});

const DataRange = () => {
    const [numGuests, setNumGuest] = useState(1);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowModal(false), 3000);
        return () => clearTimeout(timer);
    }, [showModal]);

    const http = useAxios();
    const {register, handleSubmit, formState: {errors}, reset} = useForm({
        resolver: yupResolver(schema)
    });


    function generateDateString(dateObject) {
        const year = dateObject.getFullYear();
        const month = String(dateObject.getMonth() + 1).padStart(2, "0");
        const day = String(dateObject.getDate()).padStart(2, "0");
        const dateString = `${year}-${month}-${day}`;
        return dateString;
    }

    const today = new Date();
    const todayString = generateDateString(today);
    const [startDate, setStartDate] = useState(todayString);
    const [endDate, setEndDate] = useState(todayString);

    async function onSubmit(data) {
        data.status = "publish";
        console.log(data);
        console.log(startDate)
        const startDateObject = new Date(data.startDate);
        const endDateObject = new Date(data.endDate);
        const startDateString = generateDateString(startDateObject);
        const endDateString = generateDateString(endDateObject);

        console.log(endDate)
        console.log(numGuests)
        const message = {
            status: "publish",
            fields: {
                name: data.name,
                surname: data.surname,
                email: data.email,
                phone: data.phone,
                num_guests: data.numGuests,
                start_date: startDateString,
                end_date: endDateString,
            }
        }

        try {
            const response = await http.post("/wp/v2/booking?data", message);
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
        <form onSubmit={handleSubmit(onSubmit)}>
            <Wrapper>
                <BookingForm>
                    <input {...register("name")} placeholder="name"/>
                    <ErrorMsg>{errors.name?.message}</ErrorMsg>
                    <input {...register("surname")} placeholder="surname"/>
                    <ErrorMsg>{errors.surname?.message}</ErrorMsg>
                    <input {...register("email")} placeholder="email"/>
                    <ErrorMsg>{errors.email?.message}</ErrorMsg>
                    <input type="tel" {...register("phone")} placeholder="phone"/>
                    <ErrorMsg>{errors.phone?.message}</ErrorMsg>
                </BookingForm>
                {showModal && <Modal>THANK YOU FOR YOUR RESERVATION</Modal>}
                <Calender>
                    <label>
                        <span>Check-in</span>
                        <input name="startDate" type="date" value={todayString} {...register("startDate")}
                               onChange={(event => setStartDate(event.target.value))}
                               value={startDate}
                               placeholder="check-in date"/>
                    </label>
                    <label>
                        <span>Check-out</span>
                        <input name="endDate" type="date" value={todayString} {...register("endDate")}
                               onChange={(event => setEndDate(event.target.value))}
                               value={endDate}
                               placeholder="check-out date"/>
                    </label>
                    <label>
                        <span>Number of guests</span>
                        <input {...register("numGuests")} onChange={(event => setNumGuest(event.target.value))}
                               className="number-guest" type="number" placeholder="0" min={1}/>
                    </label>
                        <ErrorMsg>{errors.numGuests?.message}</ErrorMsg>
                    <div className="btn-submit-wrapper">
                        <input className="btn-submit btn" type="submit" value="Book"/>
                    </div>
                </Calender>
            </Wrapper>
        </form>
    );
};

export default DataRange;


const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 100px;
  margin-bottom: 100px;
  background-color: #e0d7ce;
  //background-color: #e6d4c6;
  //background-color: #f2efeb;
  padding: 40px;

  span {
    font-size: 12px;
    width: 100%;
  }

  @media (max-width: 768px) {
    display: block;
  }
`;


const Calender = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 40%;
  flex: 50%;

  @media (max-width: 768px) {
    max-width: 100%;
  }


  label, input {
    display: flex;
    margin-bottom: 10px;
    width: 100%;
    align-items: start;
  }

  input {
    padding: 5px;
  }
  
  .number-guest {
    width: 25%;
  }

  .btn-submit-wrapper {
    display: flex;
    justify-content: flex-end;
    width: 100%;
  }

  .btn-submit {
    width: 100px;
    display: flex;
    justify-content: center;
    cursor: pointer;
    padding: 10px;
    margin-top: 15px;
  }
`;

const BookingForm = styled.div`
  display: flex;
  flex-direction: column;
  flex: 50%;
  max-width: 30%;
  input {
    padding: 10px;
  }
  @media (max-width: 768px) {
    max-width: 100%;
    margin-bottom: 30px;
  }
`;

const ErrorMsg = styled.p`
  color: #f50404;
  display: inline-block;
  margin-bottom: 20px;
  font-size: 12px;
`;
