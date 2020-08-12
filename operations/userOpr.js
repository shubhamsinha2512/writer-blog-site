var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var User = require('../models/user');

//Export Functions

exports.getAllUser = ()=>{
    return User.find({})
}

exports.getUserByID = (userId)=>{
    return User.findById(userId)
}

exports.getUserByEmail = (userEmail)=>{
    return User.findOne({email:userEmail})
}

exports.createNewUser = (req, res)=>{
    new User(req.body).save();
}