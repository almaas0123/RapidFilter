/**
 * Created by lakum on 29/2/16.
 */
var express = require('express');
var app = express();
var router = express.Router();
var request = require('request');
var bodyParser  = require('body-parser');
var BigCommerce = require('node-bigcommerce');
var fs=require('fs');

router.get('/', function(req, res, next) {
    console.log("new request...");

    if (req.body.access_token) {
        res.send("<html>Hello From Jenit Shah, Access Token is </html> " + req.body.access_token)
    }
    else {
        //res.send("<html>Hello From Jenit Shah, Code is " + req.query.code + " store hash is " + req.query.context + " scope is " + req.query.scope + "</html>");
        var body = {
            clientId: 'a8dx216po0ikwmo19tchng8h4os09wc',
            accessToken: 'hnav0xw0an1dqc363j045947ec1licq',
            responseType: 'json'
        };
        request.post("https://api.bigcommerce.com?client_id=a8dx216po0ikwmo19tchng8h4os09wc&access_token=hnav0xw0an1dqc363j045947ec1licq&responseType=json",
            function (error, response, body) {
                console.log("here " + body);
                res.status(response.statusCode);
                if (!error && response.statusCode == 200) {
                    console.log(JSON.parse(body));
                    res.json({status: 'success', response: JSON.parse(body)});
                }
                else {
                    res.json({status: 'failure', error: 'Status Code:' + response.statusCode, error_desc:JSON.parse(body)});
                }
            });
    }

    //res.send("<html> req query="+JSON.parse(req.query)+" req body="+JSON.parse(req.body)+"</html>");

});

router.post('/', function(req, res, next) {
    var headers = (req.headers);
    var body = (req.body);
    var query = (req.query);
    console.log({date:Date(),headers:headers,body:body, query:query});
    res.json({date:Date(),headers:headers,body:body, query:query});
});

module.exports = router;
