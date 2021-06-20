import React, {useState, useEffect} from "react";
import axios from 'axios';


const UpdateCat = (props) => {

    const [catID, setCatID] = useState("");
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    // Both parameters have to be passed (name and age)
    const handleSubmit = (event) =>{
        axios.put(`/api/cats/${catID}`,{
            name: title,
            age: body,
        })
        .then(response => console.log(response))
        .catch(error => console.log(error));
        event.preventDefault();
    };

    return (
        <>
            <h1>Aktualizowanie danych kotow</h1>
            <label for="updatecatid">ID:</label>
            <input id="updatecatid" type='number' value={catID} onStar onChange={event => setCatID(event.target.value)}/><br/>
            <label for="updatecatname">Name:</label>
            <input id="updatecatname" type='text' value={title} onChange={event => setTitle(event.target.value)}/><br/>
            <label for="updatecatage">Age:</label>
            <input id="updatecatage" type='number' value={body} onChange={event => setBody(event.target.value)}/><br/>
            <input type='submit' value='OK' onClick={handleSubmit}/>
        </>
    );
};

export default UpdateCat;