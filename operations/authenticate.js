const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('../models/user');
const cookieParser = require('cookie-parser');
const userOpr = require('../operations/userOpr');

exports.login = (userEmail, userPwd) => {
    return userOpr.getUserByEmail(userEmail)
        .then((user) => {
            // console.log(user);
            if (user) {
                if (userPwd === user.password) {
                    console.log("correct")
                    return true;
                } else {
                    console.log("Incorrect Password!");
                    return false;
                }
            } else {
                // res.end("No User Found - Signup!");
                return false;
            }
            return false;
        })
}