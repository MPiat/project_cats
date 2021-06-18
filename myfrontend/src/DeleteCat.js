import React, {useState, useEffect} from "react";
import axios from 'axios';


const DeleteCat = (props) => {

    const [catID, setCatID] = useState("");

    // TODO: Add call to get cat of specified id to populate the inintial data
    // Both parameters have to be passed (name and age)
    const handleSubmit = (event) =>{
        // console.log(`Dane do wyslania ${title} ${body}`);
        // axios.delete(`http://localhost:9090/api/cats/${catID}`)
        axios.delete(`http://localhost/api/cats/${catID}`)
        .then(response => console.log(response))
        .catch(error => console.log(error));
        event.preventDefault();
    };

    return (
        <>
            <h1>Usuwanie kotow</h1>
            <label for="deletecatid">ID:</label>
            <input id="deletecatid" type='number' value={catID} onStar onChange={event => setCatID(event.target.value)}/><br/>
            <input type='submit' value='OK' onClick={handleSubmit}/>
        </>
    );
};

export default DeleteCat;