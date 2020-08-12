const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('../models/user');
const cookieParser = require('cookie-parser');
const userOpr = require('../operations/userOpr');

exports.login =   (req, res)=>{
        userOpr.getUserByEmail(req.body.email)
        .then((user)=>{
            console.log(user);
            if(user){
                if(req.body.password === user.password){
                    // res.cookie('user', user.email, {signed: true});
                    return true;
                }
                else{
                    // res.end("Incorrect Password!");
                    return false;
                }          
            }
            else{
                // res.end("No User Found - Signup!");
                return false;
            }
        });
    }