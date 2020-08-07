var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var User = require('../models/user');

//Export Functions

exports.getAllUser = (req, res)=>{
    User.find({})
    .then((users)=>{
        res.statusCode=200;
        res.setHeader('content-type','application/json');
        res.json(users);
    }).catch();  
}

exports.getUserByID = (userId, res)=>{
    User.findById(userId)
    .then((user)=>{
        res.statusCode=200;
        res.setHeader('content-type', 'application/json');
        res.json(user);
    }).catch();
}

exports.getUserByEmail = (userEmail, res)=>{
    User.findOne({email:userEmail})
    .then((user)=>{
        res.statusCode=200;
        res.setHeader('content-type','application/json');
        res.json(user);
    })
}