const { Pool } = require('pg');

const pgClient = new Pool({
    user: "postgres",
    password: "P@ssw0rd123",
    database: "postgres",
    host: "mypostgres",
    port: "5432"
});

pgClient.on('error', () => {
    console.log("Postgres not conencted");
});

function checkOrInstantiateTable(){
    pgClient.query(`CREATE TABLE IF NOT EXISTS cats (
            ID SERIAL PRIMARY KEY     NOT NULL,
            name           TEXT    NOT NULL,
            age            INT     NOT NULL
        );`)
    .catch( (err) => {
        console.log(err);
    });
};
const createCat = (request, response) => {
    const { name, age } = request.body
  
    pgClient.query('INSERT INTO cats (name, age) VALUES ($1, $2)', [name, age], (error, result) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Cat added with ID: ${result.insertId}`)
    })
  }



module.exports = {
    checkOrInstantiateTable,
    createCat
  }