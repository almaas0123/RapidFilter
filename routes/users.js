var express    = require('express');
var app = express();
var router = express.Router();
//var bodyParser  = require('body-parser');
var BigCommerce = require('node-bigcommerce');
var fs=require('fs');




//var BigCommerce = require('node-bigcommerce');

var bigCommerce = new BigCommerce({
  clientId: 'a8dx216po0ikwmo19tchng8h4os09wc',
  accessToken: 'e6242265a9e157a45c720456a3a7a1b4fd8c48a7',
  responseType: 'json'
});

app.get('/products', function(err, data, response){
  if(err){
    console.log(bigCommerce);
    console.log(err);

  }else{
    console.log(data);
    console.log(response);
  }

  // Catch any errors, or handle the data returned
  // The response object is passed back for convenience
});

//var bigCommerce = new BigCommerce({
//  logLevel: 'info',
//  clientId: 'a8dx216po0ikwmo19tchng8h4os09wc',
//  secret: 'lhtw7adzr5m10zl9b0yb3j4bpqmk2c6',
//  callback: 'http://localhost:3000/auth/callback',
//  responseType: 'json'
//});
//
//router.get('/auth', function(req, res) {
//  console.log(req.query);
//  console.log('===========================');
//  bigCommerce.authorise(req.query, function(err, data){
//    console.log(data);
//
//    //res.render('integrations/auth', { title: 'Authorised!', data: data });
//  });
//});

///* GET users listing. */
//router.get('/', function(req, res) {
//
//  console.log('query: ' + res.query);
//  bigCommerce.authorise(req.query, function(err, data){
//    console.log("here....");
//    if(!err){
//      console.log("Authentication successfully");
//      console.log("data"+data);
//      //res.set
//      res.send(data);
//    }
//    else{
//      console.log(err);
//    }
//  })
//});
//
//router.get('/success', function(req, res) {
//  console.log('success');
//  res.send('Success1');
//})

module.exports = router;