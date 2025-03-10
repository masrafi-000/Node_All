const express = require('express');
const publicRouter = require('./publicRouter');
const adminRouter = require('./adminRouter');

const port = process.env.PORT || 3000;

const app = express();

app.get('/', (req, res) => {
    res.send('This is Root Directory');
});
app.use('/admin', adminRouter);
app.use('/public', publicRouter);

app.listen(port, '127.0.0.1', () => {
    console.log(`Server in running on http://127.0.0.1:${port}`);
});
