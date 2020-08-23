var express = require('express');
var loginRouter = express.Router();
const authenticate = require('../operations/authenticate');
var userOpr = require('../operations/userOpr');
var articleOpr = require('../operations/articleOpr')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('../models/user');
const cookieParser = require('cookie-parser');
const serverConfig = require('../configurations/serverConfig');

loginRouter.use(cookieParser(serverConfig.cookieSecret));
loginRouter.use(bodyParser.json());
loginRouter.use(bodyParser.urlencoded({extended:true}));


loginRouter.route('/')
.get((req, res, next)=>{
    res.statusCode=200;
    res.render('login', {user:null, message:""});
})
.post((req, res, next)=>{
    
    authenticate.login(req.body.email, req.body.password).then((status)=>{
        if(status){
            // articleOpr.getAllArticles
            console.log("pass:");
            res.cookie('user', req.body.email, {signed: true});
            res.redirect('/');
        }
        else{
            console.log("fail:");
            var userObj = {
                user:null,
                message:"Invalid Credentials"
            }
            console.log(userObj)
            res.render('login', userObj);
        }
    })   
    // console.log(authenticate.login(req, res).then((value)=>{
    //     console.log(value);
    // })); 

})

module.exports=loginRouter;