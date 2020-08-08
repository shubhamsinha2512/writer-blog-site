var express = require('express');
var userRouter = express.Router();
var userOpr = require('../operations/userOpr');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('../models/user');

userRouter.use(bodyParser.json());
userRouter.use(bodyParser.urlencoded({extended:true}));
console.log("before get - userRouter");


userRouter.route('/')
.get((req, res, next)=>{
    //only for admin
    userOpr.getAllUser(req, res);
})



userRouter.route('/:userId')
.get((req, res, next)=>{
    userOpr.getUserByID(req.params.userId, res);
    //userOpr.getUserByEmail(req.body.email, res);
})


module.exports=userRouter;