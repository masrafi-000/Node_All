const express = require('express');

const adminRouter = express.Router();

adminRouter.get('/', (req, res) => {
    res.send('Dashboard');
});
adminRouter.get('/login', (req, res) => {
    res.send('Login');
});

module.exports = adminRouter;
