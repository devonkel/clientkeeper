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

	db.clients.find().sort({last_name: 1}, function (err, docs) {
		if(err) {
			console.log('---ERROR getting clients');
			res.send(err);
		} else {
			console.log('Sending Data ...');
			res.json(docs);
		}
	});
});

app.post('/clients', function (req, res){
	db.clients.insert(req.body, function(err, doc){
		if(err) {
			console.log('---ERROR adding client');
			res.send(err);
		} else {
			console.log('Client added.');
			res.json(doc);
		}
	});
});

app.get('/clients/:id', function (req, res){
	var id = req.params.id;

	db.clients.findOne({_id: mongojs.ObjectId(id)}, function (err, doc){
		if(err) {
			res.send(err);
		} else {
			res.json(doc);
		}
	});
});

app.listen(port);
console.log('Ready on port: '+ port);