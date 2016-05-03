

function getproductbyid() {
    console.log("Function Call")
    //if(req.session.Email && req.session._id){
    ProjectModel.findOne({ProjectId: 1}, function (err, result) {
        console.log("result is " + result);

        if (!err) {
           console.log(result);
        }
       else {
            console.log(err);
            //}
        }
    });
}






//
//    console.log(user);
//    console.log(apitoken);
//    console.log(storehash);
//    console.log()
//    console.log(req.session.Email);
//
//    if(user || apitoken || storehash ){
//        console.log(user+'in side if');
//        var user=user; //'user1',
//        password =apitoken,//'08bab894c121ebc4c3aa71213c0e095b29998ac7',
//            storeHash=storehash, //'jtj7sv9',
//            url = 'https://' + user+ ':' + password + '@store-'+storeHash+'.mybigcommerce.com/api/v2/products.json';
//
//        request({url: url}, function (error, response, body) {
//            if (error) {
//                res.json({result:'fail'});
//            } else {
//                res.json({result:'success'})
//                console.log(body);
//                insertProduct(body);
//                console.log("Controll is herer")
//            }
//        });
//
//    }
//    else{
//        res.send("please Enter Credentials")
//    }
//
//}
