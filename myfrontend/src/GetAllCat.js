import React, {useState, useEffect} from "react";
import axios from 'axios';

const GetAllCat = (props) => {
    const [cats, setCats] = useState([]);
    const[number, setNumber] = useState(-1);
    useEffect(() =>{
        // axios.get('http://localhost:9090/api/cats')
        axios.get('http://localhost/api/cats')
        .then(response => setCats(response.data))
        .catch(error => console.log(error));
    }, []);

    const handleCatClick = (event) => {
        console.log(event.target);
    }

    return (
    <>
    <h1>Lista Kotów</h1>
        <div>
            {cats.map(cat => (<div key={cat.id} onClick={handleCatClick}>{cat.id}. Name: {cat.name} Age: {cat.age}</div>))}
        </div>
    </>
    );
}



export default GetAllCat;