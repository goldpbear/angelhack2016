// express

var express = require('express');
var app = express();

var PORT = process.env.PORT || 3000;
app.listen(PORT);


// data

var Data = require('./data');

var dataOptions = {
  url:        process.env.DATABASE_URL    || null,
  dialect:    process.env.DATA_DIALECT    || 'postgres',
  host:       process.env.DATA_HOST       || 'localhost',
  port:       process.env.DATA_PORT       || 5432,
  database:   process.env.DATA_DATABASE   || 'angel',
  username:   process.env.DATA_USERNAME   || 'user',
  password:   process.env.DATA_PASSWORD   || 'password',
  sync:       process.env.DATA_SYNC       || false
};

var data = new Data(dataOptions);

data.ready(function (models) {
  models.User.findAll()
});


// routes

var reportsRouter = express.Router();
var overviewRouter = express.Router();
var apiRouter = express.Router();

app.use(express.static(__dirname + '/public'));

app.use('/reports', reportsRouter);
app.use('/overview', overviewRouter);
app.use('/api', apiRouter);

reportsRouter.use(express.static('reports/public'));
overviewRouter.use(express.static('overview/public'));

apiRouter.get('/reports', function (req, res) {
  // return reports
});

apiRouter.post('/reports', function (req, res) {
  // create report
});
