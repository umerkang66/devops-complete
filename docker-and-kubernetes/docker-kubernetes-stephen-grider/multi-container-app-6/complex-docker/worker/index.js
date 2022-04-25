const keys = require('./keys');
const redis = require('redis');

const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    // If connection is lost, try to reconnect every 1000 milliseconds
    retry_strategy: () => 1000,
});

// If the client is listening and publishing events on the redis-server, we have to create duplicate, because the connection that is used to listen or subscribe purposes, it cannot be used for other purposes
const sub = redisClient.duplicate();

function fib(index) {
    if (index < 2) return 1;
    return fib(index - 1) + fib(index - 2);
}

// Anytime new value is added in redis, also by other processes
sub.on('message', (channel, message) => {
    redisClient.hset('values', message, fib(parseInt(message)));
});

// Submit the process, that new value is inserted in redis
sub.subscribe('insert');
