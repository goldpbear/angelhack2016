// express

var express = require('express');
var bodyParser = require('body-parser');
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
  sync:       process.env.DATA_SYNC       || false,
  forceSync:  process.env.FORCE_SYNC      || false
};

var data = new Data(dataOptions);
var $ = data.ready;


// routes

var reportsRouter = express.Router();
var overviewRouter = express.Router();
var apiRouter = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use('/reports', reportsRouter);
app.use('/overview', overviewRouter);
app.use('/api', apiRouter);

reportsRouter.use(express.static('reports/public'));
overviewRouter.use(express.static('overview/public'));

apiRouter.get('/reports', function (req, res) {
  $(function (models) {
    res.setHeader('Content-Type', 'application/json');

    models.Crime.findAll().then(function (result) {
      res.send(JSON.stringify(result));
    });
  });
});

apiRouter.post('/reports', function (req, res) {
  $(function (models) {
    res.setHeader('Content-Type', 'application/json');

    var body = req.body;

    // do something with
    // body.coordinates

    models.Crime.create({
      type:         body.type,
      description:  body.description
    }).then(function (result) {
      res.send(JSON.stringify((result)));
    }).catch(function (err) {
      res.send(JSON.stringify({ error: err }));
    });
  });
});
