import useAxios from "../hooks/useAxios";
import {useEffect, useState} from "react";


const AdminBooking = () => {

    const [post, setPost] = useState([]);
    const http = useAxios();

    useEffect(function () {
        async function getPost() {
            try {
                const response = await http.get("wp/v2/booking")
                console.log("response", response);
                setPost(response.data)
            } catch (error) {
                console.log(error)
            }
        }

        getPost();
    }, [])

    return (
        <div className="container">
            <ul className="admin-box">
                {post.map((msg, index) => {
                    console.log(msg)
                    return (
                        <li key={index} className="admin-data">
                            <p><span className="text-bold">Name:</span>{msg.acf.name}</p>
                            <p><span className="text-bold">Surname:</span> {msg.acf.surname}</p>
                            <p><span className="text-bold">Email:</span> {msg.acf.email}</p>
                            <p><span className="text-bold">Number of guests:{msg.acf.num_guests}</span></p>
                            <p><span className="text-bold">Start date:{msg.acf.start_date}</span></p>
                            <p><span className="text-bold">End date: {msg.acf.end_date}</span></p>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
};

export default AdminBooking;