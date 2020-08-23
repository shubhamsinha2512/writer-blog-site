var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var User = require('../models/user');
const user = require('../models/user');

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

exports.setLastRead = (userEmail, articleId)=>{
    User.findOne({email:userEmail})
    .then((user)=>{
        user.lastread = articleId;
        user.save()
    });
}

//returns lastread articleId as promise, resolve with then() when to use 
exports.getLastRead = (userEmail)=>{
    return User.findOne({email:userEmail})
    .then((user)=>{
        return user.lastread;
    })
}

exports.checkAuthorizedCookie = (req) => {
    if(req.signedCookie.user){
        var auth = req.header.authorization;
    }
    else{
        var err = new Error("Please login or signup");
        err.status = 401;
        return false;
    }
}