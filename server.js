// express

var express = require('express');
var app = express();

var PORT = process.env.PORT || 3000;
app.listen(PORT);


// data

var Data = require('./data');

var dataOptions = {
  url:        process.env.DATA_URL || 'localhost',
  port:       process.env.DATA_PORT || 5432
};

var data = new Data(dataOptions);


// routes

var reportsRouter = express.Router();
var overviewRouter = express.Router();

app.use('/reports', reportsRouter);
app.use('/overview', overviewRouter);

// TODO: set up routes for /reports and /overview

