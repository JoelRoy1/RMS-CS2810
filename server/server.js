//initializing dependencies and constants needed for the api.
const express = require('express');
const pool = require('./db');
const cors = require('cors');
const port = 9000;
const app = express();

//middleware
app.use(express.json());
app.use(cors())

/**
 * HTTP get request. sends the result from the database.
 */
app.get('/', async (req,res) => {
  try {
    const data = await pool.query('SELECT * FROM test_table WHERE id = 1');
    res.status(200).send(data.rows[0])
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

})

/**
 * Listens for connections on port 9000 and
 * initializes http server if found.
 */
app.listen(port, function (err){
  if (err) console.log(err);
  console.log(`Server listening on Port: ${port}`);
});
