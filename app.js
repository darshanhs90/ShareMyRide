/*jshint node:true*/
//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------
// This application uses express as it's web server
// for more info, see: http://expressjs.com
var app = require('express')();
var express = require('express');
var server = require('http').Server(app);
var http = require('http');
var request = require('request');
var https = require('https');
var cors = require('cors');
var sendgrid = require('sendgrid')('prajwal19@gmail.com', 'Prajwalhk19');
var accountSid = 'AC07275e4294f1b0d42623c3ec9559911e';
var authToken = '650d049a9bd99323fb899ce4b9e84fcc';
var blockchain = require('blockchain.info');
var myWallet = new blockchain.MyWallet('aff31a59-4977-4313-bbdd-19feddb70c4f', 'Password90-');
var exchangeRates = blockchain.exchangeRates;
var statistics = blockchain.statistics;
var clientTwilio = require('twilio')(accountSid, authToken);
var index = -1;
var price='';
var util = require('util');
var braintree = require('braintree');
var bodyParser = require('body-parser');
var mapData=[];
/**
 * Instantiate your server and a JSON parser to parse all incoming requests
 */
 var jsonParser = bodyParser.json();

/**
 * Instantiate your gateway (update here with your Braintree API Keys)
 */
 var gateway = braintree.connect({
  environment:  braintree.Environment.Sandbox,
  merchantId:   'zwh8pg7kfy2nzvhp',
  publicKey:    '6jw3rx8zs6qnq377',
  privateKey:   '57f7f84f0aed9ad871fddf21a823b9fc'
});
// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');
var ebay = require('ebay-api');

var params = {};

params.keywords = ["Canon", "Powershot"];

// add additional fields
params.outputSelector = ['AspectHistogram'];

params['paginationInput.entriesPerPage'] = 10;
var filters = {};

filters.itemFilter = [
//new ebay.ItemFilter("FreeShippingOnly", true)
];

filters.domainFilter = [
new ebay.ItemFilter("domainName", "Digital_Cameras")
];
// create a new express server
app.use(cors());
// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();
app.disable('etag');
// start server on the specified port and binding host
server.listen(appEnv.port, appEnv.bind, function() {
//    server.listen(1337, '127.0.0.1', function() {

    // print a message when the server starts listening
    console.log("server starting on " + appEnv.url);
});

    var itemResponse;
    app.get('/ebaySearch', function(req, res) {
        console.log(req.query.itemname);
        params.keywords = [req.query.itemname];
        ebay = require('ebay-api');
        ebay.ebayApiGetRequest({
            serviceName: 'FindingService',
            opType: 'findItemsByKeywords',
            appId: 'Student2e-87f6-4397-8e4b-1ac764f2ec2',
            params: params,
            filters: filters,
            parser: ebay.parseItemsFromResponse // (default)
        },
        // gets all the items together in a merged array
        function itemsCallback(error, items) {
            //if (error) throw error;
            // res.setHeader("Content-Type", "application/json");
            //res.send(items);
            itemResponse = (items);
            res.end();
        }
        );

    });
app.get('/getMapDataPrior',function(req,res){
    for (var i = 0; i<40; i++) {

        request('http://api.reimaginebanking.com/atms?key=a7e63559418eb419cd29301d32626843&page='+i, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            console.log(JSON.parse(body).data);
            var dt=JSON.parse(body).data;
            for (var j = 0; j <dt.length; j++) {
               mapData.push(dt[j]);
            };
            
        }
    })
    };
    res.end();
});
    app.get('/getMapData',function(req,res){
        console.log(mapData);
        res.send(mapData);
        res.end();
    })
    app.get('/ebaySearch1', function(req, res) {
        res.send(itemResponse);
        res.end();
    });

    app.get('/setItem', function(req, res) {
        index = req.query.index;
        res.end();
    });
    app.get('/getItem', function(req, res) {
        if (index != -1)
            res.send(itemResponse[index]);
        else
            res.send('0');
        res.end();
    });
    app.get('/setPrice',function(req,res){
       price=req.query.price;
       res.end();

   });


    app.get('/getPrice',function(req,res){
        if(price=='')
            res.send(itemResponse[index].sellingStatus.currentPrice.USD);
        else
            res.send(price);
        price='';
        res.end();

    });

    app.get('/ebaySearch2', function(req, res) {
        var pgs = req.query.pagenum;
        console.log(pgs);
        ebay.paginateGetRequest({
            serviceName: 'FindingService',
            opType: 'findItemsByKeywords',
            appId: 'Student2e-87f6-4397-8e4b-1ac764f2ec2', // FILL IN YOUR OWN APP KEY, GET ONE HERE: https://publisher.ebaypartnernetwork.com/PublisherToolsAPI
            params: params,
            filters: filters,
            parser: ebay.parseItemsFromResponse,
            pages: 1,
            perPage: 20 // (default)
        },
        // gets all the items together in a merged array
        function itemsCallback(error, items) {
            if (error) throw error;

            //console.log('Found', items.length, 'items');
            console.log(JSON.stringify(items));
            /*for (var i = 0; i < items.length; i++) {
      console.log('- ' + items[i]);
  }  */
  res.send(items);
  res.end();
}
);
    });


    app.get('/sendEmail', function(req, res) {
        if(req.query.subject==undefined){
            subjectMail='Split payment Invite';
        }
        else{
            subjectMail=req.query.subject;
        }
        var email = new sendgrid.Email({
            to: req.query.email,
            from: 'prajwal19@gmail.com',
            subject: subjectMail,
            text: req.query.message
        });
        sendgrid.send(email, function(err, json) {
            if (err) {
                return console.error(err);
            }
            console.log(json);
            res.end();
        });

    });

    app.get('/sendBitcoin', function(req, response) {
        var amountSent=req.query.amount;
        amountSent=0.00009;
        var options={
            to:'19NEruCAH3rMEAUpgry4PcyCoYV8TzptK9',
            amount:amountSent,
            inBTC:true
        }
        myWallet.send(options, function(err,res){
            console.log(res);
            response.send(res);
            response.end();
        });
    });

    app.get('/getBalance', function(req, response) {
        myWallet.getBalance(true,function(err,res){
            response.send(res+'');
            response.end();
        });

    });

    app.get('/getChartdata', function(req, response) {
        statistics.getChartData('total-bitcoin', function(err,res){
           console.log(res);
           response.send(res);
           response.end();
       });

    });


    app.get('/getExchangeRates', function(req, response) {
        exchangeRates.getTicker(function(err,res){
          console.log(res);
          response.send(res);
          response.end();
      });

    });

    app.post('/api/v1/token', function (request, response) {
      gateway.clientToken.generate({}, function (err, res) {
        if (err) throw err;
        response.json({
          "client_token": res.clientToken
      });
    });
  });

/**
 * Route to process a sale transaction
 */
 app.post('/api/v1/process', jsonParser, function (request, response) {
  var transaction = request.body;
  gateway.transaction.sale({
    amount: transaction.amount,
    paymentMethodNonce: transaction.payment_method_nonce
}, function (err, result) {
    if (err) throw err;
    console.log(util.inspect(result));
    response.json(result);
});
});


