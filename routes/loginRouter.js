var express = require('express');
var loginRouter = express.Router();
const authenticate = require('../operations/authenticate');
var userOpr = require('../operations/userOpr');
var articleOpr = require('../operations/articleOpr')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('../models/user');
const cookieParser = require('cookie-parser');

loginRouter.use(cookieParser('12345-67890-09876-54321'));
loginRouter.use(bodyParser.json());
loginRouter.use(bodyParser.urlencoded({extended:true}));


loginRouter.route('/')
.get((req, res, next)=>{
    res.statusCode=200;
    res.render('login');
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
            res.redirect('/login');
        }
    })   
    // console.log(authenticate.login(req, res).then((value)=>{
    //     console.log(value);
    // })); 

})

module.exports=loginRouter;