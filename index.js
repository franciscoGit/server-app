const express = require('express');
const helmet = require('helmet');

const app = express();
const port = 5000;

app.use(helmet());

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname});
});

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});
