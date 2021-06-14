const express = require("express")
const cors = require('cors');

const app = express()
const queries = require('./queries')


app.use(cors());
app.use(express.json());



// Creating connection to postgresql and creating table if it doesn't exists
queries.checkOrInstantiateTable();

app.get('/hello',(req, res) => {
    res.send("Hello from cats project")
  });

// Mapping operations to endpoints
app.get('/cats', queries.getCats);
app.get('/cats/:id', queries.getCatById);
app.post('/cats', queries.createCat);
app.put('/cats/:id', queries.updateCat);
app.delete('/cats/:id', queries.deleteCat);



const PORT = 5000;

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
});