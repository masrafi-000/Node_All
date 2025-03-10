const express = require('express');
const adminRouter = require('./adminRouter');

const publicRouter = express.Router();

// const log = (req, res, next) => {
//     console.log('I am loggin something!');
//     next();
// };

// publicRouter.all('*', log);

// publicRouter.param('user', (req, res, next, id) => {
//     req.user = id === '1' ? 'Admin' : 'Anonymous';
//     next();
// });

// publicRouter.param((param, option) => (req, res, next, val) => {
//     if (val === option) {
//         next();
//     } else {
//         res.sendStatus(403);
//     }
// });

// publicRouter.param('user', '12');

// publicRouter.get('/:user', (req, res) => {
//     res.send('Hello Admin');
// });

// publicRouter.get('/about', (req, res) => {
//     res.send('About');
// });

// publicRouter
//     .route('/user')
//     .all((req, res, next) => {
//         console.log('I am logging something');
//         next();
//     })
//     .get((req, res) => {
//         res.end('GET');
//     })
//     .post((req, res) => {
//         res.end('POST');
//     })
//     .put((req, res) => {
//         res.end('PUT');
//     })
//     .delete((req, res) => {
//         res.end('DELETE');
//     });

publicRouter.use((req, res, next) => {
    console.log('Logging');
    next();
});

publicRouter.use(adminRouter);

module.exports = publicRouter;
