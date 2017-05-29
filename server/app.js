var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var http = require('http');


var index = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth');

var app = express();

var config = require('./config');
mongoose.connect(config.database);     // connect to database


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//app.use('/', express.static(__dirname + './../../dist'));


app.set('superSecret', config.secret);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', index);
app.use('/users', users);
app.use('/auth', auth)

var port = process.env.PORT || '3000';
app.set('port', port);

var server = http.createServer(app);
server.listen(port);

server.on('error', function (error) {

  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }


});;

server.on('listening', function () {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
});


module.exports = app;
