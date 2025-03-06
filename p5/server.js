const express = require('express');
const dotenv = require('dotenv');
const { Buffer } = require('node:buffer');

const buf = Buffer.from([1, 2, 3]);

for (const b of buf) {
    console.log(b);
}

const app = express();

dotenv.config();
const port = process.env.PORT;

app.get('/');

app.listen(port, () => {
    console.log(`app listening on localhost://${port}`);
});
