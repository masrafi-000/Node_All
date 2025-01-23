const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send(a);
});

app.use((req, res, next) => {
    // res.status(404).send('Requested url was not found!');
    next('Requested url was not found!');
});

app.use((err, req, res, next) => {
    // handle error here
    // console.log(err);
    // res.send('There was an error!');

    if (err.message) {
        res.status(500).send(err.message);
    } else {
        res.status(500).send('There was an error!');
    }
});

app.listen(port, '127.0.0.1', () => {
    console.log(`app listening at 127.0.0.1:${port}`);
});
