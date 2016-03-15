var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var BigCommerce = require('node-bigcommerce');
var router=express.Router();
var request = require("request");
var fs = require("fs");


var routes = require('./routes/index');
var users = require('./routes/users');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


console.log("here 1")
var username = 'user1',
    password = 'faf7c4c4b43e0c8e501c826806b96dae55a3997e',
    url = 'https://' + username + ':' + password + '@store-vbsnww.mybigcommerce.com/api/v2/products.xml';

request({url: url}, function (error, response, body) {
    if (error) {
        console.log("error");
        console.log(error);
        //console.log(body)
    } else {

        fs.writeFile('index.xml',body,  function(err) {
            if (err) {

                return console.error(err);
            }
            console.log(body)
            console.log("Data written successfully!");;

        })

    }
});







// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

var BigCommerce = require('node-bigcommerce');
var fs=require('fs');
var username='Sandip';
var password='e6242265a9e157a45c720456a3a7a1b4fd8c48a7';
//
//var bigCommerce = new BigCommerce({
//  logLevel: "info",
//  clientId: 'a8dx216po0ikwmo19tchng8h4os09wc',
//  accessToken: 'e6242265a9e157a45c720456a3a7a1b4fd8c48a7',
//  responseType: 'json'
//
//});
//
//app.get('/auth', function(req, response){
//
//    console.log('hello auth');
//    response.send("<html>Hello from here</html>");
//
//
//  });
app.use("/token1",require('./routes/OauthBySimple'));



app.get('/token',function(res,data){
    console.log(data);
})
app.get('/call  ',function(res,data){
    console.log(data);
})
//app.use("/fetchProduct",require('./routes/ProductSearch'));
//
//router.get('/abc', function(req, res, next) {
//  console.log("new request...");
//  if (req.body.access_token) {
//    res.send("<html>Hello From Jenit Shah, Access Token is </html> " + req.body.access_token)
//  }
//  else {
//    //res.send("<html>Hello From Jenit Shah, Code is " + req.query.code + " store hash is " + req.query.context + " scope is " + req.query.scope + "</html>");
//    var body = {
//      client_id:'a02uoc9lbd93uyl88vs9tmeobcfrdpa',
//      client_secret:'ghke5g3o1vfb6a9pf3dsp64ff6tbh2r',
//      code:'8113tr5twxud9cf670rg943mnn4aw4l ',
//      scope:'store_v2_products_read_only',
//      grant_type:'authorization_code',
//      redirect_uri:'https://jenitsimpleserver.herokuapp.com',
//      context:'stores/hb0qnk'
//    };
//    request.post("https://login.bigcommerce.com/oauth2/token?client_id=a02uoc9lbd93uyl88vs9tmeobcfrdpa&client_secret=ghke5g3o1vfb6a9pf3dsp64ff6tbh2r&code=8113tr5twxud9cf670rg943mnn4aw4l &scope=store_v2_products_read_only&grant_type=authorization_code&redirect_uri=https://jenitsimpleserver.herokuapp.com&context=stores/hb0qnk"
//    ,function (error, response, body) {
//      console.log("here " + body);
//      res.status(response.statusCode);
//      if (!error && response.statusCode == 200) {
//        console.log(JSON.parse(body));
//        res.json({status: 'success', response: JSON.parse(body)});
//      }
//      else {
//        res.json({status: 'failure', error: 'Status Code:' + response.statusCode, error_desc:JSON.parse(body)});
//      }
//    });
//  }
//
//  //res.send("<html> req query="+JSON.parse(req.query)+" req body="+JSON.parse(req.body)+"</html>");
//
//});
//
//router.post('/', function(req, res, next) {
//  var headers = (req.headers);
//  var body = (req.body);
//  var query = (req.query);
//  console.log({date:Date(),headers:headers,body:body, query:query});
//  res.json({date:Date(),headers:headers,body:body, query:query});
//});
//
//module.exports = router;
//
//  // Catch any errors, or handle the data returned
//  // The response object is passed back for convenience
//});
////
//var product = {
//  name: 'Plain T-Shirt',
//  type: 'physical',
//  description: 'This timeless fashion staple will never go out of style!',
//  price: '29.99',
//  categories: [18],
//  availability: 'available',
//  weight: '0.5'
//}
//
//
//bigCommerce.post('/products', product, function(err, data, response){
//
//  console.log(data);
//  // Catch any errors, or handle the data returned
//  // The response object is passed back for convenience
//});
//var BigCommerce = require('node-bigcommerce');
//
//var bigCommerce = new BigCommerce({
//  logLevel : 'info',
//  clientId: 'a8dx216po0ikwmo19tchng8h4os09wc',
//  accessToken: 'e6242265a9e157a45c720456a3a7a1b4fd8c48a7',
//  responseType: 'json'
//});


// catch 404 and forward to error handler
//app.use(function(req, res, next) {
//  var err = new Error('Not Found');
//  err.status = 404;
//  next(err);
//});
//
//// error handlers
//
//// development error handler
//// will print stacktrace
//if (app.get('env') === 'development') {
//  app.use(function(err, req, res, next) {
//    res.status(err.status || 500);
//    res.render('error', {
//      message: err.message,
//      error: err
//    });
//  });
//}

// production error handler
// no stacktraces leaked to user
//app.use(function(err, req, res, next) {
//  res.status(err.status || 500);
//  res.render('error', {
//    message: err.message,
//    error: {}
//  });
//});
//
app.listen(3000);
module.exports = app;