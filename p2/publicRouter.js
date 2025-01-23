const express = require('express');

const publicRouter = express.Router();

const log = (req, res, next) => {
    console.log('I am loggin something!');
    next();
};

publicRouter.all('*', log);

publicRouter.get('/', (req, res) => {
    res.send('Home');
});

publicRouter.get('/about', (req, res) => {
    res.send('About');
});

module.exports = publicRouter;
