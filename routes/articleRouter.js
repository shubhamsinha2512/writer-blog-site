var express = require('express');
var articleRouter = express.Router();
var articleOpr = require('../operations/articleOpr');
var userOpr = require('../operations/userOpr');
const authenticate = require('../operations/authenticate');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Article = require('../models/article');
const ejs = require('ejs');
const serverConfig = require('../configurations/serverConfig');
const cookieParser = require('cookie-parser');


articleRouter.use(cookieParser(serverConfig.cookieSecret));
articleRouter.use(bodyParser.json());
articleRouter.use(bodyParser.urlencoded({extended:true}));
console.log("before get - articleRouter");

articleRouter.route('/')
.get((req, res, next)=>{
    console.log("Get Request on /article");
    res.statusCode=200;
    res.setHeader('content-type', 'application/json');
    articleOpr.getAllArticles();
    // res.end(articleOpr.getAllArticles());
})
.post((req, res, next)=>{
    console.log('POST not supported on /article');
    res.end('POST not supported on /article');
})
.put((req, res, next)=>{
    console.log('PUT not supported on /article');
    res.end('PUT not supported on /article');
})
.delete((req, res, next)=>{
    console.log('DELETE not supported on /article');
    res.end('PUT not supported on /article');
});


//Article Submission
articleRouter.route('/compose')
.get((req, res, next)=>{
    
    if(req.signedCookies.user){
        userOpr.getUserByEmail(req.signedCookies.user)
        .then((user)=>{
            res.sendStatus=200;
            res.render('compose', {
                user: {
                    userdetails: user
                }
            });
        })
        
    }
    else{
        res.statusCode=401;
        res.render('login', {user:null});
    }

})
.put((req, res, next)=>{
    console.log('PUT/UPDATION to be added on /article/submit');
    res.end('PUT/UPDATION to be added on /article/submit');
})
.post((req, res, next)=>{
    console.log('POST on /article/submit');
    articleOpr.submitArticle(req, res);
    // res.statusCode=200;
    // res.end("Article Submitted Successfully");
})
.delete((req, res, next)=>{
    console.log('DELETE to be added on article/submit');
    res.end('DELETE to be added on article/submit');
})

// articleRouter.route('/delete')


articleRouter.route('/:articleId')
.get((req, res, next)=>{

    articleOpr.getArticleById(req.params.articleId)
    .then((article)=>{
        articleOpr.incRead(article);
        if(req.signedCookies.user){
            var author = "";
            userOpr.getAuthorDetails(article.author).then((value)=>{
                author=value.name;
            })
            userOpr.setLastRead(req.signedCookies.user, article._id);
            userOpr.getUserByEmail(req.signedCookies.user)
            .then((user)=>{
                var userObj = {
                    user: {userdetails:user},
                    article: article,
                    author : author
                }
                res.render('article', userObj);
            })
        }
        else{
            var userObj = {
                user: null,
                article: article
            }
            res.render('article', userObj);
        }

    })
    
})
.delete((req, res, next)=>{
    Article.findOneAndDelete({'_id':req.params.articleId})
    .then((article)=>{
        res.write(article);
        res.end("Deleted Succesfully");
    })
    
})


articleRouter.route('/compose')
.get((req, res, next)=>{
    res.sendStatus=200;
    res.render('compose');
})
.post((req,res,next)=>{
    articleOpr.submitArticle(req, res);
    res.setHeader('content-type', 'application/json');
    res.json(req.body);
})

articleRouter.route('/article/compose')
.get((res, req, next)=>{
    req.redirect('/compose');
})

module.exports=articleRouter;