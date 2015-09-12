


var express = require('express');
var request = require('request');
var cfenv = require('cfenv');
var fs=require("fs");
var cors = require('cors');
// create a new express server
var app = express();
app.use(cors());
// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));


// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();
var token='';
// start server on the specified port and binding host
//app.listen(appEnv.port, appEnv.bind, function() {
	app.listen(1337, '127.0.0.1', function() {

    // print a message when the server starts listening
    console.log("server starting on " + appEnv.url);
});
	var propertiesObject = {'response_type':'code' , 'client_id':'LD26IvwOtoKWMNQClhGQD9XJZSVNkYUi','redirect_uri':'http://localhost:1337/getAuth'};
	app.get('/message', function(reqst, res) {
		console.log('server hit');
		request({url:'https://login.uber.com/oauth/authorize', qs:propertiesObject,followRedirect:false}, function(err, response, body) {
			if(err) { console.log(err); return; }
			res.end();
		});
	});
	var https=require('https');
	var FormData = require('form-data');
	app.get('/getAuth', function(reqst, res) {
		console.log(reqst.query.code);


		request({
			method: 'POST',
			url: 'https://login.uber.com/oauth/token',
			form: 
			{"grant_type" : "authorization_code",
			"client_secret":"szpcAy4sJkV6PCWJwSC5WZm8NrxseLkA7i-Y07YA",
			"client_id":"LD26IvwOtoKWMNQClhGQD9XJZSVNkYUi",
			"redirect_uri":"http://localhost:1337/getAuth",
			"code":reqst.query.code
		},
	},
	function (error, response, body) {
		if(error)
		{
			console.log(error);
		}
		token=(JSON.parse(body).access_token);
		res.redirect('afterLogin.html');
		res.end();
	});
	});




	app.get('/getHistory', function(reqst, res) {
		request({
			method: 'GET',
			url: 'https://api.uber.com/v1.1/history?limit=50',
			headers:{
				"Authorization":"Bearer "+token
			},
		},
		function (error, response, body) {
			res.send(body);
			res.end();
		});
	});
var prof='';

app.get('/setProfile', function(reqst, res) {
		request({
			method: 'GET',
			url: 'https://api.uber.com/v1/me',
			headers:{
				"Authorization":"Bearer "+token
			},
		},
		function (error, response, body) {
			prof=body;
			res.end();
		});
	});

app.get('/getProfile', function(reqst, res) {
			res.send(prof);
			res.end();
	});


app.get('/getPrice', function(reqst, res) {
		var start_lat=reqst.query.start_lat;
		var end_lat=reqst.query.end_lat;
		var start_long=reqst.query.start_long;
		var end_long=reqst.query.end_long;
		
		request({
			method: 'GET',
			url: 'https://api.uber.com/v1/estimates/price?start_latitude='+start_lat+'&start_longitude='+start_long+'&end_latitude='+end_lat+'&end_longitude='+end_long,
			headers:{
				"Authorization":"Bearer "+token
			},
		},
		function (error, response, body) {
			res.send(body);
			res.end();
		});
	});
var products='';
app.get('/getProducts', function(reqst, res) {
		var latitude=reqst.query.latitude;
		var longitude=reqst.query.longitude;
		request({
			method: 'GET',
			url: 'https://api.uber.com/v1/products?latitude='+latitude+'&longitude='+longitude,
			headers:{
				"Authorization":"Bearer "+token
			},
		},
		function (error, response, body) {
			products=body;
			res.send(body);
			res.end();
		});
	});


app.get('/makeRequest', function(reqst, res) {
		var start_lat=reqst.query.start_lat;
		var start_long=reqst.query.start_long;
		var end_lat=reqst.query.end_lat;
		var end_long=reqst.query.end_long;
		
		request({
			method: 'POST',
			url: 'https://sandbox-api.uber.com/v1/requests',
			headers:{
				"Authorization":"Bearer "+token
			},
			data:{'product_id':'',
					'start_latitude':start_lat,
					'start_longitude':start_long,
					'end_latitude':end_lat,
					'end_longitude':end_lat,
								}
		},
		function (error, response, body) {
			res.send(body);
			res.end();
		});
	});