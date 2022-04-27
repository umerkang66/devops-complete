const keys = require('./keys');

// Express
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Postgres
const { Pool } = require('pg');

const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort,
});

pgClient.on('error', () => console.log('Lost PG connection'));
pgClient.on('connect', () => console.log('🚀🚀🚀 PG connection'));

// Create a initial table
pgClient
  .query('CREATE TABLE IF NOT EXISTS values (number INT)')
  .catch(err => console.log(err));

// Redis Client Setup
const redis = require('redis');
const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  // If connection is lost, try to reconnect every 1000 milliseconds
  retry_strategy: () => 1000,
});

// If the client is listening and publishing events on the redis-server, we have to create duplicate, because the connection that is used to listen or subscribe purposes, it cannot be used for other purposes
const redisPublisher = redisClient.duplicate();

// Route Handlers
app.get('/', (req, res) => {
  res.send('HI');
});

app.get('/values/all', async (req, res) => {
  const values = await pgClient.query('SELECT * FROM values');

  res.send(values.rows);
});

app.get('/values/current', (req, res) => {
  redisClient.hgetall('values', (err, values) => {
    res.send(values);
  });
});

app.post('/values', async (req, res) => {
  const index = req.body.index;
  if (parseInt(index) > 40) {
    return res.status(422).send('Index too high');
  }

  redisClient.hset('values', index, 'Nothing yet');
  redisPublisher.publish('insert', index);

  pgClient.query('INSERT INTO values(number) VALUES($1)', [index]);
  res.send({ working: true });
});

app.listen(5000, () => {
  console.log('Listening on port 5000');
});
