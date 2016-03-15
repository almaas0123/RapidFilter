var express    = require('express');
var app = express();
var router = express.Router();
var bodyParser  = require('body-parser');
var BigCommerce = require('node-bigcommerce');
var fs=require('fs');

var bigCommerce = new BigCommerce({
    logLevel: 'info',
    clientId: 'a8dx216po0ikwmo19tchng8h4os09wc',
    secret: 'lhtw7adzr5m10zl9b0yb3j4bpqmk2c6',
    callback: 'http://localhost:3000',
    responseType: 'json'
});

/* GET users listing. */
router.get('/', function(req, res) {
    bigCommerce.authorise(req.query, function(err, data){
        console.log("here....");
        if(!err){
            console.log("Authentication successfully");
            res.send(data);

            res.send("Success");
        }
        else{
            console.log(err);
        }
    })
});

module.exports = router;
/**
 * Created by lakum on 29/2/16.
 */
