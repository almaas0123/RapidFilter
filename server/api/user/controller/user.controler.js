var express = require('express');
var request = require("request");
var fs = require("fs");
var solr = require('solr-client');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var app = express();
var User = require('../model/user.model.js');
var password1='San';
var crypto = require('crypto');
var session = require('express-session');




exports.insert = insert;
exports.login = login;
exports.forgot=forgot;
exports.resetpass=resetpass;
//exports.homepage=homepage;
exports.logout=logout;
exports.getProduct=getProduct;

function insert(req, res) {
    var postdata = req.body.user;
    var user = new User({
        Email: postdata.Email,
        Password: postdata.Password,
        Mobile: postdata.Mobile,
        ClientId: postdata.ClientId,
        ClientAppSecret: postdata.ClientAppSecret
    });
    user.save(function (err, result) {
        if (!err) {
            mailSending();
           // Redirect();

            res.status(200).json({
                status: 'successfully registered',
                data: result

            });


            function mailSending() {

                var transporter = nodemailer.createTransport(smtpTransport({
                    host: "smtp.gmail.com",
                    secureConnection: false,
                    port: 25,
                    auth: {
                        user: "sandip.lakum5@gmail.com",
                        pass: password1
                    }
                }));

                var mailOptions = {
                    from: "sandip.lakum5@gmail.com",
                    to:postdata.Email,

                    subject: "verifiaction mail",

                    text: "very ficatio code is 123455",
                    html: "<b> Wel Come in RapidFilter....You are Successfullly login</b>",

                }
                console.log(mailOptions);
                transporter.sendMail(mailOptions, function (error, response) {
                    if (error) {
                        console.log(error);
                        res.end("error");
                    } else {
                        console.log('mail sendeing');
                        console.log(response.response.toString());
                        console.log("Message sent: " + response.message);
                        res.end("sent");
                        console.log('mail send successfully');
                    }
                });

                //app.use(function(req, res) {
                //    console.log('mail function');
                //
                //});

            }
        }
        else {
            res.status(201).send(err);
        }
    });
}



function forgot(req,res){
    var Email=req.body.user.email;
    console.log(Email);
    User.find({"Email":Email},function(err,data) {
        if (err) {
            res.status(500).send(err);

        }
        else {
            var random = crypto.randomBytes(Math.ceil(6)).toString('hex').slice(0,12).toUpperCase();
            var new_password= random;
            User.update({Email:Email},{$set:{Password:new_password}}, function(err, value) {
                if (err || value.nModified == 0) {
                    res = false;

                }
                else {
                    console.log("mail sending process.....");
                    console.log(value,new_password);
                    mailSending(new_password);
                }

            });


            function mailSending(value) {

                var transporter = nodemailer.createTransport(smtpTransport({
                    host: "smtp.gmail.com",
                    secureConnection: false,
                    port: 25,
                    auth: {
                        user: "sandip.lakum5@gmail.com",
                        pass: password1
                    }
                }));

                var mailOptions = {
                    from: "sandip.lakum5@gmail.com",
                    to: req.body.user.email,
                    subject: "verifiaction mail",
                    text: "very ficatio code is 123455",
                    html: "<p>This is Your currunt password:</p>"+ value +"<br><p>Reset Your Password...from this Currunt password </p>",
                }
                console.log(mailOptions);
                transporter.sendMail(mailOptions, function (error, response) {
                    if (error) {
                        console.log(error);
                        res.end("error");
                    } else {
                        console.log('mail sendeing');
                        console.log(response.response.toString());
                        console.log("Message sent: " + response.message);
                        res.end("Password Are SuccessFully Sended on your Email "+ req.body.user.email);
                        console.log('mail send successfully');
                    }
                });
            }
            res.redirect("http://localhost:63342/bigcomm/Html/login.html")

        }
    });
};

var sess="";

function login(req, res) {

    var postdata = req.body;
    console.log("login Controller");
    console.log(postdata.email);
    console.log(postdata.password);

    User.findOne({Email: postdata.email,Password: postdata.password},function (err, result) {
        console.log("result is " + result);

        if (err || !result) {
            res.json({result:'fail'});
        }
        else if (!err) {
            console.log('Result :',result.Email);
            req.session.Email= result.Email;
            console.log("Seesion:"+req.session.Email);
            /*if(req.session.Email) {
                //res.redirect('http://localhost:63342/bigcomm/Html/credentials.html');
                res.json({result:true});
            }*/
            if (result) {
                res.json({result:'success'});
            }

            //res.status(500).json({
            //    status: 'success',
            //    data: result
            //
            //});




           //mailSending();
           //reqToBigCom();




            function reqToBigCom(){
                var username = 'user1',
                    password = '08bab894c121ebc4c3aa71213c0e095b29998ac7',
                    a='jtj7sv9',
                    url = 'https://' + username + ':' + password + '@store-'+a+'.mybigcommerce.com/api/v2/products.json';

                request({url: url}, function (error, response, body) {
                    if (error) {
                        console.log("error");
                        console.log(error);
                        //console.log(body)
                    } else {
                        console.log(sess.email);
                        console.log(body);
                        //var data = {add:{doc: JSON.parse(body),boost:1.0,overwrite:true,commitWithin:1000}};
                        var options = {
                            method: 'post',
                            body: body,
                            json: true,
                            url: "http://localhost:8983/solr/myRapidproject/update?commit=true"
                        }

                        console.log(options)
                        request(options, function (error, response, body) {
                            console.log(body,error)
                            if (error) {
                                console.log("error");
                                console.log(error);
                                //console.log(body)
                            } else {
                                console.log(body)
                                console.log("Data written successfully!");
                            }
                        });
                    }
                });
            }

            function mailSending() {

                var transporter = nodemailer.createTransport(smtpTransport({
                    host: "smtp.gmail.com",
                    secureConnection: false,
                    port: 25,
                    auth: {
                        user: "sandip.lakum5@gmail.com",
                        pass: password1
                    }
                }));

                var mailOptions = {
                    from: "sandip.lakum5@gmail.com",
                    to: req.body.user.email,

                    subject: "verifiaction mail",

                    text: "very ficatio code is 123455",
                    html: "<b> Wel Come in RapidFilter....You are Successfullly login...Valid User</b>",

                }
                console.log(mailOptions);
                transporter.sendMail(mailOptions, function (error, response) {
                    if (error) {
                        console.log(error);
                        res.end("error");
                    } else {
                        console.log('mail sendeing');
                        console.log(response.response.toString());
                        console.log("Message sent: " + response.message);
                        res.end("sent");
                        console.log('mail send successfully');
                    }
                });
            }

            //res.json({result:true});
        } else {
            res.json({result:false});
            res.status(400).send(err);

        }
    });

}


function resetpass(req, res) {
    var postdata = req.body;
    console.log('reset password.........');
    console.log(req.session.Email);
    if(req.session.Email){
    User.update({Email:req.session.Email,Password: postdata.user.cpassword},{$set:{Password:postdata.user.re_password}}, function(err,value){
        console.log(value);
        if(!err) {
            console.log(value);
            console.log("Password Are Reseted");
        }
        else {
           return err
        }

    });
    }
    else{
        res.end;
    }
}


function logout(req,res) {
        req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        } else {

            res.redirect('http://localhost:63342/bigcomm/Html/login.html');
        }
    });
}

function getProduct(req,res){
    console.log("Getting product")
    var userdata=req.body.user;
    var user=userdata.userId;
    console.log(user);
    var apitoken=userdata.apiToken;
    var storehash=userdata.storeHash;
    if(user || apitoken || storehash){
        console.log(user+'in side if');
                var user=user; //'user1',
                password = apitoken,//'08bab894c121ebc4c3aa71213c0e095b29998ac7',
                storeHash=storehash, //'jtj7sv9',
                url = 'https://' + user+ ':' + password + '@store-'+storeHash+'.mybigcommerce.com/api/v2/products.json';

            request({url: url}, function (error, response, body) {
                if (error) {
                    console.log("error");
                    console.log(error);
                    res.send('inserted credential in invalid');
                    res.end();
                    //console.log(body)
                } else {
                    //console.log(sess.email);
                    console.log(body);
                    //var data = {add:{doc: JSON.parse(body),boost:1.0,overwrite:true,commitWithin:1000}};
                    var options = {
                        method: 'post',
                        body: body,
                        json: true,
                        url: "http://localhost:8983/solr/myRapidproject/update?commit=true"
                    }

                    console.log(options)
                    request(options, function (error, response, body) {
                        console.log(body,error)
                        if (error) {
                            console.log("error");
                            console.log(error);
                            //console.log(body)
                        } else {
                            console.log(body)
                            console.log("Data written successfully!");
                        }
                    });
                }
            });

    }
    else{
        res.send("please Enter Credentials")
    }

}