const express = require("express")

const app = express()

app.get('/hello', (req, res) => {
    res.send("Hello from cats project")
});

const PORT = 9090;

app.listen(PORT, () => {
    console.log(`API is listening of port ${PORT}`);
});