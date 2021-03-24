const express = require("express")
const cors = require('cors');

const app = express()
const redis = require('redis');
const queries = require('./queries')


app.use(cors());
app.use(express.json());

// Creating and testing redis connection
const redisClient = redis.createClient({
    host: "myredis",
    port: 6379,
    // retry_strategy: () => 1000
});

redisClient.on('connect', () => {
    console.log('Connected to Redis server');
});

// Creating connection to postgresql and creating table if it doesn't exists

queries.checkOrInstantiateTable();

app.get('/hello',(req, res) => {
    res.send("Hello from cats project")
  });


app.post('/cats', queries.createCat);


const PORT = 9090;

app.listen(PORT, () => {
    console.log(`API is listening of port ${PORT}`);
});