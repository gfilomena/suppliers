const express = require('express'),
	path = require('path'),
	bodyParser = require('body-parser'),
	cors = require('cors'),
	mongoose = require('mongoose');

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/suppliers';


const supplierRoutes = require('./routes/supplier.route');

	mongoose.Promise = global.Promise;
	mongoose.connect(uri).then(
	  () => {console.log('Database is connected') },
	  err => { console.log('Can not connect to the database'+ err)}
	);

const app = express();
	app.use(bodyParser.json());
	app.use(cors());
	app.use('/suppliers', supplierRoutes);

const port = process.env.PORT || 4000;

const server = app.listen(port, function(){
	console.log('Listening on port ' + port);
});