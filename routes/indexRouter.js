var express = require('express');
var router = express.Router();
const cookieParser = require('cookie-parser');

var articleOpr = require('../operations/articleOpr');
var userOpr = require('../operations/userOpr');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Article = require('../models/article');
const ejs = require('ejs');
const User = require('../models/user');
const serverConfig = require('../configurations/serverConfig');
const { all } = require('./homeRouter');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));
router.use(cookieParser(serverConfig.cookieSecret));

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("Get on '/'");
  articleOpr.getAllArticles(res)
  .then((articles)=>{

    if(req.signedCookies.user){

      userOpr.getUserByEmail(req.signedCookies.user)
      .then((user)=>{
        // console.log(user);
        // console.log(req.signedCookies.user);

        articleOpr.getArticleById(user.lastread)
        .then((lastarticle)=>{
          var userObj = {  
            user: {
              userdetails:user,
              lastarticle : lastarticle
            },
            allArticles : articles}
            // console.log("Logged In:"+userObj)
            // console.log(user);
            // console.log(articles);
          res.render('index', userObj);
          })
        })
    }
    else{
      var userObj = {  
        user: null,
        allArticles : articles}
        // console.log("Not logged In: "+userObj)
      res.render('index', userObj);
    }

  })
});

router.get('/logout', (req,res)=>{
    res.clearCookie('user');
    res.redirect('/')
})

module.exports = router;