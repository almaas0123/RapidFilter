var express = require('express');
var request = require("request");
var fs = require("fs");
var solr = require('solr-client');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var app = express();
var sandip='';
var User = require('../model/user.model.js');
var password1='Sandip.6112'

exports.insert = insert;
exports.login = login;
exports.forgot=forgot;

function insert(req, res) {
    var postdata = req.body;
    var user = new User({
        Email: postdata.Email,
        Password: postdata.Password,
        Mobile: postdata.Mobile,
        ClientId: postdata.ClientId,
        ClientAppSecret: postdata.ClientAppSecret,
        Admin: postdata.Admin
    });
    user.save(function (err, result) {
        if (!err) {
            mailSending();

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
                    to:req.body.Email,

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
    User.find({"Email":Email},{"Password":1},function(err,data) {
        if (err) {
            res.status(500).send(err);

        }

        else {

            console.log("Hello data" + data),
               mailSending(data),
                function (err) {
                if (err) return next(err)
            }

            function mailSending(data) {

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
                    html: "<p>Your password is in this</p>"+ data +"<br><p>_id is Use Less</p>",

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

        }
    });
};



function login(req, res) {

    var postdata = req.body;
    User.findOne({Email: postdata.user.email, Password: postdata.user.password}, function (err, result) {
        if (!err) {
            res.status(500).json({
                status: 'success',
                data: result

            });
         //  mailSending();
           // reqToBigCom();
           // console.log("here 1")

            function reqToBigCom(){
                var username = 'user1',
                    password = 'a7110c5b0abee873bfd3ea4f62a66369ae616a1f',
                    url = 'https://' + username + ':' + password + '@store-72wa2u.mybigcommerce.com/api/v2/products.json';

                request({url: url}, function (error, response, body) {
                    if (error) {
                        console.log("error");
                        console.log(error);
                        //console.log(body)
                    } else {
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
                    to: req.body.Email,

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

                console.log('login successfully');
        } else {
            res.status(201).send(err);

        }
    });

}

