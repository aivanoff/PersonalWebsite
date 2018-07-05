//kill it when I say kill it
process.on('SIGINT', function() {
    process.exit();
});
//Doesnt die all the time
process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
});
"use strict";
var http = require('http');
var express = require('express'); //routing
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var PORT=8080; 

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use( bodyParser.text() );       // to support JSON-encoded bodies

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res){
  		res.sendFile(path.join(__dirname, 'public/index.html'));
	});

//start this bitch up
var server = app.listen(PORT, function(){
  console.log('Server listening on port');
});
