var express = require('express');
var router = express.Router();
var BigCommerce = require('node-bigcommerce');


var bigCommerce = new BigCommerce({
  logLevel: 'info',
  clientId: 'a8dx216po0ikwmo19tchng8h4os09wc',
  secret: 'lhtw7adzr5m10zl9b0yb3j4bpqmk2c6',
  callback: '',
  responseType: 'json'
});

router.get('/oauth', function(req, res) {
  bigCommerce.authorise(req.query, function(err, data){
  	console.log('auth data: ' + data);
    res.json({ title: 'Authorised!', data: data });
  });
});

router.get('/load', function(req, res) {
	  console.log('load method');
	  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

module.exports = router;
