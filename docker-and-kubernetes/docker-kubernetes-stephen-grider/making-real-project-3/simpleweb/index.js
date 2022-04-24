const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Hello from docker</h1>');
});

app.listen(8080, () => {
    console.log('Server is listening on port 8080');
});
