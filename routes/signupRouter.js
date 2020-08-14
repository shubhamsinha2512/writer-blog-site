var express = require('express');
var signupRouter = express.Router();
var express = require('express');
var userOpr = require('../operations/userOpr');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('../models/user');
const authenticate = require('../operations/authenticate');

const cookieParser = require('cookie-parser');

signupRouter.use(cookieParser('12345-67890-09876-54321'));
signupRouter.use(bodyParser.json());
signupRouter.use(bodyParser.urlencoded({extended:true}));


signupRouter.route('/')
.get((req, res, next)=>{
    res.render('signup', {message: ""});
})


signupRouter.route('/register')
.post((req, res, next)=>{
    User.findOne({email: req.body.email})
    .then((user)=>{
        if(!user){
            userOpr.createNewUser(req, res);
            res.statusCode=200;
            authenticate.login(req.body.email, req.body.password);
            res.setHeader('content-type','application/json');
            res.redirect('home');
        }
        else{
            res.render('signup', {message : "User Already Exists!"});
        }
    })
    
})


module.exports=signupRouter;