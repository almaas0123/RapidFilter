var express = require('express'),
    _ = require( 'lodash' );
var request = require("request");
var mongoose=require("mongoose");
var fs = require("fs");
var solr = require('solr-client');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var app = express();
var User = require('../model/user.model.js');
var password1='';
var crypto = require('crypto');
var session = require('express-session');
//var productData=require('../../../output.json');
//var customFields = require('mongoose-custom-fields');
var productModel=require('../model/product.model.js');
var mongojs = require('mongojs');
var path=require('path');

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
    var userdata=req.body;
    var user=userdata.un;
    var apitoken=userdata.at;
    var storehash=userdata.sh;
    console.log(user);
    console.log(apitoken);
    console.log(storehash);


    if(user || apitoken || storehash){
        console.log(user+'in side if');
                var user=user; //'user1',
                password =apitoken,//'08bab894c121ebc4c3aa71213c0e095b29998ac7',
                storeHash=storehash, //'jtj7sv9',
                url = 'https://' + user+ ':' + password + '@store-'+storeHash+'.mybigcommerce.com/api/v2/products.json';

            request({url: url}, function (error, response, body) {
                if (error) {
                    res.json({result:'fail'});
                } else {

                    res.json({result:'success'})

                    console.log(body);

                    var ex=insertProduct();
                    fs.writeFile('output.json',body,function (err) {
                        if (err) {
                            console.log(err)
                            res.send('error')
                        }
                        else{
                            console.log("Data Success fully inserted....");
                            res.end();
                        }
                    })
                    //

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
                            //console.log(body)
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

function insertProduct(){
    //var product=mongoose.model('pro_msts');
    console.log("Functon Calling After...insert product");

    data = JSON.parse(fs.readFileSync(__dirname+'/../../../output.json','utf8'));
    console.log(data.length + ' items to store');
    //productModel.find().remove();
    for( var i = 0; i < data.length; i++ ) {
        //console.log(data[i]);

        var newModel=new productModel({
            id:data[i].id,
            keyword_filter:data[i].keyword_filter,
            name:data[i].name,
            type:data[i].type,
            sku:data[i].sku,
            description:data[i].description,
            search_keywords:data[i].search_keywords,
            availability_description:data[i].availability_description,
            price:data[i].price,
            cost_price:data[i].cost_price,
            retail_price:data[i].retail_price,
            sale_price:data[i].sale_price,
            calculated_price:data[i].calculated_price,
            sort_order:data[i].sort_order,
            is_visible:data[i].is_visible,
            is_featured:data[i].is_featured,
            related_products:data[i].related_products,
            inventory_level:data[i].inventory_level,
            inventory_warning_level:data[i].inventory_warning_level,
            warranty:data[i].warranty,
            weight:data[i].weight,
            width:data[i].width,
            height:data[i].height,
            depth:data[i].depth,
            fixed_cost_shipping_price:data[i].fixed_cost_shipping_price,
            is_free_shipping:data[i].is_free_shipping,
            inventory_tracking:data[i].inventory_tracking,
            rating_total:data[i].rating_total,
            rating_count:data[i].rating_count,
            total_sold:data[i].total_sold,
            date_created:data[i].date_created,
            brand_id:data[i].brand_id,
            view_count:data[i].view_count,
            page_title:data[i].page_title,
            meta_keywords:data[i].meta_description,
            meta_description:data[i].meta_description,
            layout_file:data[i].layout_file,
            is_price_hidden:data[i].is_price_hidden,
            price_hidden_label:data[i].price_hidden_label,
            categories:data[i].categories,
            date_modified:data[i].date_modified,
            event_date_field_name:data[i].event_date_field_name,
            event_date_type:data[i].event_date_type,
            event_date_start:data[i].event_date_start,
            event_date_end:data[i].event_date_end,
            myob_asset_account:data[i].myob_asset_account,
            myob_income_account:data[i].myob_income_account ,
            myob_expense_account:data[i].myob_expense_account,
            peachtree_gl_account:data[i].peachtree_gl_account,
            condition:data[i].condition,
            is_condition_shown:data[i].is_condition_shown,
            preorder_release_date:data[i].preorder_release_date,
            is_preorder_only:data[i].is_preorder_only,
            preorder_message:data[i].preorder_message,
            order_quantity_minimum:data[i].order_quantity_minimum,
            order_quantity_maximum:data[i].order_quantity_maximum,
            open_graph_type:data[i].open_graph_type,
            open_graph_title:data[i].open_graph_title,
            open_graph_description:data[i].open_graph_description,
            is_open_graph_thumbnail:data[i].is_open_graph_thumbnail,
            upc:data[i].upc,
            avalara_product_tax_code:data[i].avalara_product_tax_code,
            date_last_imported:data[i].date_last_imported,
            option_set_id:data[i].option_set_id,
            tax_class_id:data[i].tax_class_id,
            option_set_display:data[i].option_set_display,
            bin_picking_number:data[i].bin_picking_number,
            custom_url:data[i].custom_url,
            primary_image:data[i].primary_image,
            availability:data[i].availability,
            brand:data[i].brand,
            downloads:data[i].downloads,
            images:data[i].image,
            discount_rules:data[i].discount_rules,
            configurable_fields:data[i].configurable_fields,
            custom_fields:data[i].custom_fields,
            videos:data[i].videos,
            skus:data[i].skus,
            rules:data[i].rules,
            option_set:data[i].option_set,
            options:data[i].option,
            tax_class:data[i].tax_class,
            reviews:data[i].reviews,
            metadata:data[i].metadata
        });
        newModel.save(function(err,result){
            if(!err){
                console.log('successfully Inserted');
                var a= data.length;
                a--;
                if(a==i){
                    return ex;
                }

            }else{
                console.log(err)
            }
        });


    }
    console.log("controll is here");

}
