var express = require('express');
var articleRouter = express.Router();
var articleOpr = require('../operations/articleOpr');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Article = require('../models/article');

articleRouter.use(bodyParser.json());
articleRouter.use(bodyParser.urlencoded({extended:true}));
console.log("before get - articleRouter");

articleRouter.route('/')
.get((req, res, next)=>{
    console.log("Get Request on /article");
    res.statusCode=200;
    res.setHeader('content-type', 'application/json');
    articleOpr.getAllArticles(res);
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


articleRouter.route('/:articleId')
.get((req, res, next)=>{
    console.log(req.params.articleId);
    articleOpr.getArticleById(req, res);
})


//Article Submission
articleRouter.route('/submit')
.get((req, res, next)=>{
    console.log('GET not supported on /article/submit');
    res.end('GET not supported on /article/submit');
})
.put((req, res, next)=>{
    console.log('PUT/UPDATION to be added on /article/submit');
    res.end('PUT/UPDATION to be added on /article/submit');
})
.post((req, res, next)=>{
    console.log('POST on /article/submit');
    articleOpr.submitArticle(req, res);
    res.statusCode=200;
    res.end("Article Submitted Successfully");
})
.delete((req, res, next)=>{
    console.log('DELETE to be added on article/submit');
    res.end('DELETE to be added on article/submit');
})

module.exports=articleRouter;