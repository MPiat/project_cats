import React, {useState, useEffect} from "react";
import axios from 'axios';


const GetCat = (props) => {

    const [catID, setCatID] = useState("");
    const [cat, setCat] = useState([]);

    const handleSubmit = (event) =>{
        console.log(catID);
        axios.get(`http://localhost/api/cats/${catID}`)
        .then(response => setCat(response.data))
        .catch(error => console.log(error));
        console.log(cat);
        event.preventDefault();
    };

    return (
        <>
        <div>
            <h1>Wyszukanie pojedynczego kota</h1>
            <label for="getcatid">ID:</label>
            <input id="getcatid" type='number' value={catID} onStar onChange={event => setCatID(event.target.value)}/><br/>
            <input type='submit' value='OK' onClick={handleSubmit}/>
            <br/>
            Imie: {cat.name}<br/>
            Wiek: {cat.age}
        </div>
        </>
    );
};

export default GetCat;