import React, {useState, useEffect} from "react";
import axios from 'axios';


const AddCat = (props) => {

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const handleSubmit = (event) =>{
        console.log(`Dane do wyslania ${title} ${body}`);
        axios.post('http://localhost/api/cats',{
            name: title,
            age: body,
        })
        .then(response => console.log(response))
        .catch(error => console.log(error));
        event.preventDefault();
    };

    return (
        <>
            <h1>Dodawanie nowych kotow</h1>
            <label for="addcatname">Name:</label>
            <input id="addcatname" type='text' value={title} onChange={event => setTitle(event.target.value)}/><br/>
            <label for="addcatage">Age:</label>
            <input id="addcatage" type='number' value={body} onChange={event => setBody(event.target.value)}/><br/>
            <input type='submit' value='OK' onClick={handleSubmit}/>
        </>
    );
};

export default AddCat;