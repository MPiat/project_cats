import React, {useState, useEffect} from "react";
import axios from 'axios';

const Cat = (props) => {
    const [cats, setCats] = useState([]);
    const[number, setNumber] = useState(-1);
    useEffect(() =>{
        axios.get('http://localhost:5000/cats')
        .then(response => setCats(response.data))
        .catch(error => console.log(error));
    }, []);

    const handleCatClick = (event) => {
        console.log(event.target);
    }

    // const handleNumberChange = (event ) => {
    //     setNumber(event.target.value);
    //     props.changeParentHandler(event.target.value);  
        
    // };

    return (
    <>
    <h1>Lista Kotów</h1>
        <div>
            {cats.map(cat => (<div key={cat.id} onClick={handleCatClick}>{cat.id}. {cat.name}</div>))}
        </div>
        {/* <div>
            <div>Number {number}</div>
            <input onChange={handleNumberChange}/>
        </div> */}
    </>
    );
}



export default Cat;