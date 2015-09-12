/*var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();

xhr.open('GET', 'https://api.uber.com/v1/products?latitude=37.7759792&longitude=-122.41823');
xhr.setRequestHeader("Authorization", "wZQgCwLn40j65ukJBi3EMqufTDKgYSJPmcIPOgh7");
xhr.send(null);
xhr.onreadystatechange = function () {
	   if (xhr.readyState == 4) {
		   console.log(xhr.status);
	   }
	};

	var Uber = require('node-uber');

	var uber = new Uber({
		client_id: 'LD26IvwOtoKWMNQClhGQD9XJZSVNkYUi',
		client_secret: 'szpcAy4sJkV6PCWJwSC5WZm8NrxseLkA7i-Y07YA',
		server_token: 'wZQgCwLn40j65ukJBi3EMqufTDKgYSJPmcIPOgh7',
		redirect_uri: 'http://www.google.com',
		name: 'ShareMyRide'
	});

	uber.products.list({ latitude: 3.1357, longitude: 101.6880 }, function (err, res) {
		if (err) console.error(err);
		else console.log(res);
	});

	uber.promotions.list({ 
		start_latitude: 3.1357, start_longitude: 101.6880, 
		end_latitude: 3.0833, end_longitude: 101.6500 
	}, function (err, res) {
		if (err) console.error(err);
		else console.log(res);
	});

uber.estimates.price({ 
  start_latitude: 3.1357, start_longitude: 101.6880, 
  end_latitude: 3.0833, end_longitude: 101.6500 
}, function (err, res) {
  if (err) console.error(err);
  else console.log(res);
});

uber.estimates.time({ 
  start_latitude: 3.1357, start_longitude: 101.6880
}, function (err, res) {
  if (err) console.error(err);
  else console.log(res);
});


uber.user.profile(params, function (err, res) {
  if (err) console.log(err);
  else console.log(res);
});*/

/*var http=require("https");
var params={'client_id':'LD26IvwOtoKWMNQClhGQD9XJZSVNkYUi','response_type':'code'};
http.get(params,"https://login.uber.com/oauth/authorize",function(res) {
  console.log((res));
}).on('error', function(e) {
  console.log("Got error: " + e.message);
});*/



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
	var token=(JSON.parse(body).access_token);
	request({
		method: 'GET',
		url: 'https://sandbox-api.uber.com/v1/products?latitude=37.7759792&longitude=-122.41823',
		headers:{
			"Authorization":"Bearer "+token
		},
},
function (error, response, body) {
console.log(body);
});

});







});