var express = require('express');
var app = express();

var bodyParser = require('body-parser');

var path = require('path');

var db = require('./models').db;

module.exports = app;

app.use(express.static(path.join(__dirname, './public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/cat', require('./catRoutes'));
app.use('/owner', require('./ownerRoutes'));

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send(err.message);
});

db.sync({force: true})
  .then(function() {
    app.listen(3001, function() {
      console.log('server is listening on port 3001!');
    });
  });
