var express = require('express');
var app = express();

var PORT = process.env.PORT || 3000;

var reportsRouter = express.Router();
var overviewRouter = express.Router();

app.use(express.static(__dirname + '/public'));

app.listen(PORT);


app.use('/reports', reportsRouter);
app.use('/overview', overviewRouter);

// TODO: set up routes for /reports and /overview

