import useAxios from "../hooks/useAxios";
import { useEffect, useState} from "react";

const AdminContact = () => {

    const [post, setPost] = useState([]);
    const http = useAxios();

    useEffect(function (){
        async function getPost(){
            try {
                const response = await http.get("wp/v2/message")
                console.log("response", response);
                setPost(response.data)
            }catch(error){
                console.log(error)
            }
        }
        getPost();
    },[])

    return (
        <div className="container">
            <ul className="admin-box">
                {post.map((msg, index)=> {
                    console.log(msg)
                    return (
                        <li key={index} className="admin-data">
                            <p><span className="text-bold">Name:</span> {msg.acf.name}</p>
                            <p><span className="text-bold">Surname:</span> {msg.acf.surname}</p>
                            <p><span className="text-bold">Email:</span> {msg.acf.email}</p>
                            <p><span className="text-bold">Message:</span> {msg.acf.message}</p>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
};

export default AdminContact;