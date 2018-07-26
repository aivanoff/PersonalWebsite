//kill it when I say kill it
process.on('SIGINT', function() {
    process.exit();
});
//Doesnt die all the time
process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
});
"use strict";
var express = require('express'); //routing
var app = express();
var path = require('path');


var PORT=process.env.PORT || 8080; 

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res){
  		res.sendFile(path.join(__dirname, 'public/index.html'));
	});

//start this bitch up
var server = app.listen(PORT, function(){
  console.log('Server listening on port');
});
