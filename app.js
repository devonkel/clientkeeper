var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongojs = require('mongojs'),
	db = mongojs('clientkeeper', ['clients']);
	port = 4200;

// Set static folder
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());

app.get('/clients', function (req, res){
	console.log('Request for clients received');
	
	db.clients.find( function (err, docs) {
		if(err) {
			console.log('---ERROR getting clients');
			res.send(err);
		} else {
			console.log('Sending Data ...');
			res.json(docs);
		}
	});
});

app.listen(port);
console.log('Ready on port: '+ port);