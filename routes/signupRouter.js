var express = require('express');
var signupRouter = express.Router();
var express = require('express');
var userOpr = require('../operations/userOpr');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('../models/user');
const authenticate = require('../operations/authenticate');

const cookieParser = require('cookie-parser');
const serverConfig = require('../configurations/serverConfig');

signupRouter.use(cookieParser(serverConfig.cookieSecret));
signupRouter.use(bodyParser.json());
signupRouter.use(bodyParser.urlencoded({extended:true}));


signupRouter.route('/')
.get((req, res, next)=>{
    res.render('signup', {user:null, message: ""});
})


signupRouter.route('/register')
.post((req, res, next)=>{
    User.findOne({email: req.body.email})
    .then((user)=>{
        if(!user){
            userOpr.createNewUser(req, res);
            res.statusCode=200;
            res.cookie('user', req.body.email, {signed: true});
            res.redirect('/');
        }
        else{
            res.render('signup', {user:null, message : "User Already Exists!"});
        }
    })
    
})


module.exports=signupRouter;