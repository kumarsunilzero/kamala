var express = require('express');
var config = require('./config/main.json');
var server = express();
var PORT = 5000;
var path = require('path');
var env = process.env.NODE_ENV || 'development';

server.use(express.static('./app'));
server.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, './app/index.html'));
});

server.listen(PORT, function() {
    console.log('App listening on port ' + PORT + '!');
});