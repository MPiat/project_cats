import React, {useState, useEffect} from "react";
import axios from 'axios';

const Cat = (props) => {
    const [cats, setCats] = useState([]);
    const[number, setNumber] = useState(-1);
    useEffect(() =>{
        axios.get('http://localhost:9090/api/cats')
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
            {cats.map(cat => (<div key={cat.id} onClick={handleCatClick}>{cat.id}. {cat.name}</div>))}
        </div>
    </>
    );
}



export default Cat;