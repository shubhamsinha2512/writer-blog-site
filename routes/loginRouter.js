var express = require('express');
var loginRouter = express.Router();

var userOpr = require('../operations/userOpr');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('../models/user');

loginRouter.use(bodyParser.json());
loginRouter.use(bodyParser.urlencoded({extended:true}));


loginRouter.route('/')
.get((req, res, next)=>{
    res.statusCode=200;
    res.render('login');
})
.post((req, res, next)=>{
    User.findOne({email: req.body.email})
    .then((user)=>{
        console.log(user);
        if(user){
            if(req.body.password === user.password)
                res.end("Successfully Logged In!");
            else   
                res.end("Incorrect Password!");
        }
        else{
            res.end("No User Found - Signup!");
        }
    })
})

module.exports=loginRouter;