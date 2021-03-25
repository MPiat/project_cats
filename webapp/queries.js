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

const getCats = (request, response) => {
  pgClient.query('SELECT * FROM cats ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

const getCatById = (request, response) => {
  const id = parseInt(request.params.id)

  pgClient.query('SELECT * FROM cats WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

const createCat = (request, response) => {
    const { name, age } = request.body
  
    pgClient.query('INSERT INTO cats (name, age) VALUES ($1, $2)', [name, age], (error, result) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Cat added with ID: ${result.insertId}`)
    })
};

const updateCat = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, age } = request.body

  pgClient.query(
    'UPDATE cats SET name = $1, age = $2 WHERE id = $3',
    [name, age, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Cat modified with ID: ${id}`)
    }
  )
};

const deleteCat = (request, response) => {
  const id = parseInt(request.params.id)

  pgClient.query('DELETE FROM cats WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Cat deleted with ID: ${id}`)
  })
};

module.exports = {
    checkOrInstantiateTable,
    createCat,
    getCats,
    getCatById,
    updateCat,
    deleteCat
  }