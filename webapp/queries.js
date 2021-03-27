const { Pool } = require('pg');
const redis = require('redis');

const pgClient = new Pool({
    user: "postgres",
    password: "P@ssw0rd123",
    database: "postgres",
    host: "mypostgres",
    port: "5432"
});

// pgClient.on('error', () => {
//     console.log("Postgres not connected");
// });


// Creating and testing redis connection
const redisClient = redis.createClient({
  host: "myredis",
  port: 6379,
  // retry_strategy: () => 1000
});

// redisClient.on('connect', () => {
//   console.log('Connected to Redis server');
// });

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

  // Check if cat with given id exists in Redis and if it does fetch it from there
  // if not then fetch it from postgres
  redisClient.exists(id, (error, result) => {
    if (error) {
      throw error;
    }
    

    if(result == 1) {
      console.log("Found data in Redis cache");
      redisClient.hgetall(id, function(error, object) {
        if(error) {
          throw error;
        }
        response.status(200).header('cache', 'true').json(object);
      })
    } else {
      console.log("Data not found in Redis cache")
      pgClient.query('SELECT * FROM cats WHERE id = $1', [id], (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).json(results.rows);
      })
    }
  });
};

const createCat = (request, response) => {
    const { name, age } = request.body
    
    pgClient.query('INSERT INTO cats (name, age) VALUES ($1, $2) RETURNING ID', [name, age], (error, result) => {
      if (error) {
        throw error;
      }

      var record_id = String(result.rows[0].id);

      // Adding cat to Redis
      console.log(typeof(record_id));
      redisClient.hmset(record_id,'name', name, 'age', age);

      response.status(201).send(`Cat added with ID: ${record_id}`)
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
        throw error;
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