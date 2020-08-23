var express = require('express');
var profileRouter = express.Router();
const cookieParser = require('cookie-parser');

var articleOpr = require('../operations/articleOpr');
var userOpr = require('../operations/userOpr');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Article = require('../models/article');
const ejs = require('ejs');
const User = require('../models/user');
const serverConfig = require('../configurations/serverConfig');


profileRouter.use(bodyParser.json());
profileRouter.use(bodyParser.urlencoded({extended:true}));
profileRouter.use(cookieParser(serverConfig.cookieSecret));

profileRouter.route('/')
.get((req, res)=>{
    if(req.signedCookies.user){
        userOpr.getUserByEmail(req.signedCookies.user)
        .then((user)=>{
            articleOpr.getUserArticles(user._id)
            .then((userarticles)=>{
                var userObj={
                    user:{userdetails:user},
                    article: userarticles
                }
                // console.log(userObj);
                res.render('profile', userObj);
            })
        })
    }   
    else{
        res.redirect('/login');
    }
})

module.exports = profileRouter;