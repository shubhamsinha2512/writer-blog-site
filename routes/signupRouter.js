var express = require('express');
var signupRouter = express.Router();
var express = require('express');
var userOpr = require('../operations/userOpr');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('../models/user');

signupRouter.use(bodyParser.json());
signupRouter.use(bodyParser.urlencoded({extended:true}));


signupRouter.route('/')
.get((req, res, next)=>{
    res.render('signup');
})


signupRouter.route('/register')
.post((req, res, next)=>{
    User.findOne({email: req.body.email})
    .then((user)=>{
        if(!user){
            userOpr.createNewUser(req, res);
            res.statusCode=200;
            res.setHeader('content-type','application/json');
            res.json(req.body);
        }
        else{
            res.end("User Already Exists");
        }
    })
    
})


module.exports=signupRouter;