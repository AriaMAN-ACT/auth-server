const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const router = require('./routes/router');

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json({type: '*/*'}));

router(app);

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

module.exports = app;